/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { MarkdownRenderer } from "@/lib/md-rendered";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllCourtsAction } from "./actions";
import Script from "next/script";
import {
  MapPin,
  Phone,
  Building2,
  FileText,
  Car,
  Bus,
  Clock,
  ExternalLink,
  Search,
  CalendarDays,
  CreditCard,
  ArrowRight,
} from "lucide-react";

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

const getMainDomain = (url: string) => {
  try {
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.hostname}`;
  } catch (e) {
    console.log("Invalid URL:", url);
    return url;
  }
};

export default function FindYourCourt() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courts, setCourts] = useState<Courthouse[]>([]);
  const [loading, setLoading] = useState(false);
  const [allCourts, setAllCourts] = useState<Courthouse[]>([]);

  useEffect(() => {
    const fetchAllCourts = async () => {
      try {
        const courts = await getAllCourtsAction();
        setAllCourts(courts);
      } catch (error) {
        console.log("Error fetching all courts:", error);
      }
    };

    fetchAllCourts();
  }, []);

  // Move JSON-LD into a function to make it dynamic
  const getJsonLd = (allCourts: Courthouse[]) => ({
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "California Courts Directory",
    description:
      "Complete directory of California courthouses including superior courts and county courts",
    keywords: [
      "California courts",
      "courthouse directory",
      "superior courts",
      "county courts",
      "California judicial system",
      "pay ticket link",
    ],
    url: "https://www.californiacarlaw.com/find-your-california-court",
    provider: {
      "@type": "Organization",
      name: "CaliforniaCarLaw",
      url: "https://www.californiacarlaw.com/",
    },
    spatialCoverage: {
      "@type": "Place",
      name: "California",
      address: {
        "@type": "PostalAddress",
        addressRegion: "CA",
        addressCountry: "US",
      },
    },
    distribution: {
      "@type": "DataDownload",
      encodingFormat: "JSON",
      contentUrl: "https://www.californiacarlaw.com/find-your-california-court",
    },
    hasPart: allCourts.map((court) => ({
      "@type": "GovernmentBuilding",
      name: court.courthouse_name,
      address: {
        "@type": "PostalAddress",
        streetAddress: court.address,
        addressRegion: "CA",
        addressCountry: "US",
      },
      url: getMainDomain(court.courthouse_page_url),
      telephone: court.phone_number,
      areaServed: court.county,
      openingHours: court.hours_building || "Please contact court for hours",
      publicAccess: true,
      additionalType: "Courthouse",
    })),
  });

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

  return (
    <>
      {allCourts.length > 0 && (
        <Script id="court-directory-jsonld" type="application/ld+json">
          {JSON.stringify(getJsonLd(allCourts))}
        </Script>
      )}
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="mx-auto">
            {/* Hero Section */}
            <div className="mb-12 relative overflow-hidden bg-gradient-to-br from-[#50ade4] to-[#2980b9] rounded-2xl mt-4 p-8 md:p-12 shadow-xl">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
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
                      stroke="white"
                      strokeWidth="1"
                    />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* SEO Content */}
              <div className="max-w-4xl mx-auto relative z-10 mb-12 px-4">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  California Court Directory
                </h2>
                <p className="mt-2 text-white">
                  Find your court and handle your traffic ticket efficiently
                </p>
              </div>

              {/* Search Section */}

              <div className="max-w-4xl flex-1 relative mx-auto">
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by city, county, or courthouse name..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    debouncedSearch(e.target.value);
                  }}
                  className="pl-10 h-12 text-lg w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg"
                />
                {/*Badges*/}
                {searchTerm && (
                  <div className="my-3 flex items-center gap-2">
                    <Badge
                      variant={
                        courts.length === 0 && !loading
                          ? "destructive"
                          : "secondary"
                      }
                      className="text-xs font-normal"
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
                      <span className="text-xs text-white font-bold">
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
                        className="border-l-4 border-l-[#50ade4] hover:shadow-lg transition-shadow"
                      >
                        <CardHeader className="pb-2">
                          <h2 className="text-2xl font-bold text-[#50ade4] md:text-3xl">
                            {court.courthouse_name}
                          </h2>
                        </CardHeader>
                        <CardContent className="text-black">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Basic Information Section */}
                            <div className="space-y-3">
                              <div className="flex flex-col space-y-2">
                                <p className="flex flex-col sm:flex-row sm:items-center gap-2">
                                  <span className="font-semibold min-w-[100px] flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-[#50ade4]" />
                                    Address:
                                  </span>
                                  <span>{court.address}</span>
                                </p>
                                <p className="flex flex-col sm:flex-row sm:items-center gap-2">
                                  <span className="font-semibold min-w-[100px] flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-[#50ade4]" />
                                    Phone:
                                  </span>
                                  <span>{court.phone_number}</span>
                                </p>
                                <p className="flex flex-col sm:flex-row sm:items-center gap-2">
                                  <span className="font-semibold min-w-[100px] flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-[#50ade4]" />
                                    County:
                                  </span>
                                  <span>{court.county}</span>
                                </p>
                                {court.matters_served && (
                                  <p className="flex flex-col sm:flex-row sm:items-center gap-2">
                                    <span className="font-semibold min-w-[100px] flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-[#50ade4]" />
                                      Matters:
                                    </span>
                                    <span>{court.matters_served}</span>
                                  </p>
                                )}
                              </div>

                              {/* Transportation Section */}
                              {((court.parking && court.parking !== "N/A") ||
                                (court.transportation &&
                                  court.transportation !== "N/A")) && (
                                <div className="space-y-2 pt-4 border-t">
                                  {court.parking && court.parking !== "N/A" && (
                                    <p className="flex flex-col sm:flex-row sm:items-start gap-2">
                                      <span className="font-semibold min-w-[100px] flex items-center gap-2">
                                        <Car className="h-4 w-4 text-[#50ade4]" />
                                        Parking:
                                      </span>
                                      <span>{court.parking}</span>
                                    </p>
                                  )}
                                  {court.transportation &&
                                    court.transportation !== "N/A" && (
                                      <p className="flex flex-col sm:flex-row sm:items-start gap-2">
                                        <span className="font-semibold min-w-[100px] flex items-center gap-2">
                                          <Bus className="h-4 w-4 text-[#50ade4]" />
                                          Transit:
                                        </span>
                                        <span>{court.transportation}</span>
                                      </p>
                                    )}
                                </div>
                              )}
                            </div>

                            {/* Hours Section */}
                            <div className="space-y-4 ">
                              {(court.hours_building ||
                                court.hours_clerk ||
                                court.hours_self_help) && (
                                <div className="bg-gray-50 p-4 rounded-md">
                                  {court.hours_building && (
                                    <div className="mb-4">
                                      <h3 className="font-semibold text-[#50ade4] mb-2 flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        Building Hours
                                      </h3>
                                      <pre className="whitespace-pre-line text-sm">
                                        {formatHours(court.hours_building)}
                                      </pre>
                                    </div>
                                  )}
                                  {court.hours_clerk && (
                                    <div className="mb-4">
                                      <h3 className="font-semibold text-[#50ade4] mb-2 flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        Clerk Hours
                                      </h3>
                                      <pre className="whitespace-pre-line text-sm">
                                        {formatHours(court.hours_clerk)}
                                      </pre>
                                    </div>
                                  )}
                                  {court.hours_self_help && (
                                    <div>
                                      <h3 className="font-semibold text-[#50ade4] mb-2 flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        Self-Help Hours
                                      </h3>
                                      <pre className="whitespace-pre-line text-sm">
                                        {formatHours(court.hours_self_help)}
                                      </pre>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Additional Information Section */}
                          <div className="mt-6 gap-4 pt-4 border-t flex flex-row">
                            {court.courthouse_page_url && (
                              <Button
                                asChild
                                className="inline-flex items-center gap-2 bg-[#3d8ab8] text-white px-6 py-2 rounded-md hover:bg-[#2d6a8f] transition-colors"
                              >
                                <Link
                                  href={getMainDomain(
                                    court.courthouse_page_url
                                  )}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {" "}
                                  Visit Court Website{" "}
                                  <ExternalLink className="h-4 w-4" />
                                </Link>
                              </Button>
                            )}

                            {/* Custom Buttons */}
                            {court.custom_button &&
                              court.custom_button.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {court.custom_button.map((button, index) => (
                                    <Button
                                      asChild
                                      key={index}
                                      className="inline-flex items-center gap-2 bg-[#3d8ab8] text-white px-6 py-2 rounded-md hover:bg-[#2d6a8f] transition-colors"
                                    >
                                      <Link
                                        href={button.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {button.label}
                                      </Link>
                                    </Button>
                                  ))}
                                </div>
                              )}
                          </div>
                          {court.more_info && (
                            <div className="prose prose-sm max-w-none">
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

            <div className="grid md:grid-cols-2 gap-8">
              <div className="group relative p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-md transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-xl transform group-hover:scale-[0.98] transition-transform duration-300"></div>
                <div className="relative">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="ml-3 text-xl font-semibold text-gray-800">
                      Pay Your Traffic Ticket Online
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Most California courts offer convenient online payment
                    portals. Locate your court below to quickly and securely pay
                    your traffic ticket from anywhere.
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 font-medium">
                    <span>Find payment portal</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="group relative p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-md transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-xl transform group-hover:scale-[0.98] transition-transform duration-300"></div>
                <div className="relative">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <CalendarDays className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="ml-3 text-xl font-semibold text-gray-800">
                      Fight Your Traffic Ticket
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Exercise your right to contest your traffic ticket in court.
                    Get essential information about court appearances and
                    traffic divisions below.
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 font-medium">
                    <span>Court appearance info</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
