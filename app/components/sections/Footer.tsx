"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import WhatsAppIcon from "../icons/WhatsAppIcon";
import { Mail, Facebook, Instagram, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-primary/15 bg-white/90 pt-12 pb-6 backdrop-blur">
      <div
        className="pointer-events-none absolute inset-x-[-120px] top-0 h-32 bg-gradient-to-b from-primary/15 via-primary/8 to-transparent blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-[-80px] h-64 w-64 rounded-full bg-primary/8 blur-3xl"
        aria-hidden
      />

      <div className="section relative z-10">
        <div className="rounded-3xl border border-primary/15 bg-primary/10 px-6 py-6 shadow-soft">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Siap cair cepat?
              </p>
              <p className="max-w-2xl text-lg font-semibold leading-snug">
                Konsultasi gratis, kami arahkan langsung ke skema terbaik Anda.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto"
                href="#pembiayaan"
              >
                Ajukan Sekarang
              </Button>
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="w-full sm:w-auto"
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener"
              >
                <span className="flex items-center justify-center gap-2">
                  <WhatsAppIcon size={16} />
                  Chat WhatsApp
                </span>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-12">
          <div className="space-y-3 md:col-span-4">
            <div className="flex items-center">
              <Image
                src="/logo.PNG"
                alt="Jagoan Cair"
                height={40}
                width={160}
                priority
                className="object-contain"
              />
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Solusi pinjaman berbasis agunan dengan proses cepat dan keamanan
              aset terjaga.
            </p>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold text-foreground">
              Menu Cepat
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#simulator" className="transition hover:text-primary">
                  Simulasi
                </a>
              </li>
              <li>
                <a href="#why-us" className="transition hover:text-primary">
                  Keunggulan
                </a>
              </li>
              <li>
                <a href="#pembiayaan" className="transition hover:text-primary">
                  Layanan
                </a>
              </li>
              <li>
                <a href="#faq" className="transition hover:text-primary">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold text-foreground">Kontak</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <WhatsAppIcon size={16} className="text-primary/80" />
                <a
                  className="transition hover:text-primary"
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary/80" />
                <a
                  className="transition hover:text-primary"
                  href="mailto:halo@jagoancair.com"
                >
                  halo@jagoancair.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                <MapPin size={16} className="mt-0.5 text-primary/80" />
                <span>Jl. Contoh No. 123, Jakarta Selatan</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold text-foreground">Social</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://facebook.com/jagoancair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition hover:text-primary"
                >
                  <Facebook size={16} className="text-primary/80" />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/jagoancair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition hover:text-primary"
                >
                  <Instagram size={16} className="text-primary/80" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-primary/10 pt-6">
          <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Jagoan Cair. All rights reserved.
            </p>
            <p className="sm:text-right">
              Layanan ini mematuhi peraturan yang berlaku. Estimasi tidak
              mengikat.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
