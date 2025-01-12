'use client'
import CallToAction from '../components/CallToAction'
import Navbar from '../components/Navbar';
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Get in touch with our legal team for a free consultation about your car accident case.
          </p>
        </div>
        
        <div className="max-w-7xlf mx-auto">
          <CallToAction />
        </div>
      </div>
    </main>
  )
}
