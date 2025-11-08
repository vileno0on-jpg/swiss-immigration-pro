import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/neon/db'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { email, password, fullName } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUsers = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user
    const newUsers = await sql`
      INSERT INTO users (email, password_hash, email_verified)
      VALUES (${email}, ${passwordHash}, true)
      RETURNING id, email
    `

    const user = newUsers[0]

    if (!user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }

    // Create profile
    await sql`
      INSERT INTO profiles (id, email, full_name, pack_id)
      VALUES (${user.id}, ${email}, ${fullName || null}, 'free')
    `

    // Create user limits
    await sql`
      INSERT INTO user_limits (user_id, messages_today, last_reset_date)
      VALUES (${user.id}, 0, CURRENT_DATE)
      ON CONFLICT (user_id) DO NOTHING
    `

    return NextResponse.json({ 
      success: true, 
      user: { id: user.id, email: user.email } 
    })
  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 500 }
    )
  }
}

