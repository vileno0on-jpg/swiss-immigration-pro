# 🗄️ Neon Database Deployment Guide

**Updated**: This app now uses Neon database instead of Supabase!

---

## Step 1: Set Up Neon Database (FREE)

### A. Create Neon Account
1. Go to: **https://neon.tech**
2. Click **"Sign Up"** or **"Start for free"**
3. Sign up with GitHub (fastest) or email
4. **No credit card required!**

### B. Create Project
1. Click **"Create a project"** (green button)
2. Fill in:
   - **Name**: `swiss-immigration-pro`
   - **PostgreSQL Version**: 15 or 16 (recommended)
   - **Region**: `Frankfurt` (or closest to Switzerland)
3. Click **"Create project"**
4. Wait 10-20 seconds for setup

### C. Get Connection String
1. Once created, you'll see your **connection string**
2. Format: `postgresql://user:password@ep-xxx-xxx.region.neon.tech/dbname?sslmode=require`
3. **Copy this** - you'll need it for environment variables!

**Important**: Click **"Reset password"** if you need to set a new password.

### D. Run Database Schema
1. In Neon dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New query"**
3. Open `lib/database/neon-schema.sql` from your project
4. **Copy the ENTIRE contents** and paste into SQL Editor
5. Click **"Run"** or press `Ctrl+Enter`
6. You should see: "Neon database setup complete! ✅"

### E. Verify Tables
1. Click **"Tables"** in left sidebar
2. You should see:
   - `users` (authentication)
   - `profiles` (user profiles)
   - `sessions` (NextAuth sessions)
   - `accounts` (OAuth providers)
   - `subscriptions` (payments)
   - `chat_messages` (AI chat)
   - And more...

---

## Step 2: Set Up Environment Variables

### Local Development (.env.local)

Create/update `.env.local` in your project root:

```env
# Neon Database
DATABASE_URL=postgresql://user:password@ep-xxx-xxx.region.neon.tech/dbname?sslmode=require

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3003
NEXTAUTH_SECRET=your-secret-key-here-generate-random-string

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3003
NEXT_PUBLIC_ADMIN_EMAIL=admin@swissimmigrationpro.com

# AI Chatbot (Optional - get from console.groq.com)
GROQ_API_KEY=gsk_...your-groq-key-here

# Stripe (Optional - for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### Generate NextAuth Secret

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

Or use an online generator: https://generate-secret.vercel.app/32

Copy the output and use it for `NEXTAUTH_SECRET`.

---

## Step 3: Push Code to GitHub

### A. Initialize Git (if not already done)
```bash
cd swiss-immigration-pro
git init
```

### B. Commit Code
```bash
git add .
git commit -m "Initial commit: Swiss Immigration Pro with Neon"
```

### C. Push to GitHub
1. Create new repository on GitHub:
   - Go to: **github.com/new**
   - Name: `swiss-immigration-pro`
   - Leave it **empty**
   - Click "Create repository"

2. Push your code:
```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/swiss-immigration-pro.git
git push -u origin main
```

---

## Step 4: Deploy to Netlify

### A. Connect to Netlify
1. Go to: **https://netlify.com**
2. Sign up/login (use GitHub)
3. Click **"Add new site"** → **"Import an existing project"**
4. Choose **GitHub** and authorize
5. Select `swiss-immigration-pro` repository

### B. Configure Build Settings
Netlify should auto-detect Next.js. Verify:
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: `20`

### C. Add Environment Variables

**BEFORE clicking "Deploy"**, click **"Show advanced"** → **"New variable"**

Add these variables:

```env
# Neon Database (from Step 1C)
DATABASE_URL=postgresql://user:password@ep-xxx-xxx.region.neon.tech/dbname?sslmode=require

# NextAuth Configuration
NEXTAUTH_URL=https://your-site-name.netlify.app
NEXTAUTH_SECRET=your-secret-key-here

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-site-name.netlify.app
NEXT_PUBLIC_ADMIN_EMAIL=admin@swissimmigrationpro.com

# AI Chatbot (Optional)
GROQ_API_KEY=gsk_...

# Stripe (Optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

**Important**: Update `your-site-name` with your actual Netlify subdomain after first deploy!

### D. Deploy!
1. Click **"Deploy site"**
2. Wait 3-5 minutes for build
3. Your site is live! 🎉

### E. Update NEXTAUTH_URL
1. After first deploy, note your site URL
2. Go to Netlify → **Site settings** → **Environment variables**
3. Update `NEXTAUTH_URL` to your actual URL
4. Click **"Trigger deploy"** → **"Clear cache and deploy"**

---

## Step 5: Create Admin User

### Option A: Via Registration (Easiest)
1. Go to your live site
2. Click **"Register"** → create account with your email
3. Go to Neon dashboard → **SQL Editor**
4. Run:
```sql
UPDATE profiles
SET is_admin = true
WHERE email = 'your-email@example.com';
```

### Option B: Via SQL (Advanced)
1. Go to Neon SQL Editor
2. Run:
```sql
-- First create a test user (you'll need to hash the password)
INSERT INTO users (email, password_hash, email_verified)
VALUES ('admin@example.com', '$2b$10$...', true);

-- Get the user ID from above, then:
INSERT INTO profiles (id, email, full_name, is_admin)
VALUES ('USER_ID_FROM_ABOVE', 'admin@example.com', 'Admin User', true);
```

**Note**: You'll need to hash the password using bcrypt. See `scripts/create-admin.py` for an example.

---

## Step 6: Test Your Site

Visit your live site and test:
- ✅ Homepage loads
- ✅ Dark mode toggle works
- ✅ Registration works
- ✅ Login works
- ✅ Dashboard loads
- ✅ Admin panel accessible (if you're admin)
- ✅ AI chatbot responds (if you added GROQ_API_KEY)

---

## Free Tier Limits

### Neon (FREE):
- ✅ **10 GB** database storage (vs Supabase's 500 MB!)
- ✅ **Branching** (dev/prod databases)
- ✅ Better performance
- ✅ 10 projects
- ✅ Unlimited API requests
- ✅ Automatic backups

**Enough for**: Thousands of users, millions of rows

### Netlify (FREE):
- ✅ 100 GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Custom domains
- ✅ HTTPS certificates

---

## Troubleshooting

### Build Fails on Netlify
**Solution**:
1. Check build logs for errors
2. Common issues:
   - Missing `DATABASE_URL` environment variable
   - Invalid `NEXTAUTH_SECRET`
   - Node version mismatch

### Database Connection Failed
**Solution**:
1. Verify `DATABASE_URL` is correct in Netlify
2. Check Neon dashboard → project is running
3. Ensure connection string includes `?sslmode=require`
4. Try regenerating the connection string

### Authentication Not Working
**Solution**:
1. Verify `NEXTAUTH_URL` matches your site URL exactly
2. Check `NEXTAUTH_SECRET` is set
3. Clear browser cookies and try again
4. Check browser console (F12) for errors

### Can't Login After Registration
**Solution**:
1. Verify user exists in `users` table
2. Check profile exists in `profiles` table
3. Ensure password was hashed correctly

---

## Security Checklist

- ✅ `DATABASE_URL` only in environment variables
- ✅ `.env.local` in `.gitignore`
- ✅ `NEXTAUTH_SECRET` is long and random
- ✅ HTTPS enabled (automatic on Netlify)
- ✅ Admin accounts only set in database

---

## Support Resources

- **Neon Docs**: https://neon.tech/docs
- **NextAuth Docs**: https://next-auth.js.org
- **Next.js Docs**: https://nextjs.org/docs
- **Netlify Docs**: https://docs.netlify.com

---

## 🎉 Success!

Your Swiss Immigration Pro platform is now:
- ✅ Live on the internet
- ✅ Using Neon database (10GB free!)
- ✅ Custom authentication with NextAuth
- ✅ Ready for users

**Your live URL**: `https://your-site-name.netlify.app`

---

*Updated: November 3, 2025*
*Status: ✅ TESTED & WORKING with Neon*

