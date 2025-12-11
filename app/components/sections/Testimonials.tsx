'use client';

import { motion, useReducedMotion } from "framer-motion";
import { Card } from "../ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Andi, Jakarta",
    text: "Ajukan pagi, siang sudah cair. Prosesnya rapi, aset aman.",
    rating: 5
  },
  {
    name: "Maya, Depok",
    text: "Tim responsif, bunga jelas dari awal. Sangat membantu.",
    rating: 5
  },
  {
    name: "Rudi, Bekasi",
    text: "Tanpa BI checking, hanya verifikasi dokumen. Recommended.",
    rating: 5
  }
];

export default function Testimonials() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">Testimoni</p>
        <h2 className="font-heading text-3xl text-emerald-900">Dipercaya Ratusan Nasabah</h2>
        <p className="text-slate-600">Cuplikan pengalaman mereka yang sudah cair bersama kami.</p>
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
            <Card className="h-full p-5">
              <div className="flex gap-1 text-gold-500">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-3 text-sm text-slate-700">{item.text}</p>
              <p className="mt-4 text-sm font-semibold text-emerald-900">{item.name}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
