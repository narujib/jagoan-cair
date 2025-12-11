'use client';

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Sparkles, Clock3 } from "lucide-react";
import { Button } from "../ui/button";

const heroImage =
  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1000&q=80";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="hero" className="relative overflow-hidden pb-12 pt-10">
      <div className="section grid items-center gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-xs font-semibold text-emerald-900 shadow-sm"
          >
            <Sparkles size={14} /> Premium Lending Service
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-heading text-4xl leading-tight text-emerald-900 sm:text-5xl"
          >
            Solusi Dana Tunai Premium.
            <br />
            Aset Aman, Cair Instan.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-xl text-lg text-slate-700"
          >
            Pencairan hingga 90% nilai taksiran. Tanpa BI checking, bunga kompetitif, dan proses
            verifikasi kurang dari 1 jam.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Button size="lg" asChild href="#form">
              Ajukan Sekarang
            </Button>
            <Button size="lg" variant="ghost" asChild href="#simulator">
              Lihat Simulasi
            </Button>
            <p className="text-sm text-slate-600">Jam operasional 08.00 - 21.00 WIB</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 text-sm font-semibold text-emerald-900"
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={16} /> Terdaftar & diawasi
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock3 size={16} /> Cair 1 jam*
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 30, scale: reduceMotion ? 1 : 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative"
        >
          <div className="gradient-card relative overflow-hidden rounded-3xl p-6 shadow-soft">
            <div className="absolute inset-0 bg-emerald-900/5" />
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src={heroImage}
                alt="Konsultan keuangan menjelaskan proses gadai BPKB"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 480px, 100vw"
              />
            </div>
            <div className="relative mt-4 grid grid-cols-3 gap-2 text-xs font-semibold text-emerald-900">
              <div className="rounded-xl bg-white/70 px-3 py-2 text-center shadow-sm">OJK</div>
              <div className="rounded-xl bg-white/70 px-3 py-2 text-center shadow-sm">APPI</div>
              <div className="rounded-xl bg-white/70 px-3 py-2 text-center shadow-sm">ISO 27001</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
