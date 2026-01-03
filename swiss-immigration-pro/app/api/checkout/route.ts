import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { stripe, getSubscriptionPriceId, ONE_TIME_PRODUCTS } from '@/lib/stripe'
import { createClient } from '@/lib/db-client'

export async function POST(req: NextRequest) {
  try {
    const { packId, cycle = 'monthly', oneTimeProductId } = await req.json()

    if (!packId) {
      return NextResponse.json(
        { error: 'Pack ID is required' },
        { status: 400 }
      )
    }

    // Validate Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY || 
        process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder' || 
        process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
      console.error('STRIPE_SECRET_KEY is not configured or is placeholder')
      return NextResponse.json(
        { error: 'Payment system is not configured. Please set up Stripe API keys in your environment variables.' },
        { status: 500 }
      )
    }

    // Validate Stripe client is initialized
    if (!stripe || typeof stripe.checkout === 'undefined') {
      console.error('Stripe client is not properly initialized')
      return NextResponse.json(
        { error: 'Payment system initialization failed. Please check your Stripe configuration.' },
        { status: 500 }
      )
    }

    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const db = await createClient()

    // Get user profile
    const { data: profile, error: profileError } = await db
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single()

    if (profileError || !profile) {
      console.error('Profile fetch error:', profileError)
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    // Create or retrieve Stripe customer
    let customerId = profile.metadata?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: session.user.email,
        metadata: {
          userId: session.user.id,
        },
      })
      customerId = customer.id

      // Save customer ID to profile
      const updatedMetadata = {
        ...(profile.metadata || {}),
        stripe_customer_id: customerId,
      }

      const { error: updateError } = await db
        .from('profiles')
        .update({
          metadata: updatedMetadata,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.user.id)

      if (updateError) {
        console.error('Profile update error:', updateError)
        return NextResponse.json({ error: 'Failed to save customer information' }, { status: 500 })
      }
    }

        // If one-time product requested, bypass subscription logic
    if (oneTimeProductId) {
      const product = ONE_TIME_PRODUCTS[oneTimeProductId as keyof typeof ONE_TIME_PRODUCTS]
      if (!product) {
        return NextResponse.json({ error: 'Invalid product' }, { status: 400 })
      }
      const checkoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        line_items: [
          {
            price_data: {
              currency: 'chf',
              product_data: {
                name: product.name,
                description: product.description,
              },
              unit_amount: product.price,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.nextUrl.origin}/tools/apartment-finder?session_id={CHECKOUT_SESSION_ID}&success=1`,
        cancel_url: `${req.nextUrl.origin}/tools/apartment-finder`,
        metadata: {
          userId: session.user.id,
          productId: product.id,
        },
      })
      return NextResponse.json({ url: checkoutSession.url })
    }

    // Get pack price
    const packPrice = getPackPrice(packId, cycle)
    if (packPrice === 0) {
      return NextResponse.json(
        { error: 'Invalid pack selected' },
        { status: 400 }
      )
    }

    // Create checkout session using predefined Stripe Price IDs
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: getSubscriptionPriceId(packId as any, cycle),
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.nextUrl.origin}/consultation/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/pricing`,
      metadata: {
        userId: session.user.id,
        packId,
        cycle,
      },
    })

    if (!checkoutSession.url) {
      console.error('Stripe returned no URL for checkout session')
      return NextResponse.json(
        { error: 'Failed to generate checkout URL' },
        { status: 500 }
      )
    }

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error: any) {
    console.error('Checkout error details:', {
      message: error.message,
      type: error.type,
      code: error.code,
      statusCode: error.statusCode,
      stack: error.stack
    })
    
    // Provide more specific error messages
    let errorMessage = 'Failed to create checkout session'
    if (error.message) {
      errorMessage = error.message
    } else if (error.type === 'StripeInvalidRequestError') {
      errorMessage = 'Invalid payment configuration. Please contact support.'
    } else if (error.type === 'StripeAPIError') {
      errorMessage = 'Payment service temporarily unavailable. Please try again.'
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

function getPackPrice(packId: string, cycle: 'monthly' | 'annual' = 'monthly'): number {
  // Prices in CHF (monthly)
  const monthlyPrices: Record<string, number> = {
    immigration: 15,
    advanced: 39,
    citizenship: 119,
  }

  const monthlyPrice = monthlyPrices[packId] || 0
  if (monthlyPrice === 0) return 0

  // For annual, apply 20% discount
  if (cycle === 'annual') {
    const annualPrice = Math.round(monthlyPrice * 12 * 0.8) // 20% off
    return annualPrice * 100 // Convert to cents
  }

  return monthlyPrice * 100 // Convert to cents
}

function getPackName(packId: string): string {
  const names: Record<string, string> = {
    immigration: 'Immigration Pack',
    advanced: 'Advanced Pack',
    citizenship: 'Citizenship Pro Pack',
  }
  return names[packId] || `${packId} Pack`
}

