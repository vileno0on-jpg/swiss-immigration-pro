import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/db-client'
import { sendPasswordResetEmail } from '@/lib/email'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const db = await createClient()

    // Check if user exists
    const { data: user, error } = await db
      .from('users')
      .select('id, email')
      .eq('email', email.toLowerCase().trim())
      .single()

    // Don't reveal if user exists or not (security best practice)
    if (error || !user) {
      return NextResponse.json({ 
        message: 'If an account with that email exists, we\'ve sent a password reset link.' 
      })
    }

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 1) // Token expires in 1 hour

    // Save reset token to database
    const { error: tokenError } = await db
      .from('password_resets')
      .insert({
        user_id: user.id,
        token: resetToken,
        expires_at: expiresAt.toISOString(),
        used: false
      })

    if (tokenError) {
      console.error('Error saving reset token:', tokenError)
      // Still return success to not reveal if user exists
      return NextResponse.json({ 
        message: 'If an account with that email exists, we\'ve sent a password reset link.' 
      })
    }

    // Send password reset email
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const resetLink = `${appUrl}/auth/reset-password?token=${resetToken}`

    try {
      await sendPasswordResetEmail(email, resetLink)
    } catch (emailError) {
      console.error('Error sending password reset email:', emailError)
      // Still return success to not reveal if user exists
    }

    return NextResponse.json({ 
      message: 'If an account with that email exists, we\'ve sent a password reset link.' 
    })
  } catch (error: any) {
    console.error('Password reset error:', error)
    return NextResponse.json({ error: error.message || 'Failed to process reset request' }, { status: 500 })
  }
}

