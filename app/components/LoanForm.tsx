'use client';

import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { submitLoan } from "../actions/submitLoan";
import { leadSchema } from "../lib/validation";
import { formatCurrency } from "../lib/utils";
import { trackEvent } from "../lib/analytics";
import { contact } from "../config/contact";

const formSchema = leadSchema;
type FormValues = z.infer<typeof formSchema>;

type LoanFormProps = {
  defaultType?: FormValues["tipe"];
  onSubmitted?: () => void;
};

export default function LoanForm({ defaultType = "mobil", onSubmitted }: LoanFormProps) {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      nama: "",
      tipe: defaultType,
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

  useEffect(() => {
    form.setValue("tipe", defaultType);
  }, [defaultType, form]);

  async function onSubmit(values: FormValues) {
    setStatus(null);
    const adminPhone = contact.whatsapp.number;
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

      if (typeof window !== "undefined") {
        window.open(waUrl, "_blank", "noopener,noreferrer");
      }

      const result = await insertPromise;
      if (result && !result.success) {
        setStatus(result.error || "Data tidak tersimpan, lanjutkan chat via WhatsApp.");
      } else {
        setStatus("Pengajuan terkirim. Tim kami akan menghubungi via WhatsApp.");
        onSubmitted?.();
      }
      trackEvent("submit_lead", { status: result?.success ? "success" : "fail" });
    });
  }

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="nama">Nama Lengkap</Label>
        <Input id="nama" placeholder="Nama sesuai KTP" {...form.register("nama")} />
        {form.formState.errors.nama && (
          <p className="text-xs text-destructive">{form.formState.errors.nama.message}</p>
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
          <p className="text-xs text-destructive">{form.formState.errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tipe">Jenis Jaminan</Label>
        <Controller
          name="tipe"
          control={form.control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="tipe" onBlur={field.onBlur} aria-label="Jenis Jaminan">
                <SelectValue placeholder="Pilih jenis jaminan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="motor">BPKB Motor</SelectItem>
                <SelectItem value="mobil">BPKB Mobil</SelectItem>
                <SelectItem value="sertifikat">Sertifikat Rumah/Tanah</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {form.formState.errors.tipe && (
          <p className="text-xs text-destructive">{form.formState.errors.tipe.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="unit">Merk / Tahun Kendaraan atau Detail Aset</Label>
        <Input id="unit" placeholder="Contoh: Toyota Avanza 2019" {...form.register("unit")} />
        {form.formState.errors.unit && (
          <p className="text-xs text-destructive">{form.formState.errors.unit.message}</p>
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
          <p className="text-xs text-destructive">{form.formState.errors.nominal.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="source">Sumber Lead (opsional)</Label>
        <Input id="source" placeholder="landing / ads" {...form.register("source")} />
      </div>

      <div className="md:col-span-2 rounded-xl bg-primary/10 p-4">
        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border border-input accent-primary focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-background"
            {...form.register("consent")}
          />
          <span>
            Saya setuju data disimpan sesuai Kebijakan Privasi dan akan dihapus otomatis dalam 90 hari.
            Pengajuan akan diarahkan ke WhatsApp untuk konfirmasi lebih lanjut.
          </span>
        </label>
        {form.formState.errors.consent && (
          <p className="mt-1 text-xs text-destructive">{form.formState.errors.consent.message}</p>
        )}
      </div>

      <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-muted-foreground">
          Dengan klik kirim, data dicatat di Supabase sebagai backup jika chat tidak terkirim. Estimasi tidak
          mengikat, verifikasi diperlukan.
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="submit" size="lg" disabled={isPending || !form.formState.isValid}>
            {isPending ? "Mengirim..." : "Kirim via WhatsApp"}
          </Button>
          <Button variant="ghost" size="lg" asChild href={contact.phone.tel}>
            Hubungi via Telepon
          </Button>
        </div>
      </div>
      {status && <p className="md:col-span-2 text-sm text-primary">{status}</p>}
    </form>
  );
}
