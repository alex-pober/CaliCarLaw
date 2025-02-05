import { ReactNode } from "react";
import { Metadata } from "next";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Blog - CaliCarLaw",
  description:
    "Stay updated with the latest news and insights from CaliCarLaw.",
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-[#f5f5f7]">
        <main className="flex-1 container mx-auto px-4 ">{children}</main>
      </div>
    </>
  );
}
