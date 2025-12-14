"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card } from "../ui/card";
import { FileText, PhoneCall, ClipboardCheck, Wallet } from "lucide-react";

const steps = [
  {
    title: "Isi Form Online",
    desc: "Siapkan data jaminan aset dan data diri Anda.",
    icon: FileText,
  },
  {
    title: "Kami akan menghubungimu",
    desc: "Anda akan dihubungi Call Center kami untuk konsultasi pinjaman dan tenor.",
    icon: PhoneCall,
  },
  {
    title: "Survei dan Validasi Aset",
    desc: "Kami akan lakukan survei dan cek aset untuk proses selanjutnya.",
    icon: ClipboardCheck,
  },
  {
    title: "Pencairan Dana",
    desc: "Setelah survei dan disetujui, dana akan segera cair ke rekening Anda.",
    icon: Wallet,
  },
];

const faqs = [
  {
    q: "Apakah perlu BI Checking?",
    a: "Tidak, penilaian berdasarkan aset dan kelayakan dokumen.",
  },
  {
    q: "Berapa lama proses cair?",
    a: "Umumnya kurang dari 1 jam setelah dokumen dinyatakan lengkap.",
  },
  {
    q: "Dokumen apa saja?",
    a: "KTP, BPKB/sertifikat, STNK/PBB, serta foto aset jika ada.",
  },
  {
    q: "Apakah unit harus atas nama sendiri?",
    a: "Bisa atas nama keluarga inti, sertakan bukti hubungan (KK/akta).",
  },
];

export default function ProcessFAQ() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="faq" className="space-y-8 scroll-mt-[18rem] md:scroll-mt-28">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Proses
          </p>
          <h2 className="font-heading text-3xl text-foreground">
            Langkah-langkah Mudah Pengajuan Pinjaman
          </h2>
          <p className="text-muted-foreground">
            Proses cepat dan sederhana! Ikuti 4 langkah ini untuk ajukan
            pinjaman dengan pendampingan tim kami sampai dana cair.
          </p>
          <div className="relative mt-2">
            <div className="pointer-events-none absolute left-[20px] top-6 bottom-6 w-px rounded-full bg-gradient-to-b from-primary/70 via-primary/25 to-transparent sm:left-[32px]" />
            <div className="space-y-4">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.08 }}
                    className="relative p-2 pl-14 sm:pl-20"
                  >
                    <div className="absolute left-0 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md ring-4 ring-primary/15 sm:left-3">
                      <Icon size={18} />
                    </div>
                    <div className="space-y-1.5">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                        Langkah {idx + 1}
                      </span>
                      <h3 className="text-lg font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            FAQ
          </p>
          <h3 className="font-heading text-2xl text-foreground">
            Pertanyaan Populer
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.04 }}
              >
                <Card className="p-4">
                  <p className="font-semibold text-foreground">{faq.q}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{faq.a}</p>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="rounded-2xl bg-primary/10 p-4 text-sm text-foreground">
            Butuh jawaban cepat?{" "}
            <a
              href="tel:+6281234567890"
              className="font-semibold text-primary underline"
            >
              Hubungi kami
            </a>{" "}
            atau klik{" "}
            <a
              href="https://wa.me/6281234567890"
              className="font-semibold text-primary underline"
            >
              WhatsApp
            </a>
            .
          </div>
        </div>
      </div>
    </section>
  );
}
