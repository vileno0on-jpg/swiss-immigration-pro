# Translation Accuracy Improvements for French

## Current Status
The site uses Google Translate Widget for automatic translation. While convenient, machine translation may have accuracy issues, especially for:
- Legal/technical terminology
- Swiss-specific immigration terms
- Cantonal variations
- Formal language requirements

## Improvements Made

### 1. Technical Term Protection
Added CSS classes to mark terms that should not be translated:
- `.swiss-term` - Swiss-specific terms
- `.swiss-legal-term` - Legal terminology (AuG, VZAE, etc.)
- `.chf-amount` - Currency amounts
- `.permit-code` - Permit types (L, B, G, C)
- `.canton-code` - Canton abbreviations (ZH, GE, VD, etc.)

### 2. Notranslate Implementation
The following are already marked to prevent translation:
- Code blocks (`<code>`, `<pre>`)
- Email inputs, password fields
- Elements with `class="notranslate"` or `translate="no"`

## Recommendations for Better French Accuracy

### Option 1: Manual Translations (Best Quality)
For critical pages, consider:
1. Creating separate French content files
2. Using i18n library (next-intl is already installed)
3. Professional translation for key pages (pricing, visa types, citizenship)

### Option 2: Google Cloud Translation API (Better Accuracy)
Upgrade from free widget to paid API:
- Better translation quality
- Custom glossaries for Swiss immigration terms
- Domain-specific models
- Estimated cost: $20/1M characters

### Option 3: Hybrid Approach (Recommended)
1. **Machine translate** for dynamic content
2. **Manual translations** for:
   - Navigation menus
   - Key landing pages
   - Legal disclaimers
   - Form labels
3. **Protect technical terms** using notranslate classes

## Critical Terms to Protect (French Context)

### Permit Types (Should not translate)
- L permit → "Permis L" (keep as-is)
- B permit → "Permis B"
- G permit → "Permis G"
- C permit → "Permis C"

### Swiss Legal Terms
- AuG → Keep "AuG" (Loi fédérale sur les étrangers)
- VZAE → Keep "VZAE"
- SEM → Keep "SEM" (Secrétariat d'État aux migrations)
- OLN → Keep "OLN"

### Cantons (Should not translate names)
- Zurich → "Zurich" (not "Zurich" in French)
- Geneva → "Genève"
- Vaud → "Vaud"
- Basel → "Bâle"

### Currency
- CHF → Keep "CHF" (not translated)

## Implementation Checklist

- [x] Added notranslate classes to CSS
- [x] Enhanced CSS with Google Translate-specific protection rules
- [x] Created Swiss terms protection utility (`lib/swiss-terms.ts`)
- [x] Marked critical terms in main content files with `notranslate` class
- [x] Protected legal terms (AuG, VZAE, StAG, KVG, SEM, OLN, FMPA, SECO)
- [x] Protected permit codes (L, B, G, C)
- [x] Protected canton names and codes
- [x] Protected currency amounts (CHF)
- [x] Protected regional terms (EU, EFTA, EU/EFTA, Non-EU)
- [ ] Test French translations for key pages
- [ ] Add disclaimer about machine translation (already in LanguageSwitcher)
- [ ] Consider manual translations for pricing page
- [ ] Consider manual translations for visa types page
- [ ] Update enhanced modules with translation protection
- [ ] Update homepage with protected terms

## French Translation Disclaimer

Add to footer or language switcher:
"Les traductions sont générées automatiquement et peuvent contenir des erreurs. Pour des conseils juridiques précis, consultez un expert."

## Testing French Translations

Key pages to verify:
1. `/pricing` - Pricing information
2. `/visas` - Visa types and requirements
3. `/citizenship` - Citizenship process
4. `/employment` - Work permit information
5. `/cantons` - Cantonal variations

Critical terms to verify in French:
- "Work permit" → "Permis de travail"
- "Residence permit" → "Permis de séjour"
- "Citizenship" → "Naturalisation" (not "Citoyenneté" which is informal)
- "Non-EU quota" → "Contingent non-UE"
- "Cantonal authority" → "Autorité cantonale"


