{/* Services Section - Clean service menu design */}
import { Car, Wine, FileWarning, ShieldAlert } from 'lucide-react';

const services = [
  {
    icon: Car,
    title: "Car Accidents",
    description: "From fender benders to major collisions, we've got your back.",
  },
  {
    icon: Wine,
    title: "DUI Defense",
    description: "Don't let one mistake define you, fight your charges today.",
  },
  {
    icon: FileWarning,
    title: "Traffic Tickets",
    description: "Save your license, reduce fines, and keep your record clean.",
  },
  {
    icon: ShieldAlert,
    title: "Lemon Law",
    description: "Bought a bad car? Get the compensation you deserve.",
  }
];

export default function OurServices() {
  return (
    <section className="mx-4 sm:mx-6 md:mx-auto max-w-7xl my-16">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#50ade4]/10 text-[#50ade4] text-xs font-semibold tracking-wider rounded-full mb-4">
            PRACTICE AREAS
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 tracking-tight">
            Specialized Legal Services
          </h2>
          <p className="text-lg text-gray-600">
            Expert representation across California's most common legal challenges
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white to-gray-50 hover:from-[#50ade4] hover:to-[#3d99d0] p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent"
            >
              {/* Large icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-[#50ade4]/10 group-hover:bg-white/20 rounded-2xl flex items-center justify-center transition-colors">
                  <service.icon className="h-8 w-8 text-[#50ade4] group-hover:text-white transition-colors" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">
                {service.title}
              </h3>

              <p className="text-gray-600 group-hover:text-white/90 text-sm leading-relaxed transition-colors">
                {service.description}
              </p>

              {/* Arrow indicator on hover */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
