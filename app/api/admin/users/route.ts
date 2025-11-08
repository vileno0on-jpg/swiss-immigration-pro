import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@/lib/neon/db'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!sql) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }

    // Get all users with their pack info
    const users = await sql`
      SELECT 
        p.id,
        p.email,
        p.full_name,
        p.pack_id,
        p.pack_expires_at,
        p.is_admin,
        p.created_at,
        COUNT(DISTINCT sub.id) as subscription_count,
        COUNT(DISTINCT pay.id) as payment_count,
        COALESCE(SUM(CASE WHEN pay.status = 'succeeded' THEN pay.amount ELSE 0 END), 0) as total_spent
      FROM profiles p
      LEFT JOIN subscriptions sub ON sub.user_id = p.id
      LEFT JOIN payments pay ON pay.user_id = p.id
      GROUP BY p.id, p.email, p.full_name, p.pack_id, p.pack_expires_at, p.is_admin, p.created_at
      ORDER BY p.created_at DESC
    `

    return NextResponse.json(users)
  } catch (error: any) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

