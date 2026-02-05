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
    <nav className="w-full border-b-2 border-gray-200 relative bg-white">
      {/* Tech accent line */}
      <div className="h-1 bg-gradient-to-r from-[#50ade4] via-blue-500 to-[#50ade4] bg-[length:200%_100%]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
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
            {/* Tech badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 bg-gray-900 text-white text-[10px] font-mono tracking-wider rounded">
              <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
              ONLINE
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            <a
              href="tel:+16575225292"
              className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-[#50ade4] transition-colors font-medium rounded-lg hover:bg-gray-50"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm">(657) 522-5292</span>
            </a>

            <button
              onClick={() => router.push('/trial-by-declaration')}
              className="rounded-lg border-2 border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white transition-all text-sm px-4 h-9 font-semibold whitespace-nowrap"
            >
              Fight Ticket
            </button>

            <button
              onClick={handleConsultationClick}
              className="rounded-lg border-2 border-transparent bg-gray-900 text-white hover:bg-[#50ade4] hover:border-[#50ade4] transition-all text-sm px-4 h-9 font-semibold whitespace-nowrap"
            >
              Start Case
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
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
        <div className="md:hidden absolute top-[calc(4rem+1px)] left-0 w-full bg-white border-b-2 border-gray-200 shadow-lg z-50">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <a
              href="tel:+16575225292"
              className="flex items-center gap-2 text-gray-700 hover:text-[#50ade4] transition-colors p-3 rounded-lg hover:bg-gray-50"
            >
              <Phone className="h-4 w-4" />
              <span className="font-medium text-sm">(657) 522-5292</span>
            </a>

            <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
              <button
                onClick={() => {
                  router.push('/trial-by-declaration');
                  setIsMenuOpen(false);
                }}
                className="w-full rounded-lg border-2 border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white transition-all text-sm px-4 h-10 font-semibold"
              >
                Fight Ticket
              </button>

              <button
                onClick={handleConsultationClick}
                className="w-full rounded-lg border-2 border-transparent bg-gray-900 text-white hover:bg-[#50ade4] transition-all text-sm px-4 h-10 font-semibold"
              >
                Start Case
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
