import { emailTemplates, sendEmail } from './email'
import { CONFIG } from './config'

export type EmailSequenceType = 'welcome' | 'value' | 'upgrade' | 'consultation_followup'

export interface EmailSequenceStep {
  delayDays: number // Days after trigger (0 = immediate)
  subject: string
  html: string
  text: string
}

// Welcome Sequence (for new signups)
export const WELCOME_SEQUENCE: EmailSequenceStep[] = [
  {
    delayDays: 0,
    subject: 'Welcome to Swiss Immigration Pro! 🎉',
    ...emailTemplates.welcome('', '') // Will be populated with actual values
  },
  {
    delayDays: 1,
    subject: 'Your First Steps to Swiss Immigration',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0056B3 0%, #007BFF 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Your First Steps</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; margin-bottom: 20px;">Hello,</p>
            
            <p>Now that you're part of Swiss Immigration Pro, here are your first steps:</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0056B3;">
              <h2 style="margin-top: 0; color: #0056B3;">Action Items</h2>
              <ol style="padding-left: 20px;">
                <li>Take our free immigration assessment quiz</li>
                <li>Explore the visa types and requirements</li>
                <li>Check out our free resources and guides</li>
                <li>Try our AI chatbot (10 free messages daily)</li>
              </ol>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${CONFIG.app.url}/quiz" style="background: #0056B3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">Take Assessment Quiz</a>
            </div>
            
            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              Questions? Reply to this email or visit our <a href="${CONFIG.app.url}/contact" style="color: #0056B3;">contact page</a>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px; color: #999; font-size: 12px;">
            <p>© 2025 ${CONFIG.app.firm}. All rights reserved.</p>
          </div>
        </body>
      </html>
    `,
    text: `Your First Steps to Swiss Immigration

Hello,

Now that you're part of Swiss Immigration Pro, here are your first steps:

Action Items:
1. Take our free immigration assessment quiz
2. Explore the visa types and requirements
3. Check out our free resources and guides
4. Try our AI chatbot (10 free messages daily)

Take Assessment Quiz: ${CONFIG.app.url}/quiz

Questions? Visit: ${CONFIG.app.url}/contact

© 2025 ${CONFIG.app.firm}. All rights reserved.`
  },
  {
    delayDays: 3,
    subject: 'Swiss Work Permit Quotas: Act Now',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0056B3 0%, #007BFF 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">⏰ Quota Alert</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; margin-bottom: 20px;">Hello,</p>
            
            <p><strong>Time-sensitive update:</strong> Swiss work permit quotas for 2025 are filling up fast!</p>
            
            <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
              <h2 style="margin-top: 0; color: #856404;">2025 Quota Status</h2>
              <ul style="padding-left: 20px; margin: 0;">
                <li>Only <strong>2,500 L permits</strong> remaining</li>
                <li>Only <strong>3,200 B permits</strong> remaining</li>
                <li>Quotas filling 3x faster than last year</li>
              </ul>
            </div>
            
            <p>Don't wait! Start your application process now to secure your spot.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${CONFIG.app.url}/employment" style="background: #0056B3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">Check Quota Status</a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px; color: #999; font-size: 12px;">
            <p>© 2025 ${CONFIG.app.firm}. All rights reserved.</p>
          </div>
        </body>
      </html>
    `,
    text: `Swiss Work Permit Quotas: Act Now

Hello,

Time-sensitive update: Swiss work permit quotas for 2025 are filling up fast!

2025 Quota Status:
- Only 2,500 L permits remaining
- Only 3,200 B permits remaining
- Quotas filling 3x faster than last year

Don't wait! Start your application process now to secure your spot.

Check Quota Status: ${CONFIG.app.url}/employment

© 2025 ${CONFIG.app.firm}. All rights reserved.`
  },
  {
    delayDays: 7,
    subject: 'Unlock Full Access - Limited Time Offer',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0056B3 0%, #007BFF 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Ready to Go Pro?</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; margin-bottom: 20px;">Hello,</p>
            
            <p>You've been using our free resources for a week now. Ready to take the next step?</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0056B3;">
              <h2 style="margin-top: 0; color: #0056B3;">What You Get:</h2>
              <ul style="padding-left: 20px;">
                <li>✅ Unlimited AI chatbot access</li>
                <li>✅ 20+ Swiss CV templates</li>
                <li>✅ Complete guide modules</li>
                <li>✅ Priority email support</li>
                <li>✅ Application checklists & tools</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${CONFIG.app.url}/pricing" style="background: #0056B3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">View Pricing Plans</a>
            </div>
            
            <p style="font-size: 14px; color: #666; text-align: center;">
              Starting at just CHF 9/month. Cancel anytime.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px; color: #999; font-size: 12px;">
            <p>© 2025 ${CONFIG.app.firm}. All rights reserved.</p>
          </div>
        </body>
      </html>
    `,
    text: `Ready to Go Pro?

Hello,

You've been using our free resources for a week now. Ready to take the next step?

What You Get:
✅ Unlimited AI chatbot access
✅ 20+ Swiss CV templates
✅ Complete guide modules
✅ Priority email support
✅ Application checklists & tools

View Pricing Plans: ${CONFIG.app.url}/pricing

Starting at just CHF 9/month. Cancel anytime.

© 2025 ${CONFIG.app.firm}. All rights reserved.`
  }
]

// Value Sequence (for free users who are engaged)
export const VALUE_SEQUENCE: EmailSequenceStep[] = [
  {
    delayDays: 14,
    subject: 'Free Resource: Swiss Immigration Checklist',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0056B3 0%, #007BFF 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Free Resource for You</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; margin-bottom: 20px;">Hello,</p>
            
            <p>As a thank you for being part of our community, here's a free resource:</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0056B3;">
              <h2 style="margin-top: 0; color: #0056B3;">Swiss Immigration Checklist</h2>
              <p>Complete step-by-step checklist including:</p>
              <ul style="padding-left: 20px;">
                <li>Visa type identification</li>
                <li>Document requirements</li>
                <li>Application timeline</li>
                <li>Cantonal variations</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${CONFIG.app.url}/downloads/immigration-checklist" style="background: #0056B3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">Download Free Checklist</a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px; color: #999; font-size: 12px;">
            <p>© 2025 ${CONFIG.app.firm}. All rights reserved.</p>
          </div>
        </body>
      </html>
    `,
    text: `Free Resource: Swiss Immigration Checklist

Hello,

As a thank you for being part of our community, here's a free resource:

Swiss Immigration Checklist
Complete step-by-step checklist including:
- Visa type identification
- Document requirements
- Application timeline
- Cantonal variations

Download Free Checklist: ${CONFIG.app.url}/downloads/immigration-checklist

© 2025 ${CONFIG.app.firm}. All rights reserved.`
  }
]

// Consultation Follow-up Sequence
export const CONSULTATION_FOLLOWUP_SEQUENCE: EmailSequenceStep[] = [
  {
    delayDays: 0,
    subject: 'Your Consultation is Confirmed! 📅',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0056B3 0%, #007BFF 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Consultation Confirmed! 🎉</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; margin-bottom: 20px;">Hello,</p>
            
            <p>Thank you for booking a consultation with Swiss Immigration Pro!</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0056B3;">
              <h2 style="margin-top: 0; color: #0056B3;">Next Steps:</h2>
              <ol style="padding-left: 20px;">
                <li>You'll receive a calendar invite within 24 hours</li>
                <li>Prepare any questions you'd like to discuss</li>
                <li>Have your documents ready for review (if applicable)</li>
                <li>Check your email for the video call link</li>
              </ol>
            </div>
            
            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              Need to reschedule? Contact us at <a href="mailto:support@swissimmigrationpro.com" style="color: #0056B3;">support@swissimmigrationpro.com</a>
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px; color: #999; font-size: 12px;">
            <p>© 2025 ${CONFIG.app.firm}. All rights reserved.</p>
          </div>
        </body>
      </html>
    `,
    text: `Consultation Confirmed! 🎉

Hello,

Thank you for booking a consultation with Swiss Immigration Pro!

Next Steps:
1. You'll receive a calendar invite within 24 hours
2. Prepare any questions you'd like to discuss
3. Have your documents ready for review (if applicable)
4. Check your email for the video call link

Need to reschedule? Contact us at support@swissimmigrationpro.com

© 2025 ${CONFIG.app.firm}. All rights reserved.`
  }
]

export const EMAIL_SEQUENCES: Record<EmailSequenceType, EmailSequenceStep[]> = {
  welcome: WELCOME_SEQUENCE,
  value: VALUE_SEQUENCE,
  upgrade: WELCOME_SEQUENCE, // Can customize later
  consultation_followup: CONSULTATION_FOLLOWUP_SEQUENCE
}

// Helper function to send a sequence email
export async function sendSequenceEmail(
  to: string,
  sequenceType: EmailSequenceType,
  stepIndex: number,
  variables?: Record<string, string>
): Promise<{ success: boolean; error?: string }> {
  const sequence = EMAIL_SEQUENCES[sequenceType]
  if (!sequence || stepIndex >= sequence.length) {
    return { success: false, error: 'Invalid sequence or step' }
  }

  const step = sequence[stepIndex]
  
  // Replace variables in template
  let html = step.html
  let text = step.text
  let subject = step.subject

  if (variables) {
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g')
      html = html.replace(regex, value)
      text = text.replace(regex, value)
      subject = subject.replace(regex, value)
    })
  }

  return sendEmail(to, subject, html, text)
}



