import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/neon/db'
import bcrypt from 'bcryptjs'

/**
 * Create Admin User Endpoint
 * 
 * POST /api/admin/create-admin
 * Body: { email, password, fullName }
 * 
 * Note: This should be protected or removed after creating admin
 */
export async function POST(req: NextRequest) {
  try {
    const { email, password, fullName } = await req.json()

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Email, password, and full name are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    if (!sql) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 500 }
      )
    }

    // Check if user already exists
    const existingUsers = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    let userId

    if (existingUsers.length > 0) {
      // User exists - update to admin
      userId = existingUsers[0].id

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Update user password
      await sql`
        UPDATE users
        SET password_hash = ${hashedPassword},
            updated_at = NOW()
        WHERE id = ${userId}
      `

      // Update profile to admin
      await sql`
        UPDATE profiles
        SET is_admin = TRUE,
            full_name = ${fullName},
            updated_at = NOW()
        WHERE id = ${userId}
      `
    } else {
      // Create new user
      const hashedPassword = await bcrypt.hash(password, 10)

      const newUserResult = await sql`
        INSERT INTO users (email, password_hash, email_verified)
        VALUES (${email}, ${hashedPassword}, TRUE)
        RETURNING id
      `
      userId = newUserResult[0].id

      // Create admin profile
      await sql`
        INSERT INTO profiles (id, email, full_name, pack_id, is_admin)
        VALUES (${userId}, ${email}, ${fullName}, 'free', TRUE)
      `

      // Create user limits
      const today = new Date().toISOString().split('T')[0]
      await sql`
        INSERT INTO user_limits (user_id, messages_today, last_reset_date)
        VALUES (${userId}, 0, ${today})
      `
    }

    // Verify
    const verifyResult = await sql`
      SELECT id, email, full_name, is_admin, pack_id
      FROM profiles
      WHERE id = ${userId}
    `

    const admin = verifyResult[0]

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      user: {
        id: admin.id,
        email: admin.email,
        fullName: admin.full_name,
        isAdmin: admin.is_admin,
        packId: admin.pack_id,
      },
    })
  } catch (error: any) {
    console.error('Admin creation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create admin user' },
      { status: 500 }
    )
  }
}

