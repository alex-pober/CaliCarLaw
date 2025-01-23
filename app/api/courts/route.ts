import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    'use cache';
    const supabase = await createClient();

    const { data: courts, error } = await supabase
      .from('courthouses')
      .select('id, courthouse_name, address, county, matters_served')
      .order('courthouse_name')
      .limit(300)

    if (error) {
      console.error('Error fetching courts:', error);
      return NextResponse.json({ error: 'Failed to fetch courts' }, { status: 500 });
    }

    return NextResponse.json(courts);
  } catch (error) {
    console.error('Error in courts API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}