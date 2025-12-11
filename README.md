# Jagoan Cair Landing Page

Landing page Next.js 14 (App Router) untuk layanan pinjaman berbasis agunan, sesuai blueprint.

## Fitur
- Desain "Professional Luxury" dengan Tailwind + framer-motion (honor `prefers-reduced-motion`).
- Section lengkap: hero, simulasi pinjaman, keunggulan, tabs jenis agunan, form pengajuan ke WhatsApp + Supabase backup, proses & FAQ, testimoni, footer.
- Form validasi React Hook Form + Zod, nomor telepon Indonesia (62), consent wajib, fallback redirect WA walau Supabase gagal.
- Server Action untuk insert ke tabel `leads` Supabase (kolom: full_name, phone_number, collateral_type, asset_details, loan_amount, source, utm_source, utm_medium, utm_campaign, consent_at, privacy_version).
- SEO/metadata dasar + font pairing (Playfair Display + Plus Jakarta Sans) dan gambar hero lewat `next/image`.

## Jalankan Lokal
```bash
npm install
npm run dev
```

## Environment
Salin `.env.example` ke `.env.local` lalu isi:
- `NEXT_PUBLIC_SITE_URL` – URL produksi untuk canonical/OG.
- `NEXT_PUBLIC_WA_NUMBER` – nomor admin WA (format 62).
- `SUPABASE_URL` dan `SUPABASE_SERVICE_ROLE_KEY` – untuk Server Action insert lead.
- `SUPABASE_ANON_KEY` – jika diperlukan untuk kebutuhan client lainnya (tidak dipakai di sini).

## Catatan Implementasi
- Data Supabase disimpan via Server Action (`app/actions/submitLoan.ts`) dengan RLS disarankan aktif; gunakan service role hanya di server.
- Lead tetap diarahkan ke `wa.me` meski penyimpanan gagal; status ditampilkan di UI.
- Simulasi menggunakan bunga flat 0.9%/bulan + biaya admin bulanan contoh 150k; sesuaikan sesuai produk.
- Gambar hero memakai sumber remote Unsplash; ganti dengan aset sendiri dan update `next.config.js` jika perlu.

## Struktur
- `app/page.tsx` – komposisi halaman.
- `app/components/sections/*` – blok UI per section.
- `app/components/ui/*` – komponen utilitas (button, input, select, slider, tabs, card).
- `app/actions/submitLoan.ts` – server action Supabase.
- `app/lib/*` – utilitas (supabase client, analytics, formatter).
