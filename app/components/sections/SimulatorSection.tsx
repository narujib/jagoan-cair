'use client';

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Slider } from "../ui/slider";
import { Card } from "../ui/card";
import { formatCurrency, formatNumber } from "../../lib/utils";
import { trackEvent } from "../../lib/analytics";

const MIN_AMOUNT = 5000000;
const MAX_AMOUNT = 100000000;
const MIN_TENOR = 3;
const MAX_TENOR = 36;
const DEFAULT_ADMIN_MONTHLY = 150000;
const DEFAULT_RATE = 0.009; // 0.9% flat per month

export default function SimulatorSection() {
  const reduceMotion = useReducedMotion();
  const [amount, setAmount] = useState(15000000);
  const [tenor, setTenor] = useState(12);

  useEffect(() => {
    trackEvent("slider_change", { amount, tenor });
  }, [amount, tenor]);

  const monthlyInstallment =
    (amount + amount * DEFAULT_RATE * tenor) / tenor + DEFAULT_ADMIN_MONTHLY;

  return (
    <section id="simulator" className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Simulasi</p>
        <h2 className="font-heading text-3xl text-foreground">Simulasi Pinjaman Transparan</h2>
        <p className="text-muted-foreground">
          Atur nominal dan tenor untuk melihat estimasi angsuran. Angka bersifat indikatif,
          perhitungan final setelah verifikasi aset.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <Card className="p-6 gradient-card">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-foreground">
                <span>Nominal Pinjaman</span>
                <span>{formatCurrency(amount)}</span>
              </div>
              <Slider
                min={MIN_AMOUNT}
                max={MAX_AMOUNT}
                step={1000000}
                value={amount}
                onValueChange={setAmount}
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>{formatCurrency(MIN_AMOUNT)}</span>
                <span>{formatCurrency(MAX_AMOUNT)}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-foreground">
                <span>Tenor (bulan)</span>
                <span>{tenor} bulan</span>
              </div>
              <Slider min={MIN_TENOR} max={MAX_TENOR} step={1} value={tenor} onValueChange={setTenor} />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>{MIN_TENOR} bln</span>
                <span>{MAX_TENOR} bln</span>
              </div>
            </div>

            <div className="grid gap-3 rounded-2xl bg-card/80 p-4 shadow-sm border border-border/70 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Estimasi Angsuran</p>
                <p className="text-2xl font-bold text-primary">{formatCurrency(monthlyInstallment)}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Bunga flat: 0.9% / bulan</p>
                <p>Biaya admin bulanan: {formatCurrency(DEFAULT_ADMIN_MONTHLY)}</p>
                <p>Tenor: {formatNumber(tenor)} bulan</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              *Estimasi tidak mengikat. Biaya dapat berbeda sesuai kondisi aset dan lokasi. Untuk perhitungan
              akhir, lengkapi formulir pengajuan.
            </p>
          </div>
        </Card>
      </motion.div>
    </section>
  );
}
