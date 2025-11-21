# Netlify Deployment Troubleshooting

## Current Configuration

Your `netlify.toml` is now correctly configured:
- ✅ Build command: `npm run build`
- ✅ Node version: 20
- ✅ Netlify Next.js plugin installed

## If You're Still Getting 404 Errors

### Step 1: Check Build Logs
1. Go to your Netlify dashboard
2. Click on your site
3. Go to **Deploys** tab
4. Click on the latest deploy
5. Check if the build succeeded

**Look for:**
- ✅ "Build succeeded" message
- ✅ "Plugin @netlify/plugin-nextjs installed"
- ❌ Any error messages

### Step 2: Verify Plugin Installation
In the build logs, you should see:
```
Installing plugins
  - @netlify/plugin-nextjs@5.14.7
```

If the plugin isn't installing, check:
- The plugin is in `package.json` devDependencies ✅
- The plugin is listed in `netlify.toml` ✅

### Step 3: Check Site Settings
In Netlify Dashboard → Site Settings → Build & Deploy:

**Build settings:**
- Build command: `npm run build` (should auto-detect from netlify.toml)
- Publish directory: **Leave empty** (plugin handles this)
- Node version: `20` (should auto-detect from .nvmrc)

### Step 4: Clear Cache and Redeploy
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Clear cache and deploy site**
3. Wait for build to complete

### Step 5: Check Environment Variables
Make sure all required environment variables are set in:
**Site Settings → Environment Variables**

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GROQ_API_KEY` (or other AI keys)
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (should be your Netlify URL)

### Step 6: Verify Build Output
After a successful build, check:
- Build should complete without errors
- You should see "Next.js detected" in the logs
- Plugin should create `.netlify/functions/next` directory

## Common Issues

### Issue: "Page not found" on all routes
**Solution:** The Netlify Next.js plugin should handle this automatically. If it's not working:
1. Ensure the plugin is installed: `npm install @netlify/plugin-nextjs --save-dev`
2. Check that `netlify.toml` has the plugin listed
3. Clear cache and redeploy

### Issue: Build fails
**Solution:** 
1. Check build logs for specific errors
2. Ensure Node version is 20
3. Check that all dependencies are in `package.json`

### Issue: Routes work but assets don't load
**Solution:** This is usually a path issue. The plugin should handle this, but check:
- Static files are in `public/` directory
- Images use relative paths or `/` prefix

## Still Having Issues?

1. **Check Netlify Status:** https://www.netlifystatus.com/
2. **Review Build Logs:** Look for any warnings or errors
3. **Test Locally:** Run `npm run build` locally to ensure it works
4. **Contact Support:** Netlify support is very helpful

## Expected Build Output

A successful build should show:
```
✓ Compiled successfully
✓ Generating static pages
✓ Build completed
✓ Next.js plugin detected
✓ Deploying to Netlify
```

Your site should be accessible at: `https://your-site-name.netlify.app`

