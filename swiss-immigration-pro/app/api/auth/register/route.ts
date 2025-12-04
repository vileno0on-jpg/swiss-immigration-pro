import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { email, password, fullName } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Check if user already exists
    const { data: existingUsers, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (!checkError && existingUsers) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        email,
        password_hash: passwordHash,
        email_verified: true
      })
      .select('id, email')
      .single()

    if (userError || !user) {
      console.error('User creation error:', userError)
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }

    // Create profile
    const profileResult = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        email,
        full_name: fullName || null,
        pack_id: 'free'
      })
      .execute()

    const profileError = (profileResult as any).error
    if (profileError) {
      console.error('Profile creation error:', profileError)
    }

    // Create user limits
    const limitsResult = await supabase
      .from('user_limits')
      .insert({
        user_id: user.id,
        messages_today: 0,
        last_reset_date: new Date().toISOString().split('T')[0]
      })
      .execute()

    const limitsError = (limitsResult as any).error
    if (limitsError) {
      console.error('Limits creation error:', limitsError)
    }

    return NextResponse.json({ 
      success: true, 
      user: { id: user.id, email: user.email } 
    })
  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 500 }
    )
  }
}

