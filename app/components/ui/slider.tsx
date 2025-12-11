'use client';

import * as React from "react";
import { cn } from "../../lib/utils";

type SliderProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> & {
  onValueChange?: (value: number) => void;
};

export function Slider({ className, onValueChange, ...props }: SliderProps) {
  return (
    <input
      type="range"
      className={cn(
        "w-full accent-emerald-800 h-2 rounded-full bg-emerald-900/10 cursor-pointer",
        className
      )}
      onChange={(e) => onValueChange?.(Number(e.target.value))}
      {...props}
    />
  );
}
