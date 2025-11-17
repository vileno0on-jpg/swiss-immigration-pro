# 📁 File Index - Swiss Immigration Pro

Quick reference guide to all important files in the project.

---

## 📚 Documentation Files

| File | Description | When to Read |
|------|-------------|--------------|
| `README.md` | Main project overview | Start here! |
| `QUICK_START.md` | Get up and running in 1 hour | First-time setup |
| `DEPLOYMENT.md` | Production deployment guide | Before deploying |
| `FEATURES.md` | Complete feature list | To see what's built |
| `PROJECT_SUMMARY.md` | Project completion summary | High-level overview |
| `FILE_INDEX.md` | This file - file directory | Finding files |
| `.env.example` | Environment variable template | Setup env vars |

---

## 🔧 Configuration Files

| File | Purpose | Modify? |
|------|---------|---------|
| `package.json` | Dependencies & scripts | Add packages |
| `tsconfig.json` | TypeScript config | Rarely |
| `next.config.ts` | Next.js config | Advanced setups |
| `postcss.config.mjs` | PostCSS config | Rarely |
| `eslint.config.mjs` | Linting rules | Code standards |

---

## 🎨 App Code Structure

### Layout & Pages (`app/`)

| File | Route | Purpose |
|------|-------|---------|
| `layout.tsx` | / | Root layout (Header, Footer, Chat) |
| `page.tsx` | / | Homepage |
| `globals.css` | - | Global styles & Tailwind |
| `admin/page.tsx` | /admin | Admin dashboard |
| `dashboard/page.tsx` | /dashboard | User dashboard |
| `pricing/page.tsx` | /pricing | Pricing & checkout |
| `auth/login/page.tsx` | /auth/login | Login page |
| `auth/register/page.tsx` | /auth/register | Registration |
| `visas/page.tsx` | /visas | Visa information |
| `employment/page.tsx` | /employment | Employment hub |
| `citizenship/page.tsx` | /citizenship | Citizenship paths |
| `dashboard/page.tsx` | /dashboard | Content & Progress |
| `cantons/page.tsx` | /cantons | Cantonal variations |
| `resources/page.tsx` | /resources | Downloads |
| `contact/page.tsx` | /contact | Contact form |

### API Routes (`app/api/`)

| File | Endpoint | Purpose |
|------|----------|---------|
| `chat/route.ts` | /api/chat | AI chatbot handler |
| `checkout/route.ts` | /api/checkout | Stripe checkout |

---

## 🧩 Components (`components/`)

| File | Component | Usage |
|------|-----------|-------|
| `layout/Header.tsx` | Header navigation | Global nav bar |
| `layout/Footer.tsx` | Footer | Site footer |
| `chat/ChatWidget.tsx` | Chat widget | Floating AI chat |

---

## 📦 Libraries (`lib/`)

| File | Purpose | Contains |
|------|---------|----------|
| `config.ts` | App config | Constants, settings |
| `constants.ts` | Data constants | Cantons, CVs, embassies |
| `stripe.ts` | Payment config | Pricing packs, Stripe setup |
| `supabase/client.ts` | DB client (browser) | Client-side DB access |
| `supabase/server.ts` | DB client (server) | Server-side DB access |
| `database/schema.sql` | Database schema | All tables, RLS, data |

---

## 🗂️ Types (`types/`)

| File | Purpose |
|------|---------|
| `index.ts` | TypeScript type definitions |

---

## 🛠️ Scripts (`scripts/`)

| File | Purpose | When to Use |
|------|---------|-------------|
| `README.md` | Scripts overview | Using scripts |
| `create-admin-user.sql` | SQL admin creation | **Best method** |
| `create-admin-user-guide.md` | Admin creation guide | Alternative methods |
| `create-admin.py` | Python admin script | Automation |

---

## 🎯 Key Files to Edit

### For Customization

| File | What to Change | Why |
|------|----------------|-----|
| `lib/config.ts` | App name, colors, AI settings | Branding |
| `lib/constants.ts` | Cantons, CVs, quiz data | Content |
| `lib/stripe.ts` | Pricing packs | Monetization |
| `app/page.tsx` | Homepage content | First impression |
| `app/layout.tsx` | Site title, meta tags | SEO |

### For Adding Features

| File | What to Add | Examples |
|------|-------------|----------|
| `app/` | New pages | `/blog/page.tsx` |
| `app/api/` | API endpoints | `/api/webhook/route.ts` |
| `components/` | Reusable components | `Button.tsx`, `Modal.tsx` |
| `lib/` | Utilities | `utils.ts`, `helpers.ts` |

---

## 📝 Environment Variables

Create `.env.local` from `.env.example`:

```bash
# Database
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# AI
GROQ_API_KEY=
OPENAI_API_KEY=

# App
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_ADMIN_EMAIL=
```

---

## 🗄️ Database Schema

Location: `lib/database/schema.sql`

**Key Tables:**

| Table | Purpose |
|-------|---------|
| `profiles` | User accounts & admin status |
| `subscriptions` | Stripe subscription data |
| `payments` | Payment transactions |
| `chat_messages` | AI conversation history |
| `user_limits` | Daily message limits |
| `live_stats` | Homepage statistics |
| `masterclass_progress` | Progress tracking |
| `cv_templates` | CV template data |
| `user_cvs` | User CV instances |
| `cantonal_data` | Canton immigration info |
| `quiz_results` | User quiz scores |

---

## 🎨 Styling

| File | Purpose |
|------|---------|
| `app/globals.css` | Global styles, Tailwind imports |
| Tailwind classes | Inline styling throughout |
| Tailwind config | Auto-generated |

---

## 📊 Build Output

After `npm run build`:

| Directory | Contains |
|-----------|----------|
| `.next/` | Build artifacts (auto-generated) |
| `node_modules/` | Dependencies (auto-generated) |

**Don't commit these!**

---

## 🚀 Deployment Files

| File | Purpose |
|------|---------|
| `vercel.json` | Vercel config (auto) |
| `.gitignore` | Git ignore rules |
| `.env.local` | Local environment (never commit!) |

---

## 🔍 Finding Code by Feature

### AI Chatbot
- Component: `components/chat/ChatWidget.tsx`
- API: `app/api/chat/route.ts`
- Config: `lib/config.ts` (AI settings)
- DB: `chat_messages`, `user_limits` tables

### Payments
- Pricing: `lib/stripe.ts`
- Checkout: `app/api/checkout/route.ts`
- Pages: `app/pricing/page.tsx`
- DB: `subscriptions`, `payments` tables

### Dashboards
- User: `app/dashboard/page.tsx`
- Admin: `app/admin/page.tsx`
- DB: Multiple tables (read via Supabase)

### Content Pages
- All in `app/[page-name]/page.tsx`
- Layout: `app/layout.tsx`
- Components: `components/layout/`

### Authentication
- Pages: `app/auth/login/`, `app/auth/register/`
- DB: `auth.users` (Supabase managed)
- Logic: Via Supabase Auth

---

## 🆘 Quick Reference

### Common Tasks

**Add new page:**
```bash
# Create file
app/my-page/page.tsx

# Add route in Header
components/layout/Header.tsx
```

**Change pricing:**
```typescript
// Edit
lib/stripe.ts
```

**Update homepage:**
```typescript
// Edit
app/page.tsx
```

**Add AI features:**
```typescript
// Edit
lib/config.ts
app/api/chat/route.ts
```

**Database changes:**
```sql
-- Edit
lib/database/schema.sql
-- Then run in Supabase
```

---

## 📖 Reading Order

**New to the project?**

1. `QUICK_START.md` - Get running
2. `README.md` - Understand project
3. `FEATURES.md` - See capabilities
4. `FILE_INDEX.md` - This file
5. `DEPLOYMENT.md` - Deploy guide
6. Code files - Start building!

---

**Need help?** Check:
- `README.md` - General info
- `DEPLOYMENT.md` - Production setup
- `scripts/README.md` - Admin creation
- Code comments - Inline docs

---

**Happy coding!** 🚀

