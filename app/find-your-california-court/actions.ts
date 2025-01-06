'use server'

import { createClient } from "@/utils/supabase/client";
import { unstable_cache } from 'next/cache';

export const getAllCourtsAction = unstable_cache(
  async () => {
    console.log("Server Action: Fetching all courts from DB");
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from("courthouses")
      .select("*");

    if (error) {
      console.log("Server Action Error:", error);
      return [];
    }

    return data || [];
  },
  ['all-courts'],
  {
    revalidate: 86400, // Cache for 24 hours since court data rarely changes
    tags: ['courts']
  }
);
