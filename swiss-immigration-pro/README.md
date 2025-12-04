# Swiss Immigration Pro - Premium AI-Powered Swiss Immigration Platform

A full-stack SaaS platform for Swiss immigration education, featuring AI chatbots, comprehensive guides, CV templates, live statistics, and interactive dashboards.

## 🚀 Features

### Core Features
- **AI Chatbot**: Groq-powered immigration assistant with RAG
- **Live Statistics**: Real-time quota data and processing times
- **Interactive Guides**: 10+ comprehensive modules per pack
- **CV Templates**: 20+ ATS-optimized Swiss-style CVs
- **Dashboard**: Personal progress tracking and downloads
- **Admin Panel**: User management, sales analytics, content control

### Monetization
- **Free Tier**: 3 AI messages/day, basic site access
- **Immigration Pack** (CHF 29/mo): Unlimited chat, CV templates, guides
- **Advanced Pack** (CHF 69/mo): + 10 comprehensive modules, AI tutor
- **Citizenship Pro** (CHF 199/mo): + Lifetime access, citizenship roadmap

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Local PostgreSQL Database
- **Payments**: Stripe (optional)
- **AI**: Groq (Llama 3.1 70B) / OpenAI (optional)
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Deployment**: Self-hosted (runs on your PC)

## 📁 Project Structure

```
swiss-immigration-pro/
├── app/
│   ├── api/              # API routes (chat, checkout, webhooks)
│   ├── auth/             # Login/Register pages
│   ├── dashboard/        # User dashboard
│   ├── admin/            # Admin dashboard
│   ├── pricing/          # Pricing page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/
│   ├── layout/           # Header, Footer
│   └── chat/             # ChatWidget
├── lib/
│   ├── supabase/         # Supabase client/server
│   ├── stripe.ts         # Stripe config & pricing
│   ├── config.ts         # App configuration
│   └── database/
│       └── schema.sql    # Database schema
└── types/
    └── index.ts          # TypeScript types
```

## 🔧 Setup Instructions

### 1. Clone & Install

```bash
cd swiss-immigration-pro
npm install
```

### 2. Environment Variables

Create `.env.local` file:

```env
# Local PostgreSQL Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=swiss_immigration
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# Stripe (optional - for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
STRIPE_SECRET_KEY=sk_test_placeholder
STRIPE_WEBHOOK_SECRET=whsec_placeholder

# AI (optional - for chatbot)
GROQ_API_KEY=your_groq_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# App
NEXT_PUBLIC_APP_URL=http://localhost:5050
NEXT_PUBLIC_ADMIN_EMAIL=admin@swissimmigrationpro.com
```

### 3. Database Setup

1. Install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)
2. Create database: `psql -U postgres -c "CREATE DATABASE swiss_immigration;"`
3. Import schema: `psql -U postgres -d swiss_immigration -f lib/database/schema.sql`
4. Or use the setup script: `SETUP_LOCAL_DB.bat`

### 4. Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get API keys from Dashboard → Developers → API keys
3. Create webhook endpoint: `https://your-domain.com/api/webhooks/stripe`
4. Subscribe to events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

### 5. Create Admin User

Choose one method:

**Method A: SQL Script (Recommended)**
1. Open Supabase Dashboard → SQL Editor
2. Run `scripts/create-admin-user.sql`
3. Update email/password in the script
4. Execute and verify

**Method B: Dashboard UI**
1. Follow `scripts/create-admin-user-guide.md`
2. Use Supabase dashboard interface
3. No SQL knowledge needed

**See:** `scripts/README.md` for all methods

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

Key tables:
- `profiles` - User profiles with pack assignments
- `subscriptions` - Stripe subscription data
- `payments` - Transaction history
- `chat_messages` - AI conversation log
- `user_limits` - Daily message limits
- `live_stats` - Editable stats for homepage
- `masterclass_progress` - Progress tracking
- `cantonal_data` - Cantonal immigration info

## 🎨 Design System

- **Colors**: Deep blues (#0056B3, #007BFF) with white backgrounds
- **Theme**: Dark mode toggle
- **Animations**: Framer Motion for 60fps smooth transitions
- **Typography**: Inter font family
- **Components**: Glassmorphism cards, gradient buttons

## 🔒 Security

- Row-Level Security (RLS) policies on all Supabase tables
- Admin-only access controls
- Stripe webhook signature verification
- Next.js API route protection
- Environment variable validation

## 📈 Analytics (Optional)

- Google Analytics 4
- Hotjar (optional)
- Stripe Analytics for revenue tracking

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Environment Setup

Set all production environment variables in Vercel dashboard.

## 📝 Content Strategy

### Pages to Build
- `/visas` - Visa types and requirements
- `/employment` - Swiss employment guides
- `/citizenship` - Citizenship pathways
- `/dashboard` - Interactive content & progress
- `/resources` - Checklists, PDFs
- `/cantons` - Cantonal variations

### Monetization Flow
1. Free users → Limited chat (3/day)
2. Upgrade modal after hitting limit
3. Stripe checkout → Dashboard access
4. Email sequences for engagement

## 🤝 Support

For issues or questions:
- Email: support@swissimmigrationpro.com
- Documentation: Coming soon

## 📄 License

© 2025 Alpine Legal Partners. All rights reserved.

## ⚠️ Disclaimer

This platform provides general information only. Not legal advice. Users should consult with qualified legal professionals for their specific cases.

---

**Built with ❤️ for Swiss immigration professionals**
