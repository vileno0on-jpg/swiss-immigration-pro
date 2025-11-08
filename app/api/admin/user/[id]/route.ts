import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@/lib/neon/db'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!sql) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }

    const { id: userId } = await params

    // Get user profile
    const profileResult = await sql`
      SELECT * FROM profiles WHERE id = ${userId}
    `
    const profile = profileResult[0] as any

    if (!profile) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get user's subscriptions
    const subscriptions = await sql`
      SELECT * FROM subscriptions WHERE user_id = ${userId} ORDER BY created_at DESC
    `

    // Get user's payments
    const payments = await sql`
      SELECT * FROM payments WHERE user_id = ${userId} ORDER BY created_at DESC LIMIT 20
    `

    // Get user's chat messages count
    const messageCountResult = await sql`
      SELECT COUNT(*) as count FROM chat_messages WHERE user_id = ${userId}
    `
    const messageCount = Number(messageCountResult[0]?.count || 0)

    // Get user limits
    const limitsResult = await sql`
      SELECT * FROM user_limits WHERE user_id = ${userId}
    `
    const limits = limitsResult[0] as any

    return NextResponse.json({
      profile,
      subscriptions,
      payments,
      messageCount,
      limits,
    })
  } catch (error: any) {
    console.error('Error fetching user details:', error)
    return NextResponse.json({ error: 'Failed to fetch user details' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!sql) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }

    const { id: userId } = await params
    const { packId, isAdmin, fullName, packExpiresAt } = await req.json()

    // Update fields individually to handle conditionals properly
    if (packId !== undefined) {
      if (packExpiresAt !== undefined) {
        await sql`
          UPDATE profiles
          SET pack_id = ${packId}, 
              pack_expires_at = ${packExpiresAt || null}::timestamp with time zone,
              updated_at = NOW()
          WHERE id = ${userId}
        `
      } else {
        await sql`
          UPDATE profiles
          SET pack_id = ${packId}, updated_at = NOW()
          WHERE id = ${userId}
        `
      }
    }
    
    if (isAdmin !== undefined) {
      await sql`
        UPDATE profiles
        SET is_admin = ${isAdmin}, updated_at = NOW()
        WHERE id = ${userId}
      `
    }
    
    if (fullName !== undefined) {
      await sql`
        UPDATE profiles
        SET full_name = ${fullName}, updated_at = NOW()
        WHERE id = ${userId}
      `
    }

    return NextResponse.json({ message: 'User updated successfully' })
  } catch (error: any) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

