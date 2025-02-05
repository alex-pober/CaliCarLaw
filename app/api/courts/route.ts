import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: courts, error } = await supabase
      .from('courthouses')
      .select('id, courthouse_name, address, county, matters_served')
      .order('courthouse_name')
      .limit(300);

    if (error) {
      console.error('Error fetching courts:', {
        error,
        timestamp: new Date().toISOString(),
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return NextResponse.json(
        { error: 'Failed to fetch courts data' },
        { status: 500 }
      );
    }

    if (!courts || courts.length === 0) {
      return NextResponse.json({ courts: [] });
    }

    return NextResponse.json({ courts });
  } catch (error) {
    console.error('Error in courts API:', {
      error,
      timestamp: new Date().toISOString(),
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}