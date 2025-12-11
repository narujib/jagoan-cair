import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const heading = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700"]
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"]
});

const siteName = "Jagoan Cair";
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jagoancair.com";
const ogImage = `${baseUrl}/og-image.jpg`;

export const metadata: Metadata = {
  title: {
    default: "Pinjaman Jaminan BPKB Cair 1 Jam - Jagoan Cair",
    template: "%s - Jagoan Cair"
  },
  description:
    "Solusi dana tunai premium dengan jaminan BPKB. Proses cepat, bunga kompetitif, aset aman.",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "Pinjaman Jaminan BPKB Cair 1 Jam - Jagoan Cair",
    description:
      "Solusi dana tunai premium dengan jaminan BPKB. Proses cepat, bunga kompetitif, aset aman.",
    url: baseUrl,
    siteName,
    locale: "id_ID",
    type: "website",
    images: [{ url: ogImage, width: 1200, height: 630, alt: siteName }]
  },
  alternates: {
    canonical: baseUrl
  },
  twitter: {
    card: "summary_large_image",
    title: "Pinjaman Jaminan BPKB Cair 1 Jam - Jagoan Cair",
    description:
      "Solusi dana tunai premium dengan jaminan BPKB. Proses cepat, bunga kompetitif, aset aman.",
    images: [ogImage]
  }
};

export const viewport: Viewport = {
  themeColor: "#16a34a",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${heading.variable} ${body.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
