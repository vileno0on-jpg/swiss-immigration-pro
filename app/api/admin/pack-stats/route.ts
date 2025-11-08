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

    // Get pack statistics
    const packStats = await sql`
      SELECT 
        pack_id,
        COUNT(*) as user_count,
        COUNT(CASE WHEN pack_expires_at > NOW() THEN 1 END) as active_count,
        COUNT(CASE WHEN pack_expires_at < NOW() OR pack_expires_at IS NULL THEN 1 END) as expired_count
      FROM profiles
      WHERE pack_id != 'free'
      GROUP BY pack_id
      ORDER BY user_count DESC
    `

    // Get revenue by pack
    const revenueByPack = await sql`
      SELECT 
        p.pack_id,
        COUNT(DISTINCT pay.id) as purchase_count,
        COALESCE(SUM(CASE WHEN pay.status = 'succeeded' THEN pay.amount ELSE 0 END), 0) as total_revenue
      FROM profiles p
      LEFT JOIN payments pay ON pay.user_id = p.id
      WHERE p.pack_id != 'free'
      GROUP BY p.pack_id
      ORDER BY total_revenue DESC
    `

    // Get purchases by month
    const purchasesByMonth = await sql`
      SELECT 
        DATE_TRUNC('month', created_at) as month,
        COUNT(*) as purchase_count,
        SUM(amount) as revenue
      FROM payments
      WHERE status = 'succeeded'
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY month DESC
      LIMIT 12
    `

    return NextResponse.json({
      packStats,
      revenueByPack,
      purchasesByMonth,
    })
  } catch (error: any) {
    console.error('Error fetching pack stats:', error)
    return NextResponse.json({ error: 'Failed to fetch pack statistics' }, { status: 500 })
  }
}

