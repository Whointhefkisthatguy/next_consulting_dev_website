import type { Metadata } from "next";
import { Barlow_Semi_Condensed, Barlow } from "next/font/google";
import "./globals.css";

const barlowDisplay = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next Consulting",
  description: "Revenue architecture.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${barlowDisplay.variable} ${barlow.variable}`}>
      <body className="grain">
        {children}
      </body>
    </html>
  );
}
