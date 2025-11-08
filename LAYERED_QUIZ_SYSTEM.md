# Layered Quiz-Driven Swiss Immigration System

## Overview

This system implements a dynamic, quiz-driven Swiss immigration website with three distinct layers based on user origin:

- **Europeans** (EU/EFTA countries) - `/europeans`
- **Americans** (USA/Canada) - `/americans`  
- **Others** (All other countries) - `/others`

## Key Features

### 1. Auto-Popup Quiz on Site Load
- Modal appears automatically on first visit
- 7-step multi-question form
- Categorizes users into one of three layers
- Stores results in localStorage and database

### 2. Layer Classification Logic
- **Location:** `lib/layerLogic.ts`
- Automatically classifies based on country code (ISO 3166-1 alpha-2)
- EU/EFTA countries → Europeans layer
- USA/Canada → Americans layer
- All others → Others layer

### 3. Dynamic Routing
- Dynamic routes: `app/[layer]/page.tsx`
- Layer-specific pages:
  - `/[layer]` - Home page with customized content
  - `/[layer]/visas` - Visa types and requirements
  - `/[layer]/process` - Step-by-step immigration process
  - `/[layer]/requirements` - Interactive checklist
  - `/[layer]/resources` - Articles and guides
  - `/[layer]/quiz` - Follow-up layer-specific quiz

### 4. Layer-Specific Content
- **Location:** `lib/layerContent.ts`
- Each layer has:
  - Custom hero tagline and description
  - Tailored visa information
  - Layer-specific process steps
  - Unique tools and resources
  - Targeted blog posts

### 5. Shared Base Design
- Swiss-themed colors (white #FFF, blue #0056B3)
- Responsive design
- Dark mode support
- Accessible (WCAG compliant)

## File Structure

```
swiss-immigration-pro/
├── app/
│   ├── page.tsx                    # Root page with quiz modal
│   ├── [layer]/
│   │   ├── page.tsx               # Layer home page
│   │   ├── visas/page.tsx         # Visa types
│   │   ├── process/page.tsx       # Process steps
│   │   ├── requirements/page.tsx   # Checklist
│   │   ├── resources/page.tsx     # Articles
│   │   └── quiz/page.tsx          # Follow-up quiz
│   └── api/
│       └── quiz/
│           └── save/route.ts      # Save quiz results
├── components/
│   └── quiz/
│       └── InitialQuizModal.tsx   # Main quiz component
├── lib/
│   ├── layerLogic.ts              # Classification logic
│   ├── layerContent.ts            # Layer-specific content
│   └── pdfGenerator.ts            # PDF generation utility
└── types/
    └── index.ts                    # TypeScript types
```

## How It Works

### Initial Quiz Flow

1. User visits root (`/`)
2. Quiz modal auto-opens after 1 second
3. User completes 7 questions:
   - Q1: Country of origin (required)
   - Q2: Immigration reason (required, multi-select)
   - Q3: Nationality (optional)
   - Q4: Age range (optional)
   - Q5: Job offer (required)
   - Q6: Language skills (optional)
   - Q7: Email for PDF (optional)
4. System classifies user into layer
5. Redirects to `/[layer]` with personalized content

### Layer Switching

- Users can manually navigate to different layers
- Content adapts automatically based on route
- Quiz results stored in localStorage persist layer preference

### Content Customization

Each layer has:
- **80% shared code** (base components, layout)
- **20% customized** (content JSON, styling, tools)

## Usage Examples

### Accessing Layer Content

```typescript
import { LAYER_CONTENT } from '@/lib/layerContent'
import { classifyLayer } from '@/lib/layerLogic'

const layer = classifyLayer('DE') // Returns 'europeans'
const content = LAYER_CONTENT[layer]
console.log(content.hero.tagline) // "Easy EU Mobility to Swiss Bliss"
```

### Checking User's Layer

```typescript
// From localStorage (after quiz)
const userLayer = localStorage.getItem('userLayer') // 'europeans' | 'americans' | 'others'

// From URL
const params = useParams()
const layer = params.layer as LayerType
```

## API Endpoints

### POST `/api/quiz/save`
Saves quiz results to database

**Request Body:**
```json
{
  "countryOfOrigin": "DE",
  "nationality": "DE",
  "immigrationReason": ["Work"],
  "ageRange": "26-40",
  "hasJobOffer": true,
  "languageSkills": { "de": "B2", "en": "C1" },
  "email": "user@example.com",
  "layer": "europeans",
  "completedAt": "2025-11-20T10:00:00Z"
}
```

## Database Schema

Quiz results are stored in `quiz_results` table:

```sql
CREATE TABLE public.quiz_results (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  quiz_type TEXT NOT NULL, -- 'initial_assessment'
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  answers JSONB NOT NULL, -- Contains all quiz data
  created_at TIMESTAMP WITH TIME ZONE
);
```

## Customization

### Adding New Layer Content

Edit `lib/layerContent.ts`:

```typescript
export const LAYER_CONTENT: Record<LayerType, LayerContent> = {
  europeans: {
    hero: {
      tagline: 'Your Custom Tagline',
      // ...
    },
    // ...
  },
  // ...
}
```

### Modifying Classification Logic

Edit `lib/layerLogic.ts`:

```typescript
export function classifyLayer(countryCode: string): LayerType {
  // Add custom logic
  if (countryCode === 'CUSTOM') {
    return 'europeans'
  }
  // ...
}
```

## Testing

### Test Quiz Flow

1. Clear localStorage: `localStorage.clear()`
2. Visit root page
3. Quiz should auto-open
4. Complete quiz
5. Should redirect to appropriate layer

### Test Layer Pages

1. Visit `/europeans`
2. Visit `/americans`
3. Visit `/others`
4. Verify content is layer-specific

## Deployment

See `DEPLOYMENT.md` for full deployment instructions.

### Quick Deploy (Vercel)

1. Push to GitHub
2. Import to Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Database connection strings
4. Deploy

## Future Enhancements

- [ ] Full jsPDF integration for PDF generation
- [ ] Layer-aware AI chatbot with RAG context
- [ ] Advanced analytics per layer
- [ ] A/B testing for layer content
- [ ] Multi-language support per layer
- [ ] Admin dashboard for editing layer content

## Support

For issues or questions, contact the development team or refer to the main README.md.

---

**Last Updated:** November 2025
**Version:** 1.0.0

