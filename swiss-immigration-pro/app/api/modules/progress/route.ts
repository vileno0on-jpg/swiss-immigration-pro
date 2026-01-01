import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@/lib/db-client'

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

    const db = await createClient()

    // Get existing progress
    const { data: existing, error: fetchError } = await db
      .from('masterclass_progress')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('module_id', moduleId)
      .single()

    let progressData: Record<string, boolean> = {}
    if (!fetchError && existing?.metadata) {
      progressData = existing.metadata as any
    }

    // Update section completion
    progressData[sectionId] = completed === true

    // Calculate overall progress
    const totalSections = Object.keys(progressData).length
    const completedSections = Object.values(progressData).filter(Boolean).length
    const progressPercent = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0

    // Upsert progress
    const upsertData = {
      user_id: session.user.id,
      module_id: moduleId,
      progress_percent: progressPercent,
      metadata: progressData,
      updated_at: new Date().toISOString(),
      ...(progressPercent === 100 && { completed_at: new Date().toISOString() })
    }

    const { error: upsertError } = await db
      .from('masterclass_progress')
      .upsert(upsertData, {
        onConflict: 'user_id,module_id'
      })

    if (upsertError) {
      console.error('Progress upsert error:', upsertError)
      return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 })
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

    const db = await createClient()
    const { data: progress, error } = await db
      .from('masterclass_progress')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('module_id', moduleId)
      .single()

    if (error || !progress) {
      return NextResponse.json({
        progress: 0,
        sections: {},
        completed: false
      })
    }

    return NextResponse.json({
      progress: progress.progress_percent || 0,
      sections: progress.metadata || {},
      completed: progress.completed_at !== null,
      completedAt: progress.completed_at
    })
  } catch (error: any) {
    console.error('Progress fetch error:', error)
    return NextResponse.json({ error: error.message || 'Failed to fetch progress' }, { status: 500 })
  }
}

