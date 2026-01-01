import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { query } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in to save your CV.' },
        { status: 401 }
      )
    }

    const { cvData, name, cvId } = await req.json()

    if (!cvData) {
      return NextResponse.json(
        { error: 'CV data is required' },
        { status: 400 }
      )
    }

    const userId = session.user.id
    const cvName = name || cvData.name || 'My CV'
    const templateId = cvData.templateId || null

    if (cvId) {
      // Update existing CV
      const result = await query(
        `UPDATE public.user_cvs 
         SET name = $1, cv_data = $2, template_id = $3, updated_at = NOW()
         WHERE id = $4 AND user_id = $5
         RETURNING id, name, cv_data, template_id, created_at, updated_at`,
        [cvName, JSON.stringify(cvData), templateId, cvId, userId]
      )

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'CV not found or access denied' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        cv: result.rows[0],
        message: 'CV updated successfully'
      })
    } else {
      // Create new CV
      const result = await query(
        `INSERT INTO public.user_cvs (user_id, name, cv_data, template_id)
         VALUES ($1, $2, $3, $4)
         RETURNING id, name, cv_data, template_id, created_at, updated_at`,
        [userId, cvName, JSON.stringify(cvData), templateId]
      )

      return NextResponse.json({
        success: true,
        cv: result.rows[0],
        message: 'CV saved successfully'
      })
    }
  } catch (error: any) {
    console.error('CV save error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to save CV' },
      { status: 500 }
    )
  }
}

