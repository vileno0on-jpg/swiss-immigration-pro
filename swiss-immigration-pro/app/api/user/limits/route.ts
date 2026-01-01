import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@/lib/db-client'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ packId: 'free', messagesToday: 0 })
    }

    // Get user profile and limits
    const db = await createClient()

    const { data: profile, error: profileError } = await db
      .from('profiles')
      .select('pack_id')
      .eq('id', session.user.id)
      .single()

    const packId = profile?.pack_id || 'free'

    // Get user limits
    const { data: limitsResult, error: limitsError } = await db
      .from('user_limits')
      .select('messages_today, last_reset_date')
      .eq('user_id', session.user.id)
      .single()

    let messagesToday = 0
    if (!limitsError && limitsResult) {
      const today = new Date().toISOString().split('T')[0]
      if (limitsResult.last_reset_date === today) {
        messagesToday = limitsResult.messages_today || 0
      }
    }

    return NextResponse.json({ packId, messagesToday })
  } catch (error) {
    console.error('Error loading limits:', error)
    return NextResponse.json({ packId: 'free', messagesToday: 0 })
  }
}

