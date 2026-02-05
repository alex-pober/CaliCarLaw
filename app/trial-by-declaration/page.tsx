"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import Navbar from "@/app/components/Navbar";
import { Search, X, FileText, Download, Mail, CheckCircle, AlertTriangle, Edit3, Clock, Shield, Zap } from "lucide-react";
import debounce from "lodash/debounce";
import { Card, CardContent } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";

import { cn } from "@/lib/utils";
import Head from "next/head";

interface FormData {
  NameOfCourt: string;
  CourtStreetAddress: string;
  CourtMailingAddress: string;
  CourtCityAndZipcode: string;
  CourtBranchName: string;
  CitationNumber: string;
  Defendant: string;
  DefendantAddress: string;
  CaseNumber: string;
  StatementOfFacts: string;
  PagesAttached: string;
  Date: string;
  PhotographsAmount: string;
  // Checkboxes
  Photographs: boolean;
  MedicalRecord: boolean;
  RegistrationDocuments: boolean;
  InspectionCertificate: boolean;
  Diagram: boolean;
  CarRepairRecepit: boolean;
  InsuranceDocuments: boolean;
  Other: boolean;
  OtherSpecified: string;
}

interface Courthouse {
  id: number;
  courthouse_name: string;
  address: string;
  county: string;
  matters_served: string;
}

// JSON-LD Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "CaliforniaCarLaw Trial by Declaration Service",
  description:
    "Fight your traffic ticket with Trial by Declaration in California for free with our form generator.",
  url: "https://calicarlaw.com/trial-by-declaration",
  areaServed: {
    "@type": "State",
    name: "California",
  },
  serviceType: "Traffic Ticket Defense",
  serviceArea: {
    "@type": "State",
    name: "California",
  },
  provider: {
    "@type": "LegalService",
    name: "CaliCarLaw",
    image: "/images/hero/lady-of-justice2.png",
    priceRange: "free",
  },
  offers: {
    "@type": "Offer",
    description: "Trial by Declaration legal service",
    availability: "https://schema.org/InStock",
  },
  logo: "https://calicarlaw.com/public/images/hero/lady-of-justice2.png",
};

export default function TrialByDeclarationPage() {
  const [formData, setFormData] = useState<FormData>({
    NameOfCourt: "",
    CourtStreetAddress: "",
    CourtMailingAddress: "",
    CourtCityAndZipcode: "",
    CourtBranchName: "",
    CitationNumber: "",
    Defendant: "",
    DefendantAddress: "",
    CaseNumber: "",
    StatementOfFacts: "",
    PagesAttached: "",
    Date: "",
    PhotographsAmount: "",
    Photographs: false,
    MedicalRecord: false,
    RegistrationDocuments: false,
    InspectionCertificate: false,
    Diagram: false,
    CarRepairRecepit: false,
    InsuranceDocuments: false,
    Other: true,
    OtherSpecified: "Declaration",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [courts, setCourts] = useState<Courthouse[]>([]);
  const [loading, setLoading] = useState(false);
  const [allCourts, setAllCourts] = useState<Courthouse[]>([]);
  const [isSearchComplete, setIsSearchComplete] = useState(false);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        console.log("🔍 Fetching all courts data...");
        const response = await fetch("/api/courts");
        const data = await response.json();

        // API returns { courts: [...] }
        const courtsArray = data.courts || data || [];
        console.log("📊 Received courts:", Array.isArray(courtsArray) ? courtsArray.length : 0, "courts");

        // Ensure data is an array before setting
        if (Array.isArray(courtsArray)) {
          setAllCourts(courtsArray);
          console.log("✅ Successfully loaded", courtsArray.length, "courts");
        } else {
          console.log("⚠️ API returned non-array data:", data);
          setAllCourts([]);
        }
      } catch (error) {
        console.log("❌ Error fetching courts:", error);
        setAllCourts([]);
      }
    };

    fetchCourts();
  }, []);

  const searchCourts = async (term: string) => {
    if (!term) {
      setCourts([]);
      return;
    }

    setLoading(true);
    setIsSearchComplete(false);

    try {
      // Simulate a delay to show the loading state
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Safety check: ensure allCourts is an array
      if (!Array.isArray(allCourts)) {
        console.log("⚠️ allCourts is not an array yet");
        setCourts([]);
        setLoading(false);
        setIsSearchComplete(true);
        return;
      }

      const searchTerm = term.toLowerCase();
      const results = allCourts
        .filter(
          (court) =>
            court.courthouse_name.toLowerCase().includes(searchTerm) ||
            court.address.toLowerCase().includes(searchTerm) ||
            court.county.toLowerCase().includes(searchTerm)
        )
        .slice(0, 5);

      // Set results or show "Nothing found" if no matches
      if (results.length === 0) {
        setCourts([]); // Clear previous results
        console.log("🔍 No results found");
      } else {
        setCourts(results);
      }
    } catch (error) {
      console.log("❌ Error in search:", error);
    } finally {
      console.log("✅ Loading finished");
      setLoading(false);
      setIsSearchComplete(true);
    }
  };

  // Using useCallback to memoize the debounced search function
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      searchCourts(term);
    }, 500),
    [allCourts] // Only recreate when allCourts changes
  );

  useEffect(() => {
    if (searchTerm) {
      console.log("🕒 Debounced search triggered for:", searchTerm);
      debouncedSearch(searchTerm);
    } else {
      console.log("🧹 Clearing search results");
      setCourts([]);
      setLoading(false);
    }

    // Cleanup function
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  const handleCourtSelect = (court: Courthouse) => {
    // Split the address into lines
    const [streetAddressLine, cityAndStateZip] = court.address.split("\n");

    // Split city and zip on the comma
    const [cityAndState, zipCode] = cityAndStateZip.split(/\s(?=\d{5}$)/);

    // Extract city and state
    const city = cityAndState.trim();
    console.log({ streetAddressLine, zipCode, city });
    setFormData((prev) => ({
      ...prev,
      NameOfCourt: `Superior Court of California, County of ${court.county}`,
      CourtStreetAddress: streetAddressLine.trim(),
      CourtMailingAddress: streetAddressLine.trim(),
      CourtCityAndZipcode: `${city} ${zipCode}`,
      CourtBranchName: court.courthouse_name,
    }));

    setSearchTerm("");
    setCourts([]);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let newValue: string | boolean = value;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      newValue = e.target.checked;
    } else if (name === "Defendant") {
      newValue = value.toUpperCase();
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/generate-declaration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("PDF generation failed:", errorData);
        alert(`Error: ${errorData.error || "Failed to generate PDF"}`);
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Trial-by-Declaration.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("An unexpected error occurred while generating the PDF. Please try again.");
    }
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <main className="min-h-screen bg-white">
        <Navbar />

        {/* Hero Section with Tech Grid Background */}
        <div className="relative overflow-hidden border-b border-gray-200">
          {/* Tech Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(80,173,228,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(80,173,228,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

          {/* Animated Accent Lines */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#50ade4] to-transparent animate-[shimmer_3s_ease-in-out_infinite]"></div>

          <div className="relative px-4 py-8 sm:p-12 md:p-16 lg:p-20">
            <div className="max-w-7xl mx-auto">
              <div className="text-center">
                {/* Tech Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-mono tracking-wider rounded border border-gray-700 mb-4 sm:mb-6">
                  <span className="w-1.5 h-1.5 bg-[#50ade4] rounded-full animate-pulse"></span>
                  DOCUMENT GENERATOR: ACTIVE
                </div>

                <h1 className="font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl [text-wrap:balance] leading-[1.1] tracking-tight mb-4 sm:mb-6 px-2">
                  Automated{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-[#50ade4] to-gray-900">
                    Trial by Declaration
                  </span>
                  {" "}System
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-medium mb-6 sm:mb-8 px-4">
                  Fight your traffic ticket through our{" "}
                  <span className="text-gray-900 font-semibold">automated legal document pipeline</span>.{" "}
                  <span className="text-gray-900 font-semibold">Court-approved forms</span> generated in{" "}
                  <span className="text-[#50ade4] font-bold">under 5 minutes</span>.
                </p>

                {/* Tech Metrics */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
                  <div className="border border-gray-200 bg-white/50 backdrop-blur-sm p-2 sm:p-3 rounded-lg">
                    <div className="text-xl sm:text-2xl font-black text-[#50ade4] font-mono">$0</div>
                    <div className="text-[10px] sm:text-xs text-gray-600 font-medium tracking-wide">PROCESSING FEE</div>
                  </div>
                  <div className="border border-gray-200 bg-white/50 backdrop-blur-sm p-2 sm:p-3 rounded-lg">
                    <div className="text-xl sm:text-2xl font-black text-[#50ade4] font-mono">&lt;5m</div>
                    <div className="text-[10px] sm:text-xs text-gray-600 font-medium tracking-wide">GENERATION TIME</div>
                  </div>
                  <div className="border border-gray-200 bg-white/50 backdrop-blur-sm p-2 sm:p-3 rounded-lg">
                    <div className="text-xl sm:text-2xl font-black text-[#50ade4] font-mono">TR-205</div>
                    <div className="text-[10px] sm:text-xs text-gray-600 font-medium tracking-wide">COURT FORM</div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 font-mono">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  SYSTEM READY
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* What Is Section */}
          <div className="max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16">
            <div className="border border-gray-200 bg-white/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 lg:p-8">
              <div className="text-xs font-mono text-[#50ade4] uppercase tracking-wider mb-2 sm:mb-3">System Overview</div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 mb-3 sm:mb-4">
                Trial by Written Declaration Protocol
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                An official legal procedure allowing defendants to contest traffic citations via written submission.
                Eliminates court appearance requirements while maintaining full legal rights. Successful execution
                results in citation dismissal and financial recovery.
              </p>
            </div>
          </div>

          {/* How It Works Section - Tech Process Flow */}
          <div className="max-w-6xl mx-auto mb-8 sm:mb-12 lg:mb-16">
            <div className="text-center mb-6 sm:mb-8">
              <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2 sm:mb-3">Processing Pipeline</div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 px-4">System Workflow</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Step 1 */}
              <div className="group relative border border-gray-200 bg-white rounded-lg p-4 sm:p-6 hover:border-[#50ade4] transition-all">
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs sm:text-sm font-mono font-black">
                  01
                </div>
                <Edit3 className="w-7 h-7 sm:w-8 sm:h-8 text-[#50ade4] mb-3 sm:mb-4" />
                <h3 className="font-black text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">Input Data</h3>
                <p className="text-gray-600 text-sm">
                  Submit citation details and defense parameters through secure form interface.
                </p>
              </div>

              {/* Step 2 */}
              <div className="group relative border border-gray-200 bg-white rounded-lg p-4 sm:p-6 hover:border-[#50ade4] transition-all">
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs sm:text-sm font-mono font-black">
                  02
                </div>
                <Download className="w-7 h-7 sm:w-8 sm:h-8 text-[#50ade4] mb-3 sm:mb-4" />
                <h3 className="font-black text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">Generate PDF</h3>
                <p className="text-gray-600 text-sm">
                  Automated form population with instant TR-205 document compilation.
                </p>
              </div>

              {/* Step 3 */}
              <div className="group relative border border-gray-200 bg-white rounded-lg p-4 sm:p-6 hover:border-[#50ade4] transition-all">
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs sm:text-sm font-mono font-black">
                  03
                </div>
                <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-[#50ade4] mb-3 sm:mb-4" />
                <h3 className="font-black text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">Attach Payment</h3>
                <p className="text-gray-600 text-sm">
                  Include bail amount check as security deposit per legal requirements.
                </p>
              </div>

              {/* Step 4 */}
              <div className="group relative border border-gray-200 bg-white rounded-lg p-4 sm:p-6 hover:border-[#50ade4] transition-all">
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs sm:text-sm font-mono font-black">
                  04
                </div>
                <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-[#50ade4] mb-3 sm:mb-4" />
                <h3 className="font-black text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">Submit to Court</h3>
                <p className="text-gray-600 text-sm">
                  Mail signed documentation to court registry before deadline.
                </p>
              </div>

              {/* Step 5 - Success */}
              <div className="group relative border border-gray-200 bg-white rounded-lg p-4 sm:p-6 hover:border-[#50ade4] transition-all">
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs sm:text-sm font-mono font-black">
                  05
                </div>
                <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-[#50ade4] mb-3 sm:mb-4" />
                <h3 className="font-black text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">Positive Outcome</h3>
                <p className="text-gray-600 text-sm">
                  Citation dismissed. Bail deposit returned. No DMV points assigned.
                </p>
              </div>

              {/* Step 6 - Alternative */}
              <div className="group relative border border-gray-200 bg-white rounded-lg p-4 sm:p-6 hover:border-[#50ade4] transition-all">
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs sm:text-sm font-mono font-black">
                  06
                </div>
                <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8 text-[#50ade4] mb-3 sm:mb-4" />
                <h3 className="font-black text-gray-900 text-lg mb-2">Alternate Route</h3>
                <p className="text-gray-600 text-sm">
                  Trial de novo available. Full in-person court review option enabled.
                </p>
              </div>
            </div>
          </div>

          {/* Why Use Section - System Features */}
          <div className="max-w-5xl mx-auto mb-8 sm:mb-12 lg:mb-16">
            <div className="text-center mb-6 sm:mb-8">
              <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2 sm:mb-3">Core Features</div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 px-4">System Advantages</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="border border-gray-200 bg-white rounded-lg p-4 sm:p-6 flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#50ade4]/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#50ade4]" />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 mb-1 text-sm sm:text-base">Zero Cost Processing</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">No platform fees. No subscription. Completely free document generation.</p>
                </div>
              </div>

              <div className="border border-gray-200 bg-white rounded-lg p-4 sm:p-6 flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#50ade4]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#50ade4]" />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 mb-1 text-sm sm:text-base">Rapid Deployment</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">5-minute form completion. Instant PDF generation. Immediate download.</p>
                </div>
              </div>

              <div className="border border-gray-200 bg-white rounded-lg p-4 sm:p-6 flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#50ade4]/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#50ade4]" />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 mb-1 text-sm sm:text-base">Court-Compliant Format</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Official TR-205 template. Meets all California legal specifications.</p>
                </div>
              </div>

              <div className="border border-gray-200 bg-white rounded-lg p-4 sm:p-6 flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#50ade4]/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#50ade4]" />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 mb-1 text-sm sm:text-base">Simplified Interface</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Plain language inputs. No legal expertise required. Guided workflow.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Court Search Section */}
          <div className="max-w-5xl mx-auto mb-8 sm:mb-12">
            <div className="border border-gray-200 bg-white/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 lg:p-8">
              <div className="text-xs font-mono text-[#50ade4] uppercase tracking-wider mb-2 sm:mb-3">Step 1: Court Lookup</div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 mb-4 sm:mb-6">
                Locate Your Court Registry
              </h2>

              <Label htmlFor="courtSearch" className="text-sm font-semibold text-gray-900 mb-2 block">
                Search Court Database
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="courtSearch"
                  type="text"
                  placeholder="Enter court name, address, or county..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-gray-300 font-mono text-sm"
                  autoComplete="off"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>

              {/* Nothing Found Message */}
              {!loading && isSearchComplete && searchTerm && courts.length === 0 && (
                <div className="mt-4 text-center text-gray-500 font-mono text-sm">
                  NO RESULTS FOUND — TRY ALTERNATIVE SEARCH TERMS
                </div>
              )}

              {/* Loading State */}
              {loading && searchTerm && (
                <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-white">
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-5 w-3/4 bg-gray-200" />
                        <Skeleton className="h-4 w-full bg-gray-200" />
                        <Skeleton className="h-4 w-1/2 bg-gray-200" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Results */}
              {!loading && courts.length > 0 && (
                <div className="mt-4 border border-gray-200 rounded-lg bg-white overflow-hidden">
                  <div className="divide-y divide-gray-200">
                    {courts.map((court) => {
                      const handlesTraffic =
                        court.matters_served.includes("All") ||
                        court.matters_served.includes("Traffic");
                      return (
                        <button
                          key={court.id}
                          onClick={() => handleCourtSelect(court)}
                          className={cn(
                            "w-full text-left p-4 hover:bg-gray-50 transition-colors",
                            !handlesTraffic && "bg-yellow-50/50"
                          )}
                        >
                          <div className="font-bold text-gray-900 mb-1">
                            {court.courthouse_name}
                          </div>
                          <div className="text-sm text-gray-600 font-mono">
                            {court.address.split('\n').join(' • ')}
                          </div>
                          <div className="text-sm text-gray-500 font-mono mt-1">
                            COUNTY: {court.county.toUpperCase()}
                          </div>
                          {!handlesTraffic && (
                            <div className="mt-3 text-sm text-yellow-700 bg-yellow-100 px-3 py-2 rounded border border-yellow-200 font-mono">
                              ⚠ VERIFICATION REQUIRED — COURT MAY NOT PROCESS TRAFFIC VIOLATIONS
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Section */}
          <div className="max-w-5xl mx-auto">
            <div className="border border-gray-200 bg-white/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 lg:p-8 mb-8">
              <div className="text-xs font-mono text-[#50ade4] uppercase tracking-wider mb-2 sm:mb-3">Step 2: Document Generation</div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 mb-2">
                Complete Form TR-205
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Enter all required information below to generate your court-ready declaration.
              </p>

              <form
                onSubmit={handleSubmit}
                className="border border-gray-300 rounded-lg overflow-hidden bg-white"
              >
                {/* Court Information Header */}
                <div className="grid grid-cols-1 lg:grid-cols-4 border-b border-gray-300">
                  <div className="lg:col-span-3 p-3 sm:p-4 space-y-3 lg:border-r border-gray-300 bg-gray-50/50">
                    <div className="flex flex-col sm:flex-row sm:items-start space-y-1 sm:space-y-0 sm:space-x-3">
                      <Label
                        htmlFor="NameOfCourt"
                        className="sm:min-w-[140px] text-xs font-black sm:pt-2 text-gray-900"
                      >
                        NAME OF COURT:
                      </Label>
                      <Input
                        id="NameOfCourt"
                        name="NameOfCourt"
                        value={formData.NameOfCourt}
                        onChange={handleInputChange}
                        required
                        className="flex-1 h-9 text-sm font-mono"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-start space-y-1 sm:space-y-0 sm:space-x-3">
                      <Label
                        htmlFor="CourtStreetAddress"
                        className="sm:min-w-[140px] text-xs font-black sm:pt-2 text-gray-900"
                      >
                        STREET ADDRESS:
                      </Label>
                      <Input
                        id="CourtStreetAddress"
                        name="CourtStreetAddress"
                        value={formData.CourtStreetAddress}
                        onChange={handleInputChange}
                        required
                        className="flex-1 h-9 text-sm font-mono"
                        autoComplete="off"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-start space-y-1 sm:space-y-0 sm:space-x-3">
                      <Label
                        htmlFor="CourtMailingAddress"
                        className="sm:min-w-[140px] text-xs font-black sm:pt-2 text-gray-900"
                      >
                        MAILING ADDRESS:
                      </Label>
                      <Input
                        id="CourtMailingAddress"
                        name="CourtMailingAddress"
                        value={formData.CourtMailingAddress}
                        onChange={handleInputChange}
                        required
                        className="flex-1 h-9 text-sm font-mono"
                        autoComplete="off"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-start space-y-1 sm:space-y-0 sm:space-x-3">
                      <Label
                        htmlFor="CourtCityAndZipcode"
                        className="sm:min-w-[140px] text-xs font-black sm:pt-2 text-gray-900"
                      >
                        CITY AND ZIP CODE:
                      </Label>
                      <Input
                        id="CourtCityAndZipcode"
                        name="CourtCityAndZipcode"
                        value={formData.CourtCityAndZipcode}
                        onChange={handleInputChange}
                        required
                        className="flex-1 h-9 text-sm font-mono"
                        autoComplete="off"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-start space-y-1 sm:space-y-0 sm:space-x-3">
                      <Label
                        htmlFor="CourtBranchName"
                        className="sm:min-w-[140px] text-xs font-black sm:pt-2 text-gray-900"
                      >
                        BRANCH NAME:
                      </Label>
                      <Input
                        id="CourtBranchName"
                        name="CourtBranchName"
                        value={formData.CourtBranchName}
                        onChange={handleInputChange}
                        required
                        className="flex-1 h-9 text-sm font-mono"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-1 p-4 sm:p-6 bg-gray-900 text-white flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-gray-300">
                    <div className="font-black text-xl sm:text-2xl mb-1 sm:mb-2 font-mono">TR-205</div>
                    <div className="text-[10px] sm:text-xs text-center font-mono tracking-wider text-gray-400">
                      FOR COURT USE ONLY
                    </div>
                  </div>
                </div>

                {/* Title Section */}
                <div className="text-center py-6 border-b border-gray-300 bg-gray-50">
                  <div className="font-black text-gray-900 tracking-wide">PEOPLE OF THE STATE OF CALIFORNIA</div>
                  <div className="text-gray-600 my-2">vs.</div>
                  <div className="mt-4">
                    <div className="flex items-center justify-center space-x-3">
                      <Label htmlFor="Defendant" className="font-black text-gray-900 text-sm">
                        DEFENDANT:
                      </Label>
                      <Input
                        id="Defendant"
                        name="Defendant"
                        value={formData.Defendant}
                        onChange={handleInputChange}
                        required
                        className="max-w-md font-mono"
                        placeholder="ENTER FULL NAME"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Title */}
                <div className="text-center py-6 border-b border-gray-300 bg-gray-900 text-white">
                  <h1 className="font-black text-xl tracking-wider">
                    REQUEST FOR TRIAL BY WRITTEN DECLARATION
                  </h1>
                  <p className="text-sm font-mono mt-2 text-gray-400">(Vehicle Code, § 40902)</p>
                </div>

                {/* Citation and Case Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-gray-300">
                  <div className="p-4 sm:p-6 sm:border-r border-b sm:border-b-0 border-gray-300 bg-white">
                    <div className="space-y-2">
                      <Label htmlFor="CitationNumber" className="font-black text-xs text-gray-900">
                        CITATION NUMBER:
                      </Label>
                      <Input
                        id="CitationNumber"
                        name="CitationNumber"
                        value={formData.CitationNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full font-mono text-sm"
                      />
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 bg-white">
                    <div className="space-y-2">
                      <Label htmlFor="CaseNumber" className="font-black text-xs text-gray-900">
                        CASE NUMBER:
                      </Label>
                      <Input
                        id="CaseNumber"
                        name="CaseNumber"
                        value={formData.CaseNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Evidence Section */}
                <div className="p-4 sm:p-6 border-b border-gray-300 bg-gray-50/50">
                  <h3 className="font-black text-xs sm:text-sm mb-3 sm:mb-4 text-gray-900">
                    EVIDENCE: The following evidence supports my case and includes
                    everything I want the court to consider in deciding my case:
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="Photographs"
                          name="Photographs"
                          checked={formData.Photographs}
                          onChange={handleInputChange}
                          className="h-4 w-4 rounded border-gray-300 text-[#50ade4]"
                        />
                        <Label htmlFor="Photographs" className="text-sm font-medium">Photographs</Label>
                        {formData.Photographs && (
                          <Input
                            id="PhotographsAmount"
                            name="PhotographsAmount"
                            type="number"
                            value={formData.PhotographsAmount}
                            onChange={handleInputChange}
                            placeholder="Total"
                            className="w-20 h-8 text-sm"
                          />
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="MedicalRecord"
                          name="MedicalRecord"
                          checked={formData.MedicalRecord}
                          onChange={handleInputChange}
                          className="h-4 w-4 rounded border-gray-300 text-[#50ade4]"
                        />
                        <Label htmlFor="MedicalRecord" className="text-sm font-medium">Medical Record</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="RegistrationDocuments"
                          name="RegistrationDocuments"
                          checked={formData.RegistrationDocuments}
                          onChange={handleInputChange}
                          className="h-4 w-4 rounded border-gray-300 text-[#50ade4]"
                        />
                        <Label htmlFor="RegistrationDocuments" className="text-sm font-medium">
                          Registration Documents
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="InspectionCertificate"
                          name="InspectionCertificate"
                          checked={formData.InspectionCertificate}
                          onChange={handleInputChange}
                          className="h-4 w-4 rounded border-gray-300 text-[#50ade4]"
                        />
                        <Label htmlFor="InspectionCertificate" className="text-sm font-medium">
                          Inspection Certificate
                        </Label>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="Diagram"
                          name="Diagram"
                          checked={formData.Diagram}
                          onChange={handleInputChange}
                          className="h-4 w-4 rounded border-gray-300 text-[#50ade4]"
                        />
                        <Label htmlFor="Diagram" className="text-sm font-medium">Diagram</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="CarRepairRecepit"
                          name="CarRepairRecepit"
                          checked={formData.CarRepairRecepit}
                          onChange={handleInputChange}
                          className="h-4 w-4 rounded border-gray-300 text-[#50ade4]"
                        />
                        <Label htmlFor="CarRepairRecepit" className="text-sm font-medium">Car Repair Receipt</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="InsuranceDocuments"
                          name="InsuranceDocuments"
                          checked={formData.InsuranceDocuments}
                          onChange={handleInputChange}
                          className="h-4 w-4 rounded border-gray-300 text-[#50ade4]"
                        />
                        <Label htmlFor="InsuranceDocuments" className="text-sm font-medium">
                          Insurance Documents
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="Other"
                          name="Other"
                          checked={formData.Other}
                          onChange={handleInputChange}
                          className="h-4 w-4 rounded border-gray-300 text-[#50ade4]"
                        />
                        <Label htmlFor="Other" className="text-sm font-medium">Other</Label>
                        {formData.Other && (
                          <Input
                            id="OtherSpecified"
                            name="OtherSpecified"
                            value={formData.OtherSpecified}
                            onChange={handleInputChange}
                            placeholder="Specify"
                            className="flex-1 h-8 text-sm"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statement of Facts */}
                <div className="p-4 sm:p-6 border-b border-gray-300 bg-white">
                  <Label
                    htmlFor="StatementOfFacts"
                    className="block font-black text-xs sm:text-sm mb-2 sm:mb-3 text-gray-900"
                  >
                    STATEMENT OF FACTS
                  </Label>
                  <textarea
                    id="StatementOfFacts"
                    name="StatementOfFacts"
                    value={formData.StatementOfFacts}
                    onChange={handleInputChange}
                    required
                    className="w-full min-h-[150px] sm:min-h-[200px] p-3 sm:p-4 border border-gray-300 rounded-lg font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#50ade4] focus:border-transparent"
                    placeholder="Enter detailed explanation of circumstances and defense arguments..."
                  />
                </div>

                {/* Date Section */}
                <div className="p-4 sm:p-6 border-b border-gray-300 bg-gray-50/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="DefendantAddress"
                        className="block font-black text-xs text-gray-900"
                      >
                        DEFENDANT ADDRESS:
                      </Label>
                      <textarea
                        id="DefendantAddress"
                        name="DefendantAddress"
                        value={formData.DefendantAddress}
                        onChange={handleInputChange}
                        required
                        className="w-full min-h-[80px] p-3 border border-gray-300 rounded-lg font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#50ade4] focus:border-transparent"
                        placeholder="Enter your current mailing address"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="Date" className="block font-black text-xs text-gray-900">
                        DATE:
                      </Label>
                      <Input
                        id="Date"
                        name="Date"
                        type="date"
                        value={formData.Date}
                        onChange={handleInputChange}
                        required
                        className="w-full h-11 sm:h-12 font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="p-4 sm:p-6 bg-white">
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="group relative w-full h-12 sm:h-14 bg-gray-900 text-white font-black text-sm sm:text-base rounded-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#50ade4] to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 font-mono tracking-wider">
                      <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                      GENERATE DOCUMENT
                    </span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
