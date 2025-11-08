import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@/lib/neon/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session.user.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Count users
    const userCountResult = await sql`
      SELECT COUNT(*)::int as count FROM profiles
    `
    const userCount = userCountResult[0]?.count || 0

    // Count active subscriptions
    const subCountResult = await sql`
      SELECT COUNT(*)::int as count FROM subscriptions
      WHERE status = 'active'
    `
    const subCount = subCountResult[0]?.count || 0

    // Sum total revenue
    const revenueResult = await sql`
      SELECT COALESCE(SUM(amount), 0)::bigint as total FROM payments
      WHERE status = 'succeeded'
    `
    const totalRevenue = Number(revenueResult[0]?.total || 0) / 100

    // Count messages
    const msgCountResult = await sql`
      SELECT COUNT(*)::int as count FROM chat_messages
    `
    const msgCount = msgCountResult[0]?.count || 0

    // Count users by pack
    const usersByPack = await sql`
      SELECT pack_id, COUNT(*)::int as count
      FROM profiles
      GROUP BY pack_id
    `

    // Count total purchases
    const purchaseCountResult = await sql`
      SELECT COUNT(*)::int as count FROM payments WHERE status = 'succeeded'
    `
    const totalPurchases = Number(purchaseCountResult[0]?.count || 0)

    // Recent signups (last 7 days)
    const recentSignupsResult = await sql`
      SELECT COUNT(*)::int as count 
      FROM profiles 
      WHERE created_at > NOW() - INTERVAL '7 days'
    `
    const recentSignups = Number(recentSignupsResult[0]?.count || 0)

    // Revenue this month
    const monthlyRevenueResult = await sql`
      SELECT COALESCE(SUM(amount), 0)::bigint as total 
      FROM payments 
      WHERE status = 'succeeded' 
      AND created_at >= DATE_TRUNC('month', NOW())
    `
    const monthlyRevenue = Number(monthlyRevenueResult[0]?.total || 0) / 100

    return NextResponse.json({
      totalUsers: Number(userCount),
      usersByPack: usersByPack.map((row: any) => ({
        packId: row.pack_id,
        count: Number(row.count || 0),
      })),
      totalRevenue: Number(totalRevenue),
      monthlyRevenue: Number(monthlyRevenue),
      activeSubscriptions: Number(subCount),
      messageCount: Number(msgCount),
      totalPurchases: Number(totalPurchases),
      recentSignups: Number(recentSignups),
    })
  } catch (error) {
    console.error('Error loading admin stats:', error)
    return NextResponse.json(
      { error: 'Failed to load stats' },
      { status: 500 }
    )
  }
}

