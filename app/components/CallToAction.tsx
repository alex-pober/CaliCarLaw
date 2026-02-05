import { Phone, Mail } from 'lucide-react';
import { submitContactForm } from '../actions/contact';
import { useRef, useState, useEffect } from 'react';

export default function CallToAction() {
  const [formStatus, setFormStatus] = useState<{
    success?: boolean;
    errors?: Record<string, string>;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formLoadTime, setFormLoadTime] = useState<number>(0);
  const formRef = useRef<HTMLFormElement>(null);

  // Set form load time for bot detection
  useEffect(() => {
    setFormLoadTime(Date.now());
  }, []);

  async function handleSubmit(formData: FormData) {
    console.log('Starting form submission...');
    setIsSubmitting(true);
    try {
      const result = await submitContactForm(formData);
      setFormStatus(result);

      if (result.success) {
        formRef.current?.reset();
        // Reset form status after 5 seconds
        setTimeout(() => setFormStatus({}), 5000);
      }
    } catch (error) {
      console.log('Form submission error:', error);
      setFormStatus({ errors: { form: 'An error occurred. Please try again.' } });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="free-consultation" className="relative py-20 overflow-hidden bg-gray-50">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(80,173,228,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(80,173,228,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
          {/* Status bar */}
          <div className="h-2 bg-gradient-to-r from-[#50ade4] via-blue-500 to-[#50ade4] bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]"></div>

          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Content */}
            <div className="flex-1 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-gray-200">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-mono tracking-wider rounded border border-gray-700 mb-6">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                READY TO PROCESS
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 tracking-tight">
                Initialize Your Case
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our automated intake system routes your case to the right team instantly. Response time: &lt;24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#50ade4]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">Direct Line</p>
                    <a href="tel:+16575225292" className="text-lg font-bold text-gray-900 hover:text-[#50ade4] transition-colors">
                      (657) 522-5292
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Call or text anytime</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#50ade4]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">Email Portal</p>
                    <a href="mailto:info@calicarlaw.com" className="text-lg font-bold text-gray-900 hover:text-[#50ade4] transition-colors break-all">
                      info@calicarlaw.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Encrypted & secure</p>
                  </div>
                </div>

                {/* Tech indicators */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="font-mono text-2xl font-black text-[#50ade4]">&lt;24h</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-2xl font-black text-[#50ade4]">256bit</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Encryption</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 p-8 lg:p-12 bg-white">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(formRef.current!);
                handleSubmit(formData);
              }} ref={formRef} className="space-y-4">
                {/* Honeypot field - hidden from humans, visible to bots */}
                <div className="absolute opacity-0 pointer-events-none" style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                  <label htmlFor="website">Website (leave blank)</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Timestamp for timing validation */}
                <input
                  type="hidden"
                  name="_timestamp"
                  value={formLoadTime}
                />

                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#50ade4] focus:outline-none transition-colors font-medium"
                    placeholder="John Doe"
                    required
                  />
                  {formStatus.errors?.name && (
                    <p className="mt-1 text-sm text-red-500">{formStatus.errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#50ade4] focus:outline-none transition-colors font-medium"
                    placeholder="john@example.com"
                    required
                  />
                  {formStatus.errors?.email && (
                    <p className="mt-1 text-sm text-red-500">{formStatus.errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-gray-500 uppercase tracking-wider mb-2">
                    Case Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#50ade4] focus:outline-none transition-colors font-medium resize-none"
                    placeholder="Describe your situation..."
                    required
                  />
                  {formStatus.errors?.message && (
                    <p className="mt-1 text-sm text-red-500">{formStatus.errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-bold hover:bg-[#50ade4] transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        PROCESSING...
                      </>
                    ) : (
                      <>
                        SUBMIT CASE
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>

                {formStatus.success ? (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700 text-center font-medium">
                      ✓ Submission received. Expect contact within 24 hours.
                    </p>
                  </div>
                ) : formStatus.errors?.form ? (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700 text-center font-medium">
                      {formStatus.errors.form}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 text-center font-mono uppercase tracking-wider">
                    Protected by attorney-client privilege
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
