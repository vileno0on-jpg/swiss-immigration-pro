# Swiss Immigration Quiz-Driven Layered System - Quick Start

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for database)
- Environment variables configured (see `.env.example`)

## 🎯 Key Features Implemented

✅ **Auto-Popup Quiz** - Appears on site load  
✅ **Layer Classification** - EU/EFTA → Europeans, US/CA → Americans, Others → Others  
✅ **Dynamic Routing** - `/europeans`, `/americans`, `/others`  
✅ **Layer-Specific Content** - Tailored for each group  
✅ **Follow-Up Quizzes** - Layer-specific questions  
✅ **Requirements Checklist** - Interactive progress tracking  
✅ **PDF Generation** - Personalized summaries (basic implementation)  

## 📁 Project Structure

```
swiss-immigration-pro/
├── app/
│   ├── page.tsx              # Root with quiz modal
│   ├── [layer]/              # Dynamic layer routes
│   └── api/quiz/save/        # Quiz save endpoint
├── components/
│   └── quiz/
│       └── InitialQuizModal.tsx
├── lib/
│   ├── layerLogic.ts         # Classification logic
│   ├── layerContent.ts       # Layer content config
│   └── pdfGenerator.ts       # PDF utilities
└── types/
    └── index.ts
```

## 🔧 Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🧪 Testing the Quiz

1. **Clear localStorage:**
   ```javascript
   localStorage.clear()
   ```

2. **Visit root page** (`/`)
   - Quiz should auto-open after 1 second

3. **Complete quiz:**
   - Select country (e.g., "Germany" → Europeans layer)
   - Answer all questions
   - Submit

4. **Verify redirect:**
   - Should redirect to `/europeans` (or appropriate layer)
   - Content should be layer-specific

## 🎨 Customization

### Change Layer Content

Edit `lib/layerContent.ts`:

```typescript
europeans: {
  hero: {
    tagline: 'Your Custom Tagline',
    description: 'Your description',
    // ...
  }
}
```

### Add New Countries

Edit `lib/layerLogic.ts`:

```typescript
export const EU_COUNTRIES = [
  // Add country codes
  'XX', // Your country
]
```

## 📊 Database Setup

The quiz results are stored in the `quiz_results` table. Ensure your Supabase database has this table:

```sql
CREATE TABLE public.quiz_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id),
  quiz_type TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Set environment variables
4. Deploy

### Manual

```bash
npm run build
npm start
```

## 📝 Notes

- Quiz results are stored in both localStorage and database
- Layer preference persists across sessions
- All content is customizable via `layerContent.ts`
- PDF generation is basic - enhance with jsPDF for full PDF support

## 🐛 Troubleshooting

**Quiz not appearing:**
- Check localStorage for `quizCompleted` flag
- Clear it: `localStorage.removeItem('quizCompleted')`

**Wrong layer classification:**
- Verify country codes in `layerLogic.ts`
- Check ISO 3166-1 alpha-2 format

**Database errors:**
- Verify Supabase connection
- Check RLS policies
- Ensure `quiz_results` table exists

## 📚 Documentation

- Full documentation: `LAYERED_QUIZ_SYSTEM.md`
- Deployment guide: `DEPLOYMENT.md`
- API documentation: See `app/api/` routes

---

**Built with Next.js 15, React 19, TypeScript, and TailwindCSS**

