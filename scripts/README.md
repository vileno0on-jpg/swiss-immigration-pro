# Admin User Creation Scripts

This folder contains scripts to help you create admin users for your Swiss Immigration Pro platform.

---

## 📋 Available Scripts

### 1. `create-admin-user.sql`
**Recommended Method** - Run directly in Supabase SQL Editor
- ✅ Easy to execute
- ✅ Handles all edge cases
- ✅ Includes verification queries
- ✅ Works on all Supabase plans

### 2. `create-admin-user-guide.md`
**Complete Guide** - Step-by-step instructions
- ✅ SQL script method
- ✅ Dashboard UI method
- ✅ Troubleshooting tips
- ✅ Security best practices

### 3. `create-admin.py`
**Automated Script** - Programmatic creation
- ✅ Requires Python 3.8+
- ✅ Requires supabase-py library
- ✅ Interactive prompts
- ✅ Good for CI/CD pipelines

---

## 🚀 Quick Start

### Option A: SQL Script (Easiest)
1. Open Supabase Dashboard → SQL Editor
2. Copy contents of `create-admin-user.sql`
3. Update email/password/name
4. Run the script
5. Done! ✅

### Option B: Dashboard UI
1. Follow `create-admin-user-guide.md`
2. Use Supabase Dashboard
3. No SQL knowledge needed
4. Done! ✅

### Option C: Python Script
```bash
# Install dependencies
pip install supabase

# Run script
python create-admin.py

# Or with environment variables
export SUPABASE_URL="your-url"
export SUPABASE_SERVICE_KEY="your-key"
python create-admin.py
```

---

## 📝 What Each Script Does

All scripts perform these actions:

1. **Creates auth user** in `auth.users` table
2. **Creates profile** in `profiles` table with `is_admin = true`
3. **Creates user_limits** entry for message tracking
4. **Verifies** the creation was successful

---

## 🔒 Security Notes

- Admin users have access to `/admin` dashboard
- Admins can view all users and sales data
- Use strong passwords (12+ characters)
- Don't share admin credentials
- Consider enabling 2FA on your Supabase account

---

## 🆘 Troubleshooting

See `create-admin-user-guide.md` for detailed troubleshooting section.

Common issues:
- "relation auth.users does not exist" → Running locally, use Method 2
- "function crypt does not exist" → Enable pgcrypto extension
- Can't login → Check email/password match, verify in dashboard
- No admin link → Clear cache, logout/login, verify is_admin = true

---

## 📚 Additional Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Admin Users Best Practices](https://supabase.com/docs/guides/auth/users)

---

**Questions?** Check the main `README.md` or `DEPLOYMENT.md` files.

