'use client';

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { submitLoan } from "../../actions/submitLoan";
import { leadSchema } from "../../lib/validation";
import { formatCurrency } from "../../lib/utils";
import { trackEvent } from "../../lib/analytics";

const formSchema = leadSchema;

type FormValues = z.infer<typeof formSchema>;

export default function FormSection() {
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      nama: "",
      tipe: "mobil",
      unit: "",
      nominal: 15000000,
      phone: "62",
      source: "landing",
      consent: true
    }
  });

  useEffect(() => {
    const utmSource = searchParams.get("utm_source") || undefined;
    const utmMedium = searchParams.get("utm_medium") || undefined;
    const utmCampaign = searchParams.get("utm_campaign") || undefined;
    if (utmSource) form.setValue("utm_source", utmSource);
    if (utmMedium) form.setValue("utm_medium", utmMedium);
    if (utmCampaign) form.setValue("utm_campaign", utmCampaign);
  }, [searchParams, form]);

  async function onSubmit(values: FormValues) {
    setStatus(null);
    const adminPhone = process.env.NEXT_PUBLIC_WA_NUMBER || "6281234567890";
    const message =
      `Halo Admin, saya mau ajukan pinjaman.\n\n` +
      `Nama: ${values.nama}\n` +
      `Jaminan: ${values.tipe}\n` +
      `Unit: ${values.unit}\n` +
      `Nominal: ${formatCurrency(values.nominal)}\n` +
      `Telepon: ${values.phone}\n\n` +
      `Mohon infonya.`;
    const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;

    startTransition(async () => {
      const insertPromise = submitLoan(values).catch((error) => {
        console.error(error);
        const fail = { success: false as const, error: "Data tidak tersimpan, lanjut ke WhatsApp." };
        setStatus(fail.error);
        trackEvent("submit_lead_error", { error: (error as Error).message });
        return fail;
      });

      // Redirect segera supaya user tidak menunggu.
      if (typeof window !== "undefined") {
        window.open(waUrl, "_blank", "noopener,noreferrer");
      }

      const result = await insertPromise;
      if (result && !result.success) {
        setStatus(result.error || "Data tidak tersimpan, lanjutkan chat via WhatsApp.");
      } else {
        setStatus("Pengajuan terkirim. Tim kami akan menghubungi via WhatsApp.");
      }
      trackEvent("submit_lead", { status: result?.success ? "success" : "fail" });
    });
  }

  return (
    <section id="form" className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">Formulir</p>
        <h2 className="font-heading text-3xl text-emerald-900">Ajukan dalam 1 Menit</h2>
        <p className="text-slate-600">
          Isi data singkat. Data disimpan aman di Supabase, lalu Anda diarahkan ke WhatsApp untuk
          verifikasi cepat.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 20, scale: reduceMotion ? 1 : 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <Card className="p-6">
          <form className="grid gap-4 md:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="nama">Nama Lengkap</Label>
              <Input id="nama" placeholder="Nama sesuai KTP" {...form.register("nama")} />
              {form.formState.errors.nama && (
                <p className="text-xs text-red-600">{form.formState.errors.nama.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon (diawali 62)</Label>
              <Input
                id="phone"
                placeholder="62xxxxxxxxxxx"
                inputMode="numeric"
                {...form.register("phone")}
              />
              {form.formState.errors.phone && (
                <p className="text-xs text-red-600">{form.formState.errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipe">Jenis Jaminan</Label>
              <Select id="tipe" {...form.register("tipe")}>
                <option value="motor">BPKB Motor</option>
                <option value="mobil">BPKB Mobil</option>
                <option value="sertifikat">Sertifikat Rumah/Tanah</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Merk / Tahun Kendaraan atau Detail Aset</Label>
              <Input id="unit" placeholder="Contoh: Toyota Avanza 2019" {...form.register("unit")} />
              {form.formState.errors.unit && (
                <p className="text-xs text-red-600">{form.formState.errors.unit.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nominal">Nominal yang Diajukan (Rp)</Label>
              <Input
                id="nominal"
                type="number"
                min={1000000}
                step={1000000}
                {...form.register("nominal", { valueAsNumber: true })}
              />
              {form.formState.errors.nominal && (
                <p className="text-xs text-red-600">{form.formState.errors.nominal.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">Sumber Lead (opsional)</Label>
              <Input id="source" placeholder="landing / ads" {...form.register("source")} />
            </div>

            <div className="md:col-span-2 rounded-xl bg-emerald-900/5 p-4">
              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-emerald-900/30 text-emerald-800 focus:ring-emerald-800"
                  {...form.register("consent")}
                />
                <span>
                  Saya setuju data disimpan sesuai Kebijakan Privasi dan akan dihapus otomatis dalam 90
                  hari. Pengajuan akan diarahkan ke WhatsApp untuk konfirmasi lebih lanjut.
                </span>
              </label>
              {form.formState.errors.consent && (
                <p className="mt-1 text-xs text-red-600">{form.formState.errors.consent.message}</p>
              )}
            </div>

            <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-slate-500">
                Dengan klik kirim, data dicatat di Supabase sebagai backup jika chat tidak terkirim. Estimasi
                tidak mengikat, verifikasi diperlukan.
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="submit" size="lg" disabled={isPending || !form.formState.isValid}>
                  {isPending ? "Mengirim..." : "Kirim via WhatsApp"}
                </Button>
                <Button variant="ghost" size="lg" asChild href="tel:+6281234567890">
                  Hubungi via Telepon
                </Button>
              </div>
            </div>
          </form>

          {status && <p className="mt-4 text-sm text-emerald-800">{status}</p>}
        </Card>
      </motion.div>
    </section>
  );
}
