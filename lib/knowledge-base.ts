// Knowledge base for Swiss Immigration Pro - Site content and information
// This is used by the free AI chatbot to answer questions

export interface KnowledgeEntry {
  topic: string
  content: string
  links: {
    label: string
    url: string
  }[]
  keywords: string[]
}

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    topic: 'L Permit (Short-term Residence)',
    content: `The L Permit is for temporary residence up to 12 months. Key requirements:
- Job offer from Swiss employer required
- Quota-dependent: 4,000 total in 2025 (only ~1,200 remaining)
- Minimum salary: CHF 65,000+
- Processing time: 4-8 weeks
- Renewable if under 12 months total
- Must leave Switzerland when permit expires (unless converted to B permit)`,
    links: [
      { label: 'View Visa Types', url: '/visas' },
      { label: 'Pricing Plans', url: '/pricing' }
    ],
    keywords: ['l permit', 'short-term', 'temporary', '12 months', 'quota']
  },
  {
    topic: 'B Permit (Residence Permit)',
    content: `The B Permit is for long-term residence (1-5 years). Requirements:
- Job offer from Swiss employer
- Quota availability: 4,500 total in 2025 (~1,300 remaining)
- Typical salary: CHF 90,000+ (varies by canton)
- Processing time: 8-12 weeks
- Annual renewal required
- Can lead to C permit (permanent residence) after 5-10 years`,
    links: [
      { label: 'View Visa Types', url: '/visas' },
      { label: 'Citizenship Guide', url: '/citizenship' }
    ],
    keywords: ['b permit', 'residence', 'long-term', '1-5 years', 'annual renewal']
  },
  {
    topic: 'G Permit (Cross-border Commuter)',
    content: `The G Permit is for cross-border commuters who live abroad but work in Switzerland:
- Must live in EU/EFTA country (within 30km of border typically)
- Must return home at least once per week
- No quota restrictions
- Processing time: 4-6 weeks
- No minimum salary requirement
- Renewable`,
    links: [
      { label: 'View Visa Types', url: '/visas' }
    ],
    keywords: ['g permit', 'cross-border', 'commuter', 'border', 'unlimited']
  },
  {
    topic: 'C Permit (Settlement Permit)',
    content: `The C Permit is permanent residence after 5-10 years:
- For EU/EFTA: After 5 years continuous residence
- For non-EU: After 10 years continuous residence
- No quota restrictions
- No renewal needed (permanent)
- Can work for any employer
- Can change jobs freely
- Required before citizenship application`,
    links: [
      { label: 'View Visa Types', url: '/visas' },
      { label: 'Citizenship Guide', url: '/citizenship' }
    ],
    keywords: ['c permit', 'settlement', 'permanent', '5 years', '10 years']
  },
  {
    topic: 'Swiss Citizenship',
    content: `Swiss citizenship pathways:

1. ORDINARY NATURALIZATION (10 years):
   - 10 years residence in Switzerland
   - C Permit required
   - Language: B1/B2 level (speaking, writing)
   - Integration test required
   - Good character and conduct
   - No social assistance in last 3 years

2. SPOUSE OF SWISS CITIZEN (5 years):
   - 5 years residence
   - 3 years married to Swiss citizen
   - B1 language level
   - Integration test

3. 3RD GENERATION SIMPLIFIED:
   - Grandparent was Swiss citizen
   - Simplified process, no language test

Requirements:
- Language proficiency (German/French/Italian depending on canton)
- Integration test (civics, history, geography)
- Clean criminal record
- No debt to social insurance
- Show integration into Swiss society`,
    links: [
      { label: 'Citizenship Guide', url: '/citizenship' },
      { label: 'Pricing Plans', url: '/pricing' }
    ],
    keywords: ['citizenship', 'naturalization', 'swiss passport', '10 years', '5 years', 'spouse', 'integration test']
  },
  {
    topic: 'Quota Monitoring & Timing',
    content: `Switzerland allocates 8,500 non-EU work permits annually (4,000 L + 4,500 B). Releases occur quarterly and cantons can run out of allocations at different times.

Best practice:
- Prepare your dossier early (January–March submissions often see the fastest turnaround)
- Coordinate with your employer to confirm cantonal availability
- Monitor SEM bulletins and canton announcements for additional releases

Our team provides weekly intelligence on quota usage, processing times, and recommended filing windows.`,
    links: [
      { label: 'View Visa Types', url: '/visas' },
      { label: 'Request Advisory Call', url: '/pricing' }
    ],
    keywords: ['quota', 'timing', 'non-eu permits', 'allocation', 'cantonal strategy']
  },
  {
    topic: 'Salary Requirements',
    content: `Salary requirements vary by canton and sector:

Minimum recommendations:
- L Permit: CHF 65,000+ (minimum)
- B Permit: CHF 90,000+ (typical)
- Highly skilled workers: CHF 120,000+ (stronger application)

Canton variations:
- Zurich/Geneva: Higher salaries expected (CHF 100k+)
- Basel/Bern: CHF 90k+ typically sufficient
- Smaller cantons: May accept lower salaries

Important: Salary must be appropriate for the role and location. Too low = rejection.`,
    links: [
      { label: 'View Visa Types', url: '/visas' },
      { label: 'Employment Guide', url: '/employment' }
    ],
    keywords: ['salary', 'chf', 'minimum', 'wage', 'income', 'canton']
  },
  {
    topic: 'Application Process',
    content: `Swiss work permit application process (6 steps):

1. SECURE JOB OFFER (2-6 months)
   - Employer must prove no Swiss/EU candidate available
   - Labor market test required

2. SUBMIT DOCUMENTS (1-2 weeks prep)
   - Passport, certificates, employment contract
   - CV, diplomas, language certificates
   - All documents must be certified and translated

3. CANTONAL REVIEW (4-8 weeks)
   - Canton checks quota availability
   - Verifies salary adequacy
   - Assesses labor market impact

4. FEDERAL SEM APPROVAL (2-4 weeks)
   - SEM reviews for quota and national interest
   - Final approval decision

5. EMBASSY INTERVIEW (1-2 weeks)
   - Attend visa appointment at Swiss embassy/consulate
   - In your home country

6. RECEIVE PERMIT (1-3 days)
   - Collect visa sticker
   - Enter Switzerland
   - Register with local municipality

Total time: 8-12 weeks typical`,
    links: [
      { label: 'View Visa Types', url: '/visas' },
      { label: 'Tools & Resources', url: '/tools' }
    ],
    keywords: ['application', 'process', 'steps', 'documents', 'embassy', 'cantonal', 'sem']
  },
  {
    topic: 'Language Requirements',
    content: `Language requirements for Swiss immigration:

For Work Permits (L/B):
- No formal language requirement for permit
- But employers often require German/French/Italian
- English may be sufficient for international companies

For Citizenship:
- B1/B2 level required (varies by canton)
- Must pass language test
- German, French, Italian, or Romansh accepted
- Must demonstrate speaking and writing ability

For Integration:
- A2 level recommended for daily life
- B1 recommended for professional work
- Language courses available throughout Switzerland

Cantons have different language requirements - check your specific canton.`,
    links: [
      { label: 'Citizenship Guide', url: '/citizenship' },
      { label: 'Resources', url: '/resources' }
    ],
    keywords: ['language', 'german', 'french', 'italian', 'b1', 'b2', 'a2', 'test']
  },
  {
    topic: 'Common Rejection Reasons',
    content: `Most common reasons for permit rejection:

1. INSUFFICIENT SALARY (60% of rejections)
   - Solution: Research canton-specific thresholds, aim for CHF 100k+ for non-EU

2. INCOMPLETE DOCUMENTATION (30% of delays)
   - Solution: Use comprehensive checklists, certify all documents

3. WRONG CANTON CHOICE
   - Solution: Choose cantons with better approval rates (Basel > Geneva for non-EU)

4. WEAK EMPLOYER JUSTIFICATION
   - Solution: Employer must prove exhaustive search for Swiss/EU candidates with evidence

5. QUOTA EXHAUSTION
   - Solution: Apply early in the year, or wait for next year's quota

6. CRIMINAL RECORD
   - Solution: Clean record required, any convictions may disqualify

Success tips: Higher salary, complete docs, right canton, strong employer support.`,
    links: [
      { label: 'View Visa Types', url: '/visas' },
      { label: 'Get Help', url: '/contact' }
    ],
    keywords: ['rejection', 'denied', 'refused', 'common mistakes', 'why failed', 'reasons']
  },
  {
    topic: 'Cost of Living',
    content: `Switzerland cost of living (approximate monthly):

Housing:
- 1-bedroom apartment: CHF 1,200-2,500 (varies by city)
- 2-bedroom: CHF 1,800-3,500
- Zurich/Geneva: Most expensive
- Smaller cities: More affordable

Food & Groceries: CHF 400-600/month
Health Insurance: CHF 300-500/month (mandatory)
Transport: CHF 70-350/month (public transport)
Utilities: CHF 100-200/month

Total for single person: CHF 2,500-4,000/month minimum
Total for family: CHF 4,000-7,000/month

Important: You must prove sufficient funds to support yourself.`,
    links: [
      { label: 'Employment Guide', url: '/employment' },
      { label: 'Resources', url: '/resources' }
    ],
    keywords: ['cost', 'living', 'expenses', 'housing', 'rent', 'salary', 'money']
  },
  {
    topic: 'Family Reunification',
    content: `Family reunification for Swiss permit holders:

Eligible family members:
- Spouse/registered partner
- Children under 18 (or up to 25 if in education)
- Dependent parents (in special cases)

Requirements:
- Must have sufficient income
- Adequate housing
- Health insurance for all family members
- Integration commitment

Processing: Usually 2-4 months
No quota restrictions for family reunification

Spouse can work immediately with B permit holder's authorization.`,
    links: [
      { label: 'View Visa Types', url: '/visas' },
      { label: 'Resources', url: '/resources' }
    ],
    keywords: ['family', 'spouse', 'children', 'reunification', 'dependent', 'wife', 'husband']
  }
]

// Find relevant knowledge entries based on query
export function findRelevantKnowledge(query: string): KnowledgeEntry[] {
  const lowerQuery = query.toLowerCase()
  
  // Score each entry based on keyword matches
  const scored = KNOWLEDGE_BASE.map(entry => {
    let score = 0
    
    // Check if query contains keywords
    entry.keywords.forEach(keyword => {
      if (lowerQuery.includes(keyword)) {
        score += 2
      }
    })
    
    // Check if query contains topic words
    const topicWords = entry.topic.toLowerCase().split(' ')
    topicWords.forEach(word => {
      if (word.length > 3 && lowerQuery.includes(word)) {
        score += 1
      }
    })
    
    return { entry, score }
  })
  
  // Sort by score and return top matches
  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.entry)
}

// Generate response from knowledge base
export function generateResponseFromKnowledge(query: string): string | null {
  const relevant = findRelevantKnowledge(query)
  
  if (relevant.length === 0) {
    return null // No relevant knowledge found
  }
  
  let response = relevant[0].content
  
  // Add links
  if (relevant[0].links.length > 0) {
    response += '\n\n📚 **Learn more:**\n'
    relevant[0].links.forEach(link => {
      response += `- [${link.label}](${link.url})\n`
    })
  }
  
  // Add disclaimer
  response += '\n\n⚠️ General information only (updated Nov 2025). Not legal advice. Book consultation with a certified Swiss immigration lawyer for your specific case.'
  
  return response
}

