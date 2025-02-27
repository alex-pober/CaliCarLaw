{/* Features Section with contrasting design */}
import { BrainCircuit, Target, Clock, Users2 } from 'lucide-react';

const features = [
  {
    icon: BrainCircuit,
    title: "AI-Driven Advantage",
    description: "Our technology uncovers opportunities others miss."
  },
  {
    icon: Target,
    title: "Results-Oriented Approach",
    description: "We focus on winning, not billing."
  },
  {
    icon: Clock,
    title: "Accessibility",
    description: "Always here when you need us most."
  },
  {
    icon: Users2,
    title: "Young, Relatable Team",
    description: "We understand your needs and speak your language."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="px-4 w-full max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#50ade4]/10 text-[#50ade4] rounded-full text-sm font-medium mb-4">WHY CHOOSE US</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">What Sets Us Apart</h2>
          <div className="w-20 h-1 bg-[#50ade4] mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg">Experience the difference with our innovative approach to legal services</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group flex flex-col items-center text-center p-6"
            >
              <div className="w-16 h-16 rounded-full bg-[#50ade4] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
