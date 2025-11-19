module.exports = [
"[project]/Downloads/New folder/lib/layerContent.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Layer-specific content configuration
// Each layer has customized content while sharing the base design
__turbopack_context__.s([
    "LAYER_CONTENT",
    ()=>LAYER_CONTENT
]);
const LAYER_CONTENT = {
    europeans: {
        hero: {
            tagline: 'Your Swiss Dream Starts Here - We Make It Simple',
            description: 'As an EU/EFTA citizen, moving to Switzerland is easier than you think! No quotas, fast processing (2-4 weeks), and a clear 5-year path to citizenship. With our expert guidance, proven strategies, and step-by-step support, you can navigate the process confidently. Thousands have succeeded before you - let us guide you every step of the way. Your Swiss future is just one decision away.',
            cta: 'Start Your Simple Journey Today',
            stats: [
                {
                    label: 'Processing Time',
                    value: '2-4 Weeks',
                    description: 'Fast-track for EU/EFTA citizens - we help you prepare perfectly'
                },
                {
                    label: 'Quota Restrictions',
                    value: 'None',
                    description: 'Freedom of movement benefits - apply anytime, anywhere'
                },
                {
                    label: 'Citizenship Timeline',
                    value: '5 Years',
                    description: 'vs. 10 years for non-EU - we help you track your progress'
                },
                {
                    label: 'Success Rate',
                    value: '95%+',
                    description: 'For qualified applicants - and we help you qualify'
                }
            ]
        },
        visas: {
            title: 'EU/EFTA Visa Options',
            description: 'As an EU/EFTA citizen, you have simplified access to Swiss residency permits under the Agreement on the Free Movement of Persons (FMPA). Official sources: SEM, AuG (SR 142.20), VZAE (SR 142.201).',
            types: [
                {
                    name: 'B Permit (Residence)',
                    description: 'Full residence permit for EU/EFTA citizens with job offer or self-employment. Governed by the Agreement on the Free Movement of Persons (FMPA) and the Foreign Nationals Act (AuG, SR 142.20). Legal basis: AuG Art. 25, VZAE Art. 15. Official source: [SEM Guidelines](https://www.sem.admin.ch/sem/en/home/themen/arbeit/eu_efta-angehoerige.html)',
                    timeline: '2-4 weeks',
                    requirements: [
                        'Valid employment contract or proof of self-employment (FMPA Art. 7, AuG Art. 25)',
                        'Health insurance coverage (mandatory per AuG Art. 27 para. 1)',
                        'Proof of financial means (if self-employed, VZAE Art. 15 para. 2)',
                        'Registration with commune within 14 days of arrival (AuG Art. 27 para. 2)',
                        'No criminal record (may be checked per AuG Art. 28)'
                    ],
                    applicable: true
                },
                {
                    name: 'L Permit (Short-term)',
                    description: 'Temporary permit for EU/EFTA citizens for employment up to 12 months. Renewable under FMPA provisions. Legal basis: AuG Art. 24, VZAE Art. 10. Official source: [SEM - Short-term Permits](https://www.sem.admin.ch/sem/en/home/themen/arbeit/eu_efta-angehoerige.html)',
                    timeline: '1-3 weeks',
                    requirements: [
                        'Employment contract (minimum 3 months, VZAE Art. 10 para. 1)',
                        'Health insurance coverage (AuG Art. 27 para. 1)',
                        'Proof of accommodation (VZAE Art. 10 para. 2)',
                        'Registration with commune within 14 days (AuG Art. 27 para. 2)'
                    ],
                    applicable: true
                },
                {
                    name: 'G Permit (Cross-border)',
                    description: 'For border residents working in Switzerland but maintaining residence in EU/EFTA country. Regulated by FMPA and AuG Art. 25. Legal basis: AuG Art. 25, VZAE Art. 20. Official source: [SEM - Cross-border Workers](https://www.sem.admin.ch/sem/en/home/themen/arbeit/grenzgaenger.html)',
                    timeline: '1-2 weeks',
                    requirements: [
                        'Residence in border region (DE/FR/IT/AT/LI) within commuting distance (VZAE Art. 20 para. 1)',
                        'Employment contract in Switzerland (AuG Art. 25)',
                        'Ability to return to residence at least once per week (VZAE Art. 20 para. 2)',
                        'Health insurance (Swiss or EU coverage, AuG Art. 27 para. 1)'
                    ],
                    applicable: true
                },
                {
                    name: 'EU Blue Card',
                    description: 'Optional for highly qualified EU professionals. Not commonly used in Switzerland as standard B permit is simpler under FMPA. Regulated by EU Blue Card Directive. Official source: [SEM - Highly Qualified Workers](https://www.sem.admin.ch/sem/en/home/themen/arbeit.html)',
                    timeline: '3-5 weeks',
                    requirements: [
                        'University degree or equivalent (5+ years professional experience per EU Directive)',
                        'Salary meeting threshold (varies by canton, typically CHF 97,000+, VZAE Art. 21)',
                        'Qualified employment matching qualifications (EU Blue Card Directive Art. 5)'
                    ],
                    applicable: true
                }
            ]
        },
        process: {
            title: 'Your EU/EFTA Immigration Process',
            description: 'Simplified 5-step process for EU/EFTA citizens',
            steps: [
                {
                    step: 1,
                    title: 'Secure Job Offer or Start Self-Employment',
                    description: 'Find employment or establish self-employment in Switzerland. Under FMPA, EU/EFTA citizens can search for work for up to 3 months without a permit.',
                    timeline: 'Variable'
                },
                {
                    step: 2,
                    title: 'Register with Commune (Gemeinde)',
                    description: 'Register your residence within 14 days of arrival (AuG Art. 27). Bring: passport, employment contract, and proof of accommodation.',
                    timeline: '1 day'
                },
                {
                    step: 3,
                    title: 'Apply for Permit via Commune',
                    description: 'The commune forwards your application to the cantonal migration office. For EU/EFTA citizens, processing is simplified under FMPA.',
                    timeline: '1 week'
                },
                {
                    step: 4,
                    title: 'Receive Permit',
                    description: 'Get your B or L permit. Processing typically 2-4 weeks for EU/EFTA citizens (vs. 8-12 weeks for non-EU).',
                    timeline: '2-4 weeks'
                },
                {
                    step: 5,
                    title: 'Path to Citizenship',
                    description: 'After 5 years of continuous residence with B permit, you can apply for naturalization (vs. 10 years for non-EU). Legal basis: Citizenship Act (StAG, SR 141.0) Art. 15 para. 1. Official source: [SEM - Naturalization](https://www.sem.admin.ch/sem/en/home/themen/buergerrecht.html)',
                    timeline: '5 years'
                }
            ]
        },
        tools: {
            title: 'EU/EFTA Specific Tools',
            description: 'Specialized resources for EU/EFTA citizens',
            items: [
                {
                    name: 'Permit Eligibility Calculator',
                    description: 'Calculate your chances of getting a Swiss work permit',
                    icon: 'calculator',
                    link: '/tools/permit-calculator'
                },
                {
                    name: 'Timeline Planner',
                    description: 'Plan your immigration journey with personalized milestones',
                    icon: 'calendar',
                    link: '/tools/timeline-planner'
                },
                {
                    name: 'G Permit Calculator',
                    description: 'Calculate if cross-border commuting is beneficial for you',
                    icon: 'calculator'
                },
                {
                    name: 'EU Blue Card Eligibility',
                    description: 'Check if EU Blue Card offers advantages over standard B permit',
                    icon: 'card'
                },
                {
                    name: 'Family Reunification Guide',
                    description: 'Simplified process for bringing family members to Switzerland',
                    icon: 'family'
                },
                {
                    name: '5-Year Citizenship Planner',
                    description: 'Track your progress toward Swiss citizenship eligibility',
                    icon: 'calendar'
                }
            ]
        },
        resources: {
            title: 'EU/EFTA Resources',
            description: 'Curated content for European citizens with official legal references',
            posts: [
                {
                    title: 'G Permit: Best Option for Border Residents',
                    excerpt: 'Why living in your home country and working in Switzerland might be the smartest choice. Legal basis: FMPA and AuG Art. 25.',
                    category: 'Permits',
                    content: `# G Permit: The Smart Choice for Border Residents

## Why Choose a G Permit?

The G permit (Grenzgänger permit) allows you to live in your EU/EFTA home country while working in Switzerland. This arrangement offers several advantages:

### Key Benefits:
- **Tax Advantages**: Pay taxes only in your home country (usually lower rates)
- **Housing Costs**: Live in more affordable EU housing
- **Family Life**: Maintain your current lifestyle and social connections
- **No Integration Requirements**: Less stringent language requirements

## Eligibility Requirements

To qualify for a G permit, you must:
- Live in an EU/EFTA country within reasonable commuting distance (typically 30-60km)
- Work in Switzerland
- Return to your residence at least once per week
- Have a valid employment contract

## Application Process

1. **Find Employment**: Secure a job offer from a Swiss employer
2. **Register**: Apply through the cantonal migration office in your work canton
3. **Documentation**: Submit passport, employment contract, and proof of residence
4. **Processing**: Usually 1-2 weeks under FMPA provisions

## Legal References
- **FMPA Agreement**: Regulates cross-border worker rights
- **AuG Art. 25**: Permits for cross-border workers
- **VZAE Art. 20**: Specific requirements for G permits

**Official Source**: [SEM - Cross-border Workers](https://www.sem.admin.ch/sem/en/home/themen/arbeit/grenzgaenger.html)`
                },
                {
                    title: 'EU Blue Card vs. B Permit: Which is Better?',
                    excerpt: 'Compare the two options for highly qualified EU professionals. Most EU citizens choose B permit as it\'s simpler.',
                    category: 'Comparison',
                    content: `# EU Blue Card vs. B Permit: Making the Right Choice

## The EU Blue Card in Switzerland

The EU Blue Card is an optional permit for highly qualified non-EU workers, but EU/EFTA citizens rarely use it since standard permits are simpler.

### When EU Blue Card Might Make Sense:
- **International Mobility**: If you plan to work in multiple EU countries
- **Very High Salary**: CHF 120,000+ annual salary
- **Specific Qualifications**: University degree + 5+ years experience

## Why Most EU Citizens Choose B Permit

### B Permit Advantages:
- **Simpler Process**: No additional requirements beyond standard B permit
- **Faster Processing**: Same 2-4 week timeline as other EU permits
- **No Salary Minimum**: More flexible salary requirements
- **Family Benefits**: Easier family reunification

## Comparison Table

| Aspect | EU Blue Card | Standard B Permit |
|--------|-------------|------------------|
| Processing Time | 3-5 weeks | 2-4 weeks |
| Salary Threshold | CHF 97,000+ | No minimum (market rate) |
| Documentation | More complex | Standard EU process |
| Mobility | EU-wide | Switzerland-focused |
| Family Rights | EU-wide | Swiss residence rights |

## Recommendation

**For most EU/EFTA citizens**: Choose the standard B permit. It's simpler, faster, and provides the same long-term benefits.

**Official Sources**:
- [SEM - Highly Qualified Workers](https://www.sem.admin.ch/sem/en/home/themen/arbeit.html)
- EU Blue Card Directive (implemented in Swiss law via VZAE Art. 21)`
                },
                {
                    title: '5-Year Citizenship: What You Need to Know',
                    excerpt: 'Complete guide to fast-track naturalization for EU/EFTA citizens. Legal basis: Citizenship Act (StAG, SR 141.0).',
                    category: 'Citizenship',
                    content: `# Fast-Track Citizenship: 5 Years for EU/EFTA Citizens

## Your Citizenship Timeline

As an EU/EFTA citizen, you qualify for naturalization after **5 years** of continuous residence in Switzerland, compared to 10 years for non-EU citizens.

## Key Requirements

### Residence Requirements:
- **5 years continuous residence** in Switzerland (StAG Art. 9)
- **1 year** in the canton where you apply (StAG Art. 10)
- **3 months** in the commune where you apply (StAG Art. 11)

### Integration Requirements:
- **Language Proficiency**: A2 level in local language (German/French/Italian/Romansh)
- **Knowledge of Switzerland**: Pass citizenship test on Swiss history, geography, and institutions
- **Social Integration**: Demonstrate good integration (employment, no criminal record)

### Additional Requirements:
- **Clean Criminal Record**: No serious criminal convictions
- **Financial Independence**: No reliance on social assistance
- **Employment**: Stable employment or self-employment

## Application Process

1. **Prepare Documents**: Gather residence permits, language certificates, employment proof
2. **Take Integration Course**: Complete required integration course
3. **Apply at Commune**: Submit application to your local commune
4. **Canton Review**: Cantonal authorities review your application
5. **Federal Approval**: Swiss Citizenship Office makes final decision
6. **Ceremony**: Attend citizenship ceremony

## Timeline and Costs

- **Processing Time**: 12-18 months
- **Application Fee**: CHF 200-500 (varies by canton)
- **Language Test**: CHF 100-200
- **Integration Course**: CHF 200-400

## Benefits of Swiss Citizenship

- **Full Political Rights**: Vote in federal, cantonal, and communal elections
- **EU Citizenship**: Automatic EU citizenship with full rights
- **No Permit Renewals**: Permanent residence rights
- **Family Benefits**: Easier to bring extended family

**Official Source**: [SEM - Naturalization](https://www.sem.admin.ch/sem/en/home/themen/buergerrecht.html)
**Legal Basis**: Citizenship Act (StAG, SR 141.0)`
                },
                {
                    title: 'Family Reunification Made Easy',
                    excerpt: 'How to bring your spouse and children to Switzerland as an EU citizen under FMPA family reunification provisions.',
                    category: 'Family',
                    content: `# Family Reunification for EU/EFTA Citizens

## Your FMPA Family Rights

As an EU/EFTA citizen with a Swiss residence permit, your spouse and children have the **right to join you** in Switzerland under the Free Movement Agreement.

## Who Qualifies for Family Reunification?

### Immediate Family:
- **Spouse/Registered Partner**: Automatic right to join you
- **Minor Children**: Under 18 years old
- **Dependent Children**: Over 18 but financially dependent

### Extended Family:
- **Parents**: Can join if you provide care (case-by-case)
- **Adult Children**: Generally must be self-sufficient

## Application Process

### For Spouse:
1. **Secure Housing**: Proof of adequate accommodation
2. **Health Insurance**: Coverage for the whole family
3. **Employment**: Spouse can work immediately (no permit needed)
4. **Register**: Apply through cantonal migration office

### For Children:
1. **Birth Certificate**: Official documents
2. **School Enrollment**: For school-age children
3. **Medical Check**: Health certificate if required
4. **Custody Documents**: If applicable

## Timeline and Rights

- **Processing Time**: 2-4 weeks for EU/EFTA families
- **Work Rights**: Spouse can work immediately
- **Residence Rights**: Full residence rights from day one
- **Social Benefits**: Access to Swiss social services

## Key Advantages for EU Families

- **No Quotas**: Family reunification not subject to quotas
- **Fast Processing**: Simplified procedure under FMPA
- **Full Rights**: Same rights as you from arrival
- **Path to Citizenship**: Family members follow your citizenship timeline

## Legal References

- **FMPA Art. 3**: Family reunification rights
- **AuG Art. 42-44**: Family permits for foreigners
- **VZAE Art. 39-42**: Implementation of family reunification

**Official Source**: [SEM - Family Reunification](https://www.sem.admin.ch/sem/en/home/themen/familie.html)`
                },
                {
                    title: 'Official Legal References',
                    excerpt: 'Key laws: Foreign Nationals Act (AuG, SR 142.20), FMPA Agreement, VZAE Ordinance (SR 142.201). Access via Fedlex.admin.ch',
                    category: 'Legal',
                    content: `# Essential Legal Framework for EU/EFTA Citizens

## Primary Legislation

### 1. Agreement on the Free Movement of Persons (FMPA)
- **SR Number**: 0.142.112.681
- **Purpose**: Regulates movement and employment of EU/EFTA citizens
- **Key Articles**:
  - Art. 1-2: Personal scope and definitions
  - Art. 7: Employment rights
  - Art. 3: Family reunification
  - Art. 9: Social security coordination

### 2. Foreign Nationals Act (AuG)
- **SR Number**: 142.20
- **Purpose**: Main law governing foreign nationals in Switzerland
- **Key Articles for EU Citizens**:
  - Art. 2: Scope (excludes EU/EFTA from certain restrictions)
  - Art. 24-25: L and B permits for EU citizens
  - Art. 27: Registration requirements
  - Art. 42-44: Family reunification

### 3. Foreign Nationals and Integration Ordinance (VZAE)
- **SR Number**: 142.201
- **Purpose**: Implementation of AuG provisions
- **Key Articles**:
  - Art. 10: L permits for EU citizens
  - Art. 15: B permits for EU citizens
  - Art. 20: G permits for cross-border workers
  - Art. 39-42: Family reunification procedures

## Citizenship Law

### Citizenship Act (StAG)
- **SR Number**: 141.0
- **Key Provisions for EU Citizens**:
  - Art. 9: 5-year residence requirement (vs. 10 for non-EU)
  - Art. 10-11: Canton and commune requirements

## Where to Find Official Texts

### Primary Sources:
- **Fedlex**: [fedlex.admin.ch](https://www.fedlex.admin.ch) - Complete legal database
- **SEM Website**: [sem.admin.ch](https://www.sem.admin.ch) - Migration authority guidance
- **CH.ch Portal**: [ch.ch](https://www.ch.ch) - Official government portal

### Search Tips:
- Use SR numbers for exact laws (e.g., "142.20" for AuG)
- Search in German/French/Italian (official languages)
- Check "Stand am" dates for current versions

## Important Notes

- **Language**: Official texts are in German/French/Italian
- **Updates**: Laws are updated regularly - always check current versions
- **Interpretation**: SEM guidelines provide official interpretation
- **Changes**: Monitor SEM announcements for policy changes

**Disclaimer**: This is general information. Consult official sources and professional legal advice for your specific situation.`
                }
            ]
        }
    },
    americans: {
        hero: {
            tagline: 'Your Swiss Success Story Starts Here - We Know the Way',
            description: 'Yes, the quota system is competitive, but thousands of Americans succeed every year! With our proven strategies, expert guidance, insider knowledge, and personalized support, we help you navigate the system confidently. We\'ve helped hundreds of US professionals get their permits - your Swiss dream is absolutely achievable. Trust us to show you exactly how to succeed. Let\'s make it happen together!',
            cta: 'Let Us Guide You to Success',
            stats: [
                {
                    label: 'Processing Time',
                    value: '8-12 Weeks',
                    description: 'Standard for non-EU - we help you prepare everything right'
                },
                {
                    label: '2025 Quotas Left',
                    value: '2,500/8,500',
                    description: 'Still available - we help you apply strategically'
                },
                {
                    label: 'Salary Threshold',
                    value: 'CHF 100k+',
                    description: 'Recommended for success - we help you negotiate'
                },
                {
                    label: 'Success Rate',
                    value: '30-45%',
                    description: 'With proper preparation - and we provide that preparation'
                }
            ]
        },
        visas: {
            title: 'US/Canada Visa Options',
            description: 'Non-EU work permits tailored for American professionals',
            types: [
                {
                    name: 'L Permit (Short-term)',
                    description: 'Temporary permit up to 12 months, renewable once. Subject to annual quotas (2025: 4,000 L permits for non-EU). Regulated by AuG Art. 24 and VZAE Art. 23. Legal basis: AuG Art. 24, VZAE Art. 23. Official source: [SEM - Non-EU Work Permits](https://www.sem.admin.ch/sem/en/home/themen/arbeit/nicht-eu_efta-angehoerige.html)',
                    timeline: '8-12 weeks',
                    requirements: [
                        'Job offer from Swiss employer (must prove no suitable Swiss/EU candidate available per VZAE Art. 21 para. 1)',
                        'Salary meeting cantonal thresholds (typically CHF 70k-100k+ depending on canton, VZAE Art. 21 para. 3)',
                        'Educational certificates (apostilled and translated if needed, AuG Art. 30)',
                        'Health insurance coverage (mandatory per AuG Art. 27 para. 1)',
                        'Quota availability (critical - check SEM website for current status, AuG Art. 21)',
                        'Employer must post vacancy locally first (VZAE Art. 21 para. 1)'
                    ],
                    applicable: true
                },
                {
                    name: 'B Permit (Residence)',
                    description: 'Annual renewable residence permit for qualified professionals. Subject to annual quotas (2025: 4,500 B permits for non-EU). Regulated by AuG Art. 25. Legal basis: AuG Art. 25, VZAE Art. 15. Official source: [SEM - Residence Permits](https://www.sem.admin.ch/sem/en/home/themen/arbeit/nicht-eu_efta-angehoerige.html)',
                    timeline: '8-12 weeks',
                    requirements: [
                        'L permit holder (preferred) or direct application for exceptional cases (VZAE Art. 15)',
                        'Salary CHF 100k-120k+ (competitive for quota approval, VZAE Art. 21 para. 3)',
                        'Qualified profession with recognized education (AuG Art. 30, VZAE Art. 21 para. 2)',
                        'Quota availability (check SEM quota status, AuG Art. 21)',
                        'Employer sponsorship and justification (VZAE Art. 21 para. 1)',
                        'Integration efforts (language skills recommended, AuG Art. 54 para. 1)'
                    ],
                    applicable: true
                },
                {
                    name: 'Investment Visa',
                    description: 'For entrepreneurs investing CHF 100k+ and creating jobs',
                    timeline: '12-16 weeks',
                    requirements: [
                        'Business plan approval',
                        'CHF 100k+ investment',
                        'Job creation for locals',
                        'Economic contribution proof'
                    ],
                    applicable: true
                },
                {
                    name: 'Student Visa',
                    description: 'Study in Switzerland, then convert to work permit',
                    timeline: '4-8 weeks',
                    requirements: [
                        'University admission',
                        'Proof of financial means',
                        'Health insurance',
                        'No quota needed'
                    ],
                    applicable: true
                }
            ]
        },
        process: {
            title: 'Your US/Canada Immigration Process',
            description: '7-step process for American professionals',
            steps: [
                {
                    step: 1,
                    title: 'Secure Job Offer',
                    description: 'Find employer willing to sponsor and navigate quota system',
                    timeline: 'Variable'
                },
                {
                    step: 2,
                    title: 'Prepare Documentation',
                    description: 'Apostille educational certificates, get references, Swiss-style CV',
                    timeline: '4-6 weeks'
                },
                {
                    step: 3,
                    title: 'Employer Files Application',
                    description: 'Employer submits permit application to cantonal authority',
                    timeline: '1 week'
                },
                {
                    step: 4,
                    title: 'Quota Check',
                    description: 'Canton verifies quota availability',
                    timeline: '2-4 weeks'
                },
                {
                    step: 5,
                    title: 'Decision',
                    description: 'Cantonal approval or rejection',
                    timeline: '8-12 weeks total'
                },
                {
                    step: 6,
                    title: 'Receive Permit',
                    description: 'Get L or B permit and move to Switzerland',
                    timeline: '1-2 weeks after approval'
                },
                {
                    step: 7,
                    title: 'Path to Citizenship',
                    description: 'After 10 years of residence, apply for naturalization',
                    timeline: '10 years'
                }
            ]
        },
        tools: {
            title: 'US/Canada Specific Tools',
            description: 'Specialized resources for American professionals',
            items: [
                {
                    name: 'H-1B to Swiss Permit Comparison',
                    description: 'Compare US work visa system with Swiss permits',
                    icon: 'compare'
                },
                {
                    name: 'Salary Benchmark Calculator',
                    description: 'Calculate competitive salary for your role and canton',
                    icon: 'calculator'
                },
                {
                    name: 'Quota Tracker',
                    description: 'Real-time tracking of available permits by canton',
                    icon: 'chart'
                },
                {
                    name: 'Document Apostille Guide',
                    description: 'Step-by-step guide to legalizing US/Canadian documents',
                    icon: 'file'
                }
            ]
        },
        resources: {
            title: 'US/Canada Resources',
            description: 'Curated content for American professionals',
            posts: [
                {
                    title: 'H-1B vs. Swiss L Permit: Complete Comparison',
                    excerpt: 'Understanding the differences between US and Swiss work visa systems',
                    category: 'Comparison'
                },
                {
                    title: 'Quota Strategy for US Professionals',
                    excerpt: 'How to maximize your chances in the competitive quota system',
                    category: 'Strategy'
                },
                {
                    title: 'Salary Negotiation for Swiss Jobs',
                    excerpt: 'How to negotiate competitive salaries that meet cantonal thresholds',
                    category: 'Career'
                },
                {
                    title: 'Moving from NYC to Zurich: Cost Comparison',
                    excerpt: 'Financial planning for American professionals relocating to Switzerland',
                    category: 'Finance'
                },
                {
                    title: '10-Year Citizenship Path for Americans',
                    excerpt: 'Complete guide to naturalization for US/Canadian citizens',
                    category: 'Citizenship'
                }
            ]
        }
    },
    others: {
        hero: {
            tagline: 'Your Swiss Dream is Possible - We Make It Happen',
            description: 'The quota system is competitive, but we specialize in helping third-country nationals succeed! With our strategic approach, insider knowledge, proven methods, and dedicated support, we help you stand out from the competition. Thousands have succeeded before you - from India, China, Brazil, and 120+ other countries. With the right guidance, preparation, and strategy, you absolutely can too. Trust us to be your partner every step of the way. Your Swiss future starts here!',
            cta: 'Start Your Strategic Journey',
            stats: [
                {
                    label: 'Processing Time',
                    value: '8-16 Weeks',
                    description: 'Varies by country - we help you prepare perfectly'
                },
                {
                    label: '2025 Quotas Left',
                    value: '2,500/8,500',
                    description: 'Still available - we help you apply strategically'
                },
                {
                    label: 'Success Rate',
                    value: '15-30%',
                    description: 'With strategic approach - and we provide that strategy'
                },
                {
                    label: 'Embassy Processing',
                    value: 'Varies',
                    description: 'Country-specific - we guide you through it'
                }
            ]
        },
        visas: {
            title: 'Third-Country Visa Options',
            description: 'Comprehensive visa pathways for non-EU/non-American nationals',
            types: [
                {
                    name: 'L Permit (Short-term)',
                    description: 'Temporary permit up to 12 months, subject to strict quotas',
                    timeline: '8-16 weeks',
                    requirements: [
                        'Job offer from Swiss employer',
                        'Salary meeting high thresholds (CHF 100k+)',
                        'Educational certificates (apostilled)',
                        'Quota availability (critical)',
                        'Strong employer justification'
                    ],
                    applicable: true
                },
                {
                    name: 'B Permit (Residence)',
                    description: 'Annual renewable permit, highly competitive quota',
                    timeline: '8-16 weeks',
                    requirements: [
                        'L permit holder or exceptional profile',
                        'Salary CHF 100k-120k+',
                        'Unique skills or expertise',
                        'Quota availability',
                        'Perfect documentation'
                    ],
                    applicable: true
                },
                {
                    name: 'Student Visa',
                    description: 'Study in Switzerland, then convert (quota-free entry)',
                    timeline: '4-8 weeks',
                    requirements: [
                        'University admission',
                        'Proof of financial means',
                        'Health insurance',
                        'No quota needed'
                    ],
                    applicable: true
                },
                {
                    name: 'Family Reunification',
                    description: 'Join spouse or family member with Swiss permit',
                    timeline: '12-16 weeks',
                    requirements: [
                        'Family member with valid permit',
                        'Proof of relationship',
                        'Financial means',
                        'Health insurance'
                    ],
                    applicable: true
                }
            ]
        },
        process: {
            title: 'Your Third-Country Immigration Process',
            description: 'Comprehensive 8-step process with strategic considerations',
            steps: [
                {
                    step: 1,
                    title: 'Research & Strategy',
                    description: 'Identify best canton, timing, and approach for your profile',
                    timeline: '2-4 weeks'
                },
                {
                    step: 2,
                    title: 'Secure Job Offer',
                    description: 'Find employer willing to sponsor and navigate competitive quota',
                    timeline: 'Variable'
                },
                {
                    step: 3,
                    title: 'Prepare Perfect Documentation',
                    description: 'Apostille all certificates, get references, Swiss-style CV',
                    timeline: '4-8 weeks'
                },
                {
                    step: 4,
                    title: 'Employer Files Application',
                    description: 'Employer submits with strong justification to cantonal authority',
                    timeline: '1-2 weeks'
                },
                {
                    step: 5,
                    title: 'Quota Verification',
                    description: 'Critical: Canton checks quota availability',
                    timeline: '2-4 weeks'
                },
                {
                    step: 6,
                    title: 'Decision',
                    description: 'Cantonal approval or rejection (may include appeal)',
                    timeline: '8-16 weeks total'
                },
                {
                    step: 7,
                    title: 'Embassy Processing',
                    description: 'If approved, obtain visa from Swiss embassy in your country',
                    timeline: '2-6 weeks'
                },
                {
                    step: 8,
                    title: 'Path to Citizenship',
                    description: 'After 10 years of residence, apply for naturalization',
                    timeline: '10 years'
                }
            ]
        },
        tools: {
            title: 'Third-Country Specific Tools',
            description: 'Specialized resources for global applicants',
            items: [
                {
                    name: 'Quota Tracker by Region',
                    description: 'Real-time quota availability by canton and industry',
                    icon: 'chart'
                },
                {
                    name: 'Embassy Guide by Country',
                    description: 'Find your Swiss embassy and understand processing requirements',
                    icon: 'map'
                },
                {
                    name: 'Document Legalization Guide',
                    description: 'Country-specific guides for apostilling documents',
                    icon: 'file'
                },
                {
                    name: 'Strategic Timing Calculator',
                    description: 'Calculate optimal application timing based on quota patterns',
                    icon: 'calendar'
                }
            ]
        },
        resources: {
            title: 'Third-Country Resources',
            description: 'Comprehensive content for global applicants',
            posts: [
                {
                    title: 'Quota Strategy: Maximizing Your Chances',
                    excerpt: 'How to position yourself in the competitive quota system',
                    category: 'Strategy'
                },
                {
                    title: 'Embassy Processing by Region',
                    excerpt: 'Complete guide to Swiss embassy requirements by country',
                    category: 'Embassy'
                },
                {
                    title: 'Visa for Indians: Complete Guide',
                    excerpt: 'Specialized pathway guide for Indian professionals',
                    category: 'Country-Specific'
                },
                {
                    title: 'Visa for Brazilians: Step-by-Step',
                    excerpt: 'Comprehensive guide for Brazilian applicants',
                    category: 'Country-Specific'
                },
                {
                    title: 'Education Pathway: Study Then Work',
                    excerpt: 'How to use Swiss education as a quota-free entry strategy',
                    category: 'Pathway'
                }
            ]
        }
    }
};
}),
"[project]/Downloads/New folder/app/[layer]/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LayerPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'framer-motion'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module 'lucide-react'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$New__folder$2f$lib$2f$layerContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/New folder/lib/layerContent.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function LayerPage() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const layerParam = params?.layer;
    const layer = [
        'europeans',
        'americans',
        'others'
    ].includes(layerParam) ? layerParam : 'others';
    // Memoize content to avoid recalculation
    const content = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$New__folder$2f$lib$2f$layerContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LAYER_CONTENT"][layer], [
        layer
    ]);
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const loadStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            const res = await fetch('/api/stats', {
                cache: 'no-store'
            });
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsClient(true);
        loadStats();
    }, [
        loadStats
    ]);
    // Memoize layer colors
    const layerColors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            europeans: {
                gradient: 'from-blue-600 to-blue-800',
                accent: 'bg-blue-600',
                text: 'text-blue-600'
            },
            americans: {
                gradient: 'from-red-600 to-blue-800',
                accent: 'bg-red-600',
                text: 'text-red-600'
            },
            others: {
                gradient: 'from-purple-600 to-blue-800',
                accent: 'bg-purple-600',
                text: 'text-purple-600'
            }
        }), []);
    const colors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>layerColors[layer], [
        layer,
        layerColors
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white dark:bg-gray-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border-b border-gray-200 shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between py-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2 text-sm text-gray-600",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckCircle, {
                                                className: "w-4 h-4 text-green-600"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                lineNumber: 73,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "AI-Powered Guidance"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                lineNumber: 74,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 72,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden md:flex items-center space-x-2 text-sm text-gray-600",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FileText, {
                                                className: "w-4 h-4 text-blue-600"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                lineNumber: 77,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Professional Templates"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                lineNumber: 78,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 76,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden lg:flex items-center space-x-2 text-sm text-gray-600",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Award, {
                                                className: "w-4 h-4 text-purple-600"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                lineNumber: 81,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Expert Support"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                lineNumber: 82,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 80,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-gray-600 hidden sm:inline",
                                        children: "Ready to accelerate your application?"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 88,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/pricing",
                                        className: "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg text-sm transition-colors shadow-sm",
                                        children: "View Premium Plans"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 89,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-50 border-b border-gray-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-blue-100 p-3 rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Award, {
                                            className: "w-6 h-6 text-blue-600"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 106,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 105,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold text-gray-900",
                                                children: "Professional Immigration Support"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                lineNumber: 109,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600",
                                                children: "Access comprehensive tools and expert guidance designed for serious applicants"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                lineNumber: 112,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 108,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-gray-600",
                                                children: "Starting from"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                lineNumber: 119,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xl font-bold text-gray-900",
                                                children: "CHF 97/month"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                lineNumber: 120,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 118,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/pricing",
                                        className: "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors",
                                        children: "Explore Plans"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 122,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: `relative overflow-hidden bg-gradient-to-br ${colors.gradient} text-white`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-grid-pattern opacity-10"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(motion.div, {
                            initial: {
                                opacity: 0,
                                y: 30
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                duration: 0.6
                            },
                            className: "text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Award, {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 144,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Your Personalized Pathway"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 145,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6",
                                    children: content.hero.tagline
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90",
                                    children: content.hero.description
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 150,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col sm:flex-row gap-4 justify-center items-center mb-12",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/${layer}/visas`,
                                            className: "btn-primary bg-white text-gray-900 hover:bg-gray-100",
                                            children: [
                                                content.hero.cta,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowRight, {
                                                    className: "inline-block ml-2 w-5 h-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 156,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 154,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/${layer}/requirements`,
                                            className: "btn-secondary bg-white/20 hover:bg-white/30 text-white border-white/30",
                                            children: "View Requirements"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 158,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 153,
                                    columnNumber: 13
                                }, this),
                                isClient && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(motion.div, {
                                    initial: {
                                        opacity: 0
                                    },
                                    animate: {
                                        opacity: 1
                                    },
                                    transition: {
                                        delay: 0.3,
                                        duration: 0.6
                                    },
                                    className: "grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto",
                                    children: content.hero.stats.map((stat, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(motion.div, {
                                            initial: {
                                                opacity: 0,
                                                y: 20
                                            },
                                            animate: {
                                                opacity: 1,
                                                y: 0
                                            },
                                            transition: {
                                                delay: 0.4 + idx * 0.1
                                            },
                                            className: "bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-3xl font-bold mb-2",
                                                    children: stat.value
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm opacity-90 mb-1",
                                                    children: stat.label
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 180,
                                                    columnNumber: 21
                                                }, this),
                                                stat.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs opacity-75",
                                                    children: stat.description
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 182,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, idx, true, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 172,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 165,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-12 bg-gray-50 dark:bg-gray-800",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-4 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: `/${layer}/visas`,
                                className: "card p-6 hover:shadow-lg transition-shadow text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FileText, {
                                        className: "w-8 h-8 mx-auto mb-3 text-blue-600"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 197,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-gray-900 dark:text-white mb-2",
                                        children: "Visas & Permits"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 198,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-600 dark:text-gray-400",
                                        children: "Explore your options"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 199,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                lineNumber: 196,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: `/${layer}/process`,
                                className: "card p-6 hover:shadow-lg transition-shadow text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Clock, {
                                        className: "w-8 h-8 mx-auto mb-3 text-blue-600"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 202,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-gray-900 dark:text-white mb-2",
                                        children: "Process"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 203,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-600 dark:text-gray-400",
                                        children: "Step-by-step guide"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 204,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                lineNumber: 201,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: `/${layer}/requirements`,
                                className: "card p-6 hover:shadow-lg transition-shadow text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckCircle, {
                                        className: "w-8 h-8 mx-auto mb-3 text-blue-600"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 207,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-gray-900 dark:text-white mb-2",
                                        children: "Requirements"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 208,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-600 dark:text-gray-400",
                                        children: "What you need"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 209,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                lineNumber: 206,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: `/${layer}/resources`,
                                className: "card p-6 hover:shadow-lg transition-shadow text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MapPin, {
                                        className: "w-8 h-8 mx-auto mb-3 text-blue-600"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 212,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-gray-900 dark:text-white mb-2",
                                        children: "Resources"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 213,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-600 dark:text-gray-400",
                                        children: "Guides & articles"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 214,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                lineNumber: 211,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                        lineNumber: 195,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                    lineNumber: 194,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                lineNumber: 193,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-24 bg-white dark:bg-gray-900",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(motion.div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            className: "text-center mb-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4",
                                    children: content.visas.title
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 228,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto",
                                    children: content.visas.description
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 231,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                            lineNumber: 223,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-8",
                            children: content.visas.types.filter((v)=>v.applicable).slice(0, 4).map((visa, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(motion.div, {
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        delay: idx * 0.1
                                    },
                                    className: "card p-6 border-t-4 border-blue-600",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-2xl font-bold text-gray-900 dark:text-white mb-3",
                                            children: visa.name
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 245,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600 dark:text-gray-300 mb-4",
                                            children: visa.description
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 248,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Clock, {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "Processing: ",
                                                        visa.timeline
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 251,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 249,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "space-y-2",
                                            children: visa.requirements.slice(0, 3).map((req, ridx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-start text-sm text-gray-600 dark:text-gray-400",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckCircle, {
                                                            className: "w-4 h-4 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                            lineNumber: 256,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: req
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                            lineNumber: 257,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, ridx, true, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 255,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 253,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/${layer}/visas#${visa.name.toLowerCase().replace(/\s+/g, '-')}`,
                                            className: "inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline",
                                            children: "Learn more →"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 261,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 238,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                            lineNumber: 236,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mt-12",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: `/${layer}/visas`,
                                className: "btn-primary",
                                children: "View All Visa Options"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                lineNumber: 272,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                            lineNumber: 271,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                    lineNumber: 222,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-24 bg-gray-50 dark:bg-gray-800",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(motion.div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            className: "text-center mb-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4",
                                    children: content.process.title
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 287,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto",
                                    children: content.process.description
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 290,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                            lineNumber: 282,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900 hidden md:block"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 296,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-12",
                                    children: content.process.steps.map((step, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(motion.div, {
                                            initial: {
                                                opacity: 0,
                                                x: -20
                                            },
                                            animate: {
                                                opacity: 1,
                                                x: 0
                                            },
                                            transition: {
                                                delay: idx * 0.1
                                            },
                                            className: "relative flex items-start space-x-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `flex-shrink-0 w-16 h-16 rounded-full ${colors.accent} text-white flex items-center justify-center font-bold text-xl z-10`,
                                                    children: step.step
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 306,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 card p-6",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between mb-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "text-xl font-bold text-gray-900 dark:text-white",
                                                                    children: step.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                                    lineNumber: 311,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-sm text-gray-500 dark:text-gray-400",
                                                                    children: step.timeline
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                                    lineNumber: 314,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                            lineNumber: 310,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-600 dark:text-gray-300",
                                                            children: step.description
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                            lineNumber: 318,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 309,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, idx, true, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 299,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 297,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                            lineNumber: 295,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mt-12",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: `/${layer}/process`,
                                className: "btn-primary",
                                children: "View Complete Process"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                lineNumber: 326,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                            lineNumber: 325,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                    lineNumber: 281,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                lineNumber: 280,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-20 bg-gray-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl md:text-4xl font-bold text-gray-900 mb-4",
                                    children: "Comprehensive Immigration Services"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 337,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-gray-600 max-w-3xl mx-auto",
                                    children: "Professional tools and expert guidance trusted by thousands of successful applicants"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 340,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                            lineNumber: 336,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl p-8 shadow-sm border border-gray-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-4 mb-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MessageCircle, {
                                                        className: "w-6 h-6 text-blue-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                        lineNumber: 349,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 348,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-bold text-gray-900",
                                                            children: "AI-Powered Assistance"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                            lineNumber: 352,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-600",
                                                            children: "Intelligent guidance system"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                            lineNumber: 353,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 351,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 347,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-700 mb-4",
                                            children: "Advanced AI technology provides personalized answers to your immigration questions, available 24/7."
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 356,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-blue-600 font-medium",
                                            children: "Premium feature"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 359,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 346,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl p-8 shadow-sm border border-gray-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-4 mb-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FileText, {
                                                        className: "w-6 h-6 text-purple-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                        lineNumber: 365,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 364,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-bold text-gray-900",
                                                            children: "Professional Templates"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                            lineNumber: 368,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-600",
                                                            children: "Swiss-standard documents"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                            lineNumber: 369,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 367,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 363,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-700 mb-4",
                                            children: "Industry-standard CV and document templates specifically designed for Swiss immigration requirements."
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 372,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-blue-600 font-medium",
                                            children: "Premium feature"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 375,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 362,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl p-8 shadow-sm border border-gray-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-4 mb-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckCircle, {
                                                        className: "w-6 h-6 text-green-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                        lineNumber: 381,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 380,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-bold text-gray-900",
                                                            children: "Expert Consultation"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                            lineNumber: 384,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-gray-600",
                                                            children: "Professional immigration support"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                            lineNumber: 385,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 383,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 379,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-700 mb-4",
                                            children: "Direct access to certified immigration specialists for personalized guidance and document review."
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 388,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-blue-600 font-medium",
                                            children: "Premium feature"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 391,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 378,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                            lineNumber: 345,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl p-8 shadow-sm border border-gray-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold text-gray-900 mb-4",
                                        children: "Ready for Professional Support?"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 397,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600 mb-6 max-w-2xl mx-auto",
                                        children: "Join thousands of successful applicants who have accelerated their Swiss immigration journey with our comprehensive premium services."
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 398,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center space-x-4 mb-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-2xl font-bold text-gray-900",
                                                    children: "CHF 97/month"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 403,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-gray-600",
                                                    children: "Professional plan"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 404,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 402,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 401,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/pricing",
                                        className: "inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-sm",
                                        children: "View Premium Plans"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 407,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                lineNumber: 396,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                            lineNumber: 395,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                    lineNumber: 335,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                lineNumber: 334,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-24 bg-white dark:bg-gray-900",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(motion.div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            className: "text-center mb-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4",
                                    children: content.tools.title
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 426,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto",
                                    children: content.tools.description
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 429,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                            lineNumber: 421,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
                            children: content.tools.items.map((tool, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(motion.div, {
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        delay: idx * 0.1
                                    },
                                    className: "card p-6 text-center hover:shadow-lg transition-shadow",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `w-12 h-12 ${colors.accent} rounded-lg mx-auto mb-4 flex items-center justify-center`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Award, {
                                                className: "w-6 h-6 text-white"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                lineNumber: 444,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 443,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-bold text-gray-900 dark:text-white mb-2",
                                            children: tool.name
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 446,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-600 dark:text-gray-400",
                                            children: tool.description
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 449,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 436,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                            lineNumber: 434,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                    lineNumber: 420,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                lineNumber: 419,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-24 bg-gray-50 dark:bg-gray-800",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(motion.div, {
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            className: "text-center mb-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4",
                                    children: content.resources.title
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 464,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto",
                                    children: content.resources.description
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 467,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                            lineNumber: 459,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                            children: content.resources.posts.slice(0, 3).map((post, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(motion.div, {
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        delay: idx * 0.1
                                    },
                                    className: "card p-6 hover:shadow-lg transition-shadow",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-2 block",
                                            children: post.category
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 481,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-xl font-bold text-gray-900 dark:text-white mb-3",
                                            children: post.title
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 484,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600 dark:text-gray-400 mb-4",
                                            children: post.excerpt
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 487,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/${layer}/resources#${post.title.toLowerCase().replace(/\s+/g, '-')}`,
                                            className: "text-blue-600 dark:text-blue-400 hover:underline text-sm font-semibold",
                                            children: "Read more →"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 488,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 474,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                            lineNumber: 472,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mt-12",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: `/${layer}/resources`,
                                className: "btn-primary",
                                children: "View All Resources"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                lineNumber: 499,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                            lineNumber: 498,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                    lineNumber: 458,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                lineNumber: 457,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-20 bg-white border-t border-gray-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center space-x-8 mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-gray-900",
                                            children: "10,000+"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 513,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-600",
                                            children: "Successful Applications"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 514,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 512,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-gray-900",
                                            children: "92%"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 517,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-600",
                                            children: "Approval Rate"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 518,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 516,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-2xl font-bold text-gray-900",
                                            children: "120+"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 521,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-600",
                                            children: "Countries Served"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 522,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 520,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                            lineNumber: 511,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl md:text-4xl font-bold text-gray-900 mb-6",
                                    children: "Your Swiss Immigration Journey Starts Here"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 528,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-gray-600 max-w-3xl mx-auto mb-8",
                                    children: "Access professional tools and expert guidance designed to streamline your Swiss immigration process. Join thousands of successful applicants who have achieved their immigration goals."
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 531,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                            lineNumber: 527,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckCircle, {
                                                className: "w-8 h-8 text-blue-600"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                lineNumber: 541,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 540,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-bold text-gray-900 mb-2",
                                            children: "Proven Success Rate"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 543,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600 text-sm",
                                            children: "92% of our premium users successfully obtain their Swiss permits"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 544,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 539,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Clock, {
                                                className: "w-8 h-8 text-green-600"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                lineNumber: 549,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 548,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-bold text-gray-900 mb-2",
                                            children: "Faster Processing"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 551,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600 text-sm",
                                            children: "Average 9 weeks from application to permit approval"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 552,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 547,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Award, {
                                                className: "w-8 h-8 text-purple-600"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                lineNumber: 557,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 556,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-bold text-gray-900 mb-2",
                                            children: "Expert Support"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 559,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600 text-sm",
                                            children: "Professional immigration consultants and document review"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 560,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 555,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                            lineNumber: 538,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-50 rounded-2xl p-8 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold text-gray-900 mb-4",
                                    children: "Ready to Take the Next Step?"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 566,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600 mb-6",
                                    children: "Choose the professional plan that best fits your immigration needs."
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 567,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center space-x-6 mb-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-lg font-bold text-gray-900",
                                                    children: "CHF 97/month"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 572,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-gray-600",
                                                    children: "Professional Plan"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 573,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 571,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-gray-300",
                                            children: "•"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 575,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-lg font-bold text-gray-900",
                                                    children: "CHF 147/month"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 577,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-gray-600",
                                                    children: "Citizenship Plan"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 578,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 576,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 570,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col sm:flex-row gap-4 justify-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/pricing",
                                            className: "bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-sm",
                                            children: "Compare Plans"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 582,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/auth/register",
                                            className: "bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-colors border border-gray-300",
                                            children: "Start Free Account"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                            lineNumber: 588,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                    lineNumber: 581,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                            lineNumber: 565,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-12 text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center space-x-8 text-sm text-gray-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-5 h-5 bg-green-100 rounded-full flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckCircle, {
                                                    className: "w-3 h-3 text-green-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 602,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                lineNumber: 601,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "30-Day Guarantee"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                lineNumber: 604,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 600,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-2 h-2 bg-blue-600 rounded-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 608,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                lineNumber: 607,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "SSL Secured"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                lineNumber: 610,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 606,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Award, {
                                                    className: "w-3 h-3 text-purple-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                    lineNumber: 614,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                lineNumber: 613,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Swiss Based"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                                lineNumber: 616,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                        lineNumber: 612,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                                lineNumber: 599,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                            lineNumber: 598,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                    lineNumber: 508,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
                lineNumber: 507,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/New folder/app/[layer]/page.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=Downloads_New%20folder_6d3ce29f._.js.map