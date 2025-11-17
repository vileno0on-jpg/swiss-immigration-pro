# Deployment Guide - Swiss Immigration Pro

## 🚀 Quick Deploy to Production

### Prerequisites
- GitHub account
- Vercel account (free tier works)
- Supabase account
- Stripe account

---

## Step 1: GitHub Setup

```bash
# Initialize git and push to GitHub
cd swiss-immigration-pro
git init
git add .
git commit -m "Initial commit: Swiss Immigration Pro platform"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

---

## Step 2: Supabase Setup

1. **Create Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Name: `swiss-immigration-pro`
   - Database Password: Generate strong password
   - Region: Choose closest to Switzerland

2. **Run Database Schema**
   - Go to SQL Editor in Supabase dashboard
   - Copy contents of `lib/database/schema.sql`
   - Paste and click "Run"
   - Verify tables created successfully

3. **Get API Keys**
   - Go to Settings → API
   - Copy:
     - Project URL
     - Anon public key
     - service_role key (keep secret!)

4. **Row-Level Security**
   - RLS policies are included in schema.sql
   - Verify they're enabled: Settings → API → RLS Policies

---

## Step 3: Stripe Setup

1. **Create Account**
   - Sign up at [stripe.com](https://stripe.com)
   - Complete business verification

2. **Get API Keys**
   - Dashboard → Developers → API keys
   - Copy Publishable key and Secret key
   - Use Test mode keys for development

3. **Create Products**
   - Dashboard → Products → Add Product
   - Create 3 products matching pricing:
     - Immigration Pack: CHF 29/month (recurring)
     - Masterclass Pack: CHF 69/month (recurring)
     - Citizenship Pro: CHF 199/month (recurring)

4. **Setup Webhooks**
   - Dashboard → Developers → Webhooks
   - Add endpoint: `https://your-domain.com/api/webhooks/stripe`
   - Subscribe to events:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
   - Copy webhook signing secret

---

## Step 4: Vercel Deployment

1. **Import Project**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repo

2. **Configure Build**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add ALL variables from `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AI
GROQ_API_KEY=gsk_...
OPENAI_API_KEY=sk-... # Optional backup

# App
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_ADMIN_EMAIL=admin@yourdomain.com
```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site is live! 🎉

---

## Step 5: Post-Deployment Setup

### 1. Create Admin User

```bash
# In Supabase SQL Editor, run:
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at)
VALUES (
  gen_random_uuid(),
  'admin@yourdomain.com',
  crypt('your-secure-password', gen_salt('bf')),
  now(),
  now()
);

-- Get the UUID from above, then:
INSERT INTO public.profiles (id, email, full_name, is_admin, pack_id)
VALUES (
  'USER_UUID_FROM_ABOVE',
  'admin@yourdomain.com',
  'Admin User',
  true,
  'free'
);
```

### 2. Update Webhook URL in Stripe
- Use production webhook URL
- Update Supabase webhook URL too

### 3. Test Checkout Flow
1. Visit `/pricing`
2. Click "Get Started" on a pack
3. Use Stripe test card: `4242 4242 4242 4242`
4. Verify subscription created in Supabase

### 4. Configure Domain (Optional)
- Vercel Settings → Domains
- Add custom domain
- Update DNS records as instructed

---

## Step 6: Production Checklist

- [ ] All environment variables set
- [ ] Database schema deployed
- [ ] Admin user created
- [ ] Stripe webhooks configured
- [ ] Test checkout successful
- [ ] AI chatbot responding
- [ ] Dark mode toggle works
- [ ] Mobile responsive
- [ ] Analytics tracking (if enabled)
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] 404 pages configured
- [ ] Error boundaries in place

---

## Monitoring & Maintenance

### Weekly Tasks
- Check Stripe payments dashboard
- Review admin logs for errors
- Monitor Supabase usage
- Check AI API costs

### Monthly Tasks
- Update live statistics
- Review user feedback
- Analyze conversion rates
- Optimize database queries

---

## Troubleshooting

### Build Fails
```bash
# Check for TypeScript errors
npm run build

# Check for missing env vars
vercel env ls
```

### Chatbot Not Working
- Verify GROQ_API_KEY is set
- Check Supabase chat_messages table
- Verify API route at `/api/chat` exists

### Stripe Checkout Fails
- Verify STRIPE_SECRET_KEY is correct
- Check Stripe webhook logs
- Verify product IDs match

### Database Errors
- Check RLS policies are enabled
- Verify user authentication
- Check Supabase logs

---

## Scaling Considerations

### When Hitting Limits
- **Vercel Pro**: $20/mo for better limits
- **Supabase Pro**: $25/mo for 8GB database
- **Stripe**: No limits (use standard account)
- **Groq API**: Pay-per-use, monitor costs

### Performance Optimization
- Enable Next.js Image Optimization
- Use CDN for static assets
- Implement caching strategy
- Monitor Core Web Vitals

---

## Security Best Practices

1. **Never commit `.env.local`** ✅
2. **Use Supabase RLS** for all tables ✅
3. **Validate webhook signatures** in Stripe handlers ✅
4. **Rate limit API routes** to prevent abuse
5. **Use HTTPS only** in production ✅
6. **Rotate API keys** every 90 days
7. **Monitor failed login attempts**

---

## Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Vercel Docs**: https://vercel.com/docs

---

**Need Help?** Contact: support@swissimmigrationpro.com

