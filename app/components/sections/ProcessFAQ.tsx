"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card } from "../ui/card";
import { FileText, PhoneCall, ClipboardCheck, Wallet } from "lucide-react";
import { contact, whatsappLinkWithMessage } from "../../config/contact";

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
    a: "Ya, pengajuan tetap melalui pengecekan data kredit. Namun, tidak perlu riwayat kredit yang sempurna — selama dokumen dan jaminan memenuhi syarat, pengajuan tetap bisa diproses dengan cepat.",
  },
  {
    q: "Berapa lama proses cair?",
    a: "Proses cepat dan instan. Rata-rata pencairan hanya ±1 hari kerja setelah data lengkap dan disetujui. Dengan dokumen lengkap, dana dapat segera dicairkan.",
  },
  {
    q: "Dokumen apa saja yang dibutuhkan?",
    a: "Persyaratan dokumen tercantum pada deskripsi masing-masing produk pembiayaan. Silakan menyesuaikan dengan jenis pembiayaan yang diajukan.",
  },
  {
    q: "Apakah unit harus atas nama sendiri?",
    a: "Tidak harus. Pengajuan pembiayaan dapat menggunakan unit atas nama pihak lain, selama didukung dengan dokumen pendukung yang sah dan persetujuan dari pemilik unit sesuai ketentuan yang berlaku.",
  },
];

export default function ProcessFAQ() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="faq" className="space-y-8 scroll-mt-28">
      <div
        className="pointer-events-none absolute -left-24 top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-28 bottom-[-60px] h-56 w-56 rounded-full bg-primary/8 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/4 h-72 w-72 rounded-full bg-gradient-to-bl from-primary/11 to-accent/9 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-1/4 top-32 h-52 w-52 rounded-full bg-primary/9 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-20 bottom-16 h-60 w-60 rounded-full bg-accent/11 blur-3xl"
        aria-hidden
      />
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
                <Card className="border-primary/15 bg-white/90 p-4 shadow-[0_10px_40px_rgba(18,36,120,0.08)]">
                  <p className="font-semibold text-foreground">{faq.q}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{faq.a}</p>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="rounded-2xl bg-primary/10 p-4 text-sm text-foreground">
            Butuh jawaban cepat?{" "}
            <a
              href={contact.phone.tel}
              className="font-semibold text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hubungi kami
            </a>{" "}
            atau klik{" "}
            <a
              href={whatsappLinkWithMessage()}
              className="font-semibold text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
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
