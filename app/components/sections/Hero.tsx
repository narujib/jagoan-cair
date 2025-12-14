"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Sparkles, Clock3 } from "lucide-react";
import { Button } from "../ui/button";

const heroImage = "/bg-hero.png";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative overflow-hidden pb-16 pt-28 sm:pt-32"
    >
      <div
        className="pointer-events-none absolute inset-x-[-160px] top-[-120px] h-64 bg-gradient-to-br from-primary/15 via-transparent to-primary/5 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-primary/12 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-28 top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div className="section relative z-10 grid items-center gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary shadow-sm"
          >
            <Sparkles size={14} /> Lending Service
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-heading text-4xl leading-tight text-foreground sm:text-5xl"
          >
            Solusi Cepat Dana Tunai.
            <br />
            Aset Aman, Cair Instan.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-xl text-lg text-muted-foreground"
          >
            Pencairan hingga 90% nilai taksiran. Skema pembiayaan fleksibel
            dengan proses cepat dan aman.
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
            className="grid gap-4 text-sm sm:grid-cols-3"
          >
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Aman
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock3 className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Cair Cepat
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock3 className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Proses Mudah
                </p>
              </div>
            </div>
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
