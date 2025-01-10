import { Phone } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <Image
                src="/images/logos/CaliforniaCarLaw-Logo.svg"
                alt="California Car Law"
                width={150}
                height={32}
                className="p-4"
                priority
              />
            </a>
          </div>

          {/* Navigation Links - can be added later */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {/* Add navigation links here when needed */}
          </div>

          {/* Phone number and CTA */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a 
              href="tel:+16575225292" 
              className="hidden sm:flex items-center gap-1 text-gray-600 hover:text-[#50ade4] transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="font-medium">(657) 522-5292</span>
            </a>
            
            <button 
              onClick={() => {
                document.getElementById('free-consultation')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className="rounded-full border border-solid border-transparent bg-[#132b49] text-white hover:bg-[#3d99d0] transition-colors text-sm px-4 h-9 font-medium whitespace-nowrap"
            >
              Free Consultation
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
