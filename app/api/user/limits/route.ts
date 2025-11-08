import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@/lib/neon/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ packId: 'free', messagesToday: 0 })
    }

    // Get user profile
    const profiles = await sql`
      SELECT pack_id FROM profiles
      WHERE id = ${session.user.id}
    `

    const profile = profiles[0] as any
    const packId = profile?.pack_id || 'free'

    // Get user limits
    const limitsResult = await sql`
      SELECT messages_today, last_reset_date FROM user_limits
      WHERE user_id = ${session.user.id}
    `

    let messagesToday = 0
    if (limitsResult && limitsResult[0]) {
      const limits = limitsResult[0] as any
      const today = new Date().toISOString().split('T')[0]
      if (limits.last_reset_date === today) {
        messagesToday = limits.messages_today || 0
      }
    }

    return NextResponse.json({ packId, messagesToday })
  } catch (error) {
    console.error('Error loading limits:', error)
    return NextResponse.json({ packId: 'free', messagesToday: 0 })
  }
}

