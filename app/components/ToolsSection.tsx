import { Scale, FileText } from "lucide-react";

export const ToolsSection = () => {
  return (
    <section className="mx-4 my-8 sm:m-6 md:mx-auto md:my-12 lg:my-16 xl:mt-24 max-w-7xl outline outline-4 outline-[#50ade4]/20 p-4 sm:p-6 rounded-2xl">
      <div className="text-center space-y-2 mb-4 sm:mb-6 lg:mb-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Basic Legal Things You Can Do
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
          Simple solutions for common legal needs in California
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* CA Courts Directory Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#50ade4] to-[#2980b9] rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl">
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
          <div className="relative space-y-3 sm:space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
              California Courts Directory{" "}
              <Scale className="w-[1.2em] h-[1.2em]" />
            </h3>

            <p className="text-base sm:text-lg text-white/90 min-h-0 sm:min-h-[3rem] md:min-h-[5rem] flex items-center">
              Stop wasting time digging through California court websites.
              We&apos;ve compiled all 254 courts to make your life easier.
              Instantly access:
            </p>

            <div className="bg-white/10 p-3 sm:p-4 rounded-lg text-white">
              <ul className="grid gap-3">
                <li>
                  <div className="flex items-start">
                    <span className="text-xl shrink-0 mr-2">✅</span>
                    <div>
                      <span className="font-semibold block sm:inline sm:mr-1">
                        Pay Fines:
                      </span>
                      <span>
                        Quickly settle your traffic violations online.
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start">
                    <span className="text-xl shrink-0 mr-2">🔹</span>
                    <div>
                      <span className="font-semibold block sm:inline sm:mr-1">
                        Look Up Tickets & Cases:
                      </span>
                      <span>Find your tickets online.</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start">
                    <span className="text-xl shrink-0 mr-2">⚖️</span>
                    <div>
                      <span className="font-semibold block sm:inline sm:mr-1">
                        Schedule Court Hearings:
                      </span>
                      <span>Schedule your court date.</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <a
              href="/find-your-california-court"
              className="inline-flex items-center gap-2 bg-white text-[#50ade4] hover:bg-gray-100 font-semibold rounded-full px-4 py-2 sm:px-6 sm:py-3 transition-all transform hover:scale-105 group"
            >
              Find Your Local Court
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transform transition-transform group-hover:translate-x-1"
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
        <div className="relative overflow-hidden bg-gradient-to-br from-[#2ecc71] to-[#27ae60] rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl">
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

          <div className="relative space-y-3 sm:space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
              Fight Traffic Ticket for Free{" "}
              <FileText className="w-[1.2em] h-[1.2em]" />
            </h3>

            <p className="text-base sm:text-lg text-white/90 min-h-0 sm:min-h-[3rem] md:min-h-[5rem] flex items-center">
              Without marketing fluff, entire ticket defense mostly relies on
              officer not responding to you fighting the ticket. So fight it!
            </p>

            <div className="bg-white/10 p-3 sm:p-4 rounded-lg text-white">
              <ul className="grid gap-3">
                <li>
                  <div className="flex items-start">
                    <span className="text-xl shrink-0 mr-2">📝</span>
                    <div>
                      <span className="font-semibold block sm:inline sm:mr-1">
                        Step 1:
                      </span>
                      <span>Get extension on your ticket.</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start">
                    <span className="text-xl shrink-0 mr-2">📝</span>
                    <div>
                      <span className="font-semibold block sm:inline sm:mr-1">
                        Step 2:
                      </span>
                      <span>
                        File Trial by Declaration, no response, you win.
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start">
                    <span className="text-xl shrink-0 mr-2">📄</span>
                    <div>
                      <span className="font-semibold block sm:inline sm:mr-1">
                        Step 3:
                      </span>
                      <span>If officer responds, file Trial de Novo</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-2">
              <a
                href="/blog/fight-traffic-ticket-california-guide"
                className="inline-flex items-center gap-2 bg-white text-[#22c55e] hover:bg-gray-100 font-semibold rounded-full px-4 py-2 sm:px-6 sm:py-3 transition-all transform hover:scale-105 group"
              >
                Learn how to fight your ticket
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 transform transition-transform group-hover:translate-x-1"
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

              <p className="text-sm sm:text-base text-white/90">
                This is not legal advice
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
