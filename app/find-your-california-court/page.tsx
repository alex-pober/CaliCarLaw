/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import debounce from "lodash/debounce";
import { Input } from "@/app/components/ui/input";
import { Card, CardHeader, CardContent } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Badge } from "@/app/components/ui/badge";
import { MarkdownRenderer } from "@/lib/md-rendered";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { getAllCourtsAction, datasetAction } from "./actions";
import {
  Search,
  MapPin,
  Building2,
  CalendarDays,
  CreditCard,
  Globe,
  Phone,
  FileText,
  Car,
  Bus,
  Clock,
  ExternalLink,
} from "lucide-react";
import Script from "next/script";

interface Courthouse {
  more_info: string;
  id: number;
  courthouse_name: string;
  address: string;
  phone_number: string;
  courthouse_page_url: string;
  matters_served: string;
  hours_building: JSON;
  hours_clerk: JSON;
  hours_self_help: JSON;
  parking: string;
  transportation: string;
  photo: string;
  county: string;
  custom_button: {
    url: string;
    label: string;
  }[];
}

const formatHours = (hoursObj: any) => {
  if (!hoursObj) return "Hours not available";

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const hours = days.map((day) => hoursObj[day]?.replace(" - ", "-"));

  // Check if all weekdays have the same hours
  const allSameHours = hours.every((h) => h === hours[0]);

  if (allSameHours && hours[0]) {
    return `Monday - Friday: ${hours[0]}`;
  }

  // If hours vary, show each day
  return days
    .filter((day) => hoursObj[day])
    .map((day) => `${day}: ${hoursObj[day]?.replace(" - ", "-")}`)
    .join("\n");
};

export default function FindYourCourt() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courts, setCourts] = useState<Courthouse[]>([]);
  const [loading, setLoading] = useState(false);
  const [allCourts, setAllCourts] = useState<Courthouse[]>([]);
  const [dataset, setDataset] = useState<any[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courts, datasetResult] = await Promise.all([
          getAllCourtsAction(),
          datasetAction()
        ]);
        setAllCourts(courts);
        setDataset(datasetResult);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const searchCourts = async (term: string) => {
    if (!term) {
      setCourts([]);
      return;
    }

    setLoading(true);
    console.log("Searching for term:", term);

    try {
      // Use the already fetched courts from state
      console.log("Filtering cached courts for:", term);

      // Client-side filtering
      const searchTerm = term.toLowerCase();
      const results = allCourts
        .filter(
          (court) =>
            court.courthouse_name.toLowerCase().includes(searchTerm) ||
            court.address.toLowerCase().includes(searchTerm) ||
            court.county.toLowerCase().includes(searchTerm)
        )
        .slice(0, 10); // Keep the 10 limit for UI purposes

      console.log(`Found ${results.length} matches for: ${term}`);
      setCourts(results);
    } catch (error) {
      console.log("Error in search:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce(searchCourts, 500);

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  // Handle input focus on mobile
  const handleInputFocus = () => {
    if (window.innerWidth <= 768) { // Mobile breakpoint
      setTimeout(() => {
        const inputElement = searchInputRef.current;
        if (inputElement) {
          const rect = inputElement.getBoundingClientRect();
          const scrollPosition = window.scrollY + rect.top - 20; // 20px offset for padding
          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth',
          });
        }
      }, 300); // Slight delay to allow keyboard to open
    }
  };

  return (
    <div className="bg-gray-50">
      {dataset.length > 0 && (
        <Script
          id="court-directory-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(dataset, null, 2),
          }}
        />
      )}
      <nav className="drop-shadow-sm max-w-6xl mx-auto">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link
              href="https://californiacarlaw.com"
              className="flex items-center space-x-2"
            >
              <Image
                src="/images/logos/CaliforniaCarLaw-Logo.svg"
                alt="California Car Law"
                width={150}
                height={32}
                className="p-4"
                priority
              />
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="https://californiacarlaw.com/contact"
                className="text-gray-500 hover:text-gray-700 text-sm font-medium"
              >
                Contact
              </Link>
              <Link
                href="https://californiacarlaw.com/blog"
                className="text-gray-500 hover:text-gray-700 text-sm font-medium"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-gray-50">
        <div className="mb-12 relative overflow-hidden p-2 md:p-12 w-full">
          <div className="max-w-4xl mx-auto">
            {/* Background Pattern */}
            {/* <div className="absolute inset-0 opacity-30">
              <svg
                className="w-full h-full"
                preserveAspectRatio="none"
                viewBox="0 0 100% 100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="grey"
                    strokeWidth="1"
                  />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div> */}

            {/* SEO Content */}
            <div className="max-w-4xl text-center relative z-10 mb-12 mt-8 md:mt-36">
              <h2 className="text-6xl font-semibold bg-gradient-to-r from-[#50ade4] to-[#2980b9] pb-1 bg-clip-text text-transparent">
                California Court Directory
              </h2>
              <p className="mt-2 text-grey">
                Find your court, links to pay your traffic tickets, and
                everything else courts make difficult to find.
              </p>
            </div>

            {/* Search Section */}
            <div className="max-w-4xl flex-1 relative mx-auto">
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Search by city, county, or courthouse name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  debouncedSearch(e.target.value);
                }}
                onFocus={handleInputFocus}
                className="pl-10 h-12 text-lg w-full border border-gray-200 rounded-lg shadow-lg placeholder:text-sm sm:placeholder:text-lg bg-white mb-4"
              />
              {/*Badges*/}
              {searchTerm && (
                <div className="mb-4 flex items-center gap-2">
                  <Badge
                    variant={
                      courts.length === 0 && !loading
                        ? "destructive"
                        : "secondary"
                    }
                    className="border border-slate-200 text-xs font-normal text-nowrap"
                  >
                    {loading
                      ? "Searching..."
                      : courts.length === 0
                      ? "No courts found"
                      : `${courts.length} court${
                          courts.length === 1 ? "" : "s"
                        } found`}
                  </Badge>
                  {searchTerm.length >= 2 && (
                    <span className="text-xs grey font-bold">
                      searched in court names, address, and county.
                    </span>
                  )}
                </div>
              )}
            </div>

            {/*Courts List*/}
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              courts.length > 0 && (
                <div className="space-y-6">
                  {courts.map((court) => (
                    <Card
                      key={court.id}
                      className="border-l-4 border-l-[#50ade4] hover:shadow-lg transition-shadow overflow-hidden"
                    >
                      <CardHeader className="pb-2 bg-gradient-to-r from-[#f8fbfd] to-white">
                        <h2 className="text-2xl font-bold text-[#3d8ab8] md:text-3xl">
                          {court.courthouse_name}
                        </h2>
                      </CardHeader>
                      <CardContent className="text-black p-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                          {/* Basic Information Section */}
                          <div className="space-y-4">
                            <div className="flex flex-col space-y-3 bg-white rounded-md">
                              <p className="flex flex-col sm:flex-row sm:items-start gap-2">
                                <span className="font-semibold min-w-[100px] flex items-center gap-2 text-[#3d8ab8]">
                                  <MapPin className="h-4 w-4 text-[#50ade4] flex-shrink-0" />
                                  Address:
                                </span>
                                <span className="text-gray-700">{court.address}</span>
                              </p>
                              <p className="flex flex-col sm:flex-row sm:items-start gap-2">
                                <span className="font-semibold min-w-[100px] flex items-center gap-2 text-[#3d8ab8]">
                                  <Phone className="h-4 w-4 text-[#50ade4] flex-shrink-0" />
                                  Phone:
                                </span>
                                <span className="text-gray-700">{court.phone_number}</span>
                              </p>
                              <p className="flex flex-col sm:flex-row sm:items-start gap-2">
                                <span className="font-semibold min-w-[100px] flex items-center gap-2 text-[#3d8ab8]">
                                  <Building2 className="h-4 w-4 text-[#50ade4] flex-shrink-0" />
                                  County:
                                </span>
                                <span className="text-gray-700">{court.county}</span>
                              </p>
                              {court.matters_served && (
                                <p className="flex flex-col sm:flex-row sm:items-start gap-2">
                                  <span className="font-semibold min-w-[100px] flex items-center gap-2 text-[#3d8ab8]">
                                    <FileText className="h-4 w-4 text-[#50ade4] flex-shrink-0" />
                                    Matters:
                                  </span>
                                  <span className="text-gray-700">{court.matters_served}</span>
                                </p>
                              )}
                            </div>

                            {/* Transportation Section */}
                            {((court.parking && court.parking !== "N/A") ||
                              (court.transportation &&
                                court.transportation !== "N/A")) && (
                              <div className="space-y-3 pt-4 border-t border-gray-100">
                                {court.parking && court.parking !== "N/A" && (
                                  <p className="flex flex-col sm:flex-row sm:items-start gap-2">
                                    <span className="font-semibold min-w-[100px] flex items-center gap-2 text-[#3d8ab8]">
                                      <Car className="h-4 w-4 text-[#50ade4] flex-shrink-0" />
                                      Parking:
                                    </span>
                                    <span className="text-gray-700">{court.parking}</span>
                                  </p>
                                )}
                                {court.transportation &&
                                  court.transportation !== "N/A" && (
                                    <p className="flex flex-col sm:flex-row sm:items-start gap-2">
                                      <span className="font-semibold min-w-[100px] flex items-center gap-2 text-[#3d8ab8]">
                                        <Bus className="h-4 w-4 text-[#50ade4] flex-shrink-0" />
                                        Transit:
                                      </span>
                                      <span className="text-gray-700">{court.transportation}</span>
                                    </p>
                                  )}
                              </div>
                            )}
                          </div>

                          {/* Hours Section */}
                          <div className="space-y-4">
                            {(court.hours_building ||
                              court.hours_clerk ||
                              court.hours_self_help) && (
                              <div className="bg-[#f8fbfd] p-4 rounded-md shadow-sm">
                                {court.hours_building && (
                                  <div className="mb-4">
                                    <h3 className="font-semibold text-[#3d8ab8] mb-2 flex items-center gap-2">
                                      <Clock className="h-4 w-4 flex-shrink-0" />
                                      Building Hours
                                    </h3>
                                    <div className="whitespace-pre-line text-sm text-gray-700 pl-6">
                                      {formatHours(court.hours_building)}
                                    </div>
                                  </div>
                                )}
                                {court.hours_clerk && (
                                  <div className="mb-4">
                                    <h3 className="font-semibold text-[#3d8ab8] mb-2 flex items-center gap-2">
                                      <Clock className="h-4 w-4 flex-shrink-0" />
                                      Clerk Hours
                                    </h3>
                                    <div className="whitespace-pre-line text-sm text-gray-700 pl-6">
                                      {formatHours(court.hours_clerk)}
                                    </div>
                                  </div>
                                )}
                                {court.hours_self_help && (
                                  <div>
                                    <h3 className="font-semibold text-[#3d8ab8] mb-2 flex items-center gap-2">
                                      <Clock className="h-4 w-4 flex-shrink-0" />
                                      Self-Help Hours
                                    </h3>
                                    <div className="whitespace-pre-line text-sm text-gray-700 pl-6">
                                      {formatHours(court.hours_self_help)}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Additional Information Section */}
                        <div className="mt-2 pt-4 border-t border-gray-100 bg-white">
                          <div className="grid grid-cols-1 gap-4 p-4">
                            {court.courthouse_page_url && (
                              <Button
                                asChild
                                className="p-0 bg-[#3d8ab8] hover:bg-[#2d6a8f] text-white rounded-md shadow-sm hover:shadow transition-all duration-200 w-full overflow-hidden h-auto"
                              >
                                <Link
                                  href={court.courthouse_page_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full h-full flex items-center justify-center p-3"
                                >
                                  <div className="flex flex-col items-center text-center">
                                    <div className="text-sm md:text-base whitespace-normal break-words">Visit Court Website</div>
                                  </div>
                                  <ExternalLink className="h-4 w-4 flex-shrink-0" />
                                </Link>
                              </Button>
                            )}

                            {/* Custom Buttons */}
                            {court.custom_button &&
                              court.custom_button.length > 0 && (
                                <div className={`grid ${court.custom_button.length > 2 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : court.custom_button.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'} gap-4 w-full`}>
                                  {court.custom_button.map((button, index) => (
                                    <Button
                                      asChild
                                      key={index}
                                      className="p-0 bg-[#3d8ab8] hover:bg-[#2d6a8f] text-white rounded-md shadow-sm hover:shadow transition-all duration-200 w-full overflow-hidden h-auto"
                                    >
                                      <Link
                                        href={button.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full h-full flex items-center justify-center p-3"
                                      >
                                        <div className="flex flex-col items-center text-center">
                                          <div className="text-sm md:text-base whitespace-normal break-words">{button.label}</div>
                                        </div>
                                      </Link>
                                    </Button>
                                  ))}
                                </div>
                              )}
                          </div>
                        </div>
                        {court.more_info && (
                          <div className="prose prose-sm max-w-none p-4 pt-0">
                            <MarkdownRenderer content={court.more_info} />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )
            )}
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Court Website Card */}
          <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-all duration-300 border border-blue-100/50">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-2xl transform group-hover:scale-[0.98] transition-transform duration-300"></div>
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="p-2.5 bg-blue-600 rounded-xl">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="ml-3 text-xl font-semibold text-gray-900">
                  Court Websites Made Easy
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Find your local court&apos;s official website instantly. Our
                directory helps you navigate directly to your court&apos;s online
                services, avoiding confusing government portals and outdated
                links.
              </p>
            </div>
          </div>

          {/* Look Up Ticket Card */}
          <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 hover:shadow-lg transition-all duration-300 border border-emerald-100/50">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl transform group-hover:scale-[0.98] transition-transform duration-300"></div>
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="p-2.5 bg-emerald-600 rounded-xl">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <h3 className="ml-3 text-xl font-semibold text-gray-900">
                  Quick Ticket Lookup
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Search your court above to access their ticket lookup system.
                Get instant access to your citation details, fine amounts, and
                case information through your court&apos;s official portal.
              </p>
            </div>
          </div>

          {/* Pay Ticket Card */}
          <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 hover:shadow-lg transition-all duration-300 border border-violet-100/50">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 rounded-2xl transform group-hover:scale-[0.98] transition-transform duration-300"></div>
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="p-2.5 bg-violet-600 rounded-xl">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <h3 className="ml-3 text-xl font-semibold text-gray-900">
                  Secure Online Payments
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Most California courts offer 24/7 online payment options. Find
                your court above to access their official payment system and
                settle your ticket securely from anywhere.
              </p>
            </div>
          </div>

          {/* Court Date Card */}
          <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 hover:shadow-lg transition-all duration-300 border border-rose-100/50">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-pink-500/5 rounded-2xl transform group-hover:scale-[0.98] transition-transform duration-300"></div>
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="p-2.5 bg-rose-600 rounded-xl">
                  <CalendarDays className="h-6 w-6 text-white" />
                </div>
                <h3 className="ml-3 text-xl font-semibold text-gray-900">
                  Court Date Information
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Need your court date? Search your court above to check
                appearance schedules, get courthouse directions, and find
                essential traffic division information all in one place.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 max-w-6xl mx-auto">
          <div className="p-6 bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl border border-gray-200/80 shadow-sm">
            <div className="flex items-center justify-center mb-3">
              <div className="h-px w-12 bg-gray-200"></div>
              <span className="mx-4 text-gray-400 text-sm font-medium uppercase tracking-wider">
                Legal Notice
              </span>
              <div className="h-px w-12 bg-gray-200"></div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 leading-relaxed text-center">
                This directory is provided by{" "}
                <Link
                  href="https://californiacarlaw.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-[#3d8ab8] transition-colors"
                >
                  CaliforniaCarLaw.com
                </Link>{" "}
                as a free public service.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed text-center">
                We are not affiliated with, authorized by, or endorsed by any
                government agency or court system. While we strive to maintain
                accurate and up-to-date information, please verify all
                information directly with your local court.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
