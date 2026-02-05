{/* Features Section with tech-forward design */}
import { Server, Zap, Database, LineChart } from 'lucide-react';

const features = [
  {
    icon: Server,
    title: "Infrastructure-First",
    description: "Built on enterprise-grade systems that never sleep. Zero downtime, instant access.",
    metric: "99.9%",
    metricLabel: "uptime"
  },
  {
    icon: Zap,
    title: "Automated Workflows",
    description: "Manual tasks eliminated. Cases processed in hours, not weeks.",
    metric: "4.2x",
    metricLabel: "faster"
  },
  {
    icon: Database,
    title: "Real-Time Tracking",
    description: "Live case status, instant notifications. Full transparency at every stage.",
    metric: "24/7",
    metricLabel: "access"
  },
  {
    icon: LineChart,
    title: "Data-Driven Strategy",
    description: "Thousands of case outcomes analyzed. Predictive models guide every decision.",
    metric: "10K+",
    metricLabel: "cases"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="w-full py-20 bg-gray-50 border-y border-gray-200">
      <div className="px-4 w-full max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-mono tracking-wider rounded border border-gray-700 mb-6">
            <span className="w-1.5 h-1.5 bg-[#50ade4] rounded-full"></span>
            TECHNICAL INFRASTRUCTURE
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-4 text-gray-900 tracking-tight">
            Built Different. Performs Better.
          </h2>
          <p className="text-gray-600 text-lg">
            While traditional firms rely on paper files and manual processes, we&apos;ve built a tech stack that delivers results traditional firms can&apos;t match.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group bg-white border border-gray-200 rounded-lg p-6 hover:border-[#50ade4] transition-all hover:shadow-lg"
            >
              {/* Tech corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-2 right-2 w-12 h-[1px] bg-[#50ade4] rotate-45 origin-top-right"></div>
                <div className="absolute top-2 right-2 w-[1px] h-12 bg-[#50ade4]"></div>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="p-2.5 bg-gray-900 rounded-lg">
                  <feature.icon className="w-5 h-5 text-[#50ade4]" />
                </div>
                <div className="flex-1">
                  <div className="font-mono text-2xl font-black text-[#50ade4] mb-0.5">
                    {feature.metric}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                    {feature.metricLabel}
                  </div>
                </div>
              </div>

              <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>

              {/* Hover effect line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#50ade4] to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </div>
          ))}
        </div>

        {/* Tech Stack Bar */}
        <div className="mt-16 p-6 bg-white border border-gray-200 rounded-lg">
          <div className="text-center mb-6">
            <div className="text-sm text-gray-500 font-mono uppercase tracking-wider mb-2">Powered By</div>
            <h3 className="text-xl font-bold text-gray-900">Enterprise Technology Stack</h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
            <div className="flex items-center gap-2 font-mono text-sm">
              <div className="w-2 h-2 bg-[#50ade4] rounded-full"></div>
              Cloud Infrastructure
            </div>
            <div className="flex items-center gap-2 font-mono text-sm">
              <div className="w-2 h-2 bg-[#50ade4] rounded-full"></div>
              Machine Learning
            </div>
            <div className="flex items-center gap-2 font-mono text-sm">
              <div className="w-2 h-2 bg-[#50ade4] rounded-full"></div>
              Automated Processing
            </div>
            <div className="flex items-center gap-2 font-mono text-sm">
              <div className="w-2 h-2 bg-[#50ade4] rounded-full"></div>
              Real-Time Analytics
            </div>
            <div className="flex items-center gap-2 font-mono text-sm">
              <div className="w-2 h-2 bg-[#50ade4] rounded-full"></div>
              End-to-End Encryption
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
