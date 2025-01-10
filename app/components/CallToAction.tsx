import { Phone, Mail } from 'lucide-react';
import { submitContactForm } from '../actions/contact';
import { useRef, useState } from 'react';

export default function CallToAction() {
  const [formStatus, setFormStatus] = useState<{
    success?: boolean;
    errors?: Record<string, string>;
  }>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    const result = await submitContactForm(formData);
    setFormStatus(result);
    
    if (result.success) {
      formRef.current?.reset();
      // Reset form status after 5 seconds
      setTimeout(() => setFormStatus({}), 5000);
    }
  }

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#50ade4]/10 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Content */}
            <div className="flex-1 p-8 lg:p-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our team is available to discuss your case and provide the expert legal guidance you need.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#50ade4]/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-[#50ade4]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Call or text us</p>
                    <a href="tel:+16575225292" className="text-lg font-semibold text-[#50ade4] hover:underline">
                      (657) 522-5292
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#50ade4]/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-[#50ade4]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email us</p>
                    <a href="mailto:contact@californiacarlaw.com" className="text-lg font-semibold text-[#50ade4] hover:underline">
                      contact@californiacarlaw.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Form */}
            <div className="flex-1 p-8 lg:p-12 bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-100">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(formRef.current!);
                handleSubmit(formData);
              }} ref={formRef} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50ade4] focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                  {formStatus.errors?.name && (
                    <p className="mt-1 text-sm text-red-500">{formStatus.errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50ade4] focus:border-transparent"
                    placeholder="john@example.com"
                    required
                  />
                  {formStatus.errors?.email && (
                    <p className="mt-1 text-sm text-red-500">{formStatus.errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Brief Description of Your Case
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#50ade4] focus:border-transparent"
                    placeholder="Tell us about your situation..."
                    required
                  />
                  {formStatus.errors?.message && (
                    <p className="mt-1 text-sm text-red-500">{formStatus.errors.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#50ade4] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#3d99d0] transition-colors"
                >
                  Get Free Consultation
                </button>
                
                {formStatus.success ? (
                  <p className="text-sm text-green-600 text-center mt-4">
                    Thank you! We&apos;ll get back to you shortly.
                  </p>
                ) : formStatus.errors?.form ? (
                  <p className="text-sm text-red-500 text-center mt-4">
                    {formStatus.errors.form}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 text-center mt-4">
                    Your information is protected by attorney-client privilege
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
