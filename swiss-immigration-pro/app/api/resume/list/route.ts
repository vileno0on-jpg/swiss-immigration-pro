// API Route: List User's Saved Resumes
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@/lib/db-client'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = await createClient()

    // Get all resumes for this user
    const result = await db
      .from('user_cvs')
      .select('id, name, template_id, cv_data, created_at, updated_at')
      .eq('user_id', session.user.id)
      .order('updated_at', { ascending: false })
      .execute()

    const { data, error } = result

    if (error) {
      console.error('Error fetching resumes:', error)
      return NextResponse.json(
        { error: 'Failed to fetch resumes' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      resumes: data || [],
    })
  } catch (error: any) {
    console.error('Error fetching resumes:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch resumes' },
      { status: 500 }
    )
  }
}

