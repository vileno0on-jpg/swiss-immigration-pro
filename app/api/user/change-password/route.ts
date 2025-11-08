import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@/lib/neon/db'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { currentPassword, newPassword } = await req.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Current password and new password are required' }, { status: 400 })
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'New password must be at least 8 characters long' }, { status: 400 })
    }

    if (!sql) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }

    // Get current user password
    const users = await sql`
      SELECT id, password_hash FROM users
      WHERE id = ${session.user.id}
    `

    if (!users || users.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const user = users[0] as any

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password_hash)

    if (!isValid) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 })
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update password
    await sql`
      UPDATE users
      SET password_hash = ${hashedPassword},
          updated_at = NOW()
      WHERE id = ${session.user.id}
    `

    return NextResponse.json({ message: 'Password changed successfully' })
  } catch (error: any) {
    console.error('Password change error:', error)
    return NextResponse.json({ error: error.message || 'Failed to change password' }, { status: 500 })
  }
}

