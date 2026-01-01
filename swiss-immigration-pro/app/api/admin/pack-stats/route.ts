import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@/lib/db-client'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = await createClient()

    // Get pack statistics
    const profilesResult = await db
      .from('profiles')
      .select('pack_id, pack_expires_at')
      .neq('pack_id', 'free')
      .execute()
    const profiles = profilesResult.data || []

    const packStats = profiles ? profiles.reduce((acc: any, profile: any) => {
      const packId = profile.pack_id
      if (!acc[packId]) {
        acc[packId] = { user_count: 0, active_count: 0, expired_count: 0 }
      }
      acc[packId].user_count += 1
      if (profile.pack_expires_at && new Date(profile.pack_expires_at) > new Date()) {
        acc[packId].active_count += 1
      } else {
        acc[packId].expired_count += 1
      }
      return acc
    }, {}) : {}

    // Get revenue by pack
    const paymentsResult = await db
      .from('payments')
      .select('user_id, amount, status')
      .eq('status', 'succeeded')
      .execute()
    const payments = paymentsResult.data || []

    const userPacksResult = await db
      .from('profiles')
      .select('id, pack_id')
      .neq('pack_id', 'free')
      .execute()
    const userPacks = userPacksResult.data || []

    const userPackMap: { [key: string]: string } = {}
    userPacks?.forEach((profile: any) => {
      userPackMap[profile.id] = profile.pack_id
    })

    const revenueByPack = payments ? payments.reduce((acc: any, payment: any) => {
      const packId = userPackMap[payment.user_id]
      if (packId) {
        if (!acc[packId]) {
          acc[packId] = { purchase_count: 0, total_revenue: 0 }
        }
        acc[packId].purchase_count += 1
        acc[packId].total_revenue += payment.amount
      }
      return acc
    }, {}) : {}

    // Get purchases by month (simplified)
    const purchasesByMonth = payments ? payments.reduce((acc: any, payment: any) => {
      const month = new Date(payment.created_at).toISOString().slice(0, 7) // YYYY-MM
      if (!acc[month]) {
        acc[month] = { purchase_count: 0, revenue: 0 }
      }
      acc[month].purchase_count += 1
      acc[month].revenue += payment.amount
      return acc
    }, {}) : {}

    return NextResponse.json({
      packStats: Object.entries(packStats).map(([packId, stats]: [string, any]) => ({
        pack_id: packId,
        user_count: stats.user_count,
        active_count: stats.active_count,
        expired_count: stats.expired_count
      })),
      revenueByPack: Object.entries(revenueByPack).map(([packId, stats]: [string, any]) => ({
        pack_id: packId,
        purchase_count: stats.purchase_count,
        total_revenue: stats.total_revenue
      })),
      purchasesByMonth: Object.entries(purchasesByMonth)
        .map(([month, stats]: [string, any]) => ({
          month,
          purchase_count: stats.purchase_count,
          revenue: stats.revenue
        }))
        .sort((a, b) => b.month.localeCompare(a.month))
        .slice(0, 12),
    })
  } catch (error: any) {
    console.error('Error fetching pack stats:', error)
    return NextResponse.json({ error: 'Failed to fetch pack statistics' }, { status: 500 })
  }
}

