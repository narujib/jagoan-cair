"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import WhatsAppIcon from "../icons/WhatsAppIcon";
import { Mail, Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { contact, whatsappLinkWithMessage } from "../../config/contact";

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
        <div className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-r from-primary via-primary/90 to-primary/80 px-6 py-7 text-white shadow-[0_20px_60px_rgba(18,36,120,0.18)]">
          <div className="pointer-events-none absolute -left-12 top-[-40px] h-48 w-48 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute right-2 bottom-[-60px] h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.18),transparent_38%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.14),transparent_32%)]" />

          <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/90 ring-1 ring-white/20">
                Siap cair cepat?
              </span>
              <p className="max-w-2xl text-xl font-semibold leading-snug">
                Konsultasi gratis, kami arahkan langsung ke skema terbaik Anda.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
              <Button
                size="lg"
                asChild
                variant="secondary"
                href="#pembiayaan"
                className="w-full bg-white text-primary shadow-lg shadow-black/10 hover:bg-white/90 sm:w-auto"
              >
                <span>Ajukan Sekarang</span>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="w-full border-white/40 bg-white/10 text-white hover:bg-white/15 hover:text-white sm:w-auto"
                href={whatsappLinkWithMessage()}
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
                  href={contact.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contact.whatsapp.display}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary/80" />
                <a
                  className="transition hover:text-primary"
                  href={`mailto:${contact.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                <MapPin size={16} className="mt-0.5 text-primary/80" />
                <span>{contact.address}</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold text-foreground">Social</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={contact.socials.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition hover:text-primary"
                >
                  <Facebook size={16} className="text-primary/80" />
                  {contact.socials.facebook.display}
                </a>
              </li>
              <li>
                <a
                  href={contact.socials.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition hover:text-primary"
                >
                  <Instagram size={16} className="text-primary/80" />
                  {contact.socials.instagram.display}
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
