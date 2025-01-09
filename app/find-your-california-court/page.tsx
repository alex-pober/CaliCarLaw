/* eslint-disable prefer-const */
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

// Map your day strings to Schema.org URIs
const dayMappings = {
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
  Sunday: "Sunday"
};

// Convert "8:00AM" or "12:30PM" to "08:00" or "12:30" in 24-hour format
function convertTime12to24(timeStr: string) {
  if (!timeStr || typeof timeStr !== 'string') {
    return '';
  }

  const match = timeStr.match(/(\d{1,2}:\d{2})\s*(AM|PM)/i);
  if (!match) {
    return '';
  }

  const [time, meridiem] = match.slice(1, 3);
  let [hour, minute] = time.split(":").map(Number);

  if (meridiem.toUpperCase() === "PM" && hour < 12) {
    hour += 12; // e.g. 1 PM -> 13, 8 PM -> 20
  }
  if (meridiem.toUpperCase() === "AM" && hour === 12) {
    // 12 AM is 00
    hour = 0;
  }

  // Pad with leading zero if needed
  const hourStr = hour.toString().padStart(2, "0");
  const minuteStr = minute.toString().padStart(2, "0");

  return `${hourStr}:${minuteStr}`;
}

// hoursObj is something like:
// {
//   "Friday": "8:00AM - 4:30PM",
//   "Monday": "8:00AM - 4:30PM",
//   ...
// }
//@ts-ignore
function parseHoursToOpeningHoursSpecification(hoursObj) {
  return Object.entries(hoursObj).map(([day, timeRange]) => {
    // timeRange: "8:00AM - 4:30PM"
    //@ts-ignore
    const [openRaw, closeRaw] = timeRange.split(" - "); 
    return {
      "@type": "OpeningHoursSpecification",
      //@ts-ignore
      "dayOfWeek": dayMappings[day],           // e.g. "https://schema.org/Monday"
      "opens": convertTime12to24(openRaw),     // e.g. "08:00"
      "closes": convertTime12to24(closeRaw),    // e.g. "16:30"
    };
  });
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


    // Convert each courthouse to a JSON-LD object
    const courtsData = allCourts.map((court) => {
      return {
        "@context": "https://schema.org",
        "@type": "GovernmentOffice", 
        "name": court.courthouse_name,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": court.address, 
          "addressRegion": "CA",        
          "addressCountry": "US",                
          "addressState": "CA"
        },
        "telephone": court.phone_number,
        "url": getMainDomain(court.courthouse_page_url),
        "openingHoursSpecification": parseHoursToOpeningHoursSpecification(
          court.hours_building
        ),
        "image": court.photo,
        "amenityFeature": [
          {
            "@type": "LocationFeatureSpecification",
            "name": "Parking",
            "value": court.parking
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": "Public Transportation",
            "value": court.transportation
          }
        ],
        // Additional data
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Matters Served",
            "value": court.matters_served
          },
          {
            "@type": "PropertyValue",
            "name": "More Info",
            "value": court.more_info
          }
          // etc.
        ]
      };
    });
    // Convert the array of objects to a JSON string
  
  const jsonString = JSON.stringify(courtsData, null, 2);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonString }}
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="mb-12 relative overflow-hidden p-2 md:p-12 w-full">
          <div className="max-w-4xl mx-auto bg-gradient-to-t from-[white] to-[transparent]">
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
                Find your court, links to pay your traffic tickets, and everything else courts make difficult to find.
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
                className="pl-10 h-12 text-lg w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg shadow-lg placeholder:text-sm sm:placeholder:text-lg"
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
                                href={getMainDomain(court.courthouse_page_url)}
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
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
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
                Most California courts offer convenient online payment portals.
                Locate your court below to quickly and securely pay your traffic
                ticket from anywhere.
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
                Exercise your right to contest your traffic ticket in court. Get
                essential information about court appearances and traffic
                divisions below.
              </p>
              <div className="mt-4 flex items-center text-blue-600 font-medium">
                <span>Court appearance info</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
