# 🚀 Quick Start Guide - Swiss Immigration Pro

Get your platform up and running in **under 1 hour**!

---

## ⏱️ Timeline

| Step | Time | Task |
|------|------|------|
| 1 | 5 min | Install dependencies |
| 2 | 10 min | Setup Supabase database |
| 3 | 10 min | Configure environment |
| 4 | 5 min | Create admin user |
| 5 | 5 min | Deploy to Vercel |
| **Total** | **35 min** | **LIVE!** 🎉 |

---

## Step 1: Install & Setup (5 min)

```bash
# Navigate to project
cd swiss-immigration-pro

# Install dependencies
npm install

# Build to verify everything works
npm run build
```

✅ If build succeeds, you're ready!

---

## Step 2: Database Setup (10 min)

### A. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Name: `swiss-immigration-pro`
4. Database Password: Generate strong password
5. Region: Europe (Zurich) or closest to you
6. Wait for provisioning (~2 min)

### B. Run Database Schema

1. In Supabase, open **SQL Editor**
2. Copy entire contents of `lib/database/schema.sql`
3. Paste into SQL Editor
4. Click **Run**
5. Verify: Should see "Success"

### C. Get API Keys

1. Go to **Settings** → **API**
2. Copy these:
   - **Project URL**
   - **anon public** key
   - **service_role** key (keep secret!)

---

## Step 3: Environment Variables (10 min)

### A. Create `.env.local`

```bash
# Copy template
cp .env.example .env.local
```

### B. Add Your Keys

Edit `.env.local` and add:

```env
# Supabase (from Step 2)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Stripe (get from stripe.com/dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AI (get from console.groq.com)
GROQ_API_KEY=gsk_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ADMIN_EMAIL=admin@yourdomain.com
```

### C. Stripe API Keys

1. Go to [stripe.com](https://stripe.com) → Sign up
2. Dashboard → **Developers** → **API keys**
3. Copy **Publishable key** and **Secret key**
4. Use **Test mode** keys for now

### D. Groq API Key

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up / Login
3. Go to **API Keys**
4. Create new key
5. Copy the key

---

## Step 4: Create Admin User (5 min)

### Method: SQL Script

1. In Supabase, open **SQL Editor**
2. Open `scripts/create-admin-user.sql`
3. Find these lines (around line 8-10):
   ```sql
   v_user_email TEXT := 'admin@swissimmigrationpro.com';
   v_user_password TEXT := 'YourSecurePassword123!';
   v_user_name TEXT := 'Admin User';
   ```
4. Change to YOUR values
5. Copy entire script → Paste in SQL Editor → **Run**
6. Should see: "Admin user created successfully!"

### Verify

Check table `profiles`:
- Go to **Table Editor** → `profiles`
- Should see your admin user with `is_admin = true`

---

## Step 5: Test Locally (5 min)

```bash
# Start dev server
npm run dev
```

Open: http://localhost:3000

### Test These:

1. ✅ Homepage loads
2. ✅ Login with admin credentials
3. ✅ See "Admin" link in header
4. ✅ Click Admin → Dashboard loads
5. ✅ Try AI Chat (use 3 messages)
6. ✅ Visit Pricing page

---

## Step 6: Deploy to Vercel (10 min)

### A. Push to GitHub

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit: Swiss Immigration Pro"

# Create GitHub repo, then:
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### B. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up
2. Click **Add New** → **Project**
3. Import your GitHub repo
4. Click **Deploy**
5. Wait ~2 min for build

### C. Add Environment Variables

**IMPORTANT**: Copy ALL variables from `.env.local`!

1. Project Settings → **Environment Variables**
2. Add each variable from `.env.local`
3. Make sure to add to **Production**, **Preview**, **Development**
4. **Redeploy** after adding variables

### D. Update Stripe Webhook

1. In Stripe Dashboard → **Developers** → **Webhooks**
2. Click **Add endpoint**
3. URL: `https://your-domain.vercel.app/api/webhooks/stripe`
4. Events to listen:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Save → Copy webhook secret
6. Add to Vercel env vars as `STRIPE_WEBHOOK_SECRET`

---

## Step 7: First Actions

### 1. Test Production Site

1. Visit your Vercel URL
2. Login with admin account
3. Test all features

### 2. Create First Product

In Stripe Dashboard → **Products**:
- Add product: "Immigration Pack" - CHF 29/mo
- Add product: "Advanced Pack" - CHF 69/mo  
- Add product: "Citizenship Pro" - CHF 199/mo

### 3. Update .env.local for Production

```env
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

---

## 🎉 Success Checklist

- [x] Build passes locally
- [x] Database schema deployed
- [x] Admin user created
- [x] Can login as admin
- [x] AI chatbot works
- [x] Deployed to Vercel
- [x] Environment variables set
- [x] Stripe webhooks configured
- [x] Can access /admin

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Can't Login
- Verify user in `profiles` table
- Check `is_admin = true`
- Clear browser cache
- Try incognito mode

### AI Chat Not Working
- Verify GROQ_API_KEY is set correctly
- Check Supabase `chat_messages` table has RLS enabled
- Check browser console for errors

### Stripe Checkout Fails
- Verify product prices match pricing packs
- Check webhook endpoint is public
- Verify webhook events are subscribed

### 404 Errors
- Redeploy on Vercel
- Check all routes are in `app/` folder
- Verify no build errors

---

## 📚 Next Steps

### Week 1: Foundation
- [ ] Upload actual guide PDFs and templates
- [ ] Upload CV templates
- [ ] Write blog posts
- [ ] Setup Google Analytics

### Week 2: Growth
- [ ] Launch social media accounts
- [ ] Create lead magnets
- [ ] Setup email marketing
- [ ] Start content marketing

### Week 3: Scale
- [ ] Run PPC campaigns
- [ ] Partner with immigration lawyers
- [ ] Build referral program
- [ ] Gather user feedback

---

## 📞 Need Help?

- **Docs**: `README.md`, `DEPLOYMENT.md`, `FEATURES.md`
- **Admin**: `scripts/README.md`, `scripts/create-admin-user-guide.md`
- **Supabase**: [supabase.com/docs](https://supabase.com/docs)
- **Stripe**: [stripe.com/docs](https://stripe.com/docs)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)

---

## 🎯 Success Metrics

Track these in your first month:

- **Signups**: Target 50+ users
- **Conversions**: 10-15% free to paid
- **Revenue**: CHF 1,000+ MRR
- **AI Usage**: Average 15+ messages per user
- **Content**: 5+ blog posts published

---

**Congratulations!** You're live and ready to make money! 💰🇨🇭

---

## 🚨 Critical Reminders

1. **Never commit** `.env.local` to git
2. **Rotate** API keys every 90 days
3. **Backup** database weekly
4. **Monitor** usage and costs
5. **Update** content regularly
6. **Test** after every deployment

---

**Ready? Let's go!** Follow the steps above and launch in under 1 hour! 🚀

