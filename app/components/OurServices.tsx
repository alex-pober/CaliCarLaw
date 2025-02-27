{/* Services Section with more distinctive styling */}
import { Car, Wine, FileWarning, ShieldAlert } from 'lucide-react';

const services = [
  {
    icon: Car,
    title: "Car Accidents",
    description: "From fender benders to major collisions, we've got your back."
  },
  {
    icon: Wine,
    title: "DUI Defense",
    description: "Don't let one mistake define you, fight your charges today."
  },
  {
    icon: FileWarning,
    title: "Traffic Tickets",
    description: "Save your license, reduce fines, and keep your record clean."
  },
  {
    icon: ShieldAlert,
    title: "Lemon Law",
    description: "Bought a bad car? Get the compensation you deserve."
  }
];

export default function OurServices() {
  return (
    <section className="mx-4 sm:mx-6 md:mx-auto bg-white rounded-3xl shadow-xl max-w-7xl relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] opacity-70"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#50ade4]/10 rounded-full translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#50ade4]/5 rounded-full -translate-x-32 translate-y-24"></div>

      <div className="relative mx-auto max-w-7xl p-8 md:p-12">
        <div className="flex flex-col items-start max-w-3xl mb-12">
          <span className="px-3 py-1 text-[#50ade4] bg-[#50ade4]/10 rounded-full text-sm font-medium mb-4">LEGAL SERVICES</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Don&apos;t Trust Yourself? Trust Us Instead
          </h2>
          <p className="text-lg text-gray-600">
            Expert legal services for California drivers facing:
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-xl border border-gray-100 overflow-hidden"
            >
              <div className="h-2 bg-[#50ade4]"></div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-[#50ade4]/10 rounded-lg">
                    <service.icon className="h-6 w-6 text-[#50ade4]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
