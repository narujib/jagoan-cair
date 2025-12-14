"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card } from "../ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Andi, Jakarta",
    text: "Ajukan pagi, siang sudah cair. Prosesnya rapi, aset aman.",
    rating: 5,
  },
  {
    name: "Maya, Depok",
    text: "Tim responsif, bunga jelas dari awal. Sangat membantu.",
    rating: 5,
  },
  {
    name: "Rudi, Bekasi",
    text: "Tanpa BI checking, hanya verifikasi dokumen. Recommended.",
    rating: 5,
  },
];

export default function Testimonials() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="space-y-6">
      <div
        className="pointer-events-none absolute -left-24 top-12 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-28 bottom-[-60px] h-52 w-52 rounded-full bg-primary/8 blur-3xl"
        aria-hidden
      />
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Testimoni
        </p>
        <h2 className="font-heading text-3xl text-foreground">
          Dipercaya Ratusan Nasabah
        </h2>
        <p className="text-muted-foreground">
          Cuplikan pengalaman mereka yang sudah cair bersama kami.
        </p>
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Skor kepuasan 4.9/5 versi pelanggan
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
          >
            <Card className="relative h-full overflow-hidden border-primary/15 bg-white/90 p-5 shadow-[0_14px_50px_rgba(18,36,120,0.08)]">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/6 via-transparent to-primary/5"
                aria-hidden
              />
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{item.text}</p>
              <p className="mt-4 text-sm font-semibold text-foreground">
                {item.name}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
