import { NextResponse } from 'next/server'
import { getAllPublished } from '@/lib/notion'

export async function GET() {
  try {
    const posts = await getAllPublished()
    return NextResponse.json({ success: true, posts })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
