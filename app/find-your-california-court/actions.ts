/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { createClient } from "@/utils/supabase/client";

export async function getAllCourtsAction() {
  // "use cache";
  const supabase = createClient();

  const { data, error } = await supabase.from("courthouses").select("*");

  if (error) {
    console.log("Server Action Error:", error);
    return [];
  }

  return data || [];
}

export async function datasetAction() {
  // "use cache";
  const allCourts = await getAllCourtsAction();
  // Map your day strings to Schema.org URIs
  const dayMappings = {
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Saturday: "Saturday",
    Sunday: "Sunday",
  };

  // Convert "8:00AM" or "12:30PM" to "08:00" or "12:30" in 24-hour format
  function convertTime12to24(timeStr: string) {
    if (!timeStr || typeof timeStr !== "string") {
      return "";
    }

    const match = timeStr.match(/(\d{1,2}:\d{2})\s*(AM|PM)/i);
    if (!match) {
      return "";
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

  function parseHoursToOpeningHoursSpecification(
    hoursObj: JSON | { [s: string]: unknown } | ArrayLike<unknown>
  ) {
    return Object.entries(hoursObj).map(([day, timeRange]) => {
      // timeRange: "8:00AM - 4:30PM"

      const [openRaw, closeRaw] = timeRange.split(" - ");
      return {
        "@type": "OpeningHoursSpecification",
        // @ts-ignore
        dayOfWeek: dayMappings[day], // e.g. "https://schema.org/Monday"
        opens: convertTime12to24(openRaw), // e.g. "08:00"
        closes: convertTime12to24(closeRaw), // e.g. "16:30"
      };
    });
  }

  const getMainDomain = (url: string) => {
    try {
      const urlObj = new URL(url);
      return `${urlObj.protocol}//${urlObj.hostname}`;
    } catch (e) {
      console.log("Invalid URL:", url);
      return url;
    }
  };

  const courtsData = allCourts.map((court) => {
    return {
      "@context": "https://schema.org",
      "@type": "GovernmentOffice",
      name: court.courthouse_name,
      address: {
        "@type": "PostalAddress",
        streetAddress: court.address,
        addressRegion: "CA",
        addressCountry: "US",
        addressState: "CA",
      },
      telephone: court.phone_number,
      url: getMainDomain(court.courthouse_page_url),
      openingHoursSpecification: parseHoursToOpeningHoursSpecification(
        court.hours_building
      ),
      image: court.photo,
      amenityFeature: [
        {
          "@type": "LocationFeatureSpecification",
          name: "Parking",
          value: court.parking,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Public Transportation",
          value: court.transportation,
        },
      ],
      // Additional data
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "Matters Served",
          value: court.matters_served,
        },
        {
          "@type": "PropertyValue",
          name: "More Info",
          value: court.more_info,
        },
        // etc.
      ],
    };
  });

  return courtsData || [];
}
