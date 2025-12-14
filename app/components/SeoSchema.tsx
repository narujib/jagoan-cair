import { contact } from "../config/contact";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jagoancair.com";
const orgId = `${siteUrl}#organization`;
const websiteId = `${siteUrl}#website`;
const serviceId = `${siteUrl}#lending-service`;

const sameAs = [
  contact.whatsapp.link,
  contact.socials.facebook.url,
  contact.socials.instagram.url,
  `mailto:${contact.email}`,
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": orgId,
  name: "Jagoan Cair",
  url: siteUrl,
  email: contact.email,
  telephone: `+${contact.phone.raw}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.address,
    addressCountry: "ID",
  },
  sameAs,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: `+${contact.phone.raw}`,
      contactType: "customer service",
      areaServed: "ID",
      availableLanguage: ["id", "en"],
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  url: siteUrl,
  name: "Jagoan Cair",
  inLanguage: "id-ID",
  publisher: { "@id": orgId },
};

const lendingSchema = {
  "@context": "https://schema.org",
  "@type": "LendingService",
  "@id": serviceId,
  name: "Pembiayaan Berjamin - Jagoan Cair",
  provider: { "@id": orgId },
  url: `${siteUrl}#pembiayaan`,
  areaServed: "ID",
  serviceType: [
    "Pembiayaan BPKB Mobil",
    "Pembiayaan BPKB Motor",
    "Pembiayaan Sertifikat",
    "Pembiayaan Alat Berat & Industri",
  ],
  description:
    "Layanan pembiayaan berbasis agunan BPKB, sertifikat, dan aset industri dengan proses cepat, bunga kompetitif, dan pendampingan hingga cair.",
  termsOfService: `${siteUrl}/#faq`,
  hoursAvailable: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "08:00",
    closes: "21:00",
  },
  offers: {
    "@type": "OfferCatalog",
    name: "Pilihan Pembiayaan",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "BPKB Mobil",
          url: `${siteUrl}#pembiayaan`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "BPKB Motor",
          url: `${siteUrl}#pembiayaan`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sertifikat Rumah/Tanah",
          url: `${siteUrl}#pembiayaan`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Alat Berat & Industri",
          url: `${siteUrl}#pembiayaan`,
        },
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Apakah perlu BI Checking?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, pengajuan melalui pengecekan data kredit. Selama dokumen dan jaminan memenuhi syarat, pengajuan tetap dapat diproses cepat.",
      },
    },
    {
      "@type": "Question",
      name: "Berapa lama proses cair?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rata-rata pencairan sekitar 1 hari kerja setelah dokumen lengkap dan disetujui.",
      },
    },
    {
      "@type": "Question",
      name: "Dokumen apa saja yang dibutuhkan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Persyaratan mengikuti produk pembiayaan: KTP pemilik/pasangan, BPKB/STNK atau sertifikat, serta foto aset dan dokumen pendukung.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah unit harus atas nama sendiri?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tidak harus. Bisa atas nama pihak lain selama ada dokumen pendukung dan persetujuan pemilik sesuai ketentuan.",
      },
    },
  ],
};

export default function SeoSchema() {
  const data = [websiteSchema, organizationSchema, lendingSchema, faqSchema];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
