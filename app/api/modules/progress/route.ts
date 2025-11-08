import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@/lib/neon/db'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { moduleId, sectionId, completed } = await req.json()

    if (!moduleId || !sectionId) {
      return NextResponse.json({ error: 'Module ID and Section ID are required' }, { status: 400 })
    }

    // Store section completion in a JSON structure
    const progressKey = `module_${moduleId}_progress`
    
    // Get existing progress
    const existing = await sql`
      SELECT * FROM masterclass_progress
      WHERE user_id = ${session.user.id} AND module_id = ${moduleId}
    `

    let progressData: Record<string, boolean> = {}
    if (existing.length > 0 && existing[0].metadata) {
      progressData = existing[0].metadata as any
    }

    // Update section completion
    progressData[sectionId] = completed === true

    // Calculate overall progress
    const totalSections = Object.keys(progressData).length
    const completedSections = Object.values(progressData).filter(Boolean).length
    const progressPercent = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0

    // Upsert progress
    if (existing.length > 0) {
      await sql`
        UPDATE masterclass_progress
        SET progress_percent = ${progressPercent},
            metadata = ${JSON.stringify(progressData)}::jsonb,
            updated_at = NOW(),
            completed_at = CASE WHEN ${progressPercent} = 100 THEN NOW() ELSE completed_at END
        WHERE user_id = ${session.user.id} AND module_id = ${moduleId}
      `
    } else {
      await sql`
        INSERT INTO masterclass_progress (user_id, module_id, progress_percent, metadata)
        VALUES (${session.user.id}, ${moduleId}, ${progressPercent}, ${JSON.stringify(progressData)}::jsonb)
      `
    }

    return NextResponse.json({ 
      success: true, 
      progress: progressPercent,
      completedSections,
      totalSections
    })
  } catch (error: any) {
    console.error('Progress update error:', error)
    return NextResponse.json({ error: error.message || 'Failed to update progress' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const moduleId = searchParams.get('moduleId')

    if (!moduleId) {
      return NextResponse.json({ error: 'Module ID is required' }, { status: 400 })
    }

    const progress = await sql`
      SELECT * FROM masterclass_progress
      WHERE user_id = ${session.user.id} AND module_id = ${moduleId}
    `

    if (progress.length === 0) {
      return NextResponse.json({ 
        progress: 0,
        sections: {},
        completed: false
      })
    }

    const p = progress[0] as any
    return NextResponse.json({
      progress: p.progress_percent || 0,
      sections: p.metadata || {},
      completed: p.completed_at !== null,
      completedAt: p.completed_at
    })
  } catch (error: any) {
    console.error('Progress fetch error:', error)
    return NextResponse.json({ error: error.message || 'Failed to fetch progress' }, { status: 500 })
  }
}

