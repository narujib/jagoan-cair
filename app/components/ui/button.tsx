'use client';

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-emerald-800 text-white hover:bg-emerald-900 focus-visible:ring-emerald-800 ring-offset-white shadow-lg shadow-emerald-800/15",
        secondary:
          "bg-gold-500 text-emerald-900 hover:bg-gold-400 focus-visible:ring-gold-500 ring-offset-white shadow-lg shadow-gold-500/25",
        ghost:
          "bg-transparent text-emerald-900 hover:bg-emerald-900/5 border border-emerald-900/10 focus-visible:ring-emerald-800 ring-offset-white"
      },
      size: {
        sm: "px-3 py-2 text-xs",
        md: "px-4 py-2.5",
        lg: "px-5 py-3 text-base"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  ({ className, variant, size, asChild, type, ...props }, ref) => {
    const Component = asChild ? "a" : "button";
    const componentProps =
      Component === "button"
        ? { type: type || "button", ...props }
        : { ...props };

    return (
      <Component
        ref={ref as any}
        className={cn(buttonVariants({ variant, size }), className)}
        {...(componentProps as any)}
      />
    );
  }
);
Button.displayName = "Button";
