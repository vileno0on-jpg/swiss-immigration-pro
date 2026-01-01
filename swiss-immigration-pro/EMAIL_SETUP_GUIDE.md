# 📧 Email & Newsletter Setup Guide

Complete guide for setting up email functionality and newsletter system in Swiss Immigration Pro.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Resend Account Setup](#resend-account-setup)
3. [Environment Variables](#environment-variables)
4. [Database Setup](#database-setup)
5. [Email Service Configuration](#email-service-configuration)
6. [Testing](#testing)
7. [Features Overview](#features-overview)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Prerequisites

- Node.js 18+ installed
- Next.js application running
- Supabase database configured
- Admin access to your application

---

## 📬 Resend Account Setup

### Step 1: Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### Step 2: Get API Key

1. After logging in, go to **API Keys** in the dashboard
2. Click **Create API Key**
3. Give it a name (e.g., "Swiss Immigration Pro")
4. Select permissions: **Sending access**
5. Copy the API key (starts with `re_`)

**⚠️ Important:** Save this key securely. You won't be able to see it again.

### Step 3: Verify Domain (Optional but Recommended)

For production, you should verify your domain:

1. Go to **Domains** in Resend dashboard
2. Click **Add Domain**
3. Enter your domain (e.g., `yourdomain.com`)
4. Add the DNS records provided by Resend to your domain's DNS settings
5. Wait for verification (usually takes a few minutes to 24 hours)

**Note:** You can use Resend's default domain (`onboarding.resend.dev`) for testing, but emails may go to spam.

---

## 🔐 Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Resend Email Service
RESEND_API_KEY=re_your_api_key_here

# Optional: Custom from email (defaults to noreply@yourdomain.com)
RESEND_FROM_EMAIL=Swiss Immigration Pro <noreply@yourdomain.com>

# App URL (for email links)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Admin Email (for support emails)
NEXT_PUBLIC_ADMIN_EMAIL=admin@yourdomain.com
```

**For Production:**
- Add these same variables to your hosting platform (Vercel, etc.)
- Use your production domain in `NEXT_PUBLIC_APP_URL`
- Use your verified domain in `RESEND_FROM_EMAIL`

---

## 🗄️ Database Setup

### Step 1: Run Password Resets Migration

The password reset functionality requires a new table. Run this SQL in your Supabase SQL Editor:

```sql
-- Password reset tokens table
CREATE TABLE IF NOT EXISTS public.password_resets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_password_resets_token ON public.password_resets(token);
CREATE INDEX IF NOT EXISTS idx_password_resets_user_id ON public.password_resets(user_id);
CREATE INDEX IF NOT EXISTS idx_password_resets_expires_at ON public.password_resets(expires_at) WHERE used = FALSE;
```

### Step 2: Verify Email Leads Table

Ensure the `email_leads` table exists (it should already be in your schema):

```sql
-- Email leads table (for marketing/lead generation)
CREATE TABLE IF NOT EXISTS public.email_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL,
  lead_magnet VARCHAR(255),
  source VARCHAR(100) DEFAULT 'website',
  subscribed BOOLEAN DEFAULT true,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(email)
);

CREATE INDEX IF NOT EXISTS idx_email_leads_email ON public.email_leads(email);
CREATE INDEX IF NOT EXISTS idx_email_leads_created_at ON public.email_leads(created_at);
CREATE INDEX IF NOT EXISTS idx_email_leads_subscribed ON public.email_leads(subscribed) WHERE subscribed = true;
```

---

## ⚙️ Email Service Configuration

The email system is configured in `lib/email.ts`. You can customize:

- **Email templates**: Modify templates in `emailTemplates` object
- **From address**: Set via `RESEND_FROM_EMAIL` env variable
- **Default styling**: Edit HTML templates in `lib/email.ts`

---

## 🧪 Testing

### Test 1: Newsletter Subscription

1. Visit your homepage
2. Scroll to the newsletter signup form
3. Enter an email address
4. Submit the form
5. Check:
   - Success message appears
   - Email received in inbox (check spam folder)
   - Email appears in admin panel under Newsletter Management

### Test 2: User Registration Welcome Email

1. Register a new user account
2. Check the registered email inbox
3. You should receive a welcome email

### Test 3: Password Reset Email

1. Go to login page
2. Click "Forgot Password"
3. Enter an email address
4. Check email inbox for reset link
5. Click the reset link (should redirect to reset password page)

### Test 4: Admin Newsletter Sending

1. Log in as admin
2. Go to `/admin/newsletter`
3. Click "Send Newsletter"
4. Fill in subject and content (HTML format)
5. Click "Send to All Subscribers"
6. Check email inboxes of subscribers

### Test 5: Unsubscribe Functionality

1. In an email, click the unsubscribe link
2. Should redirect to homepage with success message
3. In admin panel, user status should show "Unsubscribed"

---

## ✨ Features Overview

### 1. Newsletter Subscription

- **Component**: `components/EmailCapture.tsx`
- **API Endpoint**: `/api/newsletter/subscribe`
- **Features**:
  - Email validation
  - Duplicate prevention
  - Welcome email sent automatically
  - Database storage

### 2. Email Templates

Available templates:

- **Welcome Email**: Sent when user registers
- **Newsletter Welcome**: Sent when user subscribes to newsletter
- **Password Reset**: Sent when user requests password reset
- **Subscription Confirmation**: Sent when user subscribes to a paid plan (requires webhook integration)
- **Newsletter**: Generic newsletter template for bulk emails

### 3. Admin Newsletter Management

- **URL**: `/admin/newsletter`
- **Features**:
  - View all subscribers
  - Search and filter subscribers
  - Send newsletters to all subscribers
  - Export subscribers to CSV
  - Unsubscribe management

### 4. Automatic Emails

The system automatically sends emails for:

- ✅ User registration (welcome email)
- ✅ Newsletter subscription (welcome email)
- ✅ Password reset requests (reset link email)

---

## 🔧 Advanced Configuration

### Custom Email Templates

Edit templates in `lib/email.ts`:

```typescript
export const emailTemplates = {
  welcome: (email: string, name?: string) => ({
    subject: 'Your Custom Subject',
    html: `Your HTML template here`,
    text: `Plain text version here`
  }),
  // ... other templates
}
```

### Custom From Address

Set in `.env.local`:

```env
RESEND_FROM_EMAIL=Your Name <noreply@yourdomain.com>
```

### Email Rate Limiting

Resend free tier allows:
- 3,000 emails/month
- 100 emails/day

Upgrade for higher limits.

---

## 🐛 Troubleshooting

### Emails Not Sending

1. **Check API Key**:
   - Verify `RESEND_API_KEY` is set correctly in `.env.local`
   - Restart development server after adding env variables

2. **Check Resend Dashboard**:
   - Log into Resend dashboard
   - Check "Logs" section for errors
   - Verify API key is active

3. **Check Console Logs**:
   - Look for error messages in server console
   - Common errors:
     - "Email service not configured" → Missing API key
     - "Invalid from address" → Domain not verified
     - "Rate limit exceeded" → Too many emails sent

### Emails Going to Spam

1. **Verify Domain**:
   - Add and verify your domain in Resend
   - Use verified domain in `RESEND_FROM_EMAIL`

2. **SPF/DKIM Records**:
   - Resend provides DNS records automatically
   - Ensure they're added correctly

3. **Email Content**:
   - Avoid spam trigger words
   - Include unsubscribe links
   - Don't use excessive capitalization

### Password Reset Not Working

1. **Check Database**:
   - Verify `password_resets` table exists
   - Check if tokens are being created

2. **Check Token Expiration**:
   - Tokens expire after 1 hour
   - Request a new reset if expired

3. **Check Email**:
   - Verify reset email is received
   - Check reset link format in email

### Newsletter Not Appearing in Admin

1. **Check Database Connection**:
   - Verify Supabase connection
   - Check `email_leads` table exists

2. **Check Admin Access**:
   - Verify user has `is_admin = true` in profiles table
   - Check session is active

3. **Refresh Page**:
   - Click "Refresh" button in admin panel
   - Check browser console for errors

---

## 📊 Resend Pricing

### Free Tier (Perfect for Testing)
- 3,000 emails/month
- 100 emails/day
- API access
- Email logs

### Pro Tier ($20/month)
- 50,000 emails/month
- Higher sending limits
- Priority support
- Custom domains

---

## 🔗 Useful Links

- [Resend Documentation](https://resend.com/docs)
- [Resend Dashboard](https://resend.com/emails)
- [Email Best Practices](https://resend.com/docs/best-practices)

---

## ✅ Checklist

Before going to production:

- [ ] Resend account created
- [ ] API key added to environment variables
- [ ] Domain verified (optional but recommended)
- [ ] Password reset table created
- [ ] Email leads table exists
- [ ] Test emails sent successfully
- [ ] Newsletter subscription tested
- [ ] Password reset tested
- [ ] Admin newsletter panel accessible
- [ ] Environment variables added to production hosting

---

## 🎉 You're All Set!

Your email and newsletter system is now configured and ready to use!

**Next Steps:**
1. Test all email functionality
2. Customize email templates to match your branding
3. Set up domain verification for better deliverability
4. Start building your newsletter subscriber list!

For questions or issues, check the troubleshooting section or consult the Resend documentation.





