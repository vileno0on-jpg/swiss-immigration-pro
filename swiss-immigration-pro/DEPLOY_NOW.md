# 🚀 Deploy Now - One-Click Setup

## Your GitHub Repository
**URL**: `https://github.com/vileno0on-jpg/swiss-immigration-pro`

## Quick Deploy Steps

### Option 1: Deploy via Vercel Web (Recommended - 2 minutes)

1. **Click this link**: https://vercel.com/new
   - This opens Vercel's import page

2. **Connect GitHub** (if not already):
   - Click "Continue with GitHub"
   - Authorize Vercel

3. **Import Repository**:
   - Search for: `vileno0on-jpg/swiss-immigration-pro`
   - Click "Import"

4. **Configure Project**:
   - Framework: Next.js (auto-detected) ✅
   - Root Directory: `./` ✅
   - Build Command: `npm run build` ✅
   - Output Directory: `.next` ✅

5. **Add Environment Variables** (IMPORTANT):
   - Click "Environment Variables"
   - Add all from your `.env.local` file

6. **Click "Deploy"**
   - Wait 2-3 minutes
   - **Done!** 🎉

---

### Option 2: Direct Import Link

**Click here to start deployment:**
```
https://vercel.com/new/clone?repository-url=https://github.com/vileno0on-jpg/swiss-immigration-pro
```

---

## After Deployment

You'll get:
- ✅ Live URL: `https://swiss-immigration-pro.vercel.app`
- ✅ Automatic deployments on every git push
- ✅ Preview deployments for pull requests

---

## Required Environment Variables

Copy these from your `.env.local`:

```env
DB_HOST=your_db_host
DB_PORT=5432
DB_NAME=swiss_immigration
DB_USER=your_db_user
DB_PASSWORD=your_db_password
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
GROQ_API_KEY=gsk_...
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
NEXT_PUBLIC_ADMIN_EMAIL=admin@yourdomain.com
NODE_ENV=production
```

---

**Ready? Click here to deploy:** https://vercel.com/new/clone?repository-url=https://github.com/vileno0on-jpg/swiss-immigration-pro

