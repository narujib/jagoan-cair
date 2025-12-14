"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  TrendingDown,
  Zap,
  FileCheck,
  Users,
  Star,
} from "lucide-react";

import { Card } from "../ui/card";

const features = [
  {
    title: "Keamanan Aset",
    desc: "Aset tetap aman. Pengawasan ketat dengan standar penyimpanan terpercaya.",
    icon: ShieldCheck,
  },
  {
    title: "Bunga Kompetitif",
    desc: "Mulai 0.9% per bulan dengan perhitungan transparan tanpa biaya tersembunyi.",
    icon: TrendingDown,
  },
  {
    title: "Proses Cepat",
    desc: "Proses verifikasi dan pencairan dana yang super cepat.",
    icon: Zap,
  },
  {
    title: "Syarat Mudah",
    desc: "Persyaratan pengajuan mudah dipenuhi sesuai ketentuan.",
    icon: FileCheck,
  },
  {
    title: "Tim Konsultan",
    desc: "Konsultasi langsung dengan konsultan finansial berpengalaman.",
    icon: Users,
  },
  {
    title: "Trusted by Clients",
    desc: "Ratusan pencairan sukses dengan rating kepuasan tinggi.",
    icon: Star,
  },
];

export default function WhyUs() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="why-us" className="space-y-6 scroll-mt-28">
      <div
        className="pointer-events-none absolute -left-20 top-14 h-44 w-44 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-10 h-52 w-52 rounded-full bg-primary/8 blur-3xl"
        aria-hidden
      />
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Keunggulan
        </p>
        <h2 className="font-heading text-3xl text-foreground">
          Kenapa Memilih Jagoan Cair
        </h2>
        <p className="text-muted-foreground">
          Transparan, cepat, dan memprioritaskan keamanan aset Anda.
        </p>
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-primary">
            Pengawasan aset
          </span>
          <span className="rounded-full border border-primary/15 bg-white/80 px-3 py-1 text-primary">
            Simulasi transparan
          </span>
          <span className="rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-primary">
            Konsultan berpengalaman
          </span>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="relative h-full overflow-hidden border-primary/15 bg-white/90 p-5 shadow-[0_14px_50px_rgba(18,36,120,0.08)] transition hover:-translate-y-1 hover:shadow-[0_20px_70px_rgba(18,36,120,0.14)]">
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/6 via-transparent to-primary/5"
                  aria-hidden
                />
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                  <Icon />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.desc}
                </p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
