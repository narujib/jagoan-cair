"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Factory,
  Car,
  Bike,
  ScrollText,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import LoanForm from "../LoanForm";
import { cn } from "../../lib/utils";

type FinancingProduct = {
  key: "mobil" | "motor" | "sertifikat" | "industri";
  group: "berjamin" | "lainnya";
  title: string;
  caption: string;
  description: string;
  badge: string;
  icon: LucideIcon;
  items: string[];
  requirements: string[];
  documents: string[];
  examples: string[];
  stats: { label: string; value: string }[];
  defaultType: "motor" | "mobil" | "sertifikat";
  detail: string;
};

const products: FinancingProduct[] = [
  {
    key: "mobil",
    group: "berjamin",
    title: "BPKB Mobil",
    caption: "Limit besar, tenor panjang",
    description:
      "Cair Cepat untuk Kebutuhan Mendesak. Dapatkan pencairan dana tunai hingga 95% dari nilai kendaraan Anda.",
    badge: "Cair s/d 90%*",
    icon: Car,
    items: [
      "Plafon besar sampai 1 miliar",
      "Bunga flat stabil ~0.87%-1.10%/bln",
      "Tanpa biaya admin bulanan",
      "Appraisal cepat",
    ],
    requirements: [
      "Tahun kendaraan minimal 2013",
      "Pajak kendaraan hidup/beres saat proses",
      "Unit milik sendiri atau pasangan (dibuktikan dengan dokumen)",
      "STNK & BPKB asli tersedia",
    ],
    documents: [
      "KTP pemilik/pasangan",
      "BPKB & STNK asli",
      "Fotokopi faktur/kwitansi bila ada",
      "Foto kendaraan dari berbagai sisi",
    ],
    examples: [
      "100 juta / 12 bulan: Rp9.263.500 per bulan",
      "500 juta / 24 bulan: Rp25.448.000 per bulan",
    ],
    stats: [
      { label: "Plafon", value: "Rp100jt - 1M" },
      { label: "Tenor", value: "12-60 bln" },
      { label: "Bunga", value: "Mulai dari 0.9%/bln" },
    ],
    defaultType: "mobil",
    detail:
      "Pendanaan BPKB mobil Rp100 juta sampai Rp1 miliar, tenor 12-60 bulan, bunga flat sekitar 0.87%-1.10%/bulan. Contoh: 100 juta/12 bulan Rp9.263.500 per bulan; 500 juta/24 bulan Rp25.448.000 per bulan. Pajak harus hidup dan tidak ada biaya admin bulanan.",
  },
  {
    key: "motor",
    group: "berjamin",
    title: "BPKB Motor",
    caption: "Ringkas & cepat cair",
    description:
      "Solusi Dana Instan, Proses Simpel. Ajukan pinjaman dengan proses cepat dan persyaratan yang sederhana.",
    badge: "Survey kilat",
    icon: Bike,
    items: [
      "Proses cepat untuk kebutuhan mendesak",
      "Tanpa biaya admin bulanan",
      "Bunga flat kisaran 3.3%-7.9%/bln",
    ],
    requirements: [
      "Tahun motor minimal 2015",
      "Pajak hidup/beres maksimal 2 tahun",
      "STNK & BPKB asli tersedia",
      "Kepemilikan jelas (pemilik atau pasangan)",
    ],
    documents: [
      "KTP pemilik/pasangan",
      "BPKB & STNK asli",
      "Foto unit dari berbagai sisi",
      "Bukti pajak terakhir",
    ],
    examples: [
      "5 juta / 6 bulan: Rp1.226.500 per bulan",
      "15 juta / 18 bulan: Rp1.295.500 per bulan",
    ],
    stats: [
      { label: "Plafon", value: "Rp5jt - 15jt" },
      { label: "Tenor", value: "6-18 bln" },
      { label: "Bunga", value: "Mulai dari 0.9%/bln" },
    ],
    defaultType: "motor",
    detail:
      "Pendanaan BPKB motor Rp5-15 juta, tenor 6-18 bulan, bunga flat sekitar 3.3%-7.9%/bulan. Contoh: 5 juta/6 bulan Rp1.226.500 per bulan; 15 juta/18 bulan Rp1.295.500 per bulan. Unit minimal tahun 2015, pajak hidup, tanpa biaya admin bulanan.",
  },
  {
    key: "sertifikat",
    group: "berjamin",
    title: "Sertifikat",
    caption: "Properti/SHM/SHGB",
    description:
      "Modal Besar, Cicilan Ringan & Panjang. Dapatkan fasilitas pembiayaan dengan nilai pencairan tertinggi.",
    badge: "Prioritas lokasi",
    icon: ScrollText,
    items: [
      "Plafon besar hingga Rp500 juta",
      "Bunga flat kisaran 1.45%-1.75%/bln",
      "Tanpa biaya admin bulanan",
    ],
    requirements: [
      "Sertifikat SHM/KMI/KMS atas nama sendiri/pasangan",
      "Lokasi prioritas Jabodetabek/Jabar",
      "Objek bebas sengketa dan sesuai peruntukan",
      "IMB/PBB membantu validasi",
    ],
    documents: [
      "KTP pemilik/pasangan",
      "Sertifikat asli",
      "IMB/PBB terbaru",
      "Foto bangunan/lahan",
    ],
    examples: [
      "50 juta / 12 bulan: Rp4.892.000 per bulan",
      "300 juta / 48 bulan: Rp11.500.000 per bulan",
    ],
    stats: [
      { label: "Plafon", value: "Rp50jt - 500jt" },
      { label: "Tenor", value: "12-48 bln" },
      { label: "Bunga", value: "Mulai dari 0.9%/bln" },
    ],
    defaultType: "sertifikat",
    detail:
      "Pendanaan sertifikat SHM/KMI/KMS Rp50-500 juta, tenor 12-48 bulan, bunga flat sekitar 1.45%-1.75%/bulan. Contoh: 50 juta/12 bulan Rp4.892.000 per bulan; 300 juta/48 bulan Rp11.500.000 per bulan. Lokasi prioritas Jabodetabek/Jabar, tanpa biaya admin bulanan.",
  },
  {
    key: "industri",
    group: "lainnya",
    title: "Alat Berat & Industri",
    caption: "Pembiayaan proyek",
    description:
      "Dukungan Modal untuk Proyek Skala Besar dan Peningkatan Kapasitas Produksi.",
    badge: "Custom plan",
    icon: Factory,
    items: [
      "Konsultasi teknis dan valuasi aset",
      "Penjadwalan sesuai arus kas proyek",
      "Pendampingan dokumen bisnis",
    ],
    requirements: [
      "Unit/aset industri jelas kepemilikannya",
      "Dokumen pembelian atau kontrak proyek tersedia",
      "Data arus kas atau rencana pembayaran",
    ],
    documents: [
      "KTP pemilik/penanggung jawab",
      "Dokumen kepemilikan aset (faktur/kontrak)",
      "Dokumen bisnis (NIB/NPWP bila ada)",
    ],
    examples: [
      "Simulasi dihitung manual oleh tim sesuai aset dan jadwal proyek.",
    ],
    stats: [
      { label: "Plafon", value: "Menyesuaikan aset" },
      { label: "Tenor", value: "Negosiasi" },
      { label: "Bunga", value: "Khusus proyek" },
    ],
    defaultType: "sertifikat",
    detail:
      "Pendanaan custom untuk alat berat, mesin produksi, atau proyek industri. Plafon, tenor, dan bunga disesuaikan setelah appraisal aset dan rencana arus kas. Tidak ada kalkulator otomatis; simulasi dibuat manual oleh tim.",
  },
];

export default function FinancingSection() {
  const reduceMotion = useReducedMotion() ?? false;
  const [detailProduct, setDetailProduct] = useState<FinancingProduct | null>(
    null
  );
  const [formProduct, setFormProduct] = useState<FinancingProduct | null>(null);
  const detailGroupLabel = detailProduct
    ? detailProduct.group === "berjamin"
      ? "Pembiayaan Berjamin"
      : "Pembiayaan Lainnya"
    : "";
  const DetailIcon = detailProduct?.icon;
  const plafonStat = detailProduct?.stats.find((s) => s.label === "Plafon");
  const tenorStat = detailProduct?.stats.find((s) => s.label === "Tenor");
  const bungaStat = detailProduct?.stats.find((s) => s.label === "Bunga");

  return (
    <section id="pembiayaan" className="space-y-8 scroll-mt-28">
      <div
        className="pointer-events-none absolute -left-24 top-12 h-52 w-52 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-28 bottom-[-80px] h-64 w-64 rounded-full bg-primary/8 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/3 top-1/2 h-80 w-80 rounded-full bg-gradient-to-br from-primary/12 to-accent/8 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-1/4 top-20 h-60 w-60 rounded-full bg-primary/6 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-10 bottom-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Layanan
        </p>
        <h2 className="font-heading text-3xl text-foreground">
          Layanan Pembiayaan
        </h2>
        <p className="text-muted-foreground">
          Skema angsuran transparan. Pilih yang sesuai, lihat detail di modal,
          lalu ajukan langsung.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {products.map((product, idx) => (
          <ProductCard
            key={product.key}
            product={product}
            reduceMotion={reduceMotion}
            delay={idx * 0.05}
            onDetail={() => setDetailProduct(product)}
            onApply={() => setFormProduct(product)}
          />
        ))}
      </div>

      <Modal
        open={Boolean(detailProduct)}
        onClose={() => setDetailProduct(null)}
        title={detailProduct?.title}
        description="Rangkuman cakupan pembiayaan dan dokumen awal yang disarankan."
      >
        {detailProduct ? (
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-foreground">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                {DetailIcon ? <DetailIcon size={28} strokeWidth={1.6} /> : null}
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                  {detailGroupLabel}
                </p>
                <p className="text-lg font-semibold">{detailProduct.title}</p>
                <p className="text-xs text-muted-foreground">
                  {detailProduct.caption}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
              {detailProduct.stats.map((stat) => (
                <span
                  key={stat.label}
                  className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-primary"
                >
                  {stat.label}: {stat.value}
                </span>
              ))}
            </div>

            <div className="rounded-2xl border border-border/70 bg-muted/60 p-4 text-sm text-foreground shadow-sm">
              <p className="font-semibold">Ringkasan singkat</p>
              <p className="mt-1 text-muted-foreground">
                Pengajuan {detailProduct.title.toLowerCase()} dengan plafon{" "}
                {plafonStat?.value ?? "sesuai aset"}, tenor{" "}
                {tenorStat?.value ?? "-"}, bunga {bungaStat?.value ?? "-"},
                tanpa biaya admin bulanan. Siapkan KTP, bukti kepemilikan aset,
                dan dokumen pajak/sertifikat agar appraisal cepat.
              </p>
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.1fr,0.9fr]">
              <div className="rounded-2xl border border-border/70 bg-card p-5 text-foreground shadow-sm">
                <p className="text-sm font-semibold text-foreground">
                  Detail pembiayaan
                </p>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {detailProduct.detail}
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/60 bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
                    Bebas biaya admin bulanan & estimasi angsuran mengikuti
                    tabel simulasi resmi.
                  </div>
                  <div className="rounded-xl border border-border/60 bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
                    Proses dimulai dari verifikasi dokumen, appraisal aset, lalu
                    penawaran final via tim kami.
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
                <p className="text-sm font-semibold text-foreground">
                  Contoh angsuran
                </p>
                <ul className="mt-3 grid gap-2 text-foreground">
                  {detailProduct.examples.map((ex) => (
                    <li
                      key={ex}
                      className="flex items-start gap-2 rounded-lg border border-border/60 bg-muted/60 px-3 py-2 text-sm leading-snug"
                    >
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-semibold text-primary">
                  Semua simulasi bebas biaya admin bulanan.
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
                <p className="text-sm font-semibold text-foreground">
                  Keunggulan
                </p>
                <ul className="mt-3 grid gap-2">
                  {detailProduct.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 rounded-lg border border-border/60 bg-muted/60 px-3 py-2 text-sm leading-snug"
                    >
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
                <p className="text-sm font-semibold text-foreground">
                  Syarat utama
                </p>
                <ul className="mt-3 grid gap-2">
                  {detailProduct.requirements.map((req) => (
                    <li
                      key={req}
                      className="flex items-start gap-2 rounded-lg border border-border/60 bg-muted/60 px-3 py-2 text-sm leading-snug"
                    >
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span className="text-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
                <p className="text-sm font-semibold text-foreground">
                  Dokumen awal
                </p>
                <ul className="mt-3 grid gap-2">
                  {detailProduct.documents.map((doc) => (
                    <li
                      key={doc}
                      className="flex items-start gap-2 rounded-lg border border-border/60 bg-muted/60 px-3 py-2 text-sm leading-snug"
                    >
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span className="text-foreground">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-xl border border-primary/30 bg-primary/10 p-3 text-xs text-foreground shadow-sm">
              Siapkan KTP, dokumen kepemilikan aset, serta foto unit bila ada
              untuk mempercepat appraisal. Tim kami akan memandu detail dokumen
              saat konsultasi.
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal
        open={Boolean(formProduct)}
        onClose={() => setFormProduct(null)}
        title={
          formProduct ? `Ajukan ${formProduct.title}` : "Ajukan Pembiayaan"
        }
        description="Isi data singkat, lalu kami arahkan ke WhatsApp untuk verifikasi cepat."
        className="max-w-4xl"
      >
        <div className="rounded-2xl border border-border/70 bg-muted/40 p-4 text-xs text-muted-foreground">
          Isi sesuai dokumen. Kami akan menyesuaikan skema sesuai aset{" "}
          {formProduct?.title.toLowerCase() ?? "Anda"}.
        </div>
        <div className="mt-4">
          <LoanForm
            defaultType={
              (formProduct?.defaultType as "motor" | "mobil" | "sertifikat") ??
              "mobil"
            }
            onSubmitted={() => setFormProduct(null)}
          />
        </div>
      </Modal>
    </section>
  );
}

type ProductCardProps = {
  product: FinancingProduct;
  reduceMotion: boolean;
  delay?: number;
  onDetail: () => void;
  onApply: () => void;
};

function ProductCard({
  product,
  reduceMotion,
  delay = 0,
  onDetail,
  onApply,
}: ProductCardProps) {
  const Icon = product.icon;
  const groupLabel =
    product.group === "berjamin" ? "Pembiayaan Berjamin" : "Pembiayaan Lainnya";
  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <Card
        className={cn(
          "relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-primary/15 bg-white/90 p-5 shadow-[0_16px_70px_rgba(18,36,120,0.12)] backdrop-blur",
          "transition hover:-translate-y-1 hover:shadow-[0_20px_80px_rgba(18,36,120,0.18)]"
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/8 via-white/80 to-primary/5"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -top-8 -right-8 h-16 w-16 rounded-full bg-primary/10 blur-xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-6 -left-6 h-12 w-12 rounded-full bg-accent/12 blur-lg"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute top-1/2 left-1/4 h-8 w-8 rounded-full bg-primary/8 blur-md"
          aria-hidden
        />
        <div className="absolute right-4 top-4 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
          {product.badge}
        </div>
        <div className="flex items-start gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-primary/15">
            <Icon size={26} strokeWidth={1.6} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-muted-foreground">
              {groupLabel}
            </p>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground">
                {product.title}
              </h3>
              <span className="text-primary" aria-hidden>
                <ChevronRight size={16} />
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{product.caption}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">{product.description}</p>

        <div className="grid grid-cols-3 gap-2 text-xs">
          {product.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-primary/15 bg-white/80 px-2 py-2 text-center shadow-sm"
            >
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </p>
              <p className="font-semibold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={onDetail}
          >
            Pelajari Produk
          </Button>
          <Button size="sm" className="w-full" onClick={onApply}>
            Ajukan Sekarang
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
