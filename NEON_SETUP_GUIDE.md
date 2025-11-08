# 🗄️ Neon Database Setup Guide

This guide shows you how to switch from Supabase to Neon database.

**⚠️ Important**: Neon is PostgreSQL-only. You'll need to implement your own authentication.

---

## Option A: Quick Setup (Recommended)

### Use Netlify DB (Neon-Powered)

Netlify offers **Netlify DB** which is powered by Neon and integrates directly with Netlify!

#### Steps:
1. Go to Netlify dashboard → Your site → **Postgres** tab
2. Click **"Create database"**
3. Get connection string automatically
4. Use in your app

**Pros**: 
- ✅ Automatic setup
- ✅ Free tier
- ✅ No extra account needed
- ✅ Integrated with Netlify

**Cons**:
- ❌ Still need custom auth
- ❌ Locked to Netlify

---

## Option B: Standalone Neon Setup

### 1. Create Neon Account
1. Go to **https://neon.tech**
2. Sign up with GitHub or email
3. **No credit card required!**

### 2. Create Project
1. Click **"Create a project"**
2. Name: `swiss-immigration-pro`
3. Region: `Frankfurt` (or closest to you)
4. PostgreSQL version: 15 or newer
5. Click **"Create project"**

### 3. Get Connection String
1. Once created, you'll see your connection string
2. Format: `postgresql://user:password@host.neon.tech/dbname?sslmode=require`
3. **Copy this** - you'll need it!

### 4. Run Database Schema
1. In Neon dashboard, go to **SQL Editor**
2. Open `lib/database/schema.sql` from your project
3. **Copy the entire contents**
4. Paste into Neon SQL Editor
5. Click **Run**

### 5. Install Neon Driver
```bash
npm install @neondatabase/serverless
```

### 6. Update Environment Variables

In your `.env.local` (and Netlify):
```env
# Neon Database (instead of Supabase)
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require

# Remove Supabase vars
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
# SUPABASE_SERVICE_ROLE_KEY=
```

### 7. Create Database Client

Create `lib/neon/db.ts`:
```typescript
import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

export const sql = neon(process.env.DATABASE_URL)
```

### 8. Update Queries

Replace Supabase queries with Neon:

**Before (Supabase)**:
```typescript
const { data } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single()
```

**After (Neon)**:
```typescript
const rows = await sql`
  SELECT * FROM profiles WHERE id = ${userId}
`
const profile = rows[0]
```

---

## Major Challenge: Authentication

**Neon doesn't have built-in auth**. You'll need to implement it yourself.

### Recommended Solution: NextAuth.js (Auth.js)

1. Install NextAuth:
```bash
npm install next-auth
```

2. Configure authentication in `app/api/auth/[...nextauth]/route.ts`
3. Set up JWT tokens
4. Create login/register pages
5. Add session management
6. Update all auth checks

**This requires modifying**:
- `/app/auth/login/page.tsx`
- `/app/auth/register/page.tsx`
- `/components/layout/Header.tsx`
- `/app/dashboard/page.tsx`
- `/app/admin/page.tsx`
- All auth-protected routes

---

## Migration Complexity

### What You Need to Change:

| Component | Supabase | Neon + Custom Auth |
|-----------|----------|-------------------|
| Database queries | ✅ Easy | ✅ Easy |
| User registration | ✅ Built-in | ❌ Custom code |
| User login | ✅ Built-in | ❌ Custom code |
| Session management | ✅ Built-in | ❌ Custom code |
| Password hashing | ✅ Automatic | ❌ Implement bcrypt |
| Email verification | ✅ Built-in | ❌ Custom code |
| Password reset | ✅ Built-in | ❌ Custom code |
| OAuth (Google, etc) | ✅ Built-in | ❌ Custom code |
| RLS (Row Level Security) | ✅ Automatic | ❌ Custom middleware |

**Estimated time**: 2-4 hours of development

---

## Recommendation

### ✅ Use Supabase If:
- You want to deploy quickly
- You need authentication out of the box
- You want password reset, OAuth, etc.
- You're okay with Supabase's free tier

### ✅ Use Neon If:
- You prefer pure PostgreSQL
- You want to implement custom auth
- You have specific compliance requirements
- You don't mind extra development time

---

## Free Tier Comparison

### Supabase (Free):
- ✅ 500 MB database
- ✅ Built-in auth
- ✅ 2 GB file storage
- ✅ Real-time subscriptions
- ✅ 50,000 MAU

### Neon (Free):
- ✅ 10 GB database (more!)
- ✅ Branching (dev/prod databases)
- ✅ Better performance
- ✅ More storage
- ❌ No auth (custom needed)

### Netlify DB (Free):
- ✅ 64 MB database
- ✅ Integrated with Netlify
- ✅ Auto backups
- ❌ Smaller than others

---

## Still Want to Use Neon?

I can help you:
1. Set up NextAuth.js
2. Create custom auth pages
3. Migrate database queries
4. Update all auth checks
5. Add password hashing

**Just let me know!**

---

## Quick Decision Tree

```
Need auth working quickly? → Use Supabase ✅
Need more storage (10GB)? → Use Neon 🗄️
Deploy to Netlify only? → Use Netlify DB 🚀
Custom auth requirements? → Use Neon + NextAuth 🔐
```

---

*Neon is great for advanced users who want full control, but Supabase is recommended for quick deployment with all features working out of the box.*

