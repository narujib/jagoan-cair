"use client";

import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const links = [
  { href: "#simulator", label: "Simulasi" },
  { href: "#why-us", label: "Keunggulan" },
  { href: "#agunan", label: "Jenis Agunan" },
  { href: "#form", label: "Ajukan" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const handleNavigate = () => setOpen(false);

  return (
    <header className="sticky top-4 z-30">
      <div className="section">
        <div className="flex items-center justify-between rounded-2xl bg-card/80 px-4 py-3 shadow-soft backdrop-blur-lg border border-border/70">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-primary text-primary-foreground grid place-items-center font-bold">
              JC
            </div>
            <div className="leading-tight">
              <p className="font-heading text-lg text-foreground">
                Jagoan Cair
              </p>
              <p className="text-xs text-muted-foreground">
                Dana tunai premium
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-foreground md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-primary transition"
                onClick={handleNavigate}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button
              variant="ghost"
              size="sm"
              asChild
              href="tel:+6281234567890"
              onClick={handleNavigate}
            >
              <span className="flex items-center gap-2">
                <Phone size={16} />
                Telepon
              </span>
            </Button>
            <Button size="sm" asChild href="#form" onClick={handleNavigate}>
              Ajukan Sekarang
            </Button>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-card border border-border/60 shadow-sm text-foreground md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div
          className={cn(
            "md:hidden overflow-hidden rounded-2xl bg-card/95 shadow-soft backdrop-blur-lg border border-border/70 transition-all duration-200",
            open
              ? "mt-2 flex flex-col gap-3 p-4 opacity-100 translate-y-0 max-h-[400px]"
              : "pointer-events-none max-h-0 opacity-0 -translate-y-2 p-0"
          )}
        >
          <nav className="flex flex-col gap-3 text-sm font-semibold text-foreground">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-primary transition"
                onClick={handleNavigate}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              asChild
              href="tel:+6281234567890"
              onClick={handleNavigate}
            >
              <span className="flex items-center justify-center gap-2">
                <Phone size={16} />
                Telepon
              </span>
            </Button>
            <Button
              size="sm"
              className="w-full"
              asChild
              href="#form"
              onClick={handleNavigate}
            >
              Ajukan
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
