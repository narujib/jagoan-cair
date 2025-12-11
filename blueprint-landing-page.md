Blueprint & Wireframe: Landing Page Peminjaman Modal Premium

1. Ikhtisar Proyek (Project Overview)
   Tujuan: Mengkonversi pengunjung menjadi leads melalui WhatsApp dengan pendekatan desain yang elegan, terpercaya, dan animasi yang halus.
   Target User: Pemilik kendaraan/properti yang membutuhkan dana cepat namun menginginkan keamanan.
   Tech Stack:
   Framework: Next.js 14+ (App Router).
   Styling: Tailwind CSS + Shadcn/UI.
   Animation: Framer Motion (untuk animasi masuk dan interaksi).
   Database: Supabase (Hanya untuk logging data leads sebagai backup sebelum redirect ke WA).
   Form Handling: React Hook Form + Zod.
   Security & Privacy: Checkbox persetujuan penyimpanan data + tautan Kebijakan Privasi sebelum submit; tulis retensi data (mis. 90 hari) di dekat CTA; gunakan rel="noopener" untuk link WA.
2. Strategi SEO (Search Engine Optimization)
   Fokus pada Local SEO dan Financial Keywords.
   A. Metadata (Next.js Metadata API)
   Title: Dinamis per halaman, pola: Pinjaman Jaminan BPKB Cair 1 Jam - [Nama Brand]
   Description: Mengandung keyword utama: "Dana tunai", "Bunga rendah", "Proses cepat", "Aman".
   Canonical: Set per halaman, pastikan tidak duplikat dengan versi UTM.
   Robots & Sitemap: robots.txt untuk allow/deny yang jelas; sitemap.xml otomatis.
   Open Graph (OG): Image custom menunjukkan orang tersenyum memegang dokumen/aset (trust signal) untuk preview link di WA/Facebook.
   Alt Text: Hero dan gambar utama wajib alt deskriptif (mis. "Konsultan keuangan menjelaskan proses gadai BPKB").
   B. Schema Markup (JSON-LD)
   Implementasi LendingService schema.
   Attributes:
   name: Layanan Gadai BPKB
   provider: [Nama Brand], official website.
   interestRate: (Contoh: "0.9% per month")
   loanTerm: (Contoh: "3-36 bulan")
   areaServed: Indonesia / Kota Target.
   feesAndCommissionsSpecification: Cantumkan biaya admin/asuransi jika ada.
   sameAs: Link ke profil Google Business / media sosial.
   FAQPage: 3-5 FAQ umum (BI checking, lama pencairan, syarat aset) untuk rich result.
   C. Performance (Core Web Vitals)
   Gunakan next/image untuk optimasi gambar hero dengan placeholder blur dan priority.
   Font Pairing: Heading serif elegan (Playfair Display) + body sans (Inter/Plus Jakarta Sans) via next/font/google untuk mencegah CLS.
   Preconnect font: preconnect ke fonts.gstatic, gunakan display=swap.
   D. Local SEO & Konten
   Sertakan alamat dan peta (embed grayscale) di footer.
   Tampilkan nomor WA/telepon dan jam operasional di atas fold.
3. Desain Sistem & Database (Supabase)
   Supabase menyimpan data pengajuan sesaat sebelum user diarahkan ke WA (backup bila chat tidak terkirim).
   Table: leads
   id (uuid)
   full_name (text)
   phone_number (text)
   collateral_type (enum: 'bpkb_motor', 'bpkb_mobil', 'sertifikat')
   asset_details (text: Merk/Tahun)
   loan_amount (numeric)
   source (text) // mis. "landing" / "ads"
   utm_source (text)
   utm_medium (text)
   utm_campaign (text)
   consent_at (timestamp)
   privacy_version (text)
   created_at (timestamp)
   status (default: 'submitted')
   Data Policy: tulis retensi (mis. hapus otomatis 90 hari), hanya admin internal yang dapat mengakses; aktifkan RLS dan gunakan server action, bukan client key publik.
4. Wireframe & UI Detail (Section by Section)
   Gaya Desain: "Professional Luxury".
   Warna: Deep Emerald Green (Trust/Money) + Gold (Premium) + White/Light Gray.
   Animasi: Staggered Fade-in saat scroll. Smooth parallax; hormati prefers-reduced-motion (fallback ke fade sederhana).
   Aksesibilitas & Mobile: State fokus terlihat, ukuran tap target besar, navbar/CTA sekunder mudah dijangkau jempol.
   Bagian 1: Navbar (Sticky & Glassmorphism)
   Layout: Logo di kiri, Menu di tengah (hidden on mobile), Button CTA di kanan.
   Style: Background transparan saat di atas, berubah menjadi frosted glass (blur) putih saat di-scroll.
   Komponen:
   NavigationMenu (Shadcn).
   Button (Shadcn): Variant default (Warna Emas/Hijau Tua). Teks: "Konsultasi Gratis".
   CTA sekunder mobile: "Telepon/WA" (icon phone) di pojok kanan untuk akses cepat.
   Bagian 2: Hero Section (The Hook)
   Layout: Split screen (Kiri Teks, Kanan Visual) atau Center Aligned untuk kesan lebih mewah.
   Background: Gambar abstrak gelombang emas atau foto lifestyle high-quality dengan overlay gelap gradient.
   Elemen:
   H1 (Headline): Font Serif Besar. "Solusi Dana Tunai Premium. Aset Aman, Cair Instan."
   Animasi: Fade Up (Delay 0.2s).
   Subtext: "Pencairan hingga 90% nilai taksiran. Tanpa BI Checking."
   CTA Utama: Tombol Besar "Ajukan Sekarang" (Scroll ke Form). rel="noopener" untuk link WA.
   CTA Sekunder: "Hubungi via Telepon" atau "Cek Simulasi" untuk pengguna yang butuh konsultasi cepat.
   Trust Badges: Barisan logo kecil di bawah tombol (OJK, APPI, atau Icon Keamanan).
   Animasi: Gambar hero bergerak halus (floating) menggunakan Framer Motion; matikan efek floating saat prefers-reduced-motion.
   Bagian 3: Simulator Pinjaman (Interactive)
   Tujuan: Engagement user.
   Komponen:
   Card (Shadcn) dengan border emas tipis.
   Slider (Shadcn) untuk Nominal Pinjaman & Tenor.
   Real-time Calculation: Teks besar menunjukkan "Estimasi Angsuran: Rp X.XXX.XXX / bulan".
   Rumus: angsuran = (pokok + (pokok * bunga_flat * tenor)) / tenor + biaya_admin_bulanan (jika ada). Tampilkan bunga & biaya transparan.
   Parameter: batas min/maks nominal dan tenor, default di tengah rentang.
   Disclaimer: "Estimasi tidak mengikat. Perhitungan final setelah verifikasi aset."
   UX: Angka berubah seketika saat slider digeser.
   Bagian 4: Keunggulan (Why Us) - Grid Layout
   Layout: Grid 3 kolom.
   Card Style: Minimalis, icon besar di tengah, background putih, shadow soft hover.
   Konten:
   Keamanan Aset: Icon Brankas (Animate: Lock closing).
   Bunga Kompetitif: Icon Persen.
   Proses 1 Jam: Icon Jam/Petir.
   Animasi: Stagger children. Card muncul satu per satu dari bawah saat di-scroll.
   Bagian 5: Jenis Agunan (Tabs Section)
   Komponen: Tabs (Shadcn).
   Tab Triggers: Motor | Mobil | Sertifikat.
   Tab Content:
   Tampilkan syarat spesifik untuk masing-masing kategori secara rapi.
   Contoh: Tab Motor -> "Minimal Tahun 2015, Pajak Hidup/Mati maks 2 tahun".
   Bagian 6: Formulir Pengajuan (The Core - Floating/Highlight)
   Posisi: Bisa diletakkan di dalam container khusus dengan background berbeda agar menonjol.
   Komponen:
   Form, FormControl, Input, Select (Shadcn).
   Validasi real-time dengan Zod.
   - Nama minimal 2 karakter.
   - Nomor telepon regex Indonesia: harus diawali 62, panjang 11-15 digit, input mask opsional.
   - Nominal numeric dengan batas min/maks; asset_details minimal merk+tahun.
   Flow UX:
   User isi data.
   Checkbox wajib: "Saya setuju data disimpan sesuai Kebijakan Privasi (hapus otomatis setelah X hari)".
   Tombol "Kirim Pengajuan via WhatsApp" (Icon WA).
   Saat klik -> Loading Spinner (Simpan ke Supabase).
   Error handling: Jika gagal simpan, tetap redirect WA + toast "Data tidak tersimpan, lanjut ke WA".
   Redirect ke wa.me (noopener).
   Animasi: Form muncul dengan efek Scale Up agar terasa mengundang.
   Bagian 7: Proses & FAQ
   Proses 3 langkah: 1) Ajukan online, 2) Verifikasi dokumen/telepon, 3) Cair <= 1 jam setelah verifikasi.
   FAQ: 3-5 item (BI checking, bunga, lama proses, dokumen yang dibutuhkan, apakah unit harus atas nama sendiri).
   CTA sekunder: tombol Telepon/WA di bawah FAQ untuk pengguna yang ingin konsultasi langsung.
   Bagian 8: Testimoni & Social Proof
   Komponen: Carousel (Shadcn) / Marquee slider.
   Konten: Screenshot chat WA yang diblur namanya, atau kartu quote dengan rating bintang 5.
   Bagian 9: Footer
   Layout: 4 Kolom (Brand, Link Cepat, Kontak, Legal).
   Penting: Alamat fisik lengkap (Embed Google Maps grayscale agar elegan).
   Legal: Privacy Policy, Syarat & Ketentuan, disclaimer "Layanan ini mematuhi peraturan...".
   CTA: Tombol kecil WA/Telepon + jam operasional.
5. Flow Logic (Code Implementation Plan)
   A. Struktur Folder (Next.js App Router)
   app/
   ├── layout.tsx # Font setup, Metadata global
   ├── page.tsx # Landing page (Komposisi semua section)
   ├── actions/
   │ └── submitLoan.ts # Server Action untuk Supabase
   ├── components/
   │ ├── sections/ # Hero, Features, FormSection, etc.
   │ └── ui/ # Shadcn components
   ├── lib/
   │ ├── utils.ts
   │ └── supabase.ts # Client initialization

   B. Logic "Form to WhatsApp"
   // 1. Zod Schema
   const phoneRegex = /^62\\d{9,13}$/;
   const formSchema = z.object({
     nama: z.string().min(2),
     tipe: z.enum(["motor", "mobil", "sertifikat"]),
     unit: z.string().min(2),
     nominal: z.number().min(1_000_000),
     phone: z.string().regex(phoneRegex),
     source: z.string().optional(),
     utm_source: z.string().optional(),
     utm_medium: z.string().optional(),
     utm_campaign: z.string().optional(),
     consent: z.literal(true),
   });

   // 2. Handler
   async function onSubmit(values: z.infer<typeof formSchema>) {
     setIsLoading(true);

     // Langkah A: Construct WA Link
     const phone = process.env.NEXT_PUBLIC_WA_NUMBER;
     const message = `Halo Admin, saya mau ajukan pinjaman.\\n\\n` +
       `Nama: ${values.nama}\\n` +
       `Jaminan: ${values.tipe}\\n` +
       `Unit: ${values.unit}\\n` +
       `Nominal: ${values.nominal}\\n` +
       `Telepon: ${values.phone}\\n\\n` +
       `Mohon infonya.`;
     const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

     // Langkah B: Simpan ke Supabase (non-blocking)
     const insertPromise = saveLeadToSupabase(values).catch((error) => {
       console.error(error);
       toast.error("Data tidak tersimpan, lanjut ke WA");
       trackEvent("submit_lead_error", { error });
     });

     // Langkah C: Redirect
     window.open(waUrl, "_blank", "noopener,noreferrer");
     await insertPromise;
     trackEvent("submit_lead", { status: "success", source: values.source });
     setIsLoading(false);
   }

   C. Observabilitas
   Event tracking: slider_change, cta_click (Hero/Form/Footer), form_submit, wa_redirect, supabase_error.
   Alerting: jika supabase_error rate > threshold, kirim notifikasi (Sentry/Logflare).

   D. Keamanan
   Nomor WA admin di env, bukan hardcode.
   RLS Supabase aktif, semua insert via server action.
6. Animasi & Interaksi (Framer Motion)
   Untuk mencapai kesan "Elegan":
   Text Reveal: Masking pada text headline. Teks muncul dari bawah mask.
   Smooth Scroll: Implementasikan lenis agar scroll terasa "berat" dan mahal.
   Micro-interactions: Button hover scale 1.05 + glow; focus ring jelas; input focus border transition smooth.
   Prefers Reduced Motion: Matikan parallax/floating, hanya gunakan fade sederhana.
7. Optimasi Aset
   Gunakan format WebP atau AVIF untuk semua gambar.
   Hero pakai next/image dengan priority; total aset di bawah fold dilazy-load.
   Batasi total beban gambar < 1.2 MB; gunakan sizes agar responsive.
   Loading="lazy" untuk iframe maps; rel="noopener" untuk semua tautan eksternal/WA.
