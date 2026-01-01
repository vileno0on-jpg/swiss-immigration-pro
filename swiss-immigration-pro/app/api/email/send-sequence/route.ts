import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/db-client'
import { sendSequenceEmail, EmailSequenceType } from '@/lib/email-sequences'

// This endpoint triggers email sequences
// Should be called by a cron job or background worker
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, email, sequenceType, stepIndex, variables } = body

    if (!email || !sequenceType || stepIndex === undefined) {
      return NextResponse.json(
        { error: 'Email, sequenceType, and stepIndex are required' },
        { status: 400 }
      )
    }

    // Send the email
    const result = await sendSequenceEmail(
      email,
      sequenceType as EmailSequenceType,
      stepIndex,
      variables
    )

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send email' },
        { status: 500 }
      )
    }

    // Track sequence progress in database (optional)
    const db = await createClient()
    if (userId) {
      await db
        .from('email_sequences')
        .upsert({
          user_id: userId,
          email: email,
          sequence_type: sequenceType,
          step_index: stepIndex,
          sent_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,sequence_type,step_index'
        })
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully'
    })
  } catch (error: any) {
    console.error('Send sequence error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send sequence email' },
      { status: 500 }
    )
  }
}

// GET endpoint to check sequence status (for testing)
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json(
      { error: 'Email parameter is required' },
      { status: 400 }
    )
  }

  try {
    const db = await createClient()
    const { data, error } = await db
      .from('email_sequences')
      .select('*')
      .eq('email', email)
      .order('sent_at', { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json({ sequences: data || [] })
  } catch (error: any) {
    console.error('Get sequences error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch sequences' },
      { status: 500 }
    )
  }
}



