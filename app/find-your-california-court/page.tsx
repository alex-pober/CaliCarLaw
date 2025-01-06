/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import { MarkdownRenderer } from "@/lib/md-rendered";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllCourtsAction } from "./actions";

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

  const searchCourts = async (term: string) => {
    if (!term) {
      setCourts([]);
      return;
    }

    setLoading(true);
    console.log("Searching for term:", term);

    try {
      // Get all courts from server cache
      const allCourts = await getAllCourtsAction();
      console.log("Got all courts, filtering for:", term);

      // Client-side filtering
      const searchTerm = term.toLowerCase();
      const results = allCourts.filter(court => 
        court.courthouse_name.toLowerCase().includes(searchTerm) ||
        court.address.toLowerCase().includes(searchTerm) ||
        court.county.toLowerCase().includes(searchTerm)
      ).slice(0, 10); // Keep the 10 limit for UI purposes

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12 relative overflow-hidden bg-gradient-to-br from-[#50ade4] to-[#2980b9] rounded-2xl p-8 md:p-12 shadow-xl">
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

            <div className="relative">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
                Find Your California Court
              </h1>
              <p className="text-lg text-white/90 max-w-2xl">
                Easily locate your California courthouse and access online
                services for traffic tickets, citations, and case information.
                Skip the line - handle your court matters online!
              </p>
            </div>

            {/* Search Section */}
              <div className="mt-2 flex gap-4">
                <div className="flex-1 relative">
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
                </div>
              </div>
              {searchTerm && (
                <div className="mt-3 flex items-center gap-2">
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
          ) : courts.length > 0 ? (
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
          ) : searchTerm ? (
            <p className="text-center text-muted-foreground">
              No courts found matching your search.
            </p>
          ) : (
            <div>
              <p className="mb-8 text-center text-muted-foreground">
                Start typing above to find your courthouse
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                <Card className="border-t-4 border-t-[#50ade4]">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5 text-[#50ade4]" />
                      <h3 className="font-semibold">Traffic Fine Payments</h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Most California courts offer online payment systems for
                      traffic tickets. Search for your court above to find their
                      payment portal.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-t-4 border-t-[#50ade4]">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <CalendarDays className="h-5 w-5 text-[#50ade4]" />
                      <h3 className="font-semibold">Arraignment Scheduling</h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Need to schedule a court date? Find your courthouse above
                      to access their online scheduling system.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-t-4 border-t-[#50ade4]">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-[#50ade4]" />
                      <h3 className="font-semibold">Case Information</h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Look up your traffic ticket or case status through your
                      local court&apos;s portal. Search above to find your
                      court.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
