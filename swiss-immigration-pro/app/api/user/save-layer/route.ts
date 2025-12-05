import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { layer } = await req.json()
    
    if (!layer || !['eu', 'us', 'other'].includes(layer)) {
      return NextResponse.json(
        { error: 'Invalid layer' },
        { status: 400 }
      )
    }

    const session = await getServerSession(authOptions)
    const supabase = await createClient()

    // Get IP address
    const forwarded = req.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown'
    const ipHash = Buffer.from(ip + 'swiss-immigration-salt').toString('base64').substring(0, 32)

    if (session?.user?.id) {
      // Save by account in metadata JSONB field
      const { data: profile } = await supabase
        .from('profiles')
        .select('metadata')
        .eq('id', session.user.id)
        .single()
        .execute()

      const currentMetadata = (profile as any)?.metadata || {}
      const updatedMetadata = {
        ...currentMetadata,
        selected_layer: layer,
        layer_selected_at: new Date().toISOString(),
        layer_selected_ip: ipHash,
      }

      await supabase
        .from('profiles')
        .update({ 
          metadata: updatedMetadata,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.user.id)
        .execute()
    }

    // Also save IP-based selection (can be used for analytics)
    // Store in a cookie or localStorage for non-logged-in users
    // The client can handle this via cookies

    return NextResponse.json({ 
      success: true,
      layer,
      saved: true,
      ipHash: session?.user?.id ? undefined : ipHash // Only return IP hash if not logged in
    })
  } catch (error: any) {
    console.error('Error saving layer:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to save layer' },
      { status: 500 }
    )
  }
}

