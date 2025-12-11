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
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

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
    type: "website"
  },
  alternates: {
    canonical: baseUrl
  }
};

export const viewport: Viewport = {
  themeColor: "#124037",
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
