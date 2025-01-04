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
    <section className="py-16">
      <div className="container px-4 sm:px-4">
        <div className="mx-auto max-w-screen-xl">
          <div className="flex flex-col items-center justify-between gap-y-4 md:flex-row">
            <h2 className="text-left text-2xl font-bold md:text-4xl">
              For everything else that needs a <span className="text-[#50ade4]">legal team</span> or <span className="text-[#50ade4]">lawyer</span> 
              <br/> 
              we got you covered for:
            </h2>
            {/* <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#50ade4] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-[#50ade4]/10 h-11 rounded-md px-8">
              View All Services
            </button> */}
          </div>

          <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div key={index} className="rounded-xl border bg-gray-50/50 p-6">
                <div className="mb-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-[#50ade4]/10">
                    <service.icon className="h-8 w-8 text-[#50ade4]" />
                  </div>
                </div>
                <h4 className="mb-4 text-xl font-semibold md:text-2xl">
                  {service.title}
                </h4>
                <p className="text-lg text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
