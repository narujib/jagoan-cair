"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card } from "../ui/card";
import LoanForm from "../LoanForm";

export default function FormSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="form" className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Formulir
        </p>
        <h2 className="font-heading text-3xl text-foreground">
          Ajukan dalam 1 Menit
        </h2>
        <p className="text-muted-foreground">
          Isi data singkat. Data disimpan aman di Supabase, lalu Anda diarahkan
          ke WhatsApp untuk verifikasi cepat.
        </p>
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: reduceMotion ? 0 : 20,
          scale: reduceMotion ? 1 : 0.98,
        }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <Card className="p-6">
          <LoanForm />
        </Card>
      </motion.div>
    </section>
  );
}
