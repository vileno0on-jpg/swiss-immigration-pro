# Deploy to Netlify

## Quick Deploy (Recommended - Dashboard Method)

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub" and authorize Netlify
4. Select repository: `vileno0on-jpg/swiss-immigration-pro`
5. Click "Deploy site"

Netlify will automatically:
- Detect Next.js configuration
- Use the `netlify.toml` file
- Build and deploy your site

## Environment Variables

After deployment, add these in Netlify Dashboard:
- Site settings → Environment variables → Add variable

Required variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GROQ_API_KEY=your_groq_key
OPENAI_API_KEY=your_openai_key
XAI_API_KEY=your_xai_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-site-name.netlify.app
```

## CLI Method (Alternative)

If you prefer CLI, run this command in the project directory:

```bash
netlify deploy --build --prod --dir=.next --create-site=swiss-immigration-pro
```

Then follow the prompts to:
1. Select your team
2. Confirm site creation
3. Wait for build and deployment

## After Deployment

Your site will be live at: `https://swiss-immigration-pro.netlify.app` (or similar)

You can also set a custom domain in Netlify dashboard under:
- Site settings → Domain management

