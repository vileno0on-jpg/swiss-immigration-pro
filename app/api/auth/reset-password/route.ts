import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/neon/db'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    if (!sql) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }

    // Check if user exists
    const users = await sql`
      SELECT id, email FROM users
      WHERE email = ${email}
    `

    if (!users || users.length === 0) {
      // Don't reveal if user exists or not (security best practice)
      return NextResponse.json({ 
        message: 'If an account with that email exists, we\'ve sent a password reset link.' 
      })
    }

    // In a real app, you would:
    // 1. Generate a secure reset token
    // 2. Store it in the database with expiration
    // 3. Send email with reset link
    // For now, we'll just return success

    // TODO: Implement email sending with reset token
    // const resetToken = crypto.randomBytes(32).toString('hex')
    // await sql`INSERT INTO password_resets (user_id, token, expires_at) VALUES ...`
    // await sendResetEmail(email, resetToken)

    return NextResponse.json({ 
      message: 'If an account with that email exists, we\'ve sent a password reset link.' 
    })
  } catch (error: any) {
    console.error('Password reset error:', error)
    return NextResponse.json({ error: error.message || 'Failed to process reset request' }, { status: 500 })
  }
}

