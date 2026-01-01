import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { query } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in to view your CVs.' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    const result = await query(
      `SELECT id, name, cv_data, template_id, created_at, updated_at
       FROM public.user_cvs
       WHERE user_id = $1
       ORDER BY updated_at DESC`,
      [userId]
    )

    return NextResponse.json({
      success: true,
      cvs: result.rows || []
    })
  } catch (error: any) {
    console.error('CV list error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to load CVs' },
      { status: 500 }
    )
  }
}

