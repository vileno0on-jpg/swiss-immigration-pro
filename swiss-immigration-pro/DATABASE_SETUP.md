# 🗄️ Database Setup Guide

Complete guide to set up your Supabase database for Swiss Immigration Pro.

---

## 🚀 Quick Setup (15 minutes)

### Step 1: Create Supabase Project

1. **Go to Supabase**: [https://supabase.com](https://supabase.com)
2. **Sign up/Login**: Create account or login
3. **New Project**:
   - Name: `swiss-immigration-pro` (or your choice)
   - Database Password: **Generate a strong password** (save it!)
   - Region: Choose closest to you (Europe recommended)
   - Pricing: **Free tier is fine** for development
4. **Wait**: Project provisioning takes ~2 minutes

---

### Step 2: Run Database Schema

1. **Open SQL Editor** in Supabase dashboard:
   - Click **SQL Editor** in left sidebar
   - Click **New Query**

2. **Copy Schema**:
   - Open `lib/database/schema.sql` in your project
   - Copy **ALL** contents (Ctrl+A, Ctrl+C)

3. **Paste & Run**:
   - Paste into SQL Editor
   - Click **Run** (or press Ctrl+Enter)
   - Wait for "Success" message

4. **Verify Tables Created**:
   - Go to **Table Editor** in left sidebar
   - You should see these tables:
     - ✅ `profiles`
     - ✅ `subscriptions`
     - ✅ `payments`
     - ✅ `chat_messages`
     - ✅ `user_limits`
     - ✅ `live_stats`
     - ✅ `masterclass_progress`
     - ✅ `quiz_results`
     - ✅ `cv_templates`
     - ✅ `user_cvs`
     - ✅ `cantonal_data`
     - ✅ `admin_logs`

---

### Step 3: Get API Keys

1. **Go to Settings** → **API** in Supabase dashboard

2. **Copy These Values**:
   ```
   Project URL: https://xxxxx.supabase.co
   anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (KEEP SECRET!)
   ```

3. **Add to `.env.local`**:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

---

## 📋 What Gets Created

### Tables Created:

| Table | Purpose |
|-------|---------|
| `profiles` | User profiles (extends auth.users) |
| `subscriptions` | Stripe subscription tracking |
| `payments` | Payment transactions |
| `chat_messages` | AI chat history |
| `user_limits` | Daily message limits (free tier) |
| `live_stats` | Homepage statistics |
| `masterclass_progress` | User progress on modules |
| `quiz_results` | Citizenship quiz results |
| `cv_templates` | CV template catalog |
| `user_cvs` | User's saved CVs |
| `cantonal_data` | Swiss canton information |
| `admin_logs` | Admin activity tracking |

### Security (RLS Policies):

- ✅ Users can only see their own data
- ✅ Admins can see all data
- ✅ Proper foreign key constraints
- ✅ Automatic timestamp updates

### Initial Data:

- ✅ 3 default stats (quotas, residents, processing time)
- ✅ 5 sample cantons (Zurich, Geneva, Basel, Vaud, Bern)

---

## 🔧 Manual Setup (Alternative)

If you prefer to run commands individually:

### 1. Enable UUID Extension
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### 2. Create Tables
Run each `CREATE TABLE` statement from `schema.sql` one by one.

### 3. Enable RLS
```sql
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
-- ... (repeat for each table)
```

### 4. Create Policies
Run each `CREATE POLICY` statement.

### 5. Create Functions & Triggers
Run the function and trigger creation statements.

### 6. Insert Initial Data
Run the `INSERT` statements for stats and cantons.

---

## ✅ Verification Checklist

After running the schema:

- [ ] All 12 tables exist in Table Editor
- [ ] Can see `profiles` table with columns
- [ ] `live_stats` table has 3 rows
- [ ] `cantonal_data` table has 5 rows
- [ ] No errors in SQL Editor
- [ ] API keys copied to `.env.local`
- [ ] `.env.local` file exists in project root

---

## 🧪 Test Database Connection

1. **Restart your dev server**:
   ```bash
   npm run dev
   ```

2. **Visit**: `http://localhost:3001`

3. **Try to register**: Go to `/auth/register`

4. **Check Supabase**:
   - Go to **Authentication** → **Users**
   - You should see your new user
   - Go to **Table Editor** → `profiles`
   - Your profile should appear automatically

---

## 🚨 Troubleshooting

### ❌ "relation does not exist"
**Cause**: Tables not created

**Fix**: 
- Re-run entire `schema.sql` in SQL Editor
- Check for error messages
- Make sure you're in the correct database

### ❌ "permission denied"
**Cause**: RLS policies blocking access

**Fix**:
- Verify RLS policies were created
- Check user is authenticated
- Verify `is_admin` flag if accessing admin features

### ❌ "duplicate key value"
**Cause**: Schema already partially run

**Fix**:
- Drop existing tables first (careful!)
- Or use `IF NOT EXISTS` clauses (already in schema)

### ❌ Connection refused
**Cause**: Wrong API URL or keys

**Fix**:
- Double-check `.env.local` values
- Verify keys from Supabase dashboard
- Restart dev server after changes

---

## 🔐 Security Notes

1. **Never commit `.env.local`** - It's in `.gitignore`
2. **Keep `service_role` key secret** - Only use server-side
3. **Use `anon` key in frontend** - Public but RLS protected
4. **RLS is enabled** - Users can only access their own data

---

## 📊 Database Structure

### Relationships:

```
auth.users
    ↓ (1:1)
profiles
    ↓ (1:many)
├── subscriptions
├── payments
├── chat_messages
├── masterclass_progress
├── quiz_results
└── user_cvs
```

### Key Fields:

- `profiles.pack_id`: Current subscription pack
- `profiles.is_admin`: Admin flag
- `subscriptions.status`: Active/canceled/past_due
- `chat_messages.tokens_used`: AI usage tracking
- `live_stats.is_active`: Show/hide stats

---

## 🎯 Next Steps

After database is set up:

1. ✅ **Test registration**: Create a user account
2. ✅ **Create admin user**: Follow admin creation guide
3. ✅ **Test chatbot**: Requires GROQ_API_KEY
4. ✅ **Test payments**: Requires Stripe keys
5. ✅ **Deploy**: Add env vars to production platform

---

## 📝 SQL Schema Location

The complete schema is in:
```
swiss-immigration-pro/lib/database/schema.sql
```

**257 lines** of SQL including:
- 12 tables
- 15+ RLS policies
- 3 triggers
- Initial seed data

---

## 💡 Tips

- **Use Supabase Dashboard**: Visual table editor is helpful
- **SQL Editor**: Quick way to run queries
- **Table Editor**: Easy data viewing/editing
- **API Docs**: Auto-generated from schema
- **Backups**: Supabase handles automatic backups

---

## ✅ Success!

If you see all tables in Table Editor and can register a user, your database is set up correctly! 🎉

**Ready for the next step?** Check `QUICK_START.md` for full setup.

