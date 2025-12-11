const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || "6281234567890";

const lendingSchema = {
  "@context": "https://schema.org",
  "@type": "LendingService",
  name: "Layanan Gadai BPKB - Jagoan Cair",
  provider: {
    "@type": "Organization",
    name: "Jagoan Cair",
    url: siteUrl
  },
  areaServed: "Indonesia",
  interestRate: "0.9% per month",
  loanTerm: "3-36 bulan",
  feesAndCommissionsSpecification: "Biaya admin bulanan contoh Rp150.000, tanpa biaya tersembunyi.",
  serviceType: "Pinjaman berbasis agunan BPKB dan sertifikat",
  sameAs: [`https://wa.me/${waNumber}`]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Apakah perlu BI Checking?",
      acceptedAnswer: { "@type": "Answer", text: "Tidak, penilaian berdasarkan aset dan dokumen." }
    },
    {
      "@type": "Question",
      name: "Berapa lama pencairan?",
      acceptedAnswer: { "@type": "Answer", text: "Biasanya kurang dari 1 jam setelah dokumen lengkap." }
    },
    {
      "@type": "Question",
      name: "Dokumen yang dibutuhkan?",
      acceptedAnswer: { "@type": "Answer", text: "KTP, BPKB/sertifikat, STNK/PBB, dan foto aset jika ada." }
    }
  ]
};

export default function SeoSchema() {
  const data = [lendingSchema, faqSchema];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
