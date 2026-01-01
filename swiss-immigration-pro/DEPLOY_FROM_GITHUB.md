# 🚀 Deploy from GitHub to Vercel - Quick Guide

Your code is already on GitHub at: `https://github.com/vileno0on-jpg/swiss-immigration-pro.git`

## ⚡ Fast Deployment (5 minutes)

### Step 1: Go to Vercel
1. Open: https://vercel.com
2. Click **"Sign Up"** or **"Log In"**
3. Sign in with your **GitHub account** (recommended)

### Step 2: Import Your Repository
1. Click **"Add New"** → **"Project"**
2. Find your repository: `vileno0on-jpg/swiss-immigration-pro`
3. Click **"Import"**

### Step 3: Configure Build Settings
- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Step 4: Add Environment Variables
**IMPORTANT**: Click **"Environment Variables"** and add ALL variables from your `.env.local`:

```env
# Database
DB_HOST=your_db_host
DB_PORT=5432
DB_NAME=swiss_immigration
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AI
GROQ_API_KEY=gsk_...
OPENAI_API_KEY=sk-...

# App
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
NEXT_PUBLIC_ADMIN_EMAIL=admin@yourdomain.com
NODE_ENV=production

# NextAuth (if using)
NEXTAUTH_URL=https://your-project.vercel.app
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
```

### Step 5: Deploy!
1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. **Done!** 🎉 You'll get a live link like: `https://swiss-immigration-pro.vercel.app`

---

## 🔄 Automatic Deployments

After the first deployment:
- **Every push to GitHub** = Automatic new deployment
- **Pull requests** = Preview deployments
- **Main branch** = Production deployment

---

## 🌐 Your Live Site

After deployment, you'll get:
- **Production URL**: `https://your-project-name.vercel.app`
- **Custom Domain**: Can add later in Vercel settings

---

## ✅ Quick Checklist

- [ ] Vercel account created
- [ ] GitHub repo imported
- [ ] Environment variables added
- [ ] Build successful
- [ ] Site is live!

---

## 🆘 Need Help?

1. **Build fails?** Check Vercel build logs
2. **Missing env vars?** Add them in Project Settings
3. **Database errors?** Check DB connection strings
4. **Site not working?** Check deployment logs in Vercel dashboard

---

## 🔗 Your Repository

**GitHub**: https://github.com/vileno0on-jpg/swiss-immigration-pro

Just connect it to Vercel and you're live! 🚀





