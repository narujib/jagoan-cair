'use client';

import * as React from "react";
import { cn } from "../../lib/utils";

type Tab = {
  value: string;
  label: string;
};

interface TabsProps {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Tabs({ tabs, value, onChange, className }: TabsProps) {
  return (
    <div className={cn("inline-flex items-center gap-2 rounded-full bg-white/60 p-1 shadow-sm", className)}>
      {tabs.map((tab) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            type="button"
            className={cn(
              "px-4 py-2 rounded-full text-sm font-semibold transition",
              active ? "bg-emerald-800 text-white shadow" : "text-emerald-900 hover:bg-emerald-900/5"
            )}
            onClick={() => onChange(tab.value)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
