"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "#simulator", label: "Simulasi" },
  { href: "#why-us", label: "Keunggulan" },
  { href: "#pembiayaan", label: "Layanan" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const handleNavigate = () => setOpen(false);

  return (
    <header className="fixed top-4 left-0 right-0 z-40">
      <div className="section">
        <div className="relative flex items-center justify-between overflow-hidden rounded-3xl border border-primary/15 bg-white/90 px-4 py-3 shadow-[0_16px_60px_rgba(18,36,120,0.12)] backdrop-blur-xl">
          <div
            className="pointer-events-none absolute -left-12 top-[-80px] h-40 w-40 rounded-full bg-primary/15 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-16 bottom-[-90px] h-44 w-44 rounded-full bg-primary/10 blur-3xl"
            aria-hidden
          />
          <Link href="/" onClick={handleNavigate} className="flex items-center">
            <Image
              src="/logo.PNG"
              alt="Jagoan Cair"
              height={40}
              width={160}
              priority
              className="object-contain"
            />
          </Link>

          <nav className="relative hidden items-center gap-6 text-sm font-semibold text-foreground md:flex">
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

          <div className="hidden items-center gap-4 md:flex">
            <a
              href="tel:+6281234567890"
              onClick={handleNavigate}
              className="text-sm font-semibold text-primary transition hover:text-primary/80"
            >
              +62 812-3456-7890
            </a>
            <Button
              size="sm"
              asChild
              href="#pembiayaan"
              onClick={handleNavigate}
            >
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
            "md:hidden overflow-hidden rounded-2xl border border-primary/15 bg-white/90 shadow-soft backdrop-blur-lg transition-all duration-200",
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
          <div className="flex flex-col gap-2">
            <a
              href="tel:+6281234567890"
              onClick={handleNavigate}
              className="text-sm font-semibold text-primary transition hover:text-primary/80"
            >
              +62 812-3456-7890
            </a>
            <Button
              size="sm"
              className="w-full"
              asChild
              href="#pembiayaan"
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
