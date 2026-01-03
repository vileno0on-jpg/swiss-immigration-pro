import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/db-client'

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const db = await createClient()

    // Save email capture
    await db.from('email_captures').insert({
      email,
      source: source || 'unknown',
      captured_at: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Email capture error', error)
    return NextResponse.json({ error: 'Failed to capture email' }, { status: 500 })
  }
}