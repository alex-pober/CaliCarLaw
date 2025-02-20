import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Trial by Declaration Generator | Fight Traffic Tickets Free | CaliforniaCarLaw",
  description: "Create your Trial by Declaration online with CaliforniaCarLaw. Fight traffic tickets without going to court. Expert legal assistance for California traffic violations.",
  openGraph: {
    title: "Free Trial by Declaration Generator | Fight Traffic Tickets Free | CaliforniaCarLaw",
    description: "Create your Trial by Declaration online with CaliforniaCarLaw. Fight traffic tickets without going to court. Expert legal assistance for California traffic violations.",
    type: "website",
    url: "https://calicarlaw.com/trial-by-declaration",
    images: [
      {
        url: "/images/hero/lady-of-justice2.png",
        width: 1200,
        height: 630,
        alt: "CaliforniaCarLaw Free Trial by Declaration Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Trial by Declaration Generator | Fight Traffic Tickets Free | CaliforniaCarLaw",
    description: "Create your Trial by Declaration online with CaliforniaCarLaw. Fight traffic tickets without going to court. Expert legal assistance for California traffic violations.",
    images: ["/images/hero/lady-of-justice2.png"],
  },
};

export default function TrialByDeclarationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
