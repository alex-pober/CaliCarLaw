import { Phone } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-3xl font-extrabold text-[#50ade4]">
              CaliCarLaw
            </a>
          </div>

          {/* Navigation Links - can be added later */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {/* Add navigation links here when needed */}
          </div>

          {/* Phone number and CTA */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a 
              href="tel:+18885555555" 
              className="hidden sm:flex items-center gap-1 text-gray-600 hover:text-[#50ade4] transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="font-medium">(888) 555-5555</span>
            </a>
            
            <button className="rounded-full border border-solid border-transparent bg-[#50ade4] text-white hover:bg-[#3d99d0] transition-colors text-sm px-4 h-9 font-medium whitespace-nowrap">
              Free Consultation
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
