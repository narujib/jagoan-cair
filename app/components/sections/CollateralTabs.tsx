'use client';

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Tabs } from "../ui/tabs";
import { Card } from "../ui/card";

const requirements: Record<string, string[]> = {
  motor: [
    "Minimal tahun 2015",
    "Pajak hidup/mati maks 2 tahun",
    "Atas nama sendiri/keluarga inti"
  ],
  mobil: [
    "Minimal tahun 2013",
    "Pajak hidup, jika mati harus diselesaikan saat proses",
    "Buku servis jika ada mempercepat penilaian"
  ],
  sertifikat: [
    "SHM/SHGB lengkap",
    "Lokasi Jabodetabek/Jawa Barat",
    "IMB/PBB terakhir (opsional) untuk validasi"
  ]
};

export default function CollateralTabs() {
  const [activeTab, setActiveTab] = useState<"motor" | "mobil" | "sertifikat">("mobil");
  const reduceMotion = useReducedMotion();

  return (
    <section id="agunan" className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Jenis Agunan</p>
          <h2 className="font-heading text-3xl text-foreground">Agunan yang Kami Terima</h2>
        </div>
        <Tabs
          tabs={[
            { value: "motor", label: "Motor" },
            { value: "mobil", label: "Mobil" },
            { value: "sertifikat", label: "Sertifikat" }
          ]}
          value={activeTab}
          onChange={(v) => setActiveTab(v as typeof activeTab)}
        />
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-lg font-semibold text-foreground">Syarat {activeTab}</p>
            <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              {requirements[activeTab].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">
              *Data lengkap mempercepat verifikasi dan appraisal aset.
            </p>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
