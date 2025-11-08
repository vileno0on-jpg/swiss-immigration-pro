# ⚡ Neon Quick Start - Get Your Database Running in 5 Minutes

Follow these simple steps to get your Neon database set up!

---

## Step 1: Create Neon Database (2 min)

1. Go to **https://neon.tech**
2. Sign up (free, no credit card)
3. Click **"Create a project"**
4. Name it: `swiss-immigration-pro`
5. Click **"Create"**
6. **Copy the connection string** that appears

---

## Step 2: Run the Database Schema (1 min)

1. In Neon dashboard, click **"SQL Editor"**
2. Open `lib/database/neon-schema.sql`
3. Copy ALL the SQL code
4. Paste into Neon SQL Editor
5. Click **"Run"** (or press Ctrl+Enter)
6. You should see ✅ "Database setup complete!"

---

## Step 3: Add to .env.local (1 min)

Create/update `.env.local` in your project:

```env
DATABASE_URL=your-connection-string-from-step-1
NEXTAUTH_URL=http://localhost:3003
NEXTAUTH_SECRET=run-this-command-to-generate: openssl rand -base64 32
NEXT_PUBLIC_APP_URL=http://localhost:3003
```

---

## Step 4: Test It (1 min)

```bash
npm run dev
```

Visit http://localhost:3003

---

## That's It! 🎉

Your database is ready. Now you need to:

1. ✅ Set up Neon (DONE!)
2. ⏳ Install NextAuth
3. ⏳ Update authentication code
4. ⏳ Deploy to Netlify

**For detailed deployment**: See `NEON_DEPLOYMENT.md`

---

## Need Help?

- Neon setup issues? Check `NEON_SETUP_GUIDE.md`
- Full deployment? See `NEON_DEPLOYMENT.md`

