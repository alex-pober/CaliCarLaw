import WhyChooseUs from './components/WhyChooseUs';
import OurServices from './components/OurServices';
import Navbar from './components/Navbar';
import Image from 'next/image';
import {FolderSearch2, Scale} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-col">
        <div className="p-8 sm:p-12 md:p-16 lg:p-20">
          <div className="mt-0 sm:mt-16 relative flex flex-row items-center max-w-7xl mx-auto">

            {/* Right side - Lady of Justice Image */}
            <div className="absolute right-0 w-full md:w-[60%] aspect-square max-w-[600px] opacity-20 lg:opacity-100">
              <Image
                src="/images/hero/lady-of-justice2.png"
                alt="Lady of Justice statue symbolizing law and justice"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Left side - Text content */}
            <div className="relative z-10 flex flex-col gap-8 items-center sm:items-start md:max-w-[60%]">
              <div className="font-extrabold text-5xl [text-wrap:balance]">
                Your Trusted Legal Team for{" "}
                <span className="text-[#50ade4] inline-flex flex-col h-[calc(theme(fontSize.5xl)*theme(lineHeight.tight))] overflow-hidden">
                  <ul className="block animate-text-slide-4 text-left leading-tight [&_li]:block">
                    <li>Car Accidents</li>
                    <li>DUI</li>
                    <li>Traffic Tickets</li>
                    <li>Lemon Law</li>
                    <li aria-hidden="true">Car Accidents</li>
                  </ul>
                </span>
              </div>

              <p className="text-black font-bold sm:font-medium backdrop-blur-sm rounded-lg  lg:bg-transparent text-lg md:text-xl sm:text-gray-600 dark:text-gray-300 text-center sm:text-left leading-relaxed max-w-sm xl:max-w-xl">
                Revolutionizing Legal Services with AI-Powered Efficiency—
                <span className="text-[#50ade4] font-semibold">
                  Outperforming Traditional Firms
                </span>{" "}
                for Results You Deserve.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
                <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-[#50ade4] text-white gap-2 hover:bg-[#3d99d0] text-base h-12 px-8 font-medium w-full sm:w-auto">
                  Get a Free Case Evaluation
                </button>
                <p className="text-sm text-center sm:text-left text-gray-600 dark:text-gray-400">
                  Available 24/7. Let&apos;s Win Together!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* California Courts Directory Section */}
        <div className=" mt-4 sm:mt-6 lg:mt-8 xl:mt-24 max-w-7xl mx-auto p-4 sm:p-2">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#50ade4] to-[#2980b9] rounded-2xl p-8 md:p-12 shadow-xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>
            
            <div className="relative flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white flex items-center sm:gap-3">
                  California Courts Directory <Scale className="w-24 h-24 md:w-12 md:h-12" />
                </h2>
                <p className="text-xl text-white/90">
                  The California legal system can be tough to navigate, so we’ve simplified it for you. Our complete court directory has everything you need—from paying traffic fines to handling legal matters—quickly and easily.                </p>
                <a 
                  href="/find-your-california-court"
                  className="inline-flex items-center gap-2 bg-white text-[#50ade4] hover:bg-gray-100 font-semibold rounded-full px-8 py-4 transition-all transform hover:scale-105 group"
                >
                  Find Your Local Court
                  <svg 
                    className="w-5 h-5 transform transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>

              {/* Decorative Icon */}
              <div className="flex-shrink-0 w-48 h-48 relative">
                <div className="absolute inset-0 bg-white/10 rounded-full flex items-center justify-center">
                  <FolderSearch2 className="w-20 h-20 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <OurServices />

        <WhyChooseUs />
        
      </main>

      <footer className="flex flex-col gap-6 items-center justify-center w-full py-16">
        <nav className="flex gap-6 flex-wrap items-center justify-center text-sm text-gray-600 dark:text-gray-400">
          <a href="/about" className="hover:text-[#50ade4] transition-colors">
            About Us
          </a>
          <span className="select-none">•</span>
          <a
            href="/services"
            className="hover:text-[#50ade4] transition-colors"
          >
            Services
          </a>
          <span className="select-none">•</span>
          <a
            href="/testimonials"
            className="hover:text-[#50ade4] transition-colors"
          >
            Testimonials
          </a>
          <span className="select-none">•</span>
          <a href="/blog" className="hover:text-[#50ade4] transition-colors">
            Blog
          </a>
          <span className="select-none">•</span>
          <a
            href="/contact"
            className="hover:text-[#50ade4] transition-colors"
          >
            Contact Us
          </a>
        </nav>

        <div className="flex gap-6 items-center justify-center">
          <a
            href="#"
            className="text-gray-600 hover:text-[#50ade4] transition-colors"
            aria-label="LinkedIn"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-[#50ade4] transition-colors"
            aria-label="Instagram"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-[#50ade4] transition-colors"
            aria-label="Facebook"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center max-w-xl px-4">
          Disclaimer: This is not legal advice. Every case is unique. Contact us
          for a free consultation.
        </p>
      </footer>
    </div>
  );
}
