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
    title: "24/7 Accessibility",
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
    <section className="w-full bg-indigo-50">
      <div className="py-16 px-4 w-full max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-900">What Sets Us Apart</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-2 sm:p-4 rounded-lg hover:bg-white/50 transition-colors"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center mb-2 sm:mb-3">
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-1 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
