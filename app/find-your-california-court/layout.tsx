import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "California Court Directory | Find Your Local Court - CaliforniaCarLaw.com",
  description: "Access California court websites, pay traffic tickets online, lookup citations, and find court dates. Your simple directory for navigating California's court system.",
  keywords: "California courts, traffic ticket payment, court dates, citation lookup, court directory, court websites, California traffic court",
  openGraph: {
    title: "California Court Directory | Find Your Local Court",
    description: "Access California court websites, pay traffic tickets online, lookup citations, and find court dates. Your simple directory for navigating California's court system.",
    url: "https://californiacarlaw.com/find-your-california-court",
    siteName: "CaliforniaCarLaw.com",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "California Court Directory | Find Your Local Court",
    description: "Access California court websites, pay traffic tickets online, lookup citations, and find court dates. Your simple directory for navigating California's court system.",
  },
  alternates: {
    canonical: "https://californiacarlaw.com/find-your-california-court",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
