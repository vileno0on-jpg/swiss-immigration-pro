import { Resend } from 'resend'
import { CONFIG } from './config'

// Initialize Resend client
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null

// Email templates
export const emailTemplates = {
  welcome: (email: string, name?: string) => ({
    subject: 'Welcome to Swiss Immigration Pro! 🎉',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Swiss Immigration Pro</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0056B3 0%, #007BFF 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Swiss Immigration Pro!</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; margin-bottom: 20px;">Hello ${name || 'there'},</p>
            
            <p>Thank you for joining Swiss Immigration Pro! We're excited to help you navigate your journey to Switzerland.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0056B3;">
              <h2 style="margin-top: 0; color: #0056B3;">What's Next?</h2>
              <ul style="padding-left: 20px;">
                <li>Explore our comprehensive immigration guides</li>
                <li>Chat with our AI assistant (10 free messages daily)</li>
                <li>Access CV templates and resources</li>
                <li>Track your application progress</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${CONFIG.app.url}/dashboard" style="background: #0056B3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">Go to Dashboard</a>
            </div>
            
            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              Need help? Contact us at <a href="mailto:${CONFIG.app.adminEmail}" style="color: #0056B3;">${CONFIG.app.adminEmail}</a>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px; color: #999; font-size: 12px;">
            <p>© 2025 ${CONFIG.app.firm}. All rights reserved.</p>
            <p><a href="${CONFIG.app.url}/privacy" style="color: #0056B3;">Privacy Policy</a> | <a href="${CONFIG.app.url}/unsubscribe" style="color: #0056B3;">Unsubscribe</a></p>
          </div>
        </body>
      </html>
    `,
    text: `
Welcome to Swiss Immigration Pro!

Hello ${name || 'there'},

Thank you for joining Swiss Immigration Pro! We're excited to help you navigate your journey to Switzerland.

What's Next?
- Explore our comprehensive immigration guides
- Chat with our AI assistant (10 free messages daily)
- Access CV templates and resources
- Track your application progress

Go to Dashboard: ${CONFIG.app.url}/dashboard

Need help? Contact us at ${CONFIG.app.adminEmail}

© 2025 ${CONFIG.app.firm}. All rights reserved.
    `.trim()
  }),

  newsletterWelcome: (email: string) => ({
    subject: 'You\'re subscribed to Swiss Immigration Updates! 📬',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Newsletter Subscription Confirmed</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0056B3 0%, #007BFF 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">You're Subscribed! 🎉</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; margin-bottom: 20px;">Hello,</p>
            
            <p>Thank you for subscribing to Swiss Immigration Pro newsletter! You'll now receive:</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0056B3;">
              <ul style="padding-left: 20px; margin: 0;">
                <li>Weekly quota alerts and updates</li>
                <li>Policy changes and immigration news</li>
                <li>Exclusive tips and success stories</li>
                <li>Special offers and resources</li>
              </ul>
            </div>
            
            <p>We'll make sure to only send you valuable content. No spam, promise!</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${CONFIG.app.url}" style="background: #0056B3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">Explore Our Platform</a>
            </div>
            
            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              Want to unsubscribe? <a href="${CONFIG.app.url}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #0056B3;">Click here</a>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px; color: #999; font-size: 12px;">
            <p>© 2025 ${CONFIG.app.firm}. All rights reserved.</p>
            <p><a href="${CONFIG.app.url}/privacy" style="color: #0056B3;">Privacy Policy</a></p>
          </div>
        </body>
      </html>
    `,
    text: `
You're Subscribed! 🎉

Hello,

Thank you for subscribing to Swiss Immigration Pro newsletter! You'll now receive:
- Weekly quota alerts and updates
- Policy changes and immigration news
- Exclusive tips and success stories
- Special offers and resources

We'll make sure to only send you valuable content. No spam, promise!

Explore Our Platform: ${CONFIG.app.url}

Want to unsubscribe? Visit: ${CONFIG.app.url}/unsubscribe?email=${encodeURIComponent(email)}

© 2025 ${CONFIG.app.firm}. All rights reserved.
    `.trim()
  }),

  passwordReset: (email: string, resetLink: string) => ({
    subject: 'Reset Your Password - Swiss Immigration Pro',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0056B3 0%, #007BFF 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Password Reset</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; margin-bottom: 20px;">Hello,</p>
            
            <p>We received a request to reset your password for your Swiss Immigration Pro account.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="background: #0056B3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">Reset Password</a>
            </div>
            
            <p style="font-size: 14px; color: #666;">
              Or copy and paste this link into your browser:<br>
              <a href="${resetLink}" style="color: #0056B3; word-break: break-all;">${resetLink}</a>
            </p>
            
            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
              <p style="margin: 0; font-size: 14px;"><strong>Security Note:</strong> This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px; color: #999; font-size: 12px;">
            <p>© 2025 ${CONFIG.app.firm}. All rights reserved.</p>
            <p><a href="${CONFIG.app.url}/privacy" style="color: #0056B3;">Privacy Policy</a></p>
          </div>
        </body>
      </html>
    `,
    text: `
Password Reset

Hello,

We received a request to reset your password for your Swiss Immigration Pro account.

Reset Password: ${resetLink}

This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.

© 2025 ${CONFIG.app.firm}. All rights reserved.
    `.trim()
  }),

  subscriptionConfirmation: (email: string, packName: string, amount: number) => ({
    subject: `Welcome to ${packName}! - Swiss Immigration Pro`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Subscription Confirmed</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0056B3 0%, #007BFF 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Subscription Confirmed! 🎉</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; margin-bottom: 20px;">Hello,</p>
            
            <p>Thank you for subscribing to <strong>${packName}</strong>!</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
              <h2 style="margin-top: 0; color: #28a745;">Order Summary</h2>
              <p><strong>Plan:</strong> ${packName}</p>
              <p><strong>Amount:</strong> CHF ${amount.toFixed(2)}/month</p>
              <p><strong>Status:</strong> Active</p>
            </div>
            
            <p>Your subscription is now active and you have access to all features included in your plan.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${CONFIG.app.url}/dashboard" style="background: #0056B3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">Go to Dashboard</a>
            </div>
            
            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              Questions? Contact us at <a href="mailto:${CONFIG.app.adminEmail}" style="color: #0056B3;">${CONFIG.app.adminEmail}</a>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px; color: #999; font-size: 12px;">
            <p>© 2025 ${CONFIG.app.firm}. All rights reserved.</p>
            <p><a href="${CONFIG.app.url}/privacy" style="color: #0056B3;">Privacy Policy</a></p>
          </div>
        </body>
      </html>
    `,
    text: `
Subscription Confirmed! 🎉

Hello,

Thank you for subscribing to ${packName}!

Order Summary
Plan: ${packName}
Amount: CHF ${amount.toFixed(2)}/month
Status: Active

Your subscription is now active and you have access to all features included in your plan.

Go to Dashboard: ${CONFIG.app.url}/dashboard

Questions? Contact us at ${CONFIG.app.adminEmail}

© 2025 ${CONFIG.app.firm}. All rights reserved.
    `.trim()
  }),

  newsletter: (subject: string, content: string, unsubscribeLink: string) => ({
    subject,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0056B3 0%, #007BFF 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Swiss Immigration Pro</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            ${content}
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px; color: #999; font-size: 12px; border-top: 1px solid #ddd;">
            <p><a href="${unsubscribeLink}" style="color: #0056B3;">Unsubscribe</a> | <a href="${CONFIG.app.url}" style="color: #0056B3;">Visit Website</a></p>
            <p>© 2025 ${CONFIG.app.firm}. All rights reserved.</p>
            <p><a href="${CONFIG.app.url}/privacy" style="color: #0056B3;">Privacy Policy</a></p>
          </div>
        </body>
      </html>
    `,
    text: `
Swiss Immigration Pro

${content.replace(/<[^>]*>/g, '')}

Unsubscribe: ${unsubscribeLink}
Visit Website: ${CONFIG.app.url}

© 2025 ${CONFIG.app.firm}. All rights reserved.
    `.trim()
  })
}

// Email sending functions
export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text?: string
): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.warn('Resend API key not configured. Email not sent to:', to)
    console.log('Would send email:', { to, subject })
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const from = process.env.RESEND_FROM_EMAIL || `Swiss Immigration Pro <noreply@${CONFIG.app.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}>`
    
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Email send error:', error)
    return { success: false, error: error.message }
  }
}

// Convenience functions
export async function sendWelcomeEmail(email: string, name?: string) {
  const template = emailTemplates.welcome(email, name)
  return sendEmail(email, template.subject, template.html, template.text)
}

export async function sendNewsletterWelcomeEmail(email: string) {
  const template = emailTemplates.newsletterWelcome(email)
  return sendEmail(email, template.subject, template.html, template.text)
}

export async function sendPasswordResetEmail(email: string, resetLink: string) {
  const template = emailTemplates.passwordReset(email, resetLink)
  return sendEmail(email, template.subject, template.html, template.text)
}

export async function sendSubscriptionConfirmationEmail(
  email: string,
  packName: string,
  amount: number
) {
  const template = emailTemplates.subscriptionConfirmation(email, packName, amount)
  return sendEmail(email, template.subject, template.html, template.text)
}

export async function sendNewsletterEmail(
  to: string,
  subject: string,
  content: string,
  unsubscribeLink: string
) {
  const template = emailTemplates.newsletter(subject, content, unsubscribeLink)
  return sendEmail(to, template.subject, template.html, template.text)
}



