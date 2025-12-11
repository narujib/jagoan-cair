'use client';

import { motion, useReducedMotion } from "framer-motion";
import { Card } from "../ui/card";
import { Button } from "../ui/button";

const steps = [
  {
    title: "Ajukan Online",
    desc: "Isi formulir singkat dan upload detail aset (opsional).",
    time: "~2 menit"
  },
  {
    title: "Verifikasi Dokumen",
    desc: "Tim kami menghubungi via WhatsApp/telepon untuk validasi.",
    time: "< 30 menit"
  },
  {
    title: "Cair",
    desc: "Tanda tangan & pencairan dana. Aset tetap aman.",
    time: "<= 1 jam"
  }
];

const faqs = [
  {
    q: "Apakah perlu BI Checking?",
    a: "Tidak, penilaian berdasarkan aset dan kelayakan dokumen."
  },
  {
    q: "Berapa lama proses cair?",
    a: "Umumnya kurang dari 1 jam setelah dokumen dinyatakan lengkap."
  },
  {
    q: "Dokumen apa saja?",
    a: "KTP, BPKB/sertifikat, STNK/PBB, serta foto aset jika ada."
  },
  {
    q: "Apakah unit harus atas nama sendiri?",
    a: "Bisa atas nama keluarga inti, sertakan bukti hubungan (KK/akta)."
  }
];

export default function ProcessFAQ() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="faq" className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Proses</p>
          <h2 className="font-heading text-3xl text-foreground">Langkah Pencairan</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="rounded-2xl bg-card p-4 shadow-soft border border-border"
              >
                <div className="text-xs font-semibold text-primary">Langkah {idx + 1}</div>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
                <p className="mt-2 text-xs text-primary">{step.time}</p>
              </motion.div>
            ))}
          </div>
          <Button size="lg" asChild href="#form">
            Mulai Pengajuan
          </Button>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">FAQ</p>
          <h3 className="font-heading text-2xl text-foreground">Pertanyaan Populer</h3>
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
            Butuh jawaban cepat? <a href="tel:+6281234567890" className="font-semibold text-primary underline">Hubungi kami</a>{" "}
            atau klik{" "}
            <a href="https://wa.me/6281234567890" className="font-semibold text-primary underline">
              WhatsApp
            </a>
            .
          </div>
        </div>
      </div>
    </section>
  );
}
