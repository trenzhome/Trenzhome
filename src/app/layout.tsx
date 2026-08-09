import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeaderData } from "@/components/layout/site-header-data";
import { SiteFooter } from "@/components/layout/site-footer";
import { TrustStrip } from "@/components/layout/trust-strip";
import { CartProvider } from "@/components/cart/cart-context";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "TRENZHOME — Furnish Different",
    template: "%s — TRENZHOME",
  },
  description:
    "Furniture, bedding, and home goods for people who furnish like they mean it.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <CartProvider>
          <SiteHeaderData />
          <main className="pt-[116px] md:pt-[164px]">{children}</main>
          <TrustStrip />
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
