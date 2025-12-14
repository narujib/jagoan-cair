"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { submitLoan } from "../actions/submitLoan";
import { leadSchema } from "../lib/validation";
import { formatCurrency } from "../lib/utils";
import { trackEvent } from "../lib/analytics";
import { contact } from "../config/contact";
import WhatsAppIcon from "./icons/WhatsAppIcon";
import { Phone } from "lucide-react";

const typeLabels = {
  motor: "BPKB Motor",
  mobil: "BPKB Mobil",
  sertifikat: "Sertifikat Rumah/Tanah",
} as const;

const formSchema = leadSchema;
type FormValues = z.infer<typeof formSchema>;

type LoanFormProps = {
  defaultType?: FormValues["tipe"];
  onSubmitted?: () => void;
};

export default function LoanForm({
  defaultType = "mobil",
  onSubmitted,
}: LoanFormProps) {
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
      consent: true,
    },
  });
  const selectedType = useWatch({
    control: form.control,
    name: "tipe",
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
    const waUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(
      message
    )}`;

    startTransition(async () => {
      const insertPromise = submitLoan(values).catch((error) => {
        console.error(error);
        const fail = {
          success: false as const,
          error: "Data tidak tersimpan, lanjut ke WhatsApp.",
        };
        setStatus(fail.error);
        trackEvent("submit_lead_error", { error: (error as Error).message });
        return fail;
      });

      if (typeof window !== "undefined") {
        window.open(waUrl, "_blank", "noopener,noreferrer");
      }

      const result = await insertPromise;
      if (result && !result.success) {
        setStatus(
          result.error || "Data tidak tersimpan, lanjutkan chat via WhatsApp."
        );
      } else {
        setStatus(
          "Pengajuan terkirim. Tim kami akan menghubungi via WhatsApp."
        );
        onSubmitted?.();
      }
      trackEvent("submit_lead", {
        status: result?.success ? "success" : "fail",
      });
    });
  }

  return (
    <form
      className="grid gap-4 rounded-2xl border border-border/70 bg-white/90 p-5 shadow-soft md:grid-cols-2"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="md:col-span-2 rounded-xl border border-primary/10 bg-primary/5 px-4 py-3">
        <p className="text-sm font-semibold text-foreground">Data Pengajuan</p>
        <p className="text-xs text-muted-foreground">
          Lengkapi detail berikut agar appraisal dan penawaran bisa diproses
          lebih cepat.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="nama">Nama Lengkap</Label>
        <Input
          id="nama"
          placeholder="Nama sesuai KTP"
          autoComplete="name"
          {...form.register("nama")}
        />
        <p className="text-[11px] text-muted-foreground">
          Pastikan sesuai identitas resmi.
        </p>
        {form.formState.errors.nama && (
          <p className="text-xs text-destructive">
            {form.formState.errors.nama.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Nomor Telepon (diawali 62)</Label>
        <Input
          id="phone"
          placeholder="62xxxxxxxxxxx"
          inputMode="numeric"
          autoComplete="tel"
          {...form.register("phone")}
        />
        <p className="text-[11px] text-muted-foreground">
          Gunakan format internasional tanpa 0 di depan (contoh: 62812xxxx).
        </p>
        {form.formState.errors.phone && (
          <p className="text-xs text-destructive">
            {form.formState.errors.phone.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tipe">Jenis Jaminan</Label>
        <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/50 px-3 py-2">
          <div className="text-sm font-semibold text-foreground">
            {typeLabels[selectedType as FormValues["tipe"]] ?? "Jenis Jaminan"}
          </div>
        </div>
        <input type="hidden" {...form.register("tipe")} value={selectedType} />
        <p className="text-[11px] text-muted-foreground">
          Pilihan ini mengikuti layanan yang Anda pilih di halaman sebelumnya.
        </p>
        {form.formState.errors.tipe && (
          <p className="text-xs text-destructive">
            {form.formState.errors.tipe.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="unit">Merk / Tahun Kendaraan atau Detail Aset</Label>
        <Input
          id="unit"
          placeholder="Contoh: Toyota Avanza 2019 / SHM Rumah Tangerang"
          {...form.register("unit")}
        />
        <p className="text-[11px] text-muted-foreground">
          Sertakan merk, tahun, atau tipe aset agar appraisal lebih cepat.
        </p>
        {form.formState.errors.unit && (
          <p className="text-xs text-destructive">
            {form.formState.errors.unit.message}
          </p>
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
        <p className="text-[11px] text-muted-foreground">
          Masukkan estimasi kebutuhan dana. Tim kami akan menyesuaikan plafon.
        </p>
        {form.formState.errors.nominal && (
          <p className="text-xs text-destructive">
            {form.formState.errors.nominal.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="source">Sumber Lead (opsional)</Label>
        <Input
          id="source"
          placeholder="Contoh: Instagram Ads"
          {...form.register("source")}
        />
        <p className="text-[11px] text-muted-foreground">
          Membantu kami memberi prioritas follow-up.
        </p>
      </div>

      <div className="md:col-span-2 rounded-xl bg-primary/10 p-4">
        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border border-input accent-primary focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-background"
            {...form.register("consent")}
          />
          <span>
            Saya menyetujui penyimpanan data sesuai Kebijakan Privasi dan
            penghapusan otomatis dalam 90 hari. Setelah dikirim, pengajuan akan
            diarahkan ke WhatsApp untuk konfirmasi.
          </span>
        </label>
        {form.formState.errors.consent && (
          <p className="mt-1 text-xs text-destructive">
            {form.formState.errors.consent.message}
          </p>
        )}
      </div>

      <div className="md:col-span-2 flex flex-col gap-3">
        <div className="rounded-xl border border-border/70 bg-muted/50 p-3 text-xs text-muted-foreground">
          Dengan menekan kirim, data dicatat sebagai cadangan bila chat WhatsApp
          tidak terkirim. Semua estimasi bersifat indikatif dan tetap memerlukan
          verifikasi.
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:justify-between">
          <Button
            type="submit"
            size="lg"
            disabled={isPending || !form.formState.isValid}
            className="gap-2 shadow-lg shadow-primary/20"
          >
            {isPending ? (
              "Mengirim..."
            ) : (
              <>
                <WhatsAppIcon size={18} className="text-primary-foreground" />
                Kirim & Lanjut ke WhatsApp
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size="lg"
            asChild
            href={contact.phone.tel}
            className="gap-2 border border-border/70"
          >
            <span className="flex items-center gap-2">
              <Phone size={16} />
              Hubungi via Telepon
            </span>
          </Button>
        </div>
      </div>
      {status && <p className="md:col-span-2 text-sm text-primary">{status}</p>}
    </form>
  );
}
