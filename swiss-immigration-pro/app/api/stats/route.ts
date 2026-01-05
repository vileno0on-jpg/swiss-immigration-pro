import { NextResponse } from 'next/server'
import { createClient } from '@/lib/db-client'

export async function GET() {
  try {
    console.log('Fetching stats...')
    const db = await createClient()

    if (!db) {
      console.error('Failed to create Supabase client')
      return NextResponse.json([], { status: 500 })
    }

    const { data: stats, error } = await db
      .from('live_stats')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Supabase error fetching stats:', error)
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return NextResponse.json([], { status: 500 })
    }

    console.log('Stats fetched successfully:', stats?.length || 0, 'records')
    return NextResponse.json(stats || [])
  } catch (error) {
    console.error('Unexpected error loading stats:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    return NextResponse.json([], { status: 500 })
  }
}

