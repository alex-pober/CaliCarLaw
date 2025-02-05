import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function createClient() {
  try {
    const cookieStore = cookies()
    
    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            try {
              return cookieStore.get(name)?.value
            } catch {
              return undefined
            }
          },
          set(name: string, value: string, options: any) {
            try {
              cookieStore.set(name, value, options)
            } catch {
              // Ignore cookie setting errors during static generation
            }
          },
          remove(name: string, options: any) {
            try {
              cookieStore.delete(name, options)
            } catch {
              // Ignore cookie removal errors during static generation
            }
          }
        }
      }
    )
  } catch (error) {
    console.error('Error creating Supabase client:', error)
    throw error
  }
}
