'use client';

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:opacity-60 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border shadow-sm",
        ghost:
          "bg-transparent text-foreground hover:bg-accent/60 border border-border/70"
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

type ButtonElementProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> & {
  asChild?: false;
  type?: "button" | "submit" | "reset";
};

type AnchorElementProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  asChild: true;
};

export type ButtonProps = (ButtonElementProps | AnchorElementProps) &
  VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    if (asChild) {
      const anchorProps = props as AnchorElementProps;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cn(buttonVariants({ variant, size }), className)}
          {...anchorProps}
        />
      );
    }

    const { type = "button", ...buttonProps } = props as ButtonElementProps;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(buttonVariants({ variant, size }), className)}
        type={type}
        {...buttonProps}
      />
    );
  }
);
Button.displayName = "Button";
