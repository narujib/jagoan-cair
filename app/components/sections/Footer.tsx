'use client';

import { Button } from "../ui/button";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-emerald-900/10 bg-white/70 py-12 backdrop-blur">
      <div className="section grid gap-8 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-emerald-800 text-white grid place-items-center font-bold">
              JC
            </div>
            <div>
              <p className="font-heading text-lg text-emerald-900">Jagoan Cair</p>
              <p className="text-xs text-slate-500">Dana tunai premium</p>
            </div>
          </div>
          <p className="text-sm text-slate-600">
            Solusi pinjaman berbasis agunan dengan proses cepat dan keamanan aset terjaga.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-emerald-900">Link Cepat</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><a href="#simulator" className="hover:text-emerald-800">Simulasi</a></li>
            <li><a href="#form" className="hover:text-emerald-800">Ajukan</a></li>
            <li><a href="#faq" className="hover:text-emerald-800">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-emerald-900">Kontak</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2"><Phone size={16} /> +62 812-3456-7890</li>
            <li className="flex items-center gap-2"><MessageCircle size={16} /> WA prioritas</li>
            <li className="flex items-center gap-2"><Mail size={16} /> halo@jagoancair.com</li>
          </ul>
          <div className="mt-3 flex gap-2">
            <Button size="sm" asChild href="https://wa.me/6281234567890" target="_blank" rel="noopener">
              WhatsApp
            </Button>
            <Button size="sm" variant="ghost" asChild href="tel:+6281234567890">
              Telepon
            </Button>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-emerald-900">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><a href="#!" className="hover:text-emerald-800">Privacy Policy</a></li>
            <li><a href="#!" className="hover:text-emerald-800">Syarat & Ketentuan</a></li>
            <li className="flex items-start gap-2 text-xs text-slate-500">
              <MapPin size={16} className="mt-0.5" />
              Jl. Contoh No. 123, Jakarta Selatan
            </li>
          </ul>
        </div>
      </div>
      <div className="section mt-8 flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Jagoan Cair. All rights reserved.</p>
        <p>Layanan ini mematuhi peraturan yang berlaku. Estimasi tidak mengikat.</p>
      </div>
    </footer>
  );
}
