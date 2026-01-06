import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/db-client'

const CONSULTATION_TYPES: Record<string, { name: string; price: number }> = {
  quick: {
    name: 'Quick Guidance (30min)',
    price: 8000 // CHF 80 in cents
  },
  full: {
    name: 'Full Review (60min)',
    price: 20000 // CHF 200 in cents
  },
  support: {
    name: 'Application Support Package',
    price: 60000 // CHF 600 in cents
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    let { consultationType, fullName, email, preferredDate, timezone, notes } = body

    if (!consultationType || !fullName || !email || !preferredDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const consultation = CONSULTATION_TYPES[consultationType]
    if (!consultation) {
      return NextResponse.json(
        { error: 'Invalid consultation type' },
        { status: 400 }
      )
    }

    // Validate Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY || 
        process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder' || 
        process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
      console.error('STRIPE_SECRET_KEY is not configured')
      return NextResponse.json(
        { error: 'Payment system is not configured. Please contact support.' },
        { status: 500 }
      )
    }

    const db = await createClient()
    
    // Get user if logged in (optional - consultations can be booked by non-users)
    const session = await getServerSession(authOptions)
    let userId: string | null = null

    if (session?.user) {
      userId = session.user.id
      
      // Get user profile to link consultation
      const { data: profile } = await db
        .from('profiles')
        .select('id, email, full_name')
        .eq('id', userId)
        .single()

      if (profile) {
        // Use profile email if not provided
        if (!email) {
          email = profile.email
        }
      }
    }

    // Create consultation record in database (pending status)
    const { data: consultationRecord, error: dbError } = await db
      .from('consultations')
      .insert({
        user_id: userId,
        email: email,
        full_name: fullName,
        consultation_type: consultationType,
        preferred_date: preferredDate,
        timezone: timezone || 'UTC',
        status: 'pending',
        amount: consultation.price,
        notes: notes || null
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to create consultation record' },
        { status: 500 }
      )
    }

    // Create Stripe customer (or get existing)
    let customerId: string

    if (userId) {
      // Check if user has existing Stripe customer ID
      const { data: profile } = await db
        .from('profiles')
        .select('metadata')
        .eq('id', userId)
        .single()

      if (profile?.metadata?.stripe_customer_id) {
        customerId = profile.metadata.stripe_customer_id
      } else {
        // Create new Stripe customer
        const customer = await stripe.customers.create({
          email: email,
          name: fullName,
          metadata: {
            userId: userId || 'guest',
            consultationId: consultationRecord.id
          }
        })
        customerId = customer.id

        // Save customer ID to profile if user is logged in
        if (userId) {
          await db
            .from('profiles')
            .update({
              metadata: {
                ...(profile?.metadata || {}),
                stripe_customer_id: customerId
              }
            })
            .eq('id', userId)
        }
      }
    } else {
      // Create customer for guest booking
      const customer = await stripe.customers.create({
        email: email,
        name: fullName,
        metadata: {
          consultationId: consultationRecord.id
        }
      })
      customerId = customer.id
    }

    // Create Stripe Checkout Session (one-time payment)
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'chf',
            product_data: {
              name: consultation.name,
              description: `Consultation scheduled for ${new Date(preferredDate).toLocaleDateString()}`
            },
            unit_amount: consultation.price
          },
          quantity: 1
        }
      ],
      mode: 'payment', // One-time payment (not subscription)
      success_url: `${req.nextUrl.origin}/consultation/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/consultation?canceled=true`,
      metadata: {
        consultationId: consultationRecord.id,
        consultationType: consultationType,
        userId: userId || 'guest'
      },
      customer_email: email
    })

    if (!checkoutSession.url) {
      return NextResponse.json(
        { error: 'Failed to create checkout session' },
        { status: 500 }
      )
    }

    // Update consultation with payment intent ID
    await db
      .from('consultations')
      .update({
        stripe_payment_intent_id: checkoutSession.payment_intent as string
      })
      .eq('id', consultationRecord.id)

    return NextResponse.json({
      checkoutUrl: checkoutSession.url,
      consultationId: consultationRecord.id
    })
  } catch (error: any) {
    console.error('Consultation booking error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to book consultation' },
      { status: 500 }
    )
  }
}



