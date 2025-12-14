'use client';

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Slider } from "../ui/slider";
import { Card } from "../ui/card";
import { Tabs } from "../ui/tabs";
import { cn, formatCurrency, formatNumber } from "../../lib/utils";
import { trackEvent } from "../../lib/analytics";

const calculators = {
  mobil: {
    label: "Mobil",
    description: "Pendanaan berbasis BPKB mobil dengan plafon tinggi dan tenor terstruktur.",
    minAmount: 100_000_000,
    maxAmount: 1_000_000_000,
    defaultAmount: 250_000_000,
    step: 50_000_000,
    tenors: [12, 24, 36, 48, 60],
    rate: 0.009,
    admin: 150_000
  },
  motor: {
    label: "Motor",
    description: "Solusi pinjaman ringan berbasis BPKB motor dengan tenor ringkas.",
    minAmount: 5_000_000,
    maxAmount: 15_000_000,
    defaultAmount: 10_000_000,
    step: 500_000,
    tenors: [6, 12, 18],
    rate: 0.009,
    admin: 150_000
  },
  sertifikat: {
    label: "SHM/KMI/KMS",
    description: "Pembiayaan menggunakan agunan sertifikat SHM/KMI/KMS dengan tenor moderat.",
    minAmount: 50_000_000,
    maxAmount: 500_000_000,
    defaultAmount: 200_000_000,
    step: 25_000_000,
    tenors: [12, 24, 36, 48],
    rate: 0.009,
    admin: 150_000
  }
} as const;

type CalculatorKey = keyof typeof calculators;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function SimulatorSection() {
  const reduceMotion = useReducedMotion();
  const [activeCalculator, setActiveCalculator] = useState<CalculatorKey>("mobil");
  const [amounts, setAmounts] = useState<Record<CalculatorKey, number>>({
    mobil: calculators.mobil.defaultAmount,
    motor: calculators.motor.defaultAmount,
    sertifikat: calculators.sertifikat.defaultAmount
  });
  const [tenors, setTenors] = useState<Record<CalculatorKey, number>>({
    mobil: calculators.mobil.tenors[0],
    motor: calculators.motor.tenors[0],
    sertifikat: calculators.sertifikat.tenors[0]
  });

  const config = calculators[activeCalculator];
  const amount = amounts[activeCalculator];
  const tenor = tenors[activeCalculator];

  useEffect(() => {
    trackEvent("simulator_change", { calculator: activeCalculator, amount, tenor });
  }, [activeCalculator, amount, tenor]);

  const handleCalculatorChange = (key: CalculatorKey) => {
    setActiveCalculator(key);
    trackEvent("simulator_tab_change", { calculator: key });
  };

  const handleAmountChange = (value: number) => {
    const clamped = clamp(value, config.minAmount, config.maxAmount);
    setAmounts((prev) => ({ ...prev, [activeCalculator]: clamped }));
  };

  const handleTenorChange = (value: number) => {
    setTenors((prev) => ({ ...prev, [activeCalculator]: value }));
    trackEvent("tenor_change", { calculator: activeCalculator, tenor: value });
  };

  const monthlyInstallment = (amount + amount * config.rate * tenor) / tenor + config.admin;
  const rateDisplay =
    (config.rate * 100) % 1 === 0 ? (config.rate * 100).toFixed(0) : (config.rate * 100).toFixed(1);

  return (
    <section id="simulator" className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Simulasi</p>
        <h2 className="font-heading text-3xl text-foreground">Simulasi Pinjaman Transparan</h2>
        <p className="text-muted-foreground">
          Pilih kalkulator sesuai jenis agunan. Sesuaikan nominal dan tenor dalam batas yang tersedia untuk
          melihat estimasi angsuran awal sebelum proses verifikasi kami.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <Card className="p-6 gradient-card">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Jenis kalkulator</p>
              <h3 className="text-2xl font-bold text-foreground">{config.label}</h3>
              <p className="text-sm text-muted-foreground">{config.description}</p>
            </div>
            <Tabs
              tabs={Object.entries(calculators).map(([value, data]) => ({
                value,
                label: data.label
              }))}
              value={activeCalculator}
              onChange={(value) => handleCalculatorChange(value as CalculatorKey)}
              className="mx-auto sm:mx-0"
            />
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-foreground">
                <span>Nominal Pinjaman</span>
                <span>{formatCurrency(amount)}</span>
              </div>
              <Slider
                min={config.minAmount}
                max={config.maxAmount}
                step={config.step}
                value={amount}
                onValueChange={handleAmountChange}
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>{formatCurrency(config.minAmount)}</span>
                <span>{formatCurrency(config.maxAmount)}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm font-semibold text-foreground">
                <span>Tenor (bulan)</span>
                <span>{tenor} bulan</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {config.tenors.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={cn(
                      "rounded-full border px-3 py-2 text-sm font-semibold transition",
                      option === tenor
                        ? "bg-primary text-primary-foreground border-primary shadow"
                        : "border-border text-foreground hover:bg-muted"
                    )}
                    onClick={() => handleTenorChange(option)}
                  >
                    {option} bln
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 rounded-2xl bg-card/80 p-4 shadow-sm border border-border/70 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Estimasi Angsuran</p>
                <p className="text-2xl font-bold text-primary">{formatCurrency(monthlyInstallment)}</p>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Bunga flat: {rateDisplay}% / bulan</p>
                <p>Biaya admin bulanan: {formatCurrency(config.admin)}</p>
                <p>Tenor: {formatNumber(tenor)} bulan</p>
                <p>
                  Batas plafon: {formatCurrency(config.minAmount)} - {formatCurrency(config.maxAmount)}
                </p>
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
