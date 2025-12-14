"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Slider } from "../ui/slider";
import { Card } from "../ui/card";
import { Tabs } from "../ui/tabs";
import { cn, formatCurrency, formatNumber } from "../../lib/utils";
import { trackEvent } from "../../lib/analytics";

type RateTable = Record<number, Record<number, number>>;
type InstallmentTable = Record<number, Record<number, number>>;

type CalculatorConfig = {
  label: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  defaultAmount: number;
  step: number;
  tenors: number[];
  rate?: number;
  installmentTable?: InstallmentTable;
  rateTable?: RateTable;
};

type CalculatorKey = "mobil" | "motor" | "sertifikat";

const mobilInstallmentTable: InstallmentTable = {
  100_000_000: {
    12: 9_263_500,
    24: 5_090_000,
    36: 3_716_500,
    48: 3_097_000,
    60: 2_762_000,
  },
  150_000_000: {
    12: 13_895_500,
    24: 7_634_500,
    36: 5_575_000,
    48: 4_645_000,
    60: 4_143_000,
  },
  200_000_000: {
    12: 18_527_000,
    24: 10_179_500,
    36: 7_433_000,
    48: 6_193_500,
    60: 5_524_000,
  },
  250_000_000: {
    12: 23_159_000,
    24: 12_724_000,
    36: 9_291_000,
    48: 7_741_500,
    60: 6_905_000,
  },
  300_000_000: {
    12: 27_790_500,
    24: 15_269_000,
    36: 11_149_500,
    48: 9_290_000,
    60: 8_286_000,
  },
  350_000_000: {
    12: 32_422_500,
    24: 17_814_000,
    36: 13_007_500,
    48: 10_838_000,
    60: 9_667_000,
  },
  400_000_000: {
    12: 37_054_000,
    24: 20_358_500,
    36: 14_865_500,
    48: 12_386_500,
    60: 11_048_000,
  },
  450_000_000: {
    12: 41_686_000,
    24: 22_903_500,
    36: 16_724_000,
    48: 13_935_000,
    60: 12_429_000,
  },
  500_000_000: {
    12: 46_317_500,
    24: 25_448_000,
    36: 18_582_000,
    48: 15_483_000,
    60: 13_809_500,
  },
  550_000_000: {
    12: 50_686_500,
    24: 27_725_000,
    36: 20_161_000,
    48: 16_737_000,
    60: 14_879_500,
  },
  600_000_000: {
    12: 55_294_000,
    24: 30_245_500,
    36: 21_994_000,
    48: 18_258_500,
    60: 16_232_500,
  },
  650_000_000: {
    12: 59_902_000,
    24: 32_766_000,
    36: 23_826_500,
    48: 19_780_000,
    60: 17_585_000,
  },
  700_000_000: {
    12: 64_510_000,
    24: 35_286_500,
    36: 25_659_500,
    48: 21_301_500,
    60: 18_937_500,
  },
  750_000_000: {
    12: 69_117_500,
    24: 37_806_500,
    36: 27_492_500,
    48: 22_823_000,
    60: 20_290_500,
  },
  800_000_000: {
    12: 73_725_500,
    24: 40_327_000,
    36: 29_325_000,
    48: 24_344_500,
    60: 21_643_000,
  },
  850_000_000: {
    12: 78_333_500,
    24: 42_847_500,
    36: 31_990_500,
    48: 25_866_000,
    60: 22_995_500,
  },
  900_000_000: {
    12: 82_941_000,
    24: 45_368_000,
    36: 32_990_500,
    48: 27_387_500,
    60: 24_348_500,
  },
  950_000_000: {
    12: 87_549_000,
    24: 47_888_500,
    36: 34_823_500,
    48: 28_909_000,
    60: 25_701_000,
  },
  1_000_000_000: {
    12: 91_580_000,
    24: 49_924_500,
    36: 36_152_500,
    48: 29_900_500,
    60: 26_701_000,
  },
};

const motorInstallmentTable: InstallmentTable = {
  5_000_000: { 6: 1_226_500, 12: 6_250_000, 18: 4_755_000 },
  5_500_000: { 6: 1_323_500, 12: 679_000, 18: 517_000 },
  6_000_000: { 6: 1_421_500, 12: 733_000, 18: 558_000 },
  6_500_000: { 6: 1_518_000, 12: 787_500, 18: 598_000 },
  7_000_000: { 6: 1_616_000, 12: 841_000, 18: 639_500 },
  7_500_000: { 6: 1_712_500, 12: 898_500, 18: 681_500 },
  8_000_000: { 6: 1_810_500, 12: 952_500, 18: 722_500 },
  8_500_000: { 6: 1_907_500, 12: 1_007_000, 18: 763_000 },
  9_000_000: { 6: 2_005_500, 12: 1_060_500, 18: 804_000 },
  9_500_000: { 6: 2_102_000, 12: 1_115_000, 18: 844_500 },
  10_000_000: { 6: 2_200_000, 12: 1_168_500, 18: 885_500 },
  10_500_000: { 6: 2_296_500, 12: 1_223_000, 18: 926_000 },
  11_000_000: { 6: 2_394_500, 12: 1_277_500, 18: 967_500 },
  11_500_000: { 6: 2_491_000, 12: 1_331_000, 18: 1_008_000 },
  12_000_000: { 6: 2_589_000, 12: 1_385_500, 18: 1_049_000 },
  12_500_000: { 6: 2_686_000, 12: 1_439_000, 18: 1_089_000 },
  13_000_000: { 6: 2_784_000, 12: 1_493_500, 18: 1_131_500 },
  13_500_000: { 6: 2_880_500, 12: 1_547_500, 18: 1_171_500 },
  14_000_000: { 6: 2_983_000, 12: 1_604_000, 18: 1_215_000 },
  14_500_000: { 6: 3_079_500, 12: 1_658_000, 18: 1_255_000 },
  15_000_000: { 6: 3_176_000, 12: 1_711_500, 18: 1_295_500 },
};

const sertifikatInstallmentTable: InstallmentTable = {
  50_000_000: { 12: 4_892_000, 24: 2_859_000, 36: 2_214_000, 48: 1_917_000 },
  75_000_000: { 12: 7_338_000, 24: 4_288_000, 36: 3_321_000, 48: 2_875_000 },
  100_000_000: { 12: 9_784_000, 24: 5_717_000, 36: 4_428_000, 48: 3_834_000 },
  125_000_000: { 12: 12_230_000, 24: 7_146_000, 36: 5_535_000, 48: 4_792_000 },
  150_000_000: { 12: 14_675_000, 24: 8_575_000, 36: 6_642_000, 48: 5_750_000 },
  175_000_000: { 12: 17_121_000, 24: 10_005_000, 36: 7_749_000, 48: 6_709_000 },
  200_000_000: { 12: 19_567_000, 24: 11_434_000, 36: 8_856_000, 48: 7_667_000 },
  225_000_000: { 12: 22_013_000, 24: 12_863_000, 36: 9_963_000, 48: 8_625_000 },
  250_000_000: {
    12: 24_459_000,
    24: 14_292_000,
    36: 11_070_000,
    48: 9_584_000,
  },
  275_000_000: {
    12: 26_905_000,
    24: 15_721_000,
    36: 12_177_000,
    48: 10_542_000,
  },
  300_000_000: {
    12: 29_350_000,
    24: 17_150_000,
    36: 13_284_000,
    48: 11_500_000,
  },
  325_000_000: {
    12: 31_796_000,
    24: 18_580_000,
    36: 14_391_000,
    48: 12_459_000,
  },
  350_000_000: {
    12: 34_242_000,
    24: 20_009_000,
    36: 15_498_000,
    48: 13_417_000,
  },
  375_000_000: {
    12: 36_688_000,
    24: 21_438_000,
    36: 16_605_000,
    48: 14_375_000,
  },
  400_000_000: {
    12: 39_134_000,
    24: 22_867_000,
    36: 17_712_000,
    48: 15_334_000,
  },
  425_000_000: {
    12: 41_580_000,
    24: 24_296_000,
    36: 18_819_000,
    48: 16_292_000,
  },
  450_000_000: {
    12: 44_925_000,
    24: 25_725_000,
    36: 19_925_000,
    48: 17_250_000,
  },
  475_000_000: {
    12: 46_471_000,
    24: 27_155_000,
    36: 21_032_000,
    48: 18_209_000,
  },
  500_000_000: {
    12: 48_917_000,
    24: 28_584_000,
    36: 22_139_000,
    48: 19_167_000,
  },
};

const calculators: Record<CalculatorKey, CalculatorConfig> = {
  mobil: {
    label: "BPKB Mobil",
    description:
      "Pendanaan berbasis BPKB mobil dengan plafon tinggi dan tenor terstruktur.",
    minAmount: 100_000_000,
    maxAmount: 1_000_000_000,
    defaultAmount: 250_000_000,
    step: 50_000_000,
    tenors: [12, 24, 36, 48, 60],
    installmentTable: mobilInstallmentTable,
  },
  motor: {
    label: "BPKB Motor",
    description:
      "Solusi pinjaman ringan berbasis BPKB motor dengan tenor ringkas.",
    minAmount: 5_000_000,
    maxAmount: 15_000_000,
    defaultAmount: 10_000_000,
    step: 500_000,
    tenors: [6, 12, 18],
    rate: 0.009,
    installmentTable: motorInstallmentTable,
  },
  sertifikat: {
    label: "Sertifikat",
    description:
      "Pembiayaan menggunakan agunan sertifikat SHM/KMI/KMS dengan tenor moderat.",
    minAmount: 50_000_000,
    maxAmount: 500_000_000,
    defaultAmount: 200_000_000,
    step: 25_000_000,
    tenors: [12, 24, 36, 48],
    rate: 0.009,
    installmentTable: sertifikatInstallmentTable,
  },
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const getRate = (config: CalculatorConfig, amount: number, tenor: number) => {
  if (config.rateTable) {
    const directRate = config.rateTable[amount]?.[tenor];
    if (directRate !== undefined) return directRate;

    const amounts = Object.keys(config.rateTable).map(Number);
    if (amounts.length) {
      const closestAmount = amounts.reduce((prev, curr) =>
        Math.abs(curr - amount) < Math.abs(prev - amount) ? curr : prev
      );
      const closestRate = config.rateTable[closestAmount]?.[tenor];
      if (closestRate !== undefined) return closestRate;
    }
  }

  return config.rate ?? 0;
};

const getInstallment = (
  config: CalculatorConfig,
  amount: number,
  tenor: number,
  rate: number
) => {
  if (config.installmentTable) {
    const directInstallment = config.installmentTable[amount]?.[tenor];
    if (directInstallment !== undefined) return directInstallment;

    const amounts = Object.keys(config.installmentTable).map(Number);
    if (amounts.length) {
      const closestAmount = amounts.reduce((prev, curr) =>
        Math.abs(curr - amount) < Math.abs(prev - amount) ? curr : prev
      );
      const closestInstallment =
        config.installmentTable[closestAmount]?.[tenor];
      if (closestInstallment !== undefined) return closestInstallment;
    }
  }

  return tenor > 0 ? (amount + amount * rate * tenor) / tenor : 0;
};

const formatRate = (rate: number) => {
  const percentage = rate * 100;
  const decimals = percentage >= 1 ? 3 : 2;
  const trimmed = parseFloat(percentage.toFixed(decimals));
  return trimmed.toString();
};

export default function SimulatorSection() {
  const reduceMotion = useReducedMotion();
  const [activeCalculator, setActiveCalculator] =
    useState<CalculatorKey>("mobil");
  const [amounts, setAmounts] = useState<Record<CalculatorKey, number>>({
    mobil: calculators.mobil.defaultAmount,
    motor: calculators.motor.defaultAmount,
    sertifikat: calculators.sertifikat.defaultAmount,
  });
  const [tenors, setTenors] = useState<Record<CalculatorKey, number>>({
    mobil: calculators.mobil.tenors[0],
    motor: calculators.motor.tenors[0],
    sertifikat: calculators.sertifikat.tenors[0],
  });

  const config = calculators[activeCalculator];
  const amount = amounts[activeCalculator];
  const tenor = tenors[activeCalculator];
  const minTenor = config.tenors[0];
  const maxTenor = config.tenors[config.tenors.length - 1];

  useEffect(() => {
    trackEvent("simulator_change", {
      calculator: activeCalculator,
      amount,
      tenor,
    });
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

  const rate = getRate(config, amount, tenor);
  const monthlyInstallment = getInstallment(config, amount, tenor, rate);
  const totalPayment = monthlyInstallment * tenor;
  const totalInterest = Math.max(0, totalPayment - amount);
  const derivedRate =
    config.installmentTable && tenor > 0 && amount > 0
      ? Math.max(0, ((monthlyInstallment * tenor) / amount - 1) / tenor)
      : rate;
  const rateDisplay = formatRate(derivedRate);

  return (
    <section
      id="simulator"
      className="space-y-6 scroll-mt-[18rem] md:scroll-mt-28"
    >
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Simulasi
        </p>
        <h2 className="font-heading text-3xl text-foreground">
          Simulasi Pinjaman Transparan
        </h2>
        <p className="text-muted-foreground">
          Pilih kalkulator sesuai jenis agunan. Sesuaikan nominal dan tenor
          dalam batas yang tersedia untuk melihat estimasi angsuran awal sebelum
          proses verifikasi kami.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <Card className="p-6 gradient-card border border-border/70 shadow-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-foreground">
                {config.label}
              </h3>
              <p className="text-sm text-muted-foreground">
                {config.description}
              </p>
            </div>
            <Tabs
              tabs={Object.entries(calculators).map(([value, data]) => ({
                value,
                label: data.label,
              }))}
              value={activeCalculator}
              onChange={(value) =>
                handleCalculatorChange(value as CalculatorKey)
              }
              className="mx-auto sm:mx-0"
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-muted-foreground">
            <span className="rounded-full bg-background/70 px-3 py-1 text-foreground shadow-sm">
              Plafon {formatCurrency(config.minAmount)} -{" "}
              {formatCurrency(config.maxAmount)}
            </span>
            <span className="rounded-full bg-background/70 px-3 py-1 text-foreground shadow-sm">
              Tenor {formatNumber(minTenor)} - {formatNumber(maxTenor)} bln
            </span>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-4">
              <div className="rounded-2xl border border-border/70 bg-background/70 p-4 shadow-sm">
                <div className="flex items-center justify-between text-sm font-semibold text-foreground">
                  <span>Nominal Pinjaman</span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                    {formatCurrency(amount)}
                  </span>
                </div>
                <div className="mt-3">
                  <Slider
                    min={config.minAmount}
                    max={config.maxAmount}
                    step={config.step}
                    value={amount}
                    onValueChange={handleAmountChange}
                  />
                  <div className="mt-2 grid grid-cols-2 text-xs text-muted-foreground">
                    <span>Min {formatCurrency(config.minAmount)}</span>
                    <span className="text-right">
                      Maks {formatCurrency(config.maxAmount)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/70 bg-background/70 p-4 shadow-sm">
                <div className="flex items-center justify-between text-sm font-semibold text-foreground">
                  <span>Tenor (bulan)</span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground">
                    {tenor} bln dipilih
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {config.tenors.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={cn(
                        "rounded-full border px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
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
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-5 shadow-lg">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Angsuran per bulan
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {formatCurrency(monthlyInstallment)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Estimasi tanpa biaya admin
                  </p>
                </div>
                <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                  Bunga flat {rateDisplay}%/bln
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-border/60 bg-background/70 p-3 shadow-sm">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Total bunga tenor
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {formatCurrency(totalInterest)}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Dari pokok {formatCurrency(amount)}
                  </p>
                </div>
                <div className="rounded-xl border border-border/60 bg-background/70 p-3 shadow-sm">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Total bayar
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    {formatCurrency(totalPayment)}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Termasuk pokok dan bunga
                  </p>
                </div>
              </div>

              <div className="grid gap-2 rounded-xl border border-border/60 bg-background/60 p-3 text-sm text-foreground">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tenor</span>
                  <span className="font-semibold">
                    {formatNumber(tenor)} bulan
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Nominal pokok</span>
                  <span className="font-semibold">
                    {formatCurrency(amount)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            *Estimasi tidak mengikat. Biaya dapat berbeda sesuai kondisi aset
            dan lokasi. Untuk perhitungan akhir, lengkapi formulir pengajuan.
          </p>
        </Card>
      </motion.div>
    </section>
  );
}
