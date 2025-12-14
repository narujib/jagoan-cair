"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card/80 py-12 backdrop-blur">
      <div className="section grid gap-8 md:grid-cols-4">
        <div className="space-y-3">
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
          <p className="text-sm text-muted-foreground">
            Solusi pinjaman berbasis agunan dengan proses cepat dan keamanan
            aset terjaga.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground">Link Cepat</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#simulator" className="hover:text-primary">
                Simulasi
              </a>
            </li>
            <li>
              <a href="#pembiayaan" className="hover:text-primary">
                Ajukan
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-primary">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-foreground">Kontak</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone size={16} /> +62 812-3456-7890
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle size={16} /> WA prioritas
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> halo@jagoancair.com
            </li>
          </ul>
          <div className="mt-3 flex gap-2">
            <Button
              size="sm"
              asChild
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener"
            >
              WhatsApp
            </Button>
            <Button size="sm" variant="ghost" asChild href="tel:+6281234567890">
              Telepon
            </Button>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-foreground">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#!" className="hover:text-primary">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#!" className="hover:text-primary">
                Syarat & Ketentuan
              </a>
            </li>
            <li className="flex items-start gap-2 text-xs text-muted-foreground">
              <MapPin size={16} className="mt-0.5" />
              Jl. Contoh No. 123, Jakarta Selatan
            </li>
          </ul>
        </div>
      </div>
      <div className="section mt-8 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Jagoan Cair. All rights reserved.</p>
        <p>
          Layanan ini mematuhi peraturan yang berlaku. Estimasi tidak mengikat.
        </p>
      </div>
    </footer>
  );
}
