import { NextResponse } from 'next/server'
import { sql } from '@/lib/neon/db'

export async function GET() {
  try {
    const stats = await sql`
      SELECT * FROM live_stats
      WHERE is_active = true
      ORDER BY display_order ASC
    `

    return NextResponse.json(stats || [])
  } catch (error) {
    console.error('Error loading stats:', error)
    return NextResponse.json([], { status: 500 })
  }
}

