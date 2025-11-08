import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      countryOfOrigin,
      nationality,
      immigrationReason,
      ageRange,
      hasJobOffer,
      languageSkills,
      email,
      layer,
      completedAt,
    } = body

    const supabase = await createClient()

    // Try to get user if authenticated
    const { data: { user } } = await supabase.auth.getUser()

    // Save quiz result (can be anonymous if no user)
    const quizData = {
      user_id: user?.id || null,
      quiz_type: 'initial_assessment',
      score: 0, // Not applicable for initial assessment
      total_questions: 7,
      answers: {
        countryOfOrigin,
        nationality,
        immigrationReason,
        ageRange,
        hasJobOffer,
        languageSkills,
        email,
        layer,
        completedAt,
      },
    }

    // Insert into quiz_results table
    const { data, error } = await supabase
      .from('quiz_results')
      .insert([quizData])
      .select()
      .single()

    if (error) {
      console.error('Error saving quiz:', error)
      return NextResponse.json({ error: 'Failed to save quiz' }, { status: 500 })
    }

    // If email provided, also save as lead (for marketing)
    if (email && !user) {
      // Could create a leads table or save to profiles with a flag
      // For now, we'll just save in quiz_results
    }

    return NextResponse.json({ success: true, id: data.id })
  } catch (error) {
    console.error('Error in quiz save:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

