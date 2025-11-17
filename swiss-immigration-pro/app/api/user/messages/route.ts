import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json([])
    }

    // Get recent messages
    const supabase = await createClient()
    const { data: messages, error } = await supabase
      .from('chat_messages')
      .select('message, response, created_at')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) {
      console.error('Error fetching messages:', error)
      return NextResponse.json([])
    }

    return NextResponse.json(messages || [])
  } catch (error) {
    console.error('Error loading messages:', error)
    return NextResponse.json([])
  }
}

