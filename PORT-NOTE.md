# 🔌 Port Configuration Note

## Current Setup

Your dev server is configured to run on **port 3001** instead of the default port 3000.

---

## Why Port 3001?

Port 3000 was already in use by another application on your system, so we switched to port 3001 to avoid conflicts.

---

## Access Your App

**Development URL:**
```
http://localhost:3001
```

---

## How to Use

### Start Dev Server
```bash
npm run dev
```
This will automatically start on port 3001 (configured in `package.json`).

### Stop Server
Press `Ctrl + C` in the terminal where the server is running.

### Restart Server
```bash
# Stop with Ctrl + C, then:
npm run dev
```

---

## Change Port (Optional)

If you want to use a different port, edit `package.json`:

```json
"scripts": {
  "dev": "next dev -p YOUR_PORT",
  ...
}
```

Replace `YOUR_PORT` with your desired port number.

---

## Production

When you deploy to Vercel, the port configuration is **automatic**. You don't need to change anything - Vercel handles all port management in production.

---

**Current Status:** ✅ Server running on port 3001

**Next:** Open http://localhost:3001 in your browser! 🚀

