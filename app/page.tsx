"use client";
import WhyChooseUs from "./components/WhyChooseUs";
import OurServices from "./components/OurServices";
import Navbar from "./components/Navbar";
import Image from "next/image";
import CallToAction from "./components/CallToAction";
import ToolsSection from './components/ToolsSection'

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-gradient-to-b from-transparent to-[#50ade4]/10">
      <Navbar />
      <main className="flex flex-col">
        <div className="p-8 sm:p-12 md:p-16 lg:p-20">
          <div className="mt-0 sm:mt-16 relative flex flex-row items-center max-w-7xl mx-auto">
            {/* Right side - Lady of Justice Image */}
            <div className="absolute right-0 w-full md:w-[60%] aspect-square max-w-[600px] opacity-20 lg:opacity-100">
              <Image
                src="/images/hero/lady-of-justice2.png"
                alt="Lady of Justice statue symbolizing law and justice"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Left side - Text content */}
            <div className="relative z-10 flex flex-col gap-8 items-center sm:items-start md:max-w-[60%]">
              <div className="font-extrabold text-5xl [text-wrap:balance]">
                Your Trusted Legal Team for{" "}
                <span className="text-[#50ade4] inline-flex flex-col h-[calc(theme(fontSize.5xl)*theme(lineHeight.tight))] overflow-hidden">
                  <ul className="block animate-text-slide-4 text-left leading-tight [&_li]:block">
                    <li>Car Accidents</li>
                    <li>DUI</li>
                    <li>Traffic Tickets</li>
                    <li>Lemon Law</li>
                    <li aria-hidden="true">Car Accidents</li>
                  </ul>
                </span>
              </div>

              <p className="text-black font-bold sm:font-medium backdrop-blur-sm rounded-lg  lg:bg-transparent text-lg md:text-xl sm:text-gray-600 dark:text-gray-300 text-center sm:text-left leading-relaxed max-w-sm xl:max-w-xl">
                Revolutionizing Legal Services with AI-Powered Efficiency,{" "}
                <span className="text-[#50ade4] font-semibold">
                  Outperforming Traditional Firms
                </span>{" "}
                for Results You Deserve.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
                <button
                  onClick={() => {
                    document
                      .getElementById("free-consultation")
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                  }}
                  className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-[#50ade4] text-white gap-2 hover:bg-[#3d99d0] text-base h-12 px-8 font-medium w-full sm:w-auto"
                >
                  Get a Free Case Evaluation
                </button>
                <p className="text-sm text-center sm:text-left text-gray-600 dark:text-gray-400">
                  Available 24/7. Let&apos;s Win Together!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* California Courts Directory Section */}
        <ToolsSection />

        <OurServices />

        <WhyChooseUs />

        <CallToAction />
      </main>
    </div>
  );
}
