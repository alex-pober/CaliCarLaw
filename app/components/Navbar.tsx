'use client';

import { Phone, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleConsultationClick = () => {
    document.getElementById('free-consultation')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full border-b relative bg-white">
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <a 
              href="tel:+16575225292" 
              className="flex items-center gap-1 text-gray-600 hover:text-[#50ade4] transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="font-medium">(657) 522-5292</span>
            </a>

            <button 
              onClick={() => router.push('/free-trial-by-declaration')}
              className="rounded-full border border-solid border-transparent bg-[#132b49] text-white hover:bg-[#3d99d0] transition-colors text-sm px-4 h-9 font-medium whitespace-nowrap"
            >
              Fight your ticket for free
            </button>
            
            <button 
              onClick={handleConsultationClick}
              className="rounded-full border border-solid border-transparent bg-[#132b49] text-white hover:bg-[#3d99d0] transition-colors text-sm px-4 h-9 font-medium whitespace-nowrap"
            >
              Free Consultation
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-[#50ade4] transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b shadow-lg z-50">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <a 
              href="tel:+16575225292" 
              className="flex items-center gap-1 text-gray-600 hover:text-[#50ade4] transition-colors p-2"
            >
              <Phone className="h-4 w-4" />
              <span className="font-medium">(657) 522-5292</span>
            </a>

            <div className="flex flex-col gap-2">
              <button 
                onClick={() => {
                  router.push('/free-trial-by-declaration');
                  setIsMenuOpen(false);
                }}
                className="w-full rounded-full border border-solid border-transparent bg-[#132b49] text-white hover:bg-[#3d99d0] transition-colors text-sm px-4 h-9 font-medium"
              >
                Fight your ticket for free
              </button>
              
              <button 
                onClick={handleConsultationClick}
                className="w-full rounded-full border border-solid border-transparent bg-[#132b49] text-white hover:bg-[#3d99d0] transition-colors text-sm px-4 h-9 font-medium"
              >
                Free Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
