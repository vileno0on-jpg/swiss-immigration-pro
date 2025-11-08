import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@/lib/neon/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json([])
    }

    // Get recent messages
    const messages = await sql`
      SELECT message, response, created_at FROM chat_messages
      WHERE user_id = ${session.user.id}
      ORDER BY created_at DESC
      LIMIT 10
    `

    return NextResponse.json(messages || [])
  } catch (error) {
    console.error('Error loading messages:', error)
    return NextResponse.json([])
  }
}

