# 🚀 Deploy to Netlify - Step by Step

This guide will walk you through deploying Swiss Immigration Pro to Netlify.

## Database Options

**Option 1: Supabase (Recommended)** ✅
- Free PostgreSQL database
- Built-in authentication
- Easy setup, ready to use
- This is what the app uses by default

**Option 2: Neon** 🔄
- Free PostgreSQL database
- You'll need to implement your own authentication
- Requires code changes (login, register, session management)
- More complex setup

**This guide covers Supabase setup. For Neon, you'll need to modify authentication code.**

---

## Prerequisites

Before you start:
- ✅ GitHub account (free)
- ✅ Netlify account (free tier works)
- ✅ Supabase account (free tier)
- ✅ 30 minutes of time

---

## Step 1: Set Up Supabase Database (FREE)

### A. Create Supabase Account
1. Go to: **https://supabase.com**
2. Click **"Start your project"**
3. Sign up with GitHub (fastest) or email
4. **No credit card needed!**

### B. Create Organization
1. Name: `SwissImmigrationPro`
2. Choose: **Free Plan**
3. Click "Create organization"

### C. Create Project
1. Click **"New Project"**
2. Fill in:
   - **Name**: `swiss-immigration-pro`
   - **Database Password**: Create strong password (save it!)
     - Example: `SwissImm2025!SecureDB`
   - **Region**: `eu-central-1` (Frankfurt - closest to Switzerland)
3. Click **"Create new project"**
4. Wait 2-3 minutes for setup

### D. Run Database Schema
1. In Supabase dashboard, click **"SQL Editor"** (left sidebar)
2. Click **"New query"**
3. Open `lib/database/schema.sql` from your project
4. **Copy the ENTIRE contents** and paste into SQL Editor
5. Click **"Run"** (bottom right)
6. You should see: "Database setup complete! ✅"

### E. Get API Keys
1. Go to: **Settings** → **API** (gear icon, left sidebar)
2. Copy these values (keep them safe!):
   - **Project URL** (starts with `https://...supabase.co`)
   - **anon public** key (long JWT string)
   - **service_role** key (click "Reveal" to see it)

---

## Step 2: Push Code to GitHub

### A. Initialize Git (if not already done)
```bash
cd swiss-immigration-pro
git init
```

### B. Create .gitignore (if not exists)
Ensure `.gitignore` includes:
```
node_modules/
.next/
.env.local
.env*.local
.DS_Store
*.log
```

### C. Commit Code
```bash
git add .
git commit -m "Initial commit: Swiss Immigration Pro"
```

### D. Push to GitHub
1. Create new repository on GitHub:
   - Go to: **github.com/new**
   - Name: `swiss-immigration-pro`
   - Leave it **empty** (don't add README, .gitignore, or license)
   - Click "Create repository"

2. Push your code:
```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/swiss-immigration-pro.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

---

## Step 3: Deploy to Netlify

### A. Connect to Netlify
1. Go to: **https://netlify.com**
2. Sign up/login (use GitHub if possible)
3. Click **"Add new site"** → **"Import an existing project"**
4. Choose **GitHub**
5. Authorize Netlify to access your GitHub
6. Select your `swiss-immigration-pro` repository

### B. Configure Build Settings
Netlify should auto-detect Next.js. Verify these settings:
- **Build command**: `npm run build`
- **Publish directory**: `.next` (should auto-detect)
- **Node version**: `20` (or latest LTS)

### C. Add Environment Variables
**Before clicking "Deploy"**, click **"Show advanced"** → **"New variable"**

Add ALL these variables:

```env
# Supabase (from Step 1)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-role-key

# AI Chatbot (from Groq - optional)
GROQ_API_KEY=gsk_...your-groq-key

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-site-name.netlify.app
NEXT_PUBLIC_ADMIN_EMAIL=admin@swissimmigrationpro.com
```

**Note**: Replace `your-site-name` with your actual Netlify subdomain.

### D. Deploy!
1. Click **"Deploy site"**
2. Wait 3-5 minutes for build
3. Your site is live! 🎉

---

## Step 4: Post-Deployment Setup

### A. Create Admin User

1. Go to your live site: `https://your-site-name.netlify.app/auth/register`
2. Register a new account with your email
3. Go to Supabase dashboard → **Table Editor** → **profiles**
4. Find your user and click **Edit**
5. Check the box **"is_admin"**
6. Click **Save**

### B. Update App URL in Environment Variables

1. Go to Netlify dashboard → **Site settings** → **Environment variables**
2. Update `NEXT_PUBLIC_APP_URL` to your actual Netlify URL
3. Click **Save**
4. Go to **Deploys** → click **"Trigger deploy"** → **"Clear cache and deploy site"**

### C. Test Your Site

Visit your live site and test:
- ✅ Homepage loads
- ✅ Dark mode toggle works
- ✅ Registration works
- ✅ Login works
- ✅ Dashboard loads
- ✅ AI chatbot responds (if you added GROQ_API_KEY)

---

## Step 5: Optional - Add Stripe (Payments)

If you want payment functionality:

### A. Create Stripe Account
1. Go to: **https://stripe.com**
2. Sign up for free account
3. Complete business verification

### B. Get Stripe Keys
1. Dashboard → **Developers** → **API keys**
2. Use **Test mode** keys for now
3. Copy:
   - **Publishable key** (`pk_test_...`)
   - **Secret key** (`sk_test_...`)

### C. Create Products
1. Dashboard → **Products** → **Add product**
2. Create 3 products:
   - **Immigration Pack**: CHF 29/month (recurring)
   - **Masterclass Pack**: CHF 69/month (recurring)
   - **Citizenship Pro**: CHF 199/month (recurring)

### D. Add Stripe Environment Variables
1. Go to Netlify → **Environment variables**
2. Add:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

3. Trigger redeploy

---

## Free Tier Limits

### Supabase (FREE):
- ✅ 500 MB database
- ✅ 2 GB file storage
- ✅ 50,000 monthly active users
- ✅ 2 GB bandwidth

**Enough for**: 1,000+ users, thousands of chat messages

### Netlify (FREE):
- ✅ 100 GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Custom domains
- ✅ HTTPS certificates

**Enough for**: Most small to medium sites

---

## Troubleshooting

### Build Fails on Netlify
**Solution**:
1. Check build logs for errors
2. Common issues:
   - Missing environment variables
   - Node version mismatch (ensure Node 20)
   - Build timeout (free tier: 15 min limit)

### Database Connection Failed
**Solution**:
1. Verify Supabase keys are correct in Netlify
2. Check Supabase dashboard → project is running
3. Ensure `NEXT_PUBLIC_SUPABASE_URL` is set correctly

### Site Shows Blank Page
**Solution**:
1. Check browser console (F12) for errors
2. Verify all environment variables are set
3. Check Netlify build logs

### AI Chatbot Not Working
**Solution**:
1. Ensure `GROQ_API_KEY` is set in Netlify
2. Get free API key from: **console.groq.com**
3. Redeploy site after adding key

---

## Next Steps

### 1. Custom Domain (Optional)
1. Go to Netlify → **Domain settings**
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate auto-generates

### 2. Analytics (Optional)
- Add Google Analytics
- Add Netlify Analytics (paid feature)
- Or use Vercel Analytics (free)

### 3. Monitoring
- Set up error tracking (Sentry.io - free tier)
- Monitor Supabase usage dashboard
- Set up Netlify notifications

---

## Security Checklist

- ✅ All API keys in environment variables (not in code)
- ✅ `.env.local` in `.gitignore`
- ✅ Row Level Security enabled in Supabase
- ✅ HTTPS enabled (automatic on Netlify)
- ✅ Admin accounts only in profiles table

---

## Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Netlify Docs**: https://docs.netlify.com
- **Groq API**: https://console.groq.com/docs

---

## 🎉 Success!

Your Swiss Immigration Pro platform is now:
- ✅ Live on the internet
- ✅ Database connected
- ✅ User authentication working
- ✅ Free tier (no monthly costs!)
- ✅ Ready for users

**Your live URL**: `https://your-site-name.netlify.app`

---

*Last Updated: November 3, 2025*
*Status: ✅ TESTED & WORKING*

