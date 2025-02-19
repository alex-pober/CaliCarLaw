import { Scale, FileText } from "lucide-react";

export const ToolsSection = () => {
  return (
    <section className="m-4 sm:m-6 md:mx-auto xl:mt-24 max-w-7xl outline outline-4 outline-[#50ade4]/20 p-6 rounded-2xl">
      <div className="text-center space-y-2 mb-2">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Basic Legal Things You Can Do
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Simple solutions for common legal needs in California
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* CA Courts Directory Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#50ade4] to-[#2980b9] rounded-2xl p-8 shadow-xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 100% 100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="relative space-y-4">
            <h3 className="text-3xl font-bold text-white flex items-center gap-3">
              California Courts Directory <Scale className="w-8 h-8" />
            </h3>

            <p className="text-lg text-white/90 h-20 flex items-center">
              Stop wasting time digging through California court websites.
              We&apos;ve compiled all 254 courts to make your life easier.
              Instantly access:
            </p>

            <div className="bg-white/10 p-4 rounded-lg space-y-3">
              <ul className="space-y-2 text-lg text-white">
                <li className="flex">
                  <span className=" font-semibold">
                    ✅ Pay Fines -{" "}
                    <span className="font-normal">
                      Quickly settle your traffic violations online.
                    </span>
                  </span>
                </li>
                <li className="flex">
                  <span className=" font-semibold">
                    🔹 Look Up Tickets & Cases -{" "}
                    <span className="font-normal">
                      Find your tickets online.
                    </span>
                  </span>
                </li>
                <li className="flex">
                  <span className=" font-semibold">
                    ⚖️ Schedule Court Hearings -{" "}
                    <span className="font-normal">
                      Schedule your court date.
                    </span>
                  </span>
                </li>
              </ul>
            </div>

            <a
              href="/find-your-california-court"
              className="inline-flex items-center gap-2 bg-white text-[#50ade4] hover:bg-gray-100 font-semibold rounded-full px-6 py-3 transition-all transform hover:scale-105 group"
            >
              Find Your Local Court
              <svg
                className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Free Trial by Declaration Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#2ecc71] to-[#27ae60] rounded-2xl p-8 shadow-xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 100% 100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <pattern
                id="grid2"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid2)" />
            </svg>
          </div>

          <div className="relative space-y-4">
            <h3 className="text-3xl font-bold text-white flex items-center gap-3">
            Fight Your Traffic Ticket for Free{" "}
            <FileText className="w-8 h-8" />
            </h3>

            <p className="text-lg text-white/90 h-20 flex items-center">
              Without marketing fluff, entire ticket defense mostly relies on officer not responding to you fighting the ticket. So fight it!
            </p>

            <div className="bg-white/10 p-4 rounded-lg">
              <ul className="flex flex-wrap items-center gap-2 text-lg text-white">
                <li className="flex items-center gap-2">
                  <span className="text-xl">📝</span>{" "}
                  <span className="font-semibold">Step 1:</span> Get extension on your ticket.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-xl">📝</span>{" "}
                  <span className="font-semibold">Step 2:</span> File Trial by Declaration, no response, you win.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-xl">📄</span>{" "}
                  <span className="font-semibold">Step 3:</span> If officer responds, file Trial de Novo
                </li>
              </ul>
            </div>

          <div className="flex align-center items-center justify-between gap-2">
            <a
              href="/trial-by-declaration"
              className="inline-flex items-center gap-2 bg-white text-[#22c55e] hover:bg-gray-100 font-semibold rounded-full px-6 py-3 transition-all transform hover:scale-105 group"
            >
              Learn how to fight your ticket
              <svg
                className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>

            <p className="text-white/90">This is not legal advice</p>
          </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
