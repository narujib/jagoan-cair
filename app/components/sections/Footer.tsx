"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Mail, Facebook, Instagram, MapPin } from "lucide-react";

const WhatsAppIcon = ({
  size = 16,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
  </svg>
);

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
