import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/db-client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(req: NextRequest) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const db = await createClient()
    
    // Check if user is admin
    const { data: profile } = await db
      .from('profiles')
      .select('is_admin')
      .eq('id', session.user?.id)
      .single()

    if (!profile?.is_admin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    // Get all subscribers
    const { data: subscribers, error } = await db
      .from('email_leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching subscribers:', error)
      return NextResponse.json(
        { error: 'Failed to fetch subscribers' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      subscribers: subscribers || []
    })
  } catch (error: any) {
    console.error('Newsletter subscribers error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}





