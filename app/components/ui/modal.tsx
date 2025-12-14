'use client';

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function Modal({ open, onClose, title, description, children, footer, className }: ModalProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          <motion.button
            type="button"
            aria-label="Close modal overlay"
            className="fixed inset-0 bg-black/70"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <div className="relative z-10 w-full px-4 py-6 sm:py-10">
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20, scale: reduceMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : 10, scale: reduceMotion ? 1 : 0.98 }}
              transition={{ duration: 0.25 }}
              className={cn(
                "mx-auto flex max-h-[85vh] max-w-4xl flex-col overflow-hidden rounded-3xl border border-border/80",
                "bg-card shadow-2xl ring-1 ring-primary/10",
                className
              )}
            >
              {(title || description) && (
                <div className="border-b border-border/70 bg-card px-6 pb-4 pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      {title ? <h3 className="text-xl font-semibold text-foreground">{title}</h3> : null}
                      {description ? (
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-muted text-foreground hover:bg-muted/80"
                      aria-label="Tutup"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-y-auto px-6 py-5">
                <div className="space-y-4">{children}</div>
              </div>

              {footer ? (
                <div className="border-t border-border/70 bg-card px-6 py-4">
                  <div className="flex flex-wrap justify-end gap-2">{footer}</div>
                </div>
              ) : null}
            </motion.div>
          </div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
