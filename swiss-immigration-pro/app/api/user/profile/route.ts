import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@/lib/db-client'

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { fullName, language } = await req.json()

    const db = await createClient()

    // Update profile
    const { error } = await db
      .from('profiles')
      .update({
        full_name: fullName || null,
        updated_at: new Date().toISOString(),
        metadata: {
          language: language || 'en'
        }
      })
      .eq('id', session.user.id)

    if (error) {
      console.error('Profile update error:', error)
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Profile updated successfully' })
  } catch (error: any) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: error.message || 'Failed to update profile' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = await createClient()

    // Get profile
    const { data: profile, error } = await db
      .from('profiles')
      .select('id, email, full_name, pack_id, is_admin, metadata')
      .eq('id', session.user.id)
      .single()

    if (error || !profile) {
      console.error('Profile fetch error:', error)
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: profile.id,
      email: profile.email,
      fullName: profile.full_name,
      packId: profile.pack_id,
      isAdmin: profile.is_admin,
      language: profile.metadata?.language || 'en',
    })
  } catch (error: any) {
    console.error('Profile fetch error:', error)
    return NextResponse.json({ error: error.message || 'Failed to fetch profile' }, { status: 500 })
  }
}

