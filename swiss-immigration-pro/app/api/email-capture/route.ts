import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/db-client'
import { sendNewsletterWelcomeEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { email, leadMagnet } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    const db = await createClient()
    const normalizedEmail = email.toLowerCase().trim()

    // Save to email_leads table
    const { error } = await db
      .from('email_leads')
      .upsert({
        email: normalizedEmail,
        lead_magnet: leadMagnet || 'Swiss Immigration Checklist',
        source: 'website',
        subscribed: true,
        created_at: new Date().toISOString()
      }, {
        onConflict: 'email',
        ignoreDuplicates: false
      })

    if (error && !error.message.includes('does not exist')) {
      console.error('Error saving email lead:', error)
      // Continue anyway - try to send email even if DB fails
    }

    // Send welcome email
    try {
      await sendNewsletterWelcomeEmail(normalizedEmail)
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email capture error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

