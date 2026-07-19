import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "سوق بلدي - سوقك المحلي للبيع والشراء",
    template: "%s | سوق بلدي",
  },
  description:
    "سوق بلدي هو سوقك المحلي للبيع والشراء. ابحث عن آلاف الإعلانات في مدينتك واعثر على ما تحتاجه بأسعار مناسبة.",
  keywords: [
    "سوق",
    "بيع",
    "شراء",
    "إعلانات",
    "سوق بلدي",
    "السعودية",
    "عقارات",
    "سيارات",
    "إلكترونيات",
  ],
  openGraph: {
    title: "سوق بلدي - سوقك المحلي للبيع والشراء",
    description:
      "سوق بلدي هو سوقك المحلي للبيع والشراء. ابحث عن آلاف الإعلانات في مدينتك.",
    type: "website",
    locale: "ar_SA",
    siteName: "سوق بلدي",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased`}
      >
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileNav />
        </Providers>
      </body>
    </html>
  );
}
