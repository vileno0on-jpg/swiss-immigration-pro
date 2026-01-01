import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'
import { CONFIG } from '@/lib/config'
import { createClient } from '@/lib/db-client'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const db = await createClient()

    // Save contact submission to database (optional - you might want to create a contacts table)
    // For now, we'll just send the email

    // Send email to admin
    const adminEmail = CONFIG.app.adminEmail
    const emailSubject = `Contact Form: ${subject}`
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0056B3 0%, #007BFF 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="margin-top: 0; color: #0056B3; border-bottom: 2px solid #0056B3; padding-bottom: 10px;">
                ${subject}
              </h2>
              <p style="white-space: pre-wrap; color: #333; line-height: 1.8;">${message}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3 style="margin-top: 0; color: #0056B3;">Contact Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #666; width: 100px;">Name:</td>
                  <td style="padding: 8px 0; color: #333;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #666;">Email:</td>
                  <td style="padding: 8px 0;">
                    <a href="mailto:${email}" style="color: #0056B3; text-decoration: none;">${email}</a>
                  </td>
                </tr>
              </table>
            </div>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
              <a href="mailto:${email}" style="background: #0056B3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                Reply to ${name}
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px; color: #999; font-size: 12px;">
            <p>© 2025 ${CONFIG.app.firm}. All rights reserved.</p>
          </div>
        </body>
      </html>
    `

    const emailText = `
New Contact Form Submission

Subject: ${subject}

Message:
${message}

---
Contact Information:
Name: ${name}
Email: ${email}

Reply to: ${email}
    `.trim()

    // Send email
    const emailResult = await sendEmail(adminEmail, emailSubject, emailHtml, emailText)

    if (!emailResult.success) {
      console.error('Failed to send contact email:', emailResult.error)
      // Still return success to user, but log the error
    }

    // Optionally send confirmation email to user
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0056B3 0%, #007BFF 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Contacting Us!</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; margin-bottom: 20px;">Hello ${name},</p>
            
            <p>Thank you for reaching out to Swiss Immigration Pro. We've received your message and will get back to you within 24 hours.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0056B3;">
              <h3 style="margin-top: 0; color: #0056B3;">Your Message:</h3>
              <p style="color: #666; margin: 0;"><strong>Subject:</strong> ${subject}</p>
              <p style="color: #333; white-space: pre-wrap; margin-top: 10px;">${message}</p>
            </div>
            
            <p>In the meantime, feel free to:</p>
            <ul style="padding-left: 20px; color: #333;">
              <li>Explore our <a href="${CONFIG.app.url}/resources" style="color: #0056B3;">free resources</a></li>
              <li>Try our <a href="${CONFIG.app.url}" style="color: #0056B3;">AI chatbot</a> for instant answers</li>
              <li>Book a <a href="${CONFIG.app.url}/consultation" style="color: #0056B3;">consultation</a> for personalized guidance</li>
            </ul>
            
            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              Best regards,<br>
              The Swiss Immigration Pro Team
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px; color: #999; font-size: 12px;">
            <p>© 2025 ${CONFIG.app.firm}. All rights reserved.</p>
          </div>
        </body>
      </html>
    `

    await sendEmail(email, 'We Received Your Message - Swiss Immigration Pro', confirmationHtml)

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully'
    })
  } catch (error: any) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send message' },
      { status: 500 }
    )
  }
}



