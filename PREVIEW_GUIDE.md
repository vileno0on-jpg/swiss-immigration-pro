# 🎨 Preview Guide - Swiss Immigration Pro

## 🌐 Access Your Preview

Your dev server is running at:
```
http://localhost:3001
```

Open this URL in your browser to see the platform!

**Note**: Port 3001 is used because 3000 was already in use.

---

## 🏠 What You'll See

### Homepage (`/`)

**Hero Section:**
- 🇨🇭 Swiss flag emoji logo
- "Swiss Immigration Pro" branding
- "Master Swiss Immigration in 2025" headline
- Live quota alert badge
- Two CTAs: "Get Started" and "Watch Preview"
- 3 stat cards (if DB connected):
  - 2025 Non-EU Work Quotas Left
  - Foreign Residents
  - Avg Processing Time

**Features Section:**
- 4 feature cards with icons:
  - 🤖 AI Chatbot (Purple)
  - 📊 Live Statistics (Blue)
  - 📚 15-Hr Masterclass (Green)
  - 👥 CV Templates (Orange)

**Pricing Preview:**
- 4 pricing cards:
  - Free (CHF 0)
  - Immigration Pack (CHF 29)
  - Masterclass Pack (CHF 69) - Most Popular
  - Citizenship Pro (CHF 199)

**Final CTA:**
- "Ready to Make Switzerland Home?"
- Gradient blue background
- "Get Started Today" button

---

### Navigation (Header)

**Desktop:**
- Swiss flag logo + "SwissImmigrationPro"
- Links: Home | Visas | Employment | Citizenship | Masterclass | Pricing
- Dashboard link (if logged in)
- Admin link (if admin)
- Dark mode toggle
- Login / Logout button

**Mobile:**
- Hamburger menu
- All links accessible

---

### Key Pages to Preview

#### 1. Visas (`/visas`)
- 3 visa type cards:
  - L Permit (Short-term)
  - B Permit (Residence)
  - G Permit (Cross-border)
- Each with icon, duration, features
- Upgrade CTA at bottom

#### 2. Employment (`/employment`)
- ⚠️ Red quota alert box
- 4 info cards:
  - Salary Expectations
  - CV Templates
  - Tax & Benefits
  - Embassy Process
- Blue gradient CTA

#### 3. Citizenship (`/citizenship`)
- Comparison table:
  - Ordinary Naturalization
  - Simplified (Spouse)
  - Simplified (3rd Gen)
- 4 requirement cards
- Purple CTA for roadmap

#### 4. Masterclass (`/masterclass`)
- Course overview stats
- 10 module list with:
  - Locked/unlocked icons
  - Duration badges
  - Play buttons
- AI Tutor feature box
- Blue gradient CTA

#### 5. Pricing (`/pricing`)
- 4 pricing tiers in grid
- Most Popular badge on CHF 69
- Feature comparison table
- FAQ section
- Bottom CTA

#### 6. Cantons (`/cantons`)
- 10 canton cards:
  - Zurich, Geneva, Basel, Vaud, Bern, Ticino, Valais, Aargau, St. Gallen, Grisons
- Canton comparison table
- Blue CTA

#### 7. Resources (`/resources`)
- Free resources section
- Premium resources section
- Quick links grid
- Blue background

#### 8. Contact (`/contact`)
- Left: Contact form
- Right: Contact info, AI chat CTA, Disclaimer

#### 9. Login (`/auth/login`)
- Clean form with email/password
- "Remember me" checkbox
- "Forgot password?" link
- Sign in button

#### 10. Register (`/auth/register`)
- Full name, email, password fields
- Terms/Privacy links
- Create account button

---

## 🤖 AI Chat Widget

**Bottom right corner:**
- Blue chat bubble icon
- Green pulse dot
- Click to open

**When opened:**
- Header: "AI Immigration Assistant"
- Message history (if logged in)
- Input field at bottom
- "Daily limit reached" warning if free user used 3 messages
- Disclaimer at bottom

---

## 📊 Dashboards

### User Dashboard (`/dashboard`)
**Header:**
- "Welcome back, [Name]!"
- Pack badge (FREE/IMMIGRATION/etc.)
- Upgrade button (if free)

**Stats Grid:**
- Masterclass Progress (Green)
- Messages Used (Blue)
- CVs Created (Purple)

**Main Content:**
- My Packs section
- Downloads list
- Progress tracker
- AI Chat quick access
- Profile info

### Admin Dashboard (`/admin`)
**Header:**
- Shield icon + "Admin Dashboard"

**Stats Grid:**
- Total Users (Blue)
- Revenue CHF (Green)
- Active Subs (Purple)
- AI Messages (Orange)

**Main Content:**
- Users table
- Quick actions sidebar
- System status

---

## 🎨 Design Elements

### Colors & Theme
- **Primary**: Deep blues (#0056B3, #007BFF)
- **Background**: White/Gray-900
- **Cards**: Glassmorphism effect
- **Buttons**: Gradient blues
- **Dark Mode**: Full support (toggle in header)

### Animations
- Fade-in on scroll
- Hover effects on cards
- Button scale transforms
- Smooth transitions (60fps)

### Typography
- Clean Inter font
- Bold headings
- Readable body text
- Proper hierarchy

---

## 🧪 Testing Features

### Without Database Connection

**Will Work:**
- ✅ All pages load
- ✅ Navigation works
- ✅ Forms render
- ✅ Animations play
- ✅ Dark mode toggle
- ✅ Responsive design

**Won't Work:**
- ❌ Login/Register (auth fails)
- ❌ AI chat (no API key)
- ❌ Stats display (no DB)
- ❌ Dashboards (no auth)
- ❌ Stripe checkout (no keys)

### With Full Setup

**Everything works:**
- ✅ User registration
- ✅ Login/logout
- ✅ AI chat (3 free msgs)
- ✅ Live stats
- ✅ Dashboards
- ✅ Stripe checkout
- ✅ Admin panel

---

## 📱 Mobile Preview

**Responsive breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Test in:**
- Chrome DevTools
- Firefox Responsive Mode
- Safari Responsive Design Mode
- Physical devices

**Mobile features:**
- Hamburger menu
- Stacked layouts
- Touch-friendly buttons
- Optimized images

---

## 🐛 Common Issues

### "Cannot read properties of undefined"
- **Cause**: Missing environment variables
- **Fix**: Set up `.env.local` (see QUICK_START.md)

### Blank stats section
- **Cause**: Database not connected
- **Fix**: Run schema.sql in Supabase

### White blank page
- **Cause**: Build error or missing dependencies
- **Fix**: `npm install && npm run build`

### Chat widget not appearing
- **Cause**: Component error
- **Fix**: Check browser console for errors

---

## 🎯 What to Check

### Visual Checks
- [ ] Logo appears correctly
- [ ] All icons render
- [ ] Colors match design
- [ ] Dark mode works
- [ ] Animations smooth
- [ ] Mobile responsive

### Functional Checks
- [ ] All links work
- [ ] Forms submit
- [ ] Navigation works
- [ ] Buttons clickable
- [ ] No console errors
- [ ] Fast load times

### Content Checks
- [ ] Text readable
- [ ] Images optimized
- [ ] Proper spacing
- [ ] CTAs prominent
- [ ] Disclaimers visible

---

## 🚀 Next Steps After Preview

1. **Setup Environment**
   - Configure `.env.local`
   - Get API keys
   - Connect databases

2. **Test Features**
   - Create test account
   - Try AI chat
   - Test checkout flow

3. **Deploy**
   - Follow DEPLOYMENT.md
   - Push to Vercel
   - Test production

4. **Customize**
   - Update branding
   - Add content
   - Modify pricing

---

## 📸 Screenshots to Take

Capture these for documentation:
1. Homepage hero
2. Pricing cards
3. Dashboard
4. Admin panel
5. Mobile view
6. Dark mode
7. Chat widget

---

## 🌟 Highlight Features

**Share these:**
- Live statistics
- AI-powered chat
- Video masterclass
- CV templates
- Cantonal variations
- Comprehensive dashboards
- Beautiful UI/UX

---

## 🎉 Enjoy Your Preview!

Your platform is **beautiful, functional, and ready to make money!**

Open: **http://localhost:3001** 🚀

---

**Need help?** Check:
- `QUICK_START.md` - Setup guide
- `README.md` - Documentation
- Browser console - Debug errors

