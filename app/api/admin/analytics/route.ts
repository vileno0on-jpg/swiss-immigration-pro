import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@/lib/neon/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!sql) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }

    // Revenue over last 12 months
    const revenueByMonth = await sql`
      SELECT 
        DATE_TRUNC('month', created_at) as month,
        COALESCE(SUM(amount), 0)::bigint as revenue
      FROM payments
      WHERE status = 'succeeded'
        AND created_at >= NOW() - INTERVAL '12 months'
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY month ASC
    `

    // User growth over last 12 months
    const userGrowth = await sql`
      SELECT 
        DATE_TRUNC('month', created_at) as month,
        COUNT(*)::int as count
      FROM profiles
      WHERE created_at >= NOW() - INTERVAL '12 months'
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY month ASC
    `

    // Revenue by pack
    const revenueByPack = await sql`
      SELECT 
        pack_id,
        COALESCE(SUM(amount), 0)::bigint as revenue,
        COUNT(*)::int as count
      FROM payments
      WHERE status = 'succeeded'
      GROUP BY pack_id
      ORDER BY revenue DESC
    `

    // Daily active users (last 30 days)
    const dailyActiveUsers = await sql`
      SELECT 
        DATE(created_at) as date,
        COUNT(DISTINCT user_id)::int as count
      FROM chat_messages
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `

    // Top users by activity
    const topUsers = await sql`
      SELECT 
        p.id,
        p.email,
        p.full_name,
        COUNT(c.id)::int as message_count,
        COALESCE(SUM(pay.amount), 0)::bigint as total_spent
      FROM profiles p
      LEFT JOIN chat_messages c ON c.user_id = p.id
      LEFT JOIN payments pay ON pay.user_id = p.id AND pay.status = 'succeeded'
      GROUP BY p.id, p.email, p.full_name
      ORDER BY message_count DESC, total_spent DESC
      LIMIT 10
    `

    // Module completion stats
    const moduleStats = await sql`
      SELECT 
        module_id,
        COUNT(*)::int as total_users,
        COUNT(CASE WHEN progress_percent = 100 THEN 1 END)::int as completed_users,
        AVG(progress_percent)::numeric(5,2) as avg_progress
      FROM masterclass_progress
      GROUP BY module_id
      ORDER BY total_users DESC
    `

    return NextResponse.json({
      revenueByMonth: revenueByMonth.map((row: any) => ({
        month: row.month,
        revenue: Number(row.revenue) / 100,
      })),
      userGrowth: userGrowth.map((row: any) => ({
        month: row.month,
        count: Number(row.count),
      })),
      revenueByPack: revenueByPack.map((row: any) => ({
        packId: row.pack_id,
        revenue: Number(row.revenue) / 100,
        count: Number(row.count),
      })),
      dailyActiveUsers: dailyActiveUsers.map((row: any) => ({
        date: row.date,
        count: Number(row.count),
      })),
      topUsers: topUsers.map((row: any) => ({
        id: row.id,
        email: row.email,
        fullName: row.full_name,
        messageCount: Number(row.message_count),
        totalSpent: Number(row.total_spent) / 100,
      })),
      moduleStats: moduleStats.map((row: any) => ({
        moduleId: row.module_id,
        totalUsers: Number(row.total_users),
        completedUsers: Number(row.completed_users),
        avgProgress: Number(row.avg_progress),
      })),
    })
  } catch (error: any) {
    console.error('Error loading analytics:', error)
    return NextResponse.json(
      { error: 'Failed to load analytics' },
      { status: 500 }
    )
  }
}

