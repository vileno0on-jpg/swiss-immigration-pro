import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@/lib/db-client'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session.user.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const db = await createClient()

    // Get all stats concurrently
    const [
      userResult,
      subResult,
      msgResult,
      purchasesResult,
      recentResult
    ] = await Promise.all([
      db.from('profiles').select('*', { count: 'exact', head: true }).execute(),
      db.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active').execute(),
      db.from('chat_messages').select('*', { count: 'exact', head: true }).execute(),
      db.from('payments').select('*', { count: 'exact', head: true }).eq('status', 'succeeded').execute(),
      db.from('profiles').select('*', { count: 'exact', head: true }).gt('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()).execute()
    ])

    const userCount = userResult.count || 0
    const subCount = subResult.count || 0
    const msgCount = msgResult.count || 0
    const totalPurchases = purchasesResult.count || 0
    const recentSignups = recentResult.count || 0

    // Get users by pack
    const packResult = await db
      .from('profiles')
      .select('pack_id')
      .execute()
    const packData = packResult.data || []

    const usersByPack = packData ? packData.reduce((acc: any, profile: any) => {
      const packId = profile.pack_id
      if (!acc[packId]) {
        acc[packId] = 0
      }
      acc[packId] += 1
      return acc
    }, {}) : {}

    // Get total revenue
    const revenueResult = await db
      .from('payments')
      .select('amount')
      .eq('status', 'succeeded')
      .execute()
    const revenueData = revenueResult.data || []

    const totalRevenue = revenueData ? revenueData.reduce((sum: number, payment: any) => sum + payment.amount, 0) / 100 : 0

    // Get monthly revenue
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const monthlyRevenueResult = await db
      .from('payments')
      .select('amount')
      .eq('status', 'succeeded')
      .gte('created_at', startOfMonth.toISOString())
      .execute()
    const monthlyRevenueData = monthlyRevenueResult.data || []

    const monthlyRevenue = monthlyRevenueData ? monthlyRevenueData.reduce((sum: number, payment: any) => sum + payment.amount, 0) / 100 : 0

    return NextResponse.json({
      totalUsers: Number(userCount || 0),
      usersByPack: Object.entries(usersByPack).map(([packId, count]) => ({
        packId,
        count: Number(count),
      })),
      totalRevenue: Number(totalRevenue),
      monthlyRevenue: Number(monthlyRevenue),
      activeSubscriptions: Number(subCount || 0),
      messageCount: Number(msgCount || 0),
      totalPurchases: Number(totalPurchases || 0),
      recentSignups: Number(recentSignups || 0),
    })
  } catch (error) {
    console.error('Error loading admin stats:', error)
    return NextResponse.json(
      { error: 'Failed to load stats' },
      { status: 500 }
    )
  }
}

