# 📝 What to Add to .env.local

## Required for Local Database (PostgreSQL)

Add these lines to your `.env.local` file:

```env
# ============================================
# LOCAL DATABASE CONFIGURATION
# ============================================
DB_HOST=localhost
DB_PORT=5432
DB_NAME=swiss_immigration
DB_USER=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD_HERE
```

**Replace `YOUR_POSTGRES_PASSWORD_HERE`** with the password you set when installing PostgreSQL.

## Required for Next.js

```env
# ============================================
# NEXT.JS CONFIGURATION
# ============================================
NEXTAUTH_URL=http://localhost:5000
NEXTAUTH_SECRET=OnWM2hyya2bw7hGAifFMoObTVlDK0KwbBbdp2WEeslM=
NEXT_PUBLIC_SITE_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:5000
```

## Optional: Comment Out Supabase

If you want to use local database only, comment out or remove Supabase lines:

```env
# NEXT_PUBLIC_SUPABASE_URL=https://mvetijyhqdizxygbahkt.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
# SUPABASE_SERVICE_ROLE_KEY=...
```

## Complete .env.local Example

```env
# ============================================
# LOCAL DATABASE CONFIGURATION
# ============================================
DB_HOST=localhost
DB_PORT=5432
DB_NAME=swiss_immigration
DB_USER=postgres
DB_PASSWORD=MySecurePassword123!

# ============================================
# NEXT.JS CONFIGURATION
# ============================================
NEXTAUTH_URL=http://localhost:5000
NEXTAUTH_SECRET=OnWM2hyya2bw7hGAifFMoObTVlDK0KwbBbdp2WEeslM=
NEXT_PUBLIC_SITE_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:5000

# ============================================
# SUPABASE (COMMENTED OUT - Using Local DB)
# ============================================
# NEXT_PUBLIC_SUPABASE_URL=https://mvetijyhqdizxygbahkt.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
# SUPABASE_SERVICE_ROLE_KEY=...

# ============================================
# AI API KEYS (Add your keys if you have them)
# ============================================
GROQ_API_KEY=your_groq_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
XAI_API_KEY=your_xai_api_key_here

# ============================================
# STRIPE (if using payments)
# ============================================
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
STRIPE_SECRET_KEY=sk_test_placeholder
STRIPE_WEBHOOK_SECRET=whsec_placeholder

# ============================================
# APP CONFIGURATION
# ============================================
NEXT_PUBLIC_ADMIN_EMAIL=admin@swissimmigrationpro.com
```

## Quick Setup

1. **Create `.env.local` file** (if it doesn't exist)
2. **Add the database configuration** (DB_HOST, DB_PORT, etc.)
3. **Set DB_PASSWORD** to your PostgreSQL password
4. **Add Next.js configuration** (NEXTAUTH_URL, etc.)

## Minimum Required

At minimum, you need:
- `DB_PASSWORD` - Your PostgreSQL password
- `NEXTAUTH_SECRET` - Already provided above
- `NEXTAUTH_URL` - http://localhost:5000

Everything else has defaults that will work!





