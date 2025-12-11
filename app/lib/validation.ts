import { z } from "zod";

export const leadSchema = z.object({
  nama: z.string().min(2),
  tipe: z.enum(["motor", "mobil", "sertifikat"]),
  unit: z.string().min(2),
  nominal: z.number().min(1_000_000),
  phone: z.string().regex(/^62\d{9,13}$/),
  source: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Persetujuan wajib diberikan" }) })
});

export type LeadInput = z.infer<typeof leadSchema>;
