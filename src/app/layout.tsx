import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GridOverlay } from "@/components/GridOverlay";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { SmoothScroll } from "@/components/SmoothScroll";
import { LogoReveal } from "@/components/LogoReveal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Ark Group | Strategic Advisory & Capital Architecture",
  description:
    "Strategic advisory, operational systems, and capital architecture designed for long-term growth.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-offwhite text-slate antialiased">
        <GridOverlay />
        <SmoothScroll />
        <ScrollAnimations />
        <LogoReveal />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
