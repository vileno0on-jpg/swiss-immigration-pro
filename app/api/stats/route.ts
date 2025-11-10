import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: stats, error } = await supabase
      .from('live_stats')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching stats:', error)
      return NextResponse.json([], { status: 500 })
    }

    return NextResponse.json(stats || [])
  } catch (error) {
    console.error('Error loading stats:', error)
    return NextResponse.json([], { status: 500 })
  }
}

