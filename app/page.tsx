"use client";
import WhyChooseUs from "./components/WhyChooseUs";
import OurServices from "./components/OurServices";
import Navbar from "./components/Navbar";
import Image from "next/image";
import CallToAction from "./components/CallToAction";
import ToolsSection from './components/ToolsSection'

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-white">
      <Navbar />
      <main className="flex flex-col">
        {/* Hero Section */}
        <div className="relative overflow-hidden border-b border-gray-200">
          {/* Tech Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(80,173,228,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(80,173,228,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

          {/* Animated Accent Lines */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#50ade4] to-transparent animate-[shimmer_3s_ease-in-out_infinite]"></div>

          <div className="p-4 sm:p-12 md:p-16 lg:p-20">
            <div className="mt-0 sm:mt-12 relative flex flex-row items-center max-w-7xl mx-auto">
              {/* Right side - Lady of Justice with tech overlay */}
              <div className="absolute right-0 w-full md:w-[60%] aspect-square max-w-[600px] opacity-10 lg:opacity-30">
                <Image
                  src="/images/hero/lady-of-justice2.png"
                  alt="Lady of Justice statue symbolizing law and justice"
                  fill
                  className="object-contain mix-blend-multiply"
                  priority
                />
                {/* Tech overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#50ade4]/5 via-transparent to-blue-500/5"></div>
              </div>

              {/* Left side - Text content */}
              <div className="relative z-10 flex flex-col gap-6 items-center sm:items-start md:max-w-[65%]">
                {/* Tech Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-mono tracking-wider rounded border border-gray-700">
                  <span className="w-1.5 h-1.5 bg-[#50ade4] rounded-full animate-pulse"></span>
                  BUILT BY DEVELOPERS. RUN LIKE CODE.
                </div>

                <h1 className="font-black text-4xl sm:text-5xl lg:text-6xl [text-wrap:balance] leading-[1.1] tracking-tight">
                  Insurance Companies{" "}
                  <span className="whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-[#50ade4] to-gray-900">
                    Stand No Chance
                  </span>
                  {" "}Against Us
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 text-center sm:text-left leading-relaxed max-w-xl font-medium">
                  We&apos;re not your typical lawyers. <span className="text-gray-900 font-semibold">We&apos;re former software developers</span> who turned to law.{" "}
                  <span className="text-[#50ade4] font-bold">We catch adjusters lying in seconds.</span> We analyze thousands of pages before they finish reading one.{" "}
                  <span className="text-gray-900 font-semibold">During litigation, our document warfare is unmatched.</span>
                </p>

                {/* Tech Metrics */}
                <div className="grid grid-cols-3 gap-4 w-full max-w-xl mt-2">
                  <div className="border border-gray-200 bg-white/50 backdrop-blur-sm p-3 rounded-lg">
                    <div className="text-2xl font-black text-[#50ade4] font-mono">{"<60s"}</div>
                    <div className="text-xs text-gray-600 font-medium tracking-wide">TO SPOT LIES</div>
                  </div>
                  <div className="border border-gray-200 bg-white/50 backdrop-blur-sm p-3 rounded-lg">
                    <div className="text-2xl font-black text-[#50ade4] font-mono">1000s</div>
                    <div className="text-xs text-gray-600 font-medium tracking-wide">PAGES ANALYZED</div>
                  </div>
                  <div className="border border-gray-200 bg-white/50 backdrop-blur-sm p-3 rounded-lg">
                    <div className="text-2xl font-black text-[#50ade4] font-mono">ZERO</div>
                    <div className="text-xs text-gray-600 font-medium tracking-wide">MERCY FOR OPC</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto mt-2">
                  <button
                    onClick={() => {
                      document
                        .getElementById("free-consultation")
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    }}
                    className="group relative px-8 h-12 bg-gray-900 text-white font-semibold rounded-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#50ade4] to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Free Case Evaluation
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                  <div className="flex items-center gap-2 text-sm text-gray-500 font-mono">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    READY TO FIGHT
                  </div>
                </div>

                {/* Services Scroller */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">Specializing In</div>
                  <div className="font-black text-3xl sm:text-4xl text-gray-900">
                    <span className="text-[#50ade4] inline-flex flex-col h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] sm:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] overflow-hidden">
                      <ul className="block animate-text-slide-4 text-left leading-tight [&_li]:block">
                        <li className="whitespace-nowrap block">Car Accidents</li>
                        <li className="whitespace-nowrap block">DUI Defense</li>
                        <li className="whitespace-nowrap block">Traffic Tickets</li>
                        <li className="whitespace-nowrap block">Lemon Law</li>
                        <li aria-hidden="true">Car Accidents</li>
                      </ul>
                    </span>
                  </div>
                </div>
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
