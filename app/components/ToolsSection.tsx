import { Scale, FileText } from "lucide-react";

export const ToolsSection = () => {
  return (
    <section className="mx-4 my-8 sm:m-6 md:mx-auto md:my-12 lg:my-16 xl:mt-24 max-w-7xl border-2 border-gray-200 p-6 sm:p-8 rounded-2xl bg-white">
      {/* Tech header bar */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-gray-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-mono tracking-wider rounded border border-gray-700 mb-3">
            <span className="w-1.5 h-1.5 bg-[#50ade4] rounded-full"></span>
            SELF-SERVICE TOOLS
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Automated Legal Resources
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mt-2">
            Instant access to essential legal tools and information
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CA Courts Directory Card */}
        <div className="relative overflow-hidden bg-gray-900 rounded-xl p-6 sm:p-8 border-2 border-gray-800 group hover:border-[#50ade4] transition-all">
          {/* Status indicator */}
          <div className="absolute top-4 right-4 flex items-center gap-2 text-xs font-mono text-gray-400">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            ACTIVE
          </div>

          <div className="relative space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-[#50ade4] rounded-lg">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div className="font-mono text-sm text-[#50ade4]">TOOL-001</div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white">
              California Courts Directory
            </h3>

            <p className="text-base text-gray-300 leading-relaxed">
              Direct access to all 254 California courts. No more searching through government websites. Instant lookup for:
            </p>

            <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
              <ul className="grid gap-3 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#50ade4] rounded-full mt-2 shrink-0"></div>
                  <div>
                    <span className="font-bold text-white">Pay Fines:</span>
                    <span className="text-gray-300"> Settle violations online instantly</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#50ade4] rounded-full mt-2 shrink-0"></div>
                  <div>
                    <span className="font-bold text-white">Lookup Cases:</span>
                    <span className="text-gray-300"> Real-time ticket status</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#50ade4] rounded-full mt-2 shrink-0"></div>
                  <div>
                    <span className="font-bold text-white">Schedule Hearings:</span>
                    <span className="text-gray-300"> Book court dates directly</span>
                  </div>
                </li>
              </ul>
            </div>

            <a
              href="/find-your-california-court"
              className="group inline-flex items-center gap-2 bg-[#50ade4] text-white hover:bg-white hover:text-gray-900 font-bold rounded-lg px-6 py-3 transition-all w-full sm:w-auto justify-center"
            >
              Access Directory
              <svg
                className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Free Trial by Declaration Card */}
        <div className="relative overflow-hidden bg-gray-900 rounded-xl p-6 sm:p-8 border-2 border-gray-800 group hover:border-[#22c55e] transition-all">
          {/* Status indicator */}
          <div className="absolute top-4 right-4 flex items-center gap-2 text-xs font-mono text-gray-400">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            ACTIVE
          </div>

          <div className="relative space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-[#22c55e] rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="font-mono text-sm text-[#22c55e]">TOOL-002</div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Fight Traffic Ticket
            </h3>

            <p className="text-base text-gray-300 leading-relaxed">
              Most ticket defenses succeed when officers don't respond. Our guide walks you through the process:
            </p>

            <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
              <ul className="grid gap-3 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-[#22c55e]/20 flex items-center justify-center shrink-0">
                    <span className="font-mono text-xs text-[#22c55e] font-bold">1</span>
                  </div>
                  <div>
                    <span className="font-bold text-white">Request Extension:</span>
                    <span className="text-gray-300"> Buy time to prepare your defense</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-[#22c55e]/20 flex items-center justify-center shrink-0">
                    <span className="font-mono text-xs text-[#22c55e] font-bold">2</span>
                  </div>
                  <div>
                    <span className="font-bold text-white">File TBD:</span>
                    <span className="text-gray-300"> Officer no-show = automatic win</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-[#22c55e]/20 flex items-center justify-center shrink-0">
                    <span className="font-mono text-xs text-[#22c55e] font-bold">3</span>
                  </div>
                  <div>
                    <span className="font-bold text-white">Trial de Novo:</span>
                    <span className="text-gray-300"> If needed, request in-person trial</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="/blog/fight-traffic-ticket-california-guide"
                className="group inline-flex items-center gap-2 bg-[#22c55e] text-white hover:bg-white hover:text-gray-900 font-bold rounded-lg px-6 py-3 transition-all w-full sm:w-auto justify-center"
              >
                View Complete Guide
                <svg
                  className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>

              <p className="text-xs text-gray-500 text-center font-mono uppercase tracking-wider">
                Educational resource - Not legal advice
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
