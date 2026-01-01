import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@/lib/db-client'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = await createClient()

    // Get basic stats that work with current Supabase setup
    const [
      usersResult,
      messagesResult,
      paymentsResult
    ] = await Promise.all([
      db.from('profiles').select('*', { count: 'exact', head: true }),
      db.from('chat_messages').select('*', { count: 'exact', head: true }),
      db.from('payments').select('*', { count: 'exact', head: true })
    ])

    // Handle both Supabase and local DB responses
    const totalUsers = (usersResult as any).count || 0
    const totalMessages = (messagesResult as any).count || 0
    const totalPayments = (paymentsResult as any).count || 0

    // Revenue by pack (simplified)
    const paymentsQueryResult = await db
      .from('payments')
      .select('pack_id, amount, status')
      .eq('status', 'succeeded')
    
    const paymentsData = (paymentsQueryResult as any).data || []

    const revenueByPack = paymentsData ? paymentsData.reduce((acc: any, payment: any) => {
      const packId = payment.pack_id
      if (!acc[packId]) {
        acc[packId] = { revenue: 0, count: 0 }
      }
      acc[packId].revenue += payment.amount
      acc[packId].count += 1
      return acc
    }, {}) : {}

    // Add revenueByMonth
    const revenueByMonth = paymentsData.reduce((acc: any, payment: any) => {
      if (payment.created_at) {
        const month = new Date(payment.created_at).toISOString().slice(0, 7)
        acc[month] = (acc[month] || 0) + (payment.amount / 100)
      }
      return acc
    }, {})

    // Add userGrowth: new users per month
    const usersQueryResult = await db
      .from('profiles')
      .select('created_at')

    const usersData = (usersQueryResult as any).data || []

    const userGrowth = usersData.reduce((acc: any, user: any) => {
      if (user.created_at) {
        const month = new Date(user.created_at).toISOString().slice(0, 7)
        acc[month] = (acc[month] || 0) + 1
      }
      return acc
    }, {})

    // Add dailyActiveUsers: unique users with messages per day
    const messagesQueryResult = await db
      .from('chat_messages')
      .select('user_id, created_at')

    const messagesData = (messagesQueryResult as any).data || []

    const dailyActive = messagesData.reduce((acc: any, msg: any) => {
      if (msg.created_at) {
        const day = new Date(msg.created_at).toISOString().slice(0, 10)
        acc[day] = acc[day] || new Set()
        acc[day].add(msg.user_id)
      }
      return acc
    }, {})

    // Add topUsers: users with most messages
    const messageCounts = messagesData.reduce((acc: any, msg: any) => {
      acc[msg.user_id] = (acc[msg.user_id] || 0) + 1
      return acc
    }, {})

    const topUsersList = Object.entries(messageCounts)
      .map(([userId, count]) => ({ userId, messageCount: count as number }))
      .sort((a, b) => b.messageCount - a.messageCount)
      .slice(0, 10)

    // Module completion stats (simplified)
    const progressResult = await db
      .from('masterclass_progress')
      .select('module_id, progress_percent')
    
    const progressData = (progressResult as any).data || []

    const moduleStats = progressData ? progressData.reduce((acc: any, progress: any) => {
      const moduleId = progress.module_id
      if (!acc[moduleId]) {
        acc[moduleId] = {
          total_users: 0,
          completed_users: 0,
          total_progress: 0
        }
      }
      acc[moduleId].total_users += 1
      if (progress.progress_percent === 100) {
        acc[moduleId].completed_users += 1
      }
      acc[moduleId].total_progress += progress.progress_percent
      return acc
    }, {}) : {}

    // Return simplified analytics
    const analytics = {
      totalUsers: totalUsers || 0,
      totalMessages: totalMessages || 0,
      totalPayments: totalPayments || 0,
      revenueByPack: Object.entries(revenueByPack).map(([packId, stats]: [string, any]) => ({
        packId,
        revenue: stats.revenue / 100,
        count: stats.count,
      })),
      moduleStats: Object.entries(moduleStats).map(([moduleId, stats]: [string, any]) => ({
        moduleId,
        totalUsers: stats.total_users,
        completedUsers: stats.completed_users,
        avgProgress: stats.total_users > 0 ? stats.total_progress / stats.total_users : 0,
      })),
      revenueByMonth: Object.entries(revenueByMonth).map(([month, revenue]) => ({
        month,
        revenue: revenue as number
      })).sort((a, b) => a.month.localeCompare(b.month)),
      userGrowth: Object.entries(userGrowth).map(([month, count]) => ({
        month,
        count: count as number
      })).sort((a, b) => a.month.localeCompare(b.month)),
      dailyActiveUsers: Object.entries(dailyActive).map(([day, userSet]) => ({
        day,
        activeUsers: (userSet as Set<string>).size
      })).sort((a, b) => a.day.localeCompare(b.day)),
      topUsers: topUsersList
    }

    return NextResponse.json(analytics)
  } catch (error: any) {
    console.error('Error loading analytics:', error)
    return NextResponse.json(
      { error: 'Failed to load analytics' },
      { status: 500 }
    )
  }
}
