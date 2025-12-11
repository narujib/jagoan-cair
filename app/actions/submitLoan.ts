'use server';

import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "../lib/supabase";
import { leadSchema, type LeadInput } from "../lib/validation";

export async function submitLoan(values: LeadInput) {
  const parsed = leadSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Validation failed", issues: parsed.error.issues };
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("leads").insert({
      full_name: parsed.data.nama,
      phone_number: parsed.data.phone,
      collateral_type: parsed.data.tipe === "sertifikat" ? "sertifikat" : `bpkb_${parsed.data.tipe}`,
      asset_details: parsed.data.unit,
      loan_amount: parsed.data.nominal,
      source: parsed.data.source ?? "landing",
      utm_source: parsed.data.utm_source,
      utm_medium: parsed.data.utm_medium,
      utm_campaign: parsed.data.utm_campaign,
      consent_at: new Date().toISOString(),
      privacy_version: "v1"
    });

    if (error) {
      console.error("Supabase insert error", error);
      return { success: false, error: "Failed to save lead" };
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Supabase init error", error);
    return { success: false, error: "Supabase not configured" };
  }
}
