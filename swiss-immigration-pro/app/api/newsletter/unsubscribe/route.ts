import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/db-client'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    const db = await createClient()
    const normalizedEmail = email.toLowerCase().trim()

    // Update subscription status
    const { error } = await db
      .from('email_leads')
      .update({
        subscribed: false,
        unsubscribed_at: new Date().toISOString()
      })
      .eq('email', normalizedEmail)

    if (error) {
      console.error('Error unsubscribing:', error)
      return NextResponse.json(
        { error: 'Failed to unsubscribe' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true,
      message: 'Successfully unsubscribed'
    })
  } catch (error: any) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to unsubscribe' },
      { status: 500 }
    )
  }
}

// GET endpoint for unsubscribe links
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const email = searchParams.get('email')

    if (!email || !email.includes('@')) {
      return NextResponse.redirect(new URL('/?error=invalid_email', req.url))
    }

    const db = await createClient()
    const normalizedEmail = email.toLowerCase().trim()

    // Update subscription status
    const { error } = await db
      .from('email_leads')
      .update({
        subscribed: false,
        unsubscribed_at: new Date().toISOString()
      })
      .eq('email', normalizedEmail)

    if (error) {
      console.error('Error unsubscribing:', error)
      return NextResponse.redirect(new URL('/?error=unsubscribe_failed', req.url))
    }

    return NextResponse.redirect(new URL('/?unsubscribed=true', req.url))
  } catch (error: any) {
    console.error('Unsubscribe error:', error)
    return NextResponse.redirect(new URL('/?error=unsubscribe_failed', req.url))
  }
}





