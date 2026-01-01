import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { stripe, ONE_TIME_PRODUCTS } from '@/lib/stripe'
import { createClient } from '@/lib/db-client'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { productId } = body

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const product = ONE_TIME_PRODUCTS[productId as keyof typeof ONE_TIME_PRODUCTS]
    if (!product) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
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

    const session = await getServerSession(authOptions)
    const db = await createClient()

    // Get or create Stripe customer
    let customerId: string | undefined

    if (session?.user) {
      const { data: profile } = await db
        .from('profiles')
        .select('metadata, email')
        .eq('id', session.user.id)
        .single()

      if (profile?.metadata?.stripe_customer_id) {
        customerId = profile.metadata.stripe_customer_id
      } else if (profile?.email) {
        const customer = await stripe.customers.create({
          email: profile.email,
          metadata: {
            userId: session.user.id
          }
        })
        customerId = customer.id

        await db
          .from('profiles')
          .update({
            metadata: {
              ...(profile.metadata || {}),
              stripe_customer_id: customerId
            }
          })
          .eq('id', session.user.id)
      }
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
              name: product.name,
              description: product.description
            },
            unit_amount: product.price
          },
          quantity: 1
        }
      ],
      mode: 'payment', // One-time payment
      success_url: `${req.nextUrl.origin}/products/success?session_id={CHECKOUT_SESSION_ID}&product_id=${productId}`,
      cancel_url: `${req.nextUrl.origin}/products/${productId}?canceled=true`,
      metadata: {
        productId: productId,
        productType: product.type,
        userId: session?.user?.id || 'guest'
      },
      customer_email: session?.user?.email || undefined
    })

    if (!checkoutSession.url) {
      return NextResponse.json(
        { error: 'Failed to create checkout session' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      checkoutUrl: checkoutSession.url,
      productId: productId
    })
  } catch (error: any) {
    console.error('Product checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}



