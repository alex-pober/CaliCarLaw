"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import Navbar from "@/app/components/Navbar";
import { Search, X } from "lucide-react";
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
  url: "https://calicarlaw.com/free-trial-by-declaration",
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
        setAllCourts(data);
        console.log("✅ Successfully loaded courts data");
      } catch (error) {
        console.log("❌ Error fetching courts:", error);
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
        throw new Error("Failed to generate PDF");
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
      console.log("Error generating PDF:", error);
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
      <main className="min-h-screen">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8  ">
          <div className="relative isolate overflow-hidden rounded-3xl">
            {/* <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#50ade4] to-[#13a8ff] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}} />
          </div> */}

            <div className="mx-auto max-w-4xl py-16 sm:py-24">
              <div className="text-center">
                <h1 className="mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">
                  Contest Your Traffic Ticket From Home
                  <span className="block text-2xl sm:text-3xl mt-4 font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text">
                    Free Trial by Declaration Tool
                  </span>
                </h1>

                <div className="relative rounded-xl border border-blue-100 bg-white/50 backdrop-blur-sm p-6 shadow-lg">
                  {/* <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                  <div className="relative left-[calc(50%-20rem)] aspect-[1155/678] w-[27.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#50ade4] to-[#13a8ff] opacity-10 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]" />
                </div> */}

                  <p className="text-lg sm:text-xl leading-8 text-gray-600">
                    Save time, skip the courtroom, and fight your traffic ticket
                    in writing. Our free Trial by Written Declaration generator
                    creates a court-ready statement instantly.
                  </p>
                  <p className="mt-4 text-lg sm:text-xl leading-8 text-gray-600">
                    No lawyers, no lines, no hassle—just a simple step-by-step
                    form that could help you reduce or dismiss your ticket.
                  </p>

                  <div className="mt-8 flex justify-center gap-4 round">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>100% Free</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.414l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>5 Minute Process</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Court Approved</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#50ade4] to-[#13a8ff] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}} />
          </div> */}
          </div>

          {/* What Is Section */}
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              What Is a Trial by Written Declaration?
            </h2>
            <p className="text-lg text-gray-600">
              A Trial by Written Declaration is an official way to fight a
              traffic ticket by mail. Instead of appearing in court, you submit
              a written defense. If successful, you can avoid fines, points on
              your record, and wasted time in court.
            </p>
          </div>

          {/* How It Works Section */}
          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Process Steps */}
              <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  <div className="text-xl font-semibold text-gray-900">
                    1. Fill Out Form
                  </div>
                </div>
                <p className="text-gray-600 ml-[3.25rem]">
                  Enter your traffic ticket details and defense statement in our
                  simple form.
                </p>
              </div>

              <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </div>
                  <div className="text-xl font-semibold text-gray-900">
                    2. Download
                  </div>
                </div>
                <p className="text-gray-600 ml-[3.25rem]">
                  Instantly receive your personalized declaration document.
                </p>
              </div>

              <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="text-xl font-semibold text-gray-900">
                    3. Add Payment
                  </div>
                </div>
                <p className="text-gray-600 ml-[3.25rem]">
                  Include a check for your ticket amount with your declaration.
                </p>
              </div>

              <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="text-xl font-semibold text-gray-900">
                    4. Mail It In
                  </div>
                </div>
                <p className="text-gray-600 ml-[3.25rem]">
                  Submit your signed documents to the court before the deadline.
                </p>
              </div>

              <div className="bg-gradient-to-br from-white to-green-50 p-6 rounded-xl shadow-md border border-green-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-xl font-semibold text-gray-900">
                    If You Win
                  </div>
                </div>
                <p className="text-gray-600 ml-[3.25rem]">
                  Your ticket is dismissed and the court returns your payment.
                </p>
              </div>

              <div className="bg-gradient-to-br from-white to-orange-50 p-6 rounded-xl shadow-md border border-orange-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 rounded-full p-3 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-orange-600"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="text-xl font-semibold text-gray-900">
                    If You Lose
                  </div>
                </div>
                <p className="text-gray-600 ml-[3.25rem]">
                  You can file a Trial De Novo to contest the ticket again in
                  court.
                </p>
              </div>
            </div>
          </div>

          {/* Why Use Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6 text-center">
              Why Use Our Free Tool?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">No Fees</h3>
                  <p className="text-gray-600">
                    Totally free. No hidden costs.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Convenient & Fast
                  </h3>
                  <p className="text-gray-600">
                    Complete it in minutes from any device.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Professional Format
                  </h3>
                  <p className="text-gray-600">
                    Automatically tailored to meet court requirements.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path
                      fillRule="evenodd"
                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    No Legal Jargon
                  </h3>
                  <p className="text-gray-600">
                    Plain language prompts make it easy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Get Started Section */}
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Fill out the form below to generate your FREE Trial by Declaration
              now.
            </p>
          </div>

          {/* Court Search Section */}
          <div className="mb-8 max-w-5xl mx-auto">
            <Label htmlFor="courtSearch">Find the court address</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                id="courtSearch"
                type="text"
                placeholder="Search by court name, address, or county..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                autoComplete="off"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

{/* Nothing Found Message */}
{!loading && isSearchComplete && searchTerm && courts.length === 0 && (
        <div className="mt-2 text-center text-gray-500">
          No courts found. Try a different search term.
        </div>
      )}

            {/* Loading State */}
            {loading && searchTerm && (
              <Card className="mt-2 max-w-5xl mx-auto">
                <CardContent className="p-2">
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Search Results */}
            {!loading && courts.length > 0 && (
              <Card className="mt-2 max-w-5xl mx-auto animate-in fade-in">
                <CardContent className="p-2">
                  <div className="space-y-2">
                    {courts.map((court) => {
                      const handlesTraffic =
                        court.matters_served.includes("All") ||
                        court.matters_served.includes("Traffic");
                      return (
                        <button
                          key={court.id}
                          onClick={() => handleCourtSelect(court)}
                          className={cn(
                            "w-full text-left p-2 hover:bg-gray-100 rounded-md transition-colors",
                            !handlesTraffic &&
                              "border-l-4 border-yellow-400 bg-yellow-50"
                          )}
                        >
                          <div className="font-medium">
                            {court.courthouse_name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {court.address}
                          </div>
                          <div className="text-sm text-gray-500">
                            County of {court.county}
                          </div>
                          {!handlesTraffic && (
                            <div className="mt-2 text-sm text-yellow-600 bg-yellow-50 p-2 rounded">
                              ⚠️ This location may not handle traffic
                              violations. Please verify by calling the
                              courthouse or checking their website.
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="max-w-5xl mx-auto outline outline-1 outline-gray-300 rounded-lg"
          >
            <div className="grid grid-cols-4 border-b border-gray-300">
              <div className="col-span-3 p-3 space-y-0.5 border-r border-gray-300">
                <div className="flex items-start space-x-2">
                  <Label
                    htmlFor="NameOfCourt"
                    className="min-w-[140px] text-sm font-bold pt-2"
                  >
                    NAME OF COURT:
                  </Label>
                  <Input
                    id="NameOfCourt"
                    name="NameOfCourt"
                    value={formData.NameOfCourt}
                    onChange={handleInputChange}
                    required
                    className="flex-1 h-8 focus-visible:ring-0"
                  />
                </div>
                <div className="flex items-start space-x-2">
                  <Label
                    htmlFor="CourtStreetAddress"
                    className="min-w-[140px] text-sm font-bold pt-2"
                  >
                    STREET ADDRESS:
                  </Label>
                  <Input
                    id="CourtStreetAddress"
                    name="CourtStreetAddress"
                    value={formData.CourtStreetAddress}
                    onChange={handleInputChange}
                    required
                    className="flex-1 h-8 focus-visible:ring-0"
                    autoComplete="off"
                  />
                </div>
                <div className="flex items-start space-x-2">
                  <Label
                    htmlFor="CourtMailingAddress"
                    className="min-w-[140px] text-sm font-bold pt-2"
                  >
                    MAILING ADDRESS:
                  </Label>
                  <Input
                    id="CourtMailingAddress"
                    name="CourtMailingAddress"
                    value={formData.CourtMailingAddress}
                    onChange={handleInputChange}
                    required
                    className="flex-1 h-8 focus-visible:ring-0"
                    autoComplete="off"
                  />
                </div>
                <div className="flex items-start space-x-2">
                  <Label
                    htmlFor="CourtCityAndZipcode"
                    className="min-w-[140px] text-sm font-bold pt-2"
                  >
                    CITY AND ZIP CODE:
                  </Label>
                  <Input
                    id="CourtCityAndZipcode"
                    name="CourtCityAndZipcode"
                    value={formData.CourtCityAndZipcode}
                    onChange={handleInputChange}
                    required
                    className="flex-1 h-8 focus-visible:ring-0"
                    autoComplete="off"
                  />
                </div>
                <div className="flex items-start space-x-2">
                  <Label
                    htmlFor="CourtBranchName"
                    className="min-w-[140px] text-sm font-bold pt-2"
                  >
                    BRANCH NAME:
                  </Label>
                  <Input
                    id="CourtBranchName"
                    name="CourtBranchName"
                    value={formData.CourtBranchName}
                    onChange={handleInputChange}
                    required
                    className="flex-1 h-8 focus-visible:ring-0"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="col-span-1 p-4 bg-gray-50">
                <div className="text-center font-bold text-lg mb-4">TR-205</div>
                <div className="text-center text-sm text-gray-600">
                  FOR COURT USE ONLY
                </div>
              </div>
            </div>

            {/* Title Section */}
            <div className="text-center py-4 border-b border-gray-300 bg-gray-50">
              <div className="font-bold">PEOPLE OF THE STATE OF CALIFORNIA</div>
              <div>vs.</div>
              <div className="mt-4">
                <div className="flex items-center justify-center space-x-2">
                  <Label htmlFor="Defendant" className="font-bold">
                    DEFENDANT:
                  </Label>
                  <Input
                    id="Defendant"
                    name="Defendant"
                    value={formData.Defendant}
                    onChange={handleInputChange}
                    required
                    className="max-w-md"
                    placeholder="Your Name"
                  />
                </div>
              </div>
            </div>

            {/* Form Title */}
            <div className="text-center py-4 border-b border-gray-300 bg-gray-50">
              <h1 className="font-bold text-lg">
                REQUEST FOR TRIAL BY WRITTEN DECLARATION
              </h1>
              <p className="text-sm">(Vehicle Code, § 40902)</p>
            </div>

            {/* Citation and Case Number */}
            <div className="grid grid-cols-2 border-b border-gray-300">
              <div className="p-4 border-r border-gray-300">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="CitationNumber" className="font-bold">
                    CITATION NUMBER:
                  </Label>
                  <Input
                    id="CitationNumber"
                    name="CitationNumber"
                    value={formData.CitationNumber}
                    onChange={handleInputChange}
                    required
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="CaseNumber" className="font-bold">
                    CASE NUMBER:
                  </Label>
                  <Input
                    id="CaseNumber"
                    name="CaseNumber"
                    value={formData.CaseNumber}
                    onChange={handleInputChange}
                    required
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            {/* Evidence Section */}
            <div className="p-4 border-b border-gray-300">
              <h3 className="font-bold mb-4">
                EVIDENCE: The following evidence supports my case and includes
                everything I want the court to consider in deciding my case:
              </h3>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  {/* Left Column */}
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      id="Photographs"
                      name="Photographs"
                      checked={formData.Photographs}
                      onChange={handleInputChange}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="Photographs">Photographs</Label>
                    {formData.Photographs && (
                      <Input
                        id="PhotographsAmount"
                        name="PhotographsAmount"
                        type="number"
                        value={formData.PhotographsAmount}
                        onChange={handleInputChange}
                        placeholder="Specify total number"
                        className="w-24"
                      />
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      id="MedicalRecord"
                      name="MedicalRecord"
                      checked={formData.MedicalRecord}
                      onChange={handleInputChange}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="MedicalRecord">Medical Record</Label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      id="RegistrationDocuments"
                      name="RegistrationDocuments"
                      checked={formData.RegistrationDocuments}
                      onChange={handleInputChange}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="RegistrationDocuments">
                      Registration Documents
                    </Label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      id="InspectionCertificate"
                      name="InspectionCertificate"
                      checked={formData.InspectionCertificate}
                      onChange={handleInputChange}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="InspectionCertificate">
                      Inspection Certificate
                    </Label>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Right Column */}
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      id="Diagram"
                      name="Diagram"
                      checked={formData.Diagram}
                      onChange={handleInputChange}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="Diagram">Diagram</Label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      id="CarRepairRecepit"
                      name="CarRepairRecepit"
                      checked={formData.CarRepairRecepit}
                      onChange={handleInputChange}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="CarRepairRecepit">Car Repair Receipt</Label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      id="InsuranceDocuments"
                      name="InsuranceDocuments"
                      checked={formData.InsuranceDocuments}
                      onChange={handleInputChange}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="InsuranceDocuments">
                      Insurance Documents
                    </Label>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      id="Other"
                      name="Other"
                      checked={formData.Other}
                      onChange={handleInputChange}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="Other">Other</Label>
                    {formData.Other && (
                      <Input
                        id="OtherSpecified"
                        name="OtherSpecified"
                        value={formData.OtherSpecified}
                        onChange={handleInputChange}
                        placeholder="Specify"
                        className="flex-1"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Statement of Facts */}
            <div className="p-4 border-b border-gray-300">
              <Label
                htmlFor="StatementOfFacts"
                className="block font-bold mb-2"
              >
                STATEMENT OF FACTS
              </Label>
              <textarea
                id="StatementOfFacts"
                name="StatementOfFacts"
                value={formData.StatementOfFacts}
                onChange={handleInputChange}
                required
                className="w-full min-h-[200px] p-2 border rounded-md"
                placeholder="Please provide a detailed statement of facts..."
              />
            </div>

            {/* Date Section */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 p-4 border-b border-gray-300">
              <div className="flex items-center space-x-2 flex-1">
                <Label
                  htmlFor="DefendantAddress"
                  className="text-sm font-bold pt-2 whitespace-nowrap"
                >
                  ADDRESS:
                </Label>
                <textarea
                  id="DefendantAddress"
                  name="DefendantAddress"
                  value={formData.DefendantAddress}
                  onChange={handleInputChange}
                  required
                  className="w-sm min-h-[50px] p-2 border rounded-md"
                  placeholder="Your Current Address"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="Date" className="font-bold whitespace-nowrap">
                  DATE:
                </Label>
                <Input
                  id="Date"
                  name="Date"
                  type="date"
                  value={formData.Date}
                  onChange={handleInputChange}
                  required
                  className="w-48"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="p-4">
              <Button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
              >
                Generate Trial by Declaration Form
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
