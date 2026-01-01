// API Route: Save Resume to Local Database
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@/lib/db-client'
import type { ResumeData } from '@/types/resume'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { resumeData, name } = await req.json()

    if (!resumeData || !name) {
      return NextResponse.json(
        { error: 'Resume data and name are required' },
        { status: 400 }
      )
    }

    const db = await createClient()

    // Save resume to user_cvs table
    const result = await db
      .from('user_cvs')
      .insert({
        user_id: session.user.id,
        name: name,
        cv_data: resumeData,
        template_id: resumeData.templateId || null,
        updated_at: new Date().toISOString(),
      })
      .select('*')
      .single()
    
    const { data, error } = result

    if (error) {
      console.error('Error saving resume:', error)
      return NextResponse.json(
        { error: 'Failed to save resume' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      resume: data,
    })
  } catch (error: any) {
    console.error('Error saving resume:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to save resume' },
      { status: 500 }
    )
  }
}

// Update existing resume
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id, resumeData, name } = await req.json()

    if (!id || !resumeData) {
      return NextResponse.json(
        { error: 'Resume ID and data are required' },
        { status: 400 }
      )
    }

    const db = await createClient()

    // Update resume
    const updateData: any = {
      cv_data: resumeData,
      template_id: resumeData.templateId || null,
      updated_at: new Date().toISOString(),
    }

    if (name) {
      updateData.name = name
    }

    // First check if user owns this resume
    const checkResult = await db
      .from('user_cvs')
      .select('id')
      .eq('id', id)
      .eq('user_id', session.user.id)
      .single()

    if (checkResult.error || !checkResult.data) {
      return NextResponse.json(
        { error: 'Resume not found or unauthorized' },
        { status: 404 }
      )
    }

    // Update resume - LocalDBClient update doesn't support chaining select, so we query after update
    const updateResult = await db
      .from('user_cvs')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', session.user.id)

    if (updateResult.error) {
      return NextResponse.json(
        { error: 'Failed to update resume' },
        { status: 500 }
      )
    }

    // Fetch updated resume
    const fetchResult = await db
      .from('user_cvs')
      .select('*')
      .eq('id', id)
      .single()

    const { data, error } = fetchResult

    if (error) {
      console.error('Error updating resume:', error)
      return NextResponse.json(
        { error: 'Failed to update resume' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      resume: data,
    })
  } catch (error: any) {
    console.error('Error updating resume:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update resume' },
      { status: 500 }
    )
  }
}

