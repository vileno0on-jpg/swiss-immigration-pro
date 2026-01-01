import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { query } from '@/lib/db'

// Get a specific CV
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params
    const userId = session.user.id

    const result = await query(
      `SELECT id, name, cv_data, template_id, created_at, updated_at
       FROM public.user_cvs
       WHERE id = $1 AND user_id = $2`,
      [id, userId]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'CV not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      cv: result.rows[0]
    })
  } catch (error: any) {
    console.error('CV get error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to load CV' },
      { status: 500 }
    )
  }
}

// Delete a CV
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params
    const userId = session.user.id

    const result = await query(
      `DELETE FROM public.user_cvs
       WHERE id = $1 AND user_id = $2
       RETURNING id`,
      [id, userId]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'CV not found or access denied' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'CV deleted successfully'
    })
  } catch (error: any) {
    console.error('CV delete error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete CV' },
      { status: 500 }
    )
  }
}





