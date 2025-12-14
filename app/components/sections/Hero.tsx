"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Sparkles, Clock3 } from "lucide-react";
import { Button } from "../ui/button";

const heroImage = "/bg-hero.png";

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
            className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-2 text-xs font-semibold text-primary shadow-sm"
          >
            <Sparkles size={14} /> Premium Lending Service
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-heading text-4xl leading-tight text-foreground sm:text-5xl"
          >
            Solusi Dana Tunai Premium.
            <br />
            Aset Aman, Cair Instan.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-xl text-lg text-muted-foreground"
          >
            Pencairan hingga 90% nilai taksiran. Tanpa BI checking, bunga
            kompetitif, dan proses verifikasi kurang dari 1 jam.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Button size="lg" asChild href="#pembiayaan">
              Ajukan Sekarang
            </Button>
            <Button size="lg" variant="ghost" asChild href="#simulator">
              Lihat Simulasi
            </Button>
            <p className="text-sm text-muted-foreground">
              Jam operasional 08.00 - 21.00 WIB
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 text-sm font-semibold text-primary"
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={16} /> Aman
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock3 size={16} /> Cair Cepat*
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 30,
            scale: reduceMotion ? 1 : 0.96,
          }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-transparent">
              <Image
                src={heroImage}
                alt="Konsultan keuangan menjelaskan proses gadai BPKB"
                fill
                priority
                className="object-contain"
                sizes="(min-width: 1024px) 480px, 100vw"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
