import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@/lib/db-client'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session.user.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const db = await createClient()

    // Get recent user signups
    const { data: signups } = await db
      .from('profiles')
      .select('id, email, created_at')
      .order('created_at', { ascending: false })
      .limit(50)

    // Get recent payments
    const { data: payments } = await db
      .from('payments')
      .select('id, user_id, amount, status, created_at, pack_id')
      .order('created_at', { ascending: false })
      .limit(50)

    // Get user emails for payments
    const userIds = [...new Set(payments?.map(p => p.user_id).filter(Boolean) || [])]
    const { data: profiles } = await db
      .from('profiles')
      .select('id, email')
      .in('id', userIds)

    const emailMap = new Map(profiles?.map(p => [p.id, p.email]) || [])

    // Combine into activity logs
    const logs: any[] = []

    // Add signup logs
    signups?.forEach(signup => {
      logs.push({
        type: 'user_action',
        action: 'User Signup',
        description: `New user registered: ${signup.email}`,
        user_email: signup.email,
        created_at: signup.created_at,
      })
    })

    // Add payment logs
    payments?.forEach(payment => {
      const status = payment.status === 'succeeded' ? 'completed' : payment.status
      logs.push({
        type: 'payment',
        action: `Payment ${status}`,
        description: `Payment of CHF ${(payment.amount / 100).toFixed(2)} for ${payment.pack_id} pack`,
        user_email: emailMap.get(payment.user_id) || 'Unknown',
        created_at: payment.created_at,
      })
    })

    // Sort by date (newest first)
    logs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    // Return last 100 logs
    return NextResponse.json({ logs: logs.slice(0, 100) })
  } catch (error) {
    console.error('Error in activity logs API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



