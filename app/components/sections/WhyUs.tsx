'use client';

import { motion, useReducedMotion } from "framer-motion";
import { Shield, Percent, Timer, Award, Lock, Headphones } from "lucide-react";
import { Card } from "../ui/card";

const features = [
  {
    title: "Keamanan Aset",
    desc: "Aset tetap aman. Pengawasan ketat dengan standar penyimpanan terpercaya.",
    icon: Lock
  },
  {
    title: "Bunga Kompetitif",
    desc: "Mulai 0.9% per bulan dengan perhitungan transparan tanpa biaya tersembunyi.",
    icon: Percent
  },
  {
    title: "Proses 1 Jam",
    desc: "Verifikasi cepat. Cair dalam 1 jam setelah dokumen disetujui.",
    icon: Timer
  },
  {
    title: "Legal & Terdaftar",
    desc: "Mematuhi regulasi, dilengkapi legal disclaimer dan SOP layanan.",
    icon: Shield
  },
  {
    title: "Tim Konsultan",
    desc: "Konsultasi langsung dengan konsultan finansial berpengalaman.",
    icon: Headphones
  },
  {
    title: "Trusted by Clients",
    desc: "Ratusan pencairan sukses dengan rating kepuasan tinggi.",
    icon: Award
  }
];

export default function WhyUs() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="why-us" className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Keunggulan</p>
        <h2 className="font-heading text-3xl text-foreground">Kenapa Memilih Jagoan Cair</h2>
        <p className="text-muted-foreground">Transparan, cepat, dan memprioritaskan keamanan aset Anda.</p>
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
              <Card className="h-full p-5 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.desc}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
