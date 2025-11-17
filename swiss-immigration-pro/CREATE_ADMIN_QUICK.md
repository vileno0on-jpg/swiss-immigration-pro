# 👑 Quick Admin User Creation

## 🚀 Easiest Method: Run the Script

```bash
cd swiss-immigration-pro
node scripts/create-admin-neon.js
```

Then enter:
- **Email**: Your admin email
- **Password**: Your password (min 8 chars)
- **Name**: Your name (optional)

**That's it!** The script will create the admin user automatically.

---

## 🌐 Alternative: Use API Endpoint

### Step 1: Make a POST Request

Using curl, Postman, or browser console:

```bash
curl -X POST http://localhost:3003/api/admin/create-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@swissimmigrationpro.com",
    "password": "YourPassword123!",
    "fullName": "Admin User"
  }'
```

Or using fetch in browser console (F12):

```javascript
fetch('http://localhost:3003/api/admin/create-admin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@swissimmigrationpro.com',
    password: 'YourPassword123!',
    fullName: 'Admin User'
  })
})
.then(r => r.json())
.then(console.log)
```

---

## ✅ After Creation

1. **Log in** at: http://localhost:3003/auth/login
2. **Access admin panel** at: http://localhost:3003/admin

You'll see:
- Total users
- Revenue stats
- Active subscriptions
- Message analytics

---

**That's it!** 🎉

