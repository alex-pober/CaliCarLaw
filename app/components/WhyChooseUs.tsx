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
    <section className="w-full py-16">
      <div className="px-4 w-full max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">What Sets Us Apart</h2>
          <p className="text-gray-600 text-lg">Experience the difference with our innovative approach to legal services</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#50ade4]/10 to-[#50ade4]/5 rounded-2xl transform transition-transform group-hover:scale-105 duration-300" />
              <div className="relative p-3 sm:p-6 flex flex-col items-start">
                <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#50ade4]" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
