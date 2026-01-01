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

    // Get all payments with user email
    const { data: payments, error: paymentsError } = await db
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1000)

    if (paymentsError) {
      console.error('Payments fetch error:', paymentsError)
      return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 })
    }

    // Get user emails for payments
    const userIds = [...new Set(payments?.map(p => p.user_id).filter(Boolean) || [])]
    const { data: profiles } = await db
      .from('profiles')
      .select('id, email')
      .in('id', userIds)

    const emailMap = new Map(profiles?.map(p => [p.id, p.email]) || [])

    const paymentsWithEmails = payments?.map(payment => ({
      ...payment,
      user_email: emailMap.get(payment.user_id) || 'Unknown',
    })) || []

    return NextResponse.json({ payments: paymentsWithEmails })
  } catch (error) {
    console.error('Error in payments API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}



