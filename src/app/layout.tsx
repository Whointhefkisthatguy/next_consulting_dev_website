import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next Consulting",
  description: "We build the systems your revenue depends on. Websites, brands, and automation — every engagement starts with a diagnostic.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Next Consulting",
    description: "We build the systems your revenue depends on. Websites, brands, and automation — every engagement starts with a diagnostic.",
    url: "https://nextconsulting.dev",
    siteName: "Next Consulting",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Next Consulting — Revenue Architecture & Design",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Consulting",
    description: "We build the systems your revenue depends on.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="font-[var(--font-body)]">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
