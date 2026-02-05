import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer";
import { Analytics } from '@vercel/analytics/react';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.californiacarlaw.com'),
  title: "California Car Law | Most Technically Advanced Law Firm for Car Accidents, DUI & Traffic Cases",
  description: "California's most technically advanced law firm. Automated workflows, real-time case tracking, and data-driven strategies for car accidents, DUI defense, traffic tickets, and lemon law. Available 24/7 with enterprise-grade systems.",
  keywords: "California car accident lawyer, California DUI attorney, traffic ticket lawyer California, lemon law California, tech-forward law firm, automated legal services, 24/7 legal help California, modern law firm",
  openGraph: {
    title: "California Car Law | Most Technically Advanced Law Firm",
    description: "California's most technically advanced law firm. Automated workflows, real-time case tracking, and data-driven strategies. Available 24/7 with enterprise-grade systems.",
    locale: "en_US",
    type: "website",
    siteName: "California Car Law",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://www.californiacarlaw.com",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#50ade4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
