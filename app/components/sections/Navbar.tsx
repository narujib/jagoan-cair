'use client';

import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const links = [
  { href: "#simulator", label: "Simulasi" },
  { href: "#why-us", label: "Keunggulan" },
  { href: "#agunan", label: "Jenis Agunan" },
  { href: "#form", label: "Ajukan" },
  { href: "#faq", label: "FAQ" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30">
      <div className="section">
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/60 px-4 py-3 shadow-soft backdrop-blur-lg border border-white/60">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-emerald-800 text-white grid place-items-center font-bold">
              JC
            </div>
            <div className="leading-tight">
              <p className="font-heading text-lg text-emerald-900">Jagoan Cair</p>
              <p className="text-xs text-slate-500">Dana tunai premium</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-emerald-900 md:flex">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-emerald-700 transition">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm" asChild href="tel:+6281234567890">
              <span className="flex items-center gap-2">
                <Phone size={16} />
                Telepon
              </span>
            </Button>
            <Button size="sm" asChild href="#form">
              Ajukan Sekarang
            </Button>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm text-emerald-900 md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div
          className={cn(
            "md:hidden mt-2 flex flex-col gap-3 rounded-2xl bg-white/90 p-4 shadow-soft backdrop-blur-lg border border-white/60 transition-all",
            open ? "opacity-100 translate-y-0" : "pointer-events-none -translate-y-2 opacity-0"
          )}
        >
          <nav className="flex flex-col gap-3 text-sm font-semibold text-emerald-900">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-emerald-700 transition">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="w-full" asChild href="tel:+6281234567890">
              <span className="flex items-center justify-center gap-2">
                <Phone size={16} />
                Telepon
              </span>
            </Button>
            <Button size="sm" className="w-full" asChild href="#form">
              Ajukan
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
