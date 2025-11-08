import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { sql } from '@/lib/neon/db'

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { fullName, language } = await req.json()

    if (!sql) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }

    // Update profile
    await sql`
      UPDATE profiles
      SET full_name = ${fullName || null},
          updated_at = NOW(),
          metadata = COALESCE(metadata, '{}'::jsonb) || jsonb_build_object('language', ${language || 'en'})
      WHERE id = ${session.user.id}
    `

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

    if (!sql) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 })
    }

    // Get profile
    const profiles = await sql`
      SELECT id, email, full_name, pack_id, is_admin, metadata
      FROM profiles
      WHERE id = ${session.user.id}
    `

    const profile = profiles[0] as any

    if (!profile) {
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

