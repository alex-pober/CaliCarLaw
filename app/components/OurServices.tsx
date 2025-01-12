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
    <section className="m-4 sm:m-6 md:mx-auto bg-white border border-gray-200 rounded-2xl drop-shadow-md max-w-7xl mt-12">
      <div className=" mx-auto max-w-7xl p-8 md:p-12">
        <div className="flex flex-col items-start max-w-3xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Legal Services Tailored to Your Needs
          </h2>
          <p className="text-lg text-gray-600">
            Expert legal representation for California drivers facing:
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl  "
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-[#50ade4] transform origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
              <div className="p-6">
                <div className="flex flex-row align-center items-center gap-4 mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {service.title}
                </h3>
                  <service.icon className="h-8 w-8 text-[#50ade4]" />
                </div>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#50ade4]/50 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
