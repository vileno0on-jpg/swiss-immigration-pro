# Fixing 404 on Netlify After Successful Deploy

## Quick Checklist

If your Netlify deploy says "successful" but you're getting 404 errors:

### 1. Check What URL You're Accessing
- **Root URL:** `https://your-site.netlify.app/` (should show homepage)
- **Other pages:** `https://your-site.netlify.app/visas`, `/pricing`, etc.

### 2. Verify Build Logs
In Netlify Dashboard → Deploys → Latest Deploy:
- ✅ Look for: "Next.js detected"
- ✅ Look for: "Plugin @netlify/plugin-nextjs installed"
- ✅ Look for: "Build completed successfully"

### 3. Check Site Settings
**Site Settings → Build & Deploy:**
- **Publish directory:** Should be **EMPTY** (plugin handles this)
- **Build command:** `npm run build` (from netlify.toml)
- **Node version:** `20` (from .nvmrc)

### 4. Clear Cache and Redeploy
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Clear cache and deploy site**
3. Wait for build to complete

### 5. Check the _redirects File
The `public/_redirects` file should contain:
```
/*    /.netlify/functions/next    200
```

This file is automatically deployed and should handle routing.

### 6. Verify Plugin Installation
In build logs, you should see:
```
Installing plugins
  - @netlify/plugin-nextjs@5.14.7
```

If the plugin isn't installing:
- Check `package.json` has `@netlify/plugin-nextjs` in devDependencies ✅
- Check `netlify.toml` has the plugin listed ✅

## Common Issues

### Issue: 404 on Root URL (`/`)
**Solution:** 
- The root page is at `app/(main)/page.tsx` ✅
- This should work automatically
- Try clearing cache and redeploying

### Issue: 404 on All Routes
**Solution:**
- The `_redirects` file in `public/` should handle this
- Make sure it was deployed (check in Netlify file browser)
- Verify the plugin is working

### Issue: Build Succeeds But Site Shows 404
**Solution:**
- This usually means routing isn't configured
- The `_redirects` file should fix this
- Clear cache and redeploy

## Still Not Working?

1. **Check Netlify Functions:**
   - Go to **Functions** tab in Netlify
   - You should see a `next` function created by the plugin

2. **Test the Function:**
   - Click on the `next` function
   - Check if it's being invoked on page requests

3. **Check Browser Console:**
   - Open your site
   - Open browser DevTools (F12)
   - Check Console for errors
   - Check Network tab for failed requests

4. **Verify Environment Variables:**
   - Some pages might need env vars to work
   - Check if missing vars cause 404s

## Expected Behavior

After a successful deploy:
- ✅ Root URL (`/`) should show homepage
- ✅ All routes should work (`/visas`, `/pricing`, etc.)
- ✅ No 404 errors
- ✅ Assets (images, CSS) should load

## Next Steps

If still having issues:
1. Share the Netlify build logs
2. Share the URL you're trying to access
3. Share any browser console errors
4. Check Netlify status: https://www.netlifystatus.com/

