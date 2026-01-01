// API Route: Get/Delete Single Resume
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@/lib/db-client'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const db = await createClient()

    // Get resume by ID (only if user owns it)
    const result = await db
      .from('user_cvs')
      .select('*')
      .eq('id', id)
      .eq('user_id', session.user.id)
      .single()

    const { data, error } = result

    if (error || !data) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      resume: data,
    })
  } catch (error: any) {
    console.error('Error fetching resume:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch resume' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const db = await createClient()

    // Check if user owns this resume and delete in one query
    // LocalDBClient delete only supports one eq, so we'll use a direct query
    const { query: dbQuery } = await import('@/lib/db')
    
    const result = await dbQuery(
      'DELETE FROM user_cvs WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, session.user.id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Resume not found or unauthorized' },
        { status: 404 }
      )
    }

    if (error) {
      console.error('Error deleting resume:', error)
      return NextResponse.json(
        { error: 'Failed to delete resume' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Resume deleted successfully',
    })
  } catch (error: any) {
    console.error('Error deleting resume:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete resume' },
      { status: 500 }
    )
  }
}

