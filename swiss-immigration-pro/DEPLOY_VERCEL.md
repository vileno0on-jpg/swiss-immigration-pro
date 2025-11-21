# Deploy to Vercel

Vercel is the recommended platform for Next.js applications. It's optimized for Next.js and handles routing automatically.

## Quick Deploy (Recommended - Dashboard Method)

### Step 1: Sign Up / Login
1. Go to https://vercel.com
2. Sign up or log in with your GitHub account

### Step 2: Import Your Project
1. Click **"Add New..."** → **"Project"**
2. Click **"Import Git Repository"**
3. Select your repository: `vileno0on-jpg/swiss-immigration-pro`
4. Click **"Import"**

### Step 3: Configure Project
Vercel will auto-detect Next.js settings:
- **Framework Preset:** Next.js (auto-detected) ✅
- **Root Directory:** `./` (default)
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `npm install --legacy-peer-deps` (from vercel.json)

### Step 4: Add Environment Variables
Click **"Environment Variables"** and add:

**Required:**
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-site.vercel.app
```

**Optional (for AI features):**
```
GROQ_API_KEY=your_groq_key
OPENAI_API_KEY=your_openai_key
XAI_API_KEY=your_xai_key
```

**Optional (for payments):**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait for build to complete (usually 2-3 minutes)
3. Your site will be live at: `https://your-site.vercel.app`

## CLI Method (Alternative)

If you prefer using the CLI:

### Install Vercel CLI
```bash
npm install -g vercel
```

### Login
```bash
vercel login
```

### Deploy
```bash
cd swiss-immigration-pro
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? **Your account**
- Link to existing project? **No** (first time)
- Project name? **swiss-immigration-pro** (or your choice)
- Directory? **./** (current directory)

### Add Environment Variables
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add SUPABASE_SERVICE_ROLE_KEY
# ... add all other variables
```

### Deploy to Production
```bash
vercel --prod
```

## After Deployment

### Your Site Will Be Live At:
- **Production:** `https://your-site.vercel.app`
- **Preview:** Each commit gets a preview URL

### Automatic Deployments
- ✅ Every push to `main` branch = Production deploy
- ✅ Every pull request = Preview deploy
- ✅ Automatic HTTPS
- ✅ Global CDN

### Custom Domain (Optional)
1. Go to **Project Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions

## Advantages of Vercel

✅ **Optimized for Next.js** - Built by the Next.js team
✅ **Zero Configuration** - Auto-detects Next.js settings
✅ **Automatic Routing** - No manual redirects needed
✅ **Edge Functions** - Fast API routes
✅ **Preview Deployments** - Test before production
✅ **Analytics** - Built-in performance monitoring
✅ **Free Tier** - Generous free plan

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Check Node version (should be 20)

### Environment Variables Not Working
- Make sure variables are added in Vercel dashboard
- Redeploy after adding variables
- Check variable names match exactly

### 404 Errors
- Vercel handles Next.js routing automatically
- No manual configuration needed
- If issues persist, check `next.config.ts`

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Add environment variables
3. ✅ Test your site
4. ✅ Set up custom domain (optional)
5. ✅ Configure analytics (optional)

Your site should work perfectly on Vercel! 🚀

