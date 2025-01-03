import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "California Car Law | AI-Powered Legal Services for Car Accidents, DUI & Traffic Cases",
  description: "Expert legal representation across California for car accidents, DUI defense, traffic tickets, and lemon law cases. Available 24/7 with AI-powered efficiency for faster results. Serving all California counties.",
  keywords: "California car accident lawyer, California DUI attorney, traffic ticket lawyer California, lemon law California, car accident legal services, AI-powered law firm, 24/7 legal help California",
  openGraph: {
    title: "California Car Law | AI-Powered Legal Services",
    description: "Expert legal representation across California for car accidents, DUI defense, traffic tickets, and lemon law cases. Available 24/7 with AI-powered efficiency.",
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
    canonical: "https://www.calicarlaw.com",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6366f1",
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
      </body>
    </html>
  );
}
