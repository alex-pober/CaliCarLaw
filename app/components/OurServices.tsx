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
    description: "Don't let one mistake define you—fight your charges today."
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
    <section className="w-full">
      <div className="py-16 px-4 w-full max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How We Can Help</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div 
            key={index}
            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl"
          >
            <div className="mb-4">
              <div className="inline-block rounded-lg bg-indigo-100 p-3">
                <service.icon className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              {service.title}
            </h3>
            <p className="text-gray-600">
              {service.description}
            </p>
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10 group-hover:ring-gray-900/20" />
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-indigo-500 text-white gap-2 hover:bg-indigo-600 text-base h-12 px-8 font-medium mx-auto">
          Learn More About Our Expertise
        </button>
      </div>
    </div>
    </section>
  );
}
