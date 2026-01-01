import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/db-client'
import { sendNewsletterEmail } from '@/lib/email'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Admin-only endpoint to send newsletters
export async function POST(req: NextRequest) {
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

    const { subject, content } = await req.json()

    if (!subject || !content) {
      return NextResponse.json(
        { error: 'Subject and content are required' },
        { status: 400 }
      )
    }

    // Get all subscribed emails
    const { data: subscribers, error } = await db
      .from('email_leads')
      .select('email')
      .eq('subscribed', true)

    if (error) {
      console.error('Error fetching subscribers:', error)
      return NextResponse.json(
        { error: 'Failed to fetch subscribers' },
        { status: 500 }
      )
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        { error: 'No subscribers found' },
        { status: 400 }
      )
    }

    // Send emails to all subscribers
    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[]
    }

    for (const subscriber of subscribers) {
      try {
        const unsubscribeLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/newsletter/unsubscribe?email=${encodeURIComponent(subscriber.email)}`
        const result = await sendNewsletterEmail(
          subscriber.email,
          subject,
          content,
          unsubscribeLink
        )

        if (result.success) {
          results.success++
        } else {
          results.failed++
          results.errors.push(`${subscriber.email}: ${result.error}`)
        }
      } catch (error: any) {
        results.failed++
        results.errors.push(`${subscriber.email}: ${error.message}`)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Newsletter sent to ${results.success} subscribers`,
      results
    })
  } catch (error: any) {
    console.error('Newsletter send error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send newsletter' },
      { status: 500 }
    )
  }
}

