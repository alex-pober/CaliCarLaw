"use server";
import { createClient } from "@/utils/supabase/client";

export async function getAllCourtsAction() {
  'use cache';
  const supabase = createClient();

  const { data, error } = await supabase.from("courthouses").select("*");

  if (error) {
    console.log("Server Action Error:", error);
    return [];
  }

  return data || [];
}
