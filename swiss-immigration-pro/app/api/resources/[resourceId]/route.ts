import { NextRequest, NextResponse } from 'next/server'

// Dynamic import for jsPDF to handle server-side rendering
let jsPDF: any
async function getJsPDF() {
  if (!jsPDF) {
    const jspdfModule = await import('jspdf')
    jsPDF = jspdfModule.jsPDF
  }
  return jsPDF
}

const RESOURCE_CONTENT: Record<string, { title: string; content: () => string }> = {
  'basic-immigration-guide': {
    title: 'Basic Immigration Guide',
    content: () => `SWISS IMMIGRATION PRO
Basic Immigration Guide 2025

========================================
INTRODUCTION
========================================

Welcome to Swiss Immigration Pro! This guide provides essential information about Swiss immigration pathways, requirements, and processes.

SWISS IMMIGRATION PATHWAYS

1. EU/EFTA Citizens (Freedom of Movement)
   - No quota restrictions
   - Processing: 2-4 weeks
   - Citizenship: 5 years
   - Required: Employment contract, health insurance, commune registration

2. US/Canadian Citizens (Quota System)
   - Annual quota: 8,500 permits (4,000 L + 4,500 B)
   - Processing: 8-12 weeks
   - Citizenship: 10 years
   - Required: Document apostille, salary above CHF 100k recommended

3. Third-Country Nationals (Quota System)
   - Annual quota: 8,500 permits
   - Processing: 8-16 weeks
   - Citizenship: 10 years
   - Required: Document apostille, translations, embassy processing

========================================
VISA TYPES
========================================

L PERMIT (Short-term Residence)
- Duration: 1 year (renewable)
- For: Temporary employment
- Quota: 4,000 per year (non-EU)
- Requirements: Employment contract, health insurance

B PERMIT (Residence Permit)
- Duration: 5 years (renewable)
- For: Long-term employment
- Quota: 4,500 per year (non-EU)
- Requirements: L permit holder or direct application, integration proof

G PERMIT (Cross-border Commuter)
- Duration: 1 year (renewable)
- For: Working in Switzerland, living abroad
- Requirements: Residence in border country, daily commute

C PERMIT (Settlement Permit)
- Duration: Unlimited
- For: Long-term residents (10+ years)
- Requirements: 10 years residence, integration, language proficiency

========================================
REQUIREMENTS CHECKLIST
========================================

Essential Documents:
☐ Valid passport (6+ months validity)
☐ Employment contract
☐ Health insurance (KVG-compliant)
☐ Proof of accommodation
☐ CV/Resume (Swiss format)
☐ Educational certificates (apostilled if non-EU)
☐ Language certificates (if required)
☐ Criminal record certificate
☐ Bank statements (proof of funds)

========================================
PROCESSING TIMELINE
========================================

EU/EFTA Citizens:
- Week 1-2: Document preparation
- Week 3-4: Application submission
- Week 4-5: Permit approval

Non-EU Citizens:
- Week 1-4: Document preparation & apostille
- Week 5-8: Application submission
- Week 9-12: Processing & approval

========================================
KEY TIPS FOR SUCCESS
========================================

1. Start Early: Begin document preparation 3-6 months before
2. Choose Right Canton: Research cantonal requirements
3. Salary Matters: Ensure salary meets cantonal minimums
4. Health Insurance: Must be KVG-compliant (Swiss health insurance)
5. Language Skills: B1 German/French recommended
6. Professional Help: Consider consulting immigration lawyer

========================================
IMPORTANT LINKS
========================================

Official Resources:
- SEM (State Secretariat for Migration): sem.admin.ch
- SECO (State Secretariat for Economic Affairs): seco.admin.ch
- Cantonal Migration Offices: Check your canton's website

Swiss Immigration Pro:
- Website: swissimmigrationpro.com
- Visa Guide: /visas
- Employment Hub: /employment
- Citizenship: /citizenship

========================================
DISCLAIMER
========================================

This guide provides general information only (updated Nov 2025).
Not legal advice. Consult with a certified Swiss immigration
lawyer for your specific case.

Generated: ${new Date().toLocaleDateString()}
© 2025 Swiss Immigration Pro`
  },
  'swiss-salary-benchmarks': {
    title: 'Swiss Salary Benchmarks 2025',
    content: () => `SWISS IMMIGRATION PRO
Swiss Salary Benchmarks 2025

========================================
OVERVIEW
========================================

Salary requirements are critical for work permit approval.
This guide provides 2025 salary benchmarks by industry and canton.

========================================
MINIMUM SALARY REQUIREMENTS
========================================

Non-EU Work Permits:
- L Permit: CHF 80,000 - 120,000+ (varies by canton)
- B Permit: CHF 100,000 - 150,000+ (varies by canton)

Recommended Minimums:
- Zurich: CHF 120,000+
- Geneva: CHF 110,000+
- Basel: CHF 100,000+
- Bern: CHF 95,000+
- Zug: CHF 115,000+

========================================
INDUSTRY BENCHMARKS
========================================

TECH & IT
- Software Engineer: CHF 95,000 - 140,000
- DevOps Engineer: CHF 100,000 - 150,000
- Data Scientist: CHF 105,000 - 160,000
- Product Manager: CHF 110,000 - 170,000
- Cybersecurity: CHF 115,000 - 180,000

FINANCE & BANKING
- Financial Analyst: CHF 90,000 - 130,000
- Investment Banker: CHF 120,000 - 250,000+
- Risk Manager: CHF 110,000 - 160,000
- Tax Advisor: CHF 95,000 - 140,000
- Internal Auditor: CHF 100,000 - 145,000

HEALTHCARE
- Medical Doctor: CHF 120,000 - 200,000+
- Registered Nurse: CHF 75,000 - 95,000
- Physiotherapist: CHF 80,000 - 100,000
- Pharmacist: CHF 90,000 - 120,000

ENGINEERING
- Mechanical Engineer: CHF 95,000 - 130,000
- Electrical Engineer: CHF 100,000 - 140,000
- Biomedical Engineer: CHF 105,000 - 150,000
- Civil Engineer: CHF 90,000 - 125,000

CONSULTING
- Management Consultant: CHF 110,000 - 180,000
- HR Consultant: CHF 95,000 - 130,000
- Strategy Consultant: CHF 120,000 - 200,000+

LEGAL
- Corporate Lawyer: CHF 120,000 - 200,000+
- Legal Advisor: CHF 100,000 - 150,000

MARKETING & SALES
- Marketing Manager: CHF 95,000 - 140,000
- Sales Manager: CHF 100,000 - 150,000
- Digital Marketing: CHF 85,000 - 120,000

========================================
CANTONAL VARIATIONS
========================================

ZURICH
- Highest salaries in Switzerland
- Tech & Finance hub
- Minimum: CHF 120,000+ recommended
- Cost of living: High

GENEVA
- International organizations
- Finance & Luxury goods
- Minimum: CHF 110,000+ recommended
- Cost of living: Very high

BASEL
- Pharma & Life Sciences
- Strong tech sector
- Minimum: CHF 100,000+ recommended
- Cost of living: Medium-high

ZUG
- Crypto & Finance
- Low taxes
- Minimum: CHF 115,000+ recommended
- Cost of living: High

BERN
- Government & Tech
- Balanced cost of living
- Minimum: CHF 95,000+ recommended
- Cost of living: Medium

========================================
SALARY NEGOTIATION TIPS
========================================

1. Research Market Rates: Use SECO salary database
2. Consider Total Package: Benefits, bonuses, equity
3. Factor Cost of Living: Higher in Zurich/Geneva
4. Demonstrate Value: Show unique skills/experience
5. Be Realistic: Align with Swiss market standards

========================================
IMPORTANT NOTES
========================================

- Salaries are gross (before taxes)
- 13th month salary is common
- Health insurance is separate (CHF 300-500/month)
- Social security contributions: ~10% of salary
- Effective tax rate: 20-35% depending on canton

========================================
RESOURCES
========================================

- SECO Salary Database: seco.admin.ch
- Job Platforms: jobs.ch, LinkedIn, Xing
- Cost of Living Calculator: /tools
- Salary Negotiation Guide: /employment

========================================
DISCLAIMER
========================================

These benchmarks are estimates based on 2025 market data.
Actual salaries vary by experience, company, and negotiation.
Not legal advice.

Generated: ${new Date().toLocaleDateString()}
© 2025 Swiss Immigration Pro`
  },
  'visa-types-overview': {
    title: 'Visa Types Overview Checklist',
    content: () => `SWISS IMMIGRATION PRO
Visa Types Overview Checklist 2025

========================================
QUICK REFERENCE
========================================

Use this checklist to identify which visa type applies to your situation.

========================================
L PERMIT (Short-term Residence)
========================================

Duration: 1 year (renewable up to 2 years)
Purpose: Temporary employment
Quota: 4,000/year (non-EU only)

Eligibility Checklist:
☐ Employment contract (minimum 12 months)
☐ Salary meets cantonal minimum
☐ Health insurance (KVG-compliant)
☐ Valid passport
☐ Educational certificates (apostilled if non-EU)
☐ CV/Resume
☐ Criminal record certificate
☐ Proof of accommodation

Processing Time: 8-12 weeks (non-EU)
Renewal: Possible for up to 2 years total

========================================
B PERMIT (Residence Permit)
========================================

Duration: 5 years (renewable)
Purpose: Long-term employment
Quota: 4,500/year (non-EU only)

Eligibility Checklist:
☐ L permit holder OR direct application
☐ Employment contract (unlimited or 5+ years)
☐ Salary above CHF 100k (recommended)
☐ Integration proof (language, social)
☐ Health insurance (KVG-compliant)
☐ Valid passport
☐ Educational certificates
☐ Criminal record certificate
☐ Proof of accommodation
☐ Tax clearance (if applicable)

Processing Time: 8-12 weeks (non-EU)
Renewal: Every 5 years

========================================
G PERMIT (Cross-border Commuter)
========================================

Duration: 1 year (renewable)
Purpose: Working in CH, living abroad
Quota: None (unlimited)

Eligibility Checklist:
☐ Residence in border country (EU/EFTA)
☐ Daily commute to Switzerland
☐ Employment contract in Switzerland
☐ Valid passport/ID
☐ Proof of residence abroad
☐ Employment contract

Processing Time: 2-4 weeks
Renewal: Annually

========================================
C PERMIT (Settlement Permit)
========================================

Duration: Unlimited (permanent)
Purpose: Long-term settlement
Quota: None (based on residence)

Eligibility Checklist:
☐ 10 years continuous residence (5 years EU/EFTA)
☐ B permit holder
☐ Integration proof (language B1, social)
☐ Financial independence
☐ No criminal record
☐ Health insurance
☐ Tax compliance

Processing Time: 3-6 months
Renewal: Not required (permanent)

========================================
SCHENGEN VISA (Short Stay)
========================================

Duration: Up to 90 days
Purpose: Tourism, business, short visits
Quota: None

Eligibility Checklist:
☐ Valid passport
☐ Travel insurance
☐ Proof of accommodation
☐ Return ticket
☐ Sufficient funds
☐ Purpose of visit

Processing Time: 2-4 weeks
Renewal: Not applicable

========================================
CITIZENSHIP PATHWAYS
========================================

ORDINARY NATURALIZATION
☐ 10 years residence (5 years EU/EFTA)
☐ C permit holder
☐ Language: B1 oral, A2 written
☐ Integration proof
☐ No criminal record
☐ Financial independence

SIMPLIFIED NATURALIZATION
☐ Married to Swiss citizen
☐ 5 years residence
☐ 3 years marriage
☐ Language: B1 oral, A2 written
☐ Integration proof

THIRD GENERATION
☐ Born in Switzerland
☐ Grandparents were immigrants
☐ 5 years residence
☐ Language: B1 oral, A2 written

========================================
DOCUMENT CHECKLIST
========================================

Essential for All Permits:
☐ Valid passport (6+ months)
☐ Passport photos (recent)
☐ Employment contract
☐ Health insurance certificate
☐ Proof of accommodation
☐ CV/Resume (Swiss format)
☐ Educational certificates
☐ Criminal record certificate
☐ Bank statements
☐ Language certificates (if required)

For Non-EU Citizens:
☐ Document apostille
☐ Certified translations
☐ Embassy verification

========================================
QUICK DECISION GUIDE
========================================

EU/EFTA Citizen?
→ B Permit (no quota, 2-4 weeks)

US/Canadian Citizen?
→ L or B Permit (quota, 8-12 weeks)

Third-Country National?
→ L or B Permit (quota, 8-16 weeks)

Living Abroad, Working in CH?
→ G Permit (2-4 weeks)

10+ Years Residence?
→ C Permit (permanent)

========================================
NEXT STEPS
========================================

1. Identify your visa type using this checklist
2. Gather required documents
3. Check quota availability (if applicable)
4. Submit application to cantonal office
5. Wait for processing
6. Receive permit decision

========================================
RESOURCES
========================================

- Detailed Visa Guide: /visas
- Employment Hub: /employment
- Citizenship: /citizenship
- Tools & Calculators: /tools

========================================
DISCLAIMER
========================================

This checklist provides general information only (updated Nov 2025).
Not legal advice. Consult with a certified Swiss immigration
lawyer for your specific case.

Generated: ${new Date().toLocaleDateString()}
© 2025 Swiss Immigration Pro`
  },
  'full-employment-checklist': {
    title: 'Full Employment Application Checklist',
    content: () => `SWISS IMMIGRATION PRO
Full Employment Application Checklist 2025

========================================
COMPREHENSIVE EMPLOYMENT CHECKLIST
========================================

This complete checklist covers all stages of the Swiss employment
permit application process. Use this to ensure nothing is missed.

========================================
PHASE 1: PRE-APPLICATION PREPARATION
========================================

EMPLOYMENT CONTRACT REQUIREMENTS
☐ Employment contract signed by both parties
☐ Contract specifies job title and description
☐ Contract states salary (must meet cantonal minimum)
☐ Contract duration clearly stated (minimum 12 months for L permit)
☐ Contract includes start date
☐ Contract complies with Swiss labor law (OR Art. 319-362)
☐ Contract specifies working hours (full-time/part-time)
☐ Contract includes notice period
☐ Contract includes probation period (if applicable)

SALARY VERIFICATION
☐ Salary meets cantonal minimum requirements
☐ Salary above CHF 100k recommended for B permit (non-EU)
☐ Salary justification letter from employer (if required)
☐ SECO salary benchmark research completed
☐ Industry salary comparison documented
☐ Total compensation package reviewed (salary + benefits)

EMPLOYER DOCUMENTATION
☐ Employer business registration certificate
☐ Employer financial statements (last 2 years)
☐ Employer tax clearance certificate
☐ Employer justification letter (for non-EU hires)
☐ Job advertisement proof (14 days on job-room.ch)
☐ Labor market test documentation (non-EU only)
☐ Interview notes and candidate evaluation
☐ Proof no suitable Swiss/EU candidate found

========================================
PHASE 2: PERSONAL DOCUMENTS
========================================

IDENTITY DOCUMENTS
☐ Valid passport (minimum 6 months validity beyond permit period)
☐ Passport has at least 2 blank pages
☐ Passport copy (all pages)
☐ Biometric passport photos (3-4 copies, 35mm x 45mm)
☐ Photos taken within last 6 months
☐ Photos have white background
☐ Photos meet Swiss biometric standards

EDUCATIONAL DOCUMENTS
☐ University degree certificate (original)
☐ Degree certificate apostilled (non-EU countries)
☐ Degree certificate translated (if not in German/French/Italian/English)
☐ Translation certified by recognized translator
☐ Professional certificates (if applicable)
☐ Professional licenses (if applicable)
☐ Training certificates (if relevant to job)
☐ Academic transcripts (if required)

PROFESSIONAL DOCUMENTS
☐ CV/Resume in Swiss format
☐ CV includes professional photo
☐ CV translated to German/French/Italian (if needed)
☐ Reference letters from previous employers
☐ Reference letters translated (if needed)
☐ Portfolio/work samples (if applicable)
☐ Professional certifications (PMP, AWS, etc.)
☐ Language certificates (if required)

========================================
PHASE 3: LEGAL & ADMINISTRATIVE
========================================

CRIMINAL RECORD
☐ Criminal record certificate from home country
☐ Certificate issued within last 3-6 months
☐ Certificate apostilled (if required)
☐ Certificate translated (if not in official languages)
☐ Certificate covers all countries of residence (if applicable)

HEALTH INSURANCE
☐ Health insurance policy confirmation
☐ Insurance is KVG-compliant (Swiss health insurance)
☐ Insurance covers entire permit period
☐ Insurance certificate in German/French/Italian
☐ Insurance premium payment proof
☐ Insurance coverage details documented

ACCOMMODATION
☐ Rental agreement in Switzerland
☐ OR hotel reservation for initial period
☐ Accommodation proof in German/French/Italian
☐ Accommodation meets minimum standards
☐ Accommodation registration confirmation

FINANCIAL DOCUMENTS
☐ Bank statements (last 3-6 months)
☐ Proof of sufficient funds (if required)
☐ Employment contract salary confirmation
☐ Tax clearance certificate (if applicable)

========================================
PHASE 4: APPLICATION SUBMISSION
========================================

APPLICATION FORMS
☐ Work permit application form completed
☐ Form filled in block letters or electronically
☐ Form signed and dated
☐ All sections completed accurately
☐ Supporting documents attached
☐ Application fee paid (CHF 100-250, varies by canton)

CANTONAL SUBMISSION
☐ Application submitted to correct cantonal office
☐ Submission confirmation received
☐ Application tracking number noted
☐ Contact person at cantonal office identified
☐ Follow-up schedule planned

TIMING CONSIDERATIONS
☐ Application submitted before quota exhaustion
☐ Application timing optimal (Q1-Q2 recommended)
☐ Employer submitted on time
☐ All documents valid (not expired)

========================================
PHASE 5: POST-SUBMISSION
========================================

TRACKING & FOLLOW-UP
☐ Application status checked regularly
☐ Response to any additional document requests
☐ Interview preparation (if required)
☐ Interview scheduled and attended
☐ Additional information provided promptly

APPROVAL & COLLECTION
☐ Approval notification received
☐ Embassy appointment scheduled
☐ Embassy documents prepared
☐ Visa sticker collected from embassy
☐ Entry to Switzerland within 90 days
☐ Commune registration within 14 days
☐ Permit card collected from cantonal office

========================================
PHASE 6: ARRIVAL & REGISTRATION
========================================

ARRIVAL IN SWITZERLAND
☐ Entered Switzerland within 90 days of permit issuance
☐ Valid entry stamp in passport
☐ All entry documents ready

COMMUNE REGISTRATION
☐ Commune registration appointment booked
☐ Registration completed within 14 days
☐ Registration certificate received
☐ Address registered correctly

CANTONAL REGISTRATION
☐ Cantonal migration office notified
☐ Permit card application submitted
☐ Permit card collected (takes 2-4 weeks)
☐ All registration documents filed

ONGOING REQUIREMENTS
☐ Health insurance maintained
☐ Employment contract valid
☐ Tax obligations met
☐ Integration requirements progressing

========================================
SPECIAL REQUIREMENTS BY PERMIT TYPE
========================================

L PERMIT (Short-term)
☐ Temporary employment contract (12 months)
☐ Project-based work justification
☐ Renewal plan (if applicable)

B PERMIT (Residence)
☐ Long-term employment contract
☐ Integration proof (language, social)
☐ Annual renewal preparation

G PERMIT (Cross-border)
☐ Proof of residence in border country
☐ Daily commute documentation
☐ Border country residence certificate

========================================
COMMON MISTAKES TO AVOID
========================================

DOCUMENT ERRORS
☐ Expired passport (ensure 6+ months validity)
☐ Missing apostille on educational certificates
☐ Uncertified translations
☐ Incomplete application forms
☐ Missing signatures

TIMING ERRORS
☐ Late submission (after quota exhaustion)
☐ Expired criminal record (older than 3-6 months)
☐ Expired health insurance certificate
☐ Late commune registration (after 14 days)

EMPLOYER ERRORS
☐ Incomplete employer justification
☐ Missing labor market test documentation
☐ Insufficient salary justification
☐ Incomplete company financials

========================================
SUCCESS TIPS
========================================

PREPARATION
✓ Start 3-6 months before intended start date
✓ Research cantonal requirements thoroughly
✓ Get professional translations early
✓ Verify all document requirements
✓ Keep copies of everything

SUBMISSION
✓ Submit during optimal timing (Q1-Q2)
✓ Double-check all documents before submission
✓ Follow up regularly with cantonal office
✓ Respond promptly to requests

INTEGRATION
✓ Begin language learning early
✓ Research Swiss work culture
✓ Network with Swiss professionals
✓ Prepare for cultural adaptation

========================================
LEGAL BASIS & REFERENCES
========================================

Primary Legislation:
- AuG (Foreign Nationals Act) Art. 18-25
- VZAE (Implementation Ordinance) Art. 23-25
- OR (Swiss Code of Obligations) Art. 319-362

Official Sources:
- SEM (State Secretariat for Migration)
- SECO (State Secretariat for Economic Affairs)
- Cantonal Migration Offices

========================================
RESOURCES & SUPPORT
========================================

Official Resources:
- SEM Website: sem.admin.ch
- SECO Salary Database: seco.admin.ch
- Job Portal: job-room.ch
- Cantonal Migration Offices

Swiss Immigration Pro:
- Employment Hub: /employment
- Visa Guide: /visas
- Tools & Calculators: /tools
- Expert Support: Available in paid packs

========================================
DISCLAIMER
========================================

This checklist provides comprehensive guidance but is general
information only (updated November 2025). Requirements may vary
by canton and individual circumstances. Always consult with a
certified Swiss immigration lawyer for your specific case.

Generated: ${new Date().toLocaleDateString()}
© 2025 Swiss Immigration Pro`
  },
  'employment-document-checklist': {
    title: 'Employment Document Checklist',
    content: () => `SWISS IMMIGRATION PRO
Employment Document Checklist 2025

========================================
COMPLETE DOCUMENT CHECKLIST
========================================

This checklist ensures you have all required documents for your
Swiss employment permit application. Check each item carefully.

========================================
IDENTITY DOCUMENTS
========================================

PASSPORT
☐ Valid passport (original)
☐ Passport valid minimum 6 months beyond permit period
☐ Passport has at least 2 blank pages
☐ Passport copy (all pages, including blank pages)
☐ Passport copy certified (if required by canton)

PHOTOGRAPHS
☐ 3-4 recent passport photos
☐ Photos taken within last 6 months
☐ Photos meet Swiss biometric standards (35mm x 45mm)
☐ Photos have white background
☐ Photos show full face, neutral expression
☐ Photos printed on high-quality photo paper

IDENTIFICATION
☐ National ID card (if applicable)
☐ Birth certificate (if required)
☐ Marriage certificate (if applicable, for family reunification)

========================================
EMPLOYMENT DOCUMENTS
========================================

EMPLOYMENT CONTRACT
☐ Original signed employment contract
☐ Contract signed by both employer and employee
☐ Contract specifies job title and description
☐ Contract states exact salary amount
☐ Contract states employment duration
☐ Contract includes start date
☐ Contract includes working hours
☐ Contract includes notice period
☐ Contract complies with Swiss labor law

EMPLOYER DOCUMENTS
☐ Employer business registration certificate
☐ Employer financial statements (last 2 years)
☐ Employer tax clearance certificate
☐ Employer justification letter (for non-EU hires)
☐ Employer motivation letter
☐ Company organizational chart (if applicable)

JOB MARKET TEST (Non-EU only)
☐ Job advertisement proof (14 days on job-room.ch)
☐ Advertisement screenshots or confirmation
☐ Applications received documentation
☐ Interview notes and evaluations
☐ Proof no suitable Swiss/EU candidate found
☐ Labor market test completion certificate

========================================
EDUCATIONAL DOCUMENTS
========================================

DEGREES & CERTIFICATES
☐ University degree certificate (original)
☐ Degree certificate apostilled (non-EU countries)
☐ Degree certificate legalized (if not Hague Convention)
☐ Professional certificates (if applicable)
☐ Professional licenses (if applicable)
☐ Training certificates (if relevant)

TRANSLATIONS
☐ All documents translated to German/French/Italian/English
☐ Translations certified by recognized translator
☐ Translator credentials verified
☐ Both original and translation provided
☐ Translation includes translator stamp/signature

ACADEMIC RECORDS
☐ Academic transcripts (if required)
☐ Transcripts apostilled (if non-EU)
☐ Transcripts translated (if needed)

========================================
PROFESSIONAL DOCUMENTS
========================================

CURRICULUM VITAE
☐ CV in Swiss format
☐ CV includes professional photo
☐ CV translated to German/French/Italian (if needed)
☐ CV is up-to-date and accurate
☐ CV highlights relevant experience

REFERENCE LETTERS
☐ Reference letters from previous employers
☐ Reference letters translated (if needed)
☐ Reference letters on company letterhead
☐ Reference letters include contact information

PROFESSIONAL PORTFOLIO
☐ Work samples (if applicable)
☐ Portfolio documentation
☐ Professional certifications (PMP, AWS, etc.)
☐ Industry awards or recognition

========================================
LEGAL DOCUMENTS
========================================

CRIMINAL RECORD
☐ Criminal record certificate from home country
☐ Certificate issued within last 3-6 months
☐ Certificate covers all countries of residence (if applicable)
☐ Certificate apostilled (if required)
☐ Certificate translated (if not in official languages)
☐ Certificate shows clean record

HEALTH INSURANCE
☐ Health insurance policy confirmation
☐ Insurance is KVG-compliant (Swiss health insurance)
☐ Insurance certificate in German/French/Italian
☐ Insurance covers entire permit period
☐ Insurance premium payment proof
☐ Insurance coverage details documented

========================================
ACCOMMODATION DOCUMENTS
========================================

HOUSING PROOF
☐ Rental agreement in Switzerland
☐ OR hotel reservation for initial period
☐ Accommodation proof in German/French/Italian
☐ Accommodation meets minimum standards
☐ Accommodation registration confirmation
☐ Landlord contact information

========================================
FINANCIAL DOCUMENTS
========================================

BANK STATEMENTS
☐ Bank statements (last 3-6 months)
☐ Statements show sufficient funds
☐ Statements translated (if needed)
☐ Statements certified by bank

SALARY PROOF
☐ Employment contract salary confirmation
☐ Salary justification letter from employer
☐ SECO salary benchmark research
☐ Industry salary comparison

TAX DOCUMENTS
☐ Tax clearance certificate (if applicable)
☐ Previous year tax returns (if applicable)

========================================
LANGUAGE DOCUMENTS
========================================

LANGUAGE CERTIFICATES
☐ German language certificate (if required)
☐ French language certificate (if required)
☐ Italian language certificate (if required)
☐ English language certificate (if applicable)
☐ Language level meets requirements (B1/B2)
☐ Certificate from recognized institution

========================================
FAMILY DOCUMENTS (If Applicable)
========================================

SPOUSE DOCUMENTS
☐ Marriage certificate (apostilled if non-EU)
☐ Marriage certificate translated
☐ Spouse passport copy
☐ Spouse CV (if working)

CHILDREN DOCUMENTS
☐ Birth certificates (apostilled if non-EU)
☐ Birth certificates translated
☐ Children passports copies
☐ School enrollment proof (if applicable)

========================================
APPLICATION FORMS
========================================

PERMIT APPLICATION
☐ Work permit application form completed
☐ Form filled in block letters or electronically
☐ Form signed and dated
☐ All sections completed accurately
☐ No blank fields (use N/A if not applicable)

SUPPORTING FORMS
☐ Additional cantonal forms (if required)
☐ Family reunification forms (if applicable)
☐ Integration forms (if required)

========================================
PAYMENT DOCUMENTS
========================================

FEES
☐ Application fee paid (CHF 100-250, varies by canton)
☐ Payment receipt obtained
☐ Payment method confirmed (varies by canton)
☐ Embassy visa fee paid (if applicable)
☐ Embassy payment receipt obtained

========================================
DOCUMENT ORGANIZATION
========================================

ORIGINALS
☐ All original documents gathered
☐ Originals kept safe (bring copies to appointments)
☐ Originals available for verification

COPIES
☐ 2-3 copies of all documents made
☐ Copies are clear and legible
☐ Copies organized in folders
☐ Copies labeled clearly

ORGANIZATION
☐ Documents organized by category
☐ Checklist completed for each category
☐ Documents in chronological order
☐ Index/table of contents created

========================================
DOCUMENT VALIDITY CHECK
========================================

EXPIRATION DATES
☐ Passport valid 6+ months
☐ Criminal record less than 3-6 months old
☐ Health insurance valid for permit period
☐ All certificates current
☐ No expired documents included

AUTHENTICATION
☐ All apostilles obtained (non-EU)
☐ All translations certified
☐ All signatures verified
☐ All stamps/seals present

========================================
CANTON-SPECIFIC REQUIREMENTS
========================================

CANTON RESEARCH
☐ Cantonal requirements researched
☐ Canton-specific forms obtained
☐ Canton-specific fees confirmed
☐ Canton-specific deadlines noted
☐ Canton contact information saved

========================================
PRE-SUBMISSION CHECK
========================================

FINAL REVIEW
☐ All documents checked against checklist
☐ All documents meet requirements
☐ All translations complete
☐ All apostilles obtained
☐ All forms completed
☐ All fees paid
☐ Copies made of everything
☐ Documents organized and ready

QUALITY CHECK
☐ Documents are clear and legible
☐ No missing pages
☐ All signatures present
☐ All dates correct
☐ All information accurate

========================================
SUBMISSION PREPARATION
========================================

PACKAGING
☐ Documents organized in folders
☐ Cover letter prepared (if required)
☐ Document list/index included
☐ Contact information included
☐ Return envelope prepared (if required)

BACKUP
☐ Digital copies of all documents
☐ Cloud backup created
☐ Physical copies stored safely
☐ Checklist saved for reference

========================================
POST-SUBMISSION
========================================

TRACKING
☐ Submission confirmation received
☐ Application tracking number noted
☐ Follow-up schedule planned
☐ Contact person identified

READINESS
☐ Additional documents ready (if requested)
☐ Interview preparation done
☐ Response plan for queries ready

========================================
IMPORTANT REMINDERS
========================================

TIMING
✓ Start document preparation 3-6 months early
✓ Allow time for apostille (4-6 weeks)
✓ Allow time for translations (1-2 weeks)
✓ Submit before quota exhaustion

QUALITY
✓ Use certified translators only
✓ Get apostilles from correct authorities
✓ Ensure all documents are current
✓ Double-check all information

ORGANIZATION
✓ Keep originals safe
✓ Make multiple copies
✓ Organize by category
✓ Create digital backups

========================================
LEGAL BASIS
========================================

Primary Legislation:
- AuG (Foreign Nationals Act) Art. 18-25
- VZAE (Implementation Ordinance) Art. 23-25
- KVG (Health Insurance Act)
- OR (Swiss Code of Obligations)

Official Sources:
- SEM: sem.admin.ch
- SECO: seco.admin.ch
- Cantonal Migration Offices

========================================
RESOURCES
========================================

Swiss Immigration Pro:
- Employment Hub: /employment
- Document Guides: /resources
- Expert Support: Available in paid packs

Official Resources:
- SEM Document Requirements
- Cantonal Migration Offices
- Swiss Embassies/Consulates

========================================
DISCLAIMER
========================================

This checklist provides comprehensive document guidance but is
general information only (updated November 2025). Document
requirements may vary by canton, permit type, and individual
circumstances. Always verify requirements with your cantonal
migration office or a certified Swiss immigration lawyer.

Generated: ${new Date().toLocaleDateString()}
© 2025 Swiss Immigration Pro`
  },
  'employment-permit-renewal-checklist': {
    title: 'Employment Permit Renewal Checklist',
    content: () => `SWISS IMMIGRATION PRO
Employment Permit Renewal Checklist 2025

========================================
PERMIT RENEWAL COMPREHENSIVE GUIDE
========================================

This checklist covers the complete renewal process for L and B
permits. Start renewal process 2-3 weeks before permit expiry.

========================================
RENEWAL TIMING
========================================

TIMELINE PLANNING
☐ Current permit expiry date noted
☐ Renewal process started 2-3 weeks before expiry
☐ All documents gathered in advance
☐ Appointment scheduled (if required)
☐ Submission deadline confirmed
☐ Late renewal risks understood

CRITICAL DATES
☐ Permit expiry date: _______________
☐ Renewal submission deadline: _______________
☐ Appointment date (if required): _______________
☐ Expected decision date: _______________

========================================
REQUIRED DOCUMENTS FOR RENEWAL
========================================

CURRENT PERMIT
☐ Current L or B permit (original)
☐ Permit copy made for records
☐ Permit expiry date verified

IDENTITY DOCUMENTS
☐ Valid passport (original)
☐ Passport valid 6+ months beyond renewal period
☐ Passport copy (all pages)
☐ Recent passport photos (if required)
☐ Photos meet Swiss standards (35mm x 45mm)

EMPLOYMENT DOCUMENTATION
☐ Current employment contract
☐ Updated employment contract (if changed)
☐ Contract shows continued employment
☐ Contract duration covers renewal period
☐ Salary statements (last 3 months)
☐ Salary meets cantonal requirements
☐ Employer confirmation letter (if required)

FINANCIAL DOCUMENTS
☐ Bank statements (last 3 months)
☐ Salary payment confirmations
☐ Tax clearance certificate
☐ Tax returns (if required by canton)
☐ Proof of financial self-sufficiency

HEALTH INSURANCE
☐ Current health insurance certificate
☐ Insurance is KVG-compliant
☐ Insurance valid for renewal period
☐ Insurance premium payments up to date
☐ Insurance certificate in official language

ACCOMMODATION
☐ Current rental agreement
☐ OR updated rental agreement
☐ Accommodation registration confirmation
☐ Proof of stable residence

========================================
INTEGRATION REQUIREMENTS (B Permit)
========================================

LANGUAGE PROFICIENCY
☐ Language certificate (if required)
☐ German/French/Italian level documented
☐ Language course completion proof
☐ Integration course certificate (if taken)

SOCIAL INTEGRATION
☐ Community involvement proof (optional)
☐ Local activities participation
☐ Cultural integration evidence
☐ Integration assessment completed (if required)

TAX COMPLIANCE
☐ All taxes paid on time
☐ Tax clearance certificate obtained
☐ No outstanding tax debts
☐ Tax compliance confirmed

CRIMINAL RECORD
☐ No new criminal convictions
☐ Clean criminal record maintained
☐ Criminal record certificate (if required)
☐ Certificate issued within 3-6 months

========================================
EMPLOYER REQUIREMENTS
========================================

EMPLOYER DOCUMENTATION
☐ Employer confirmation of continued employment
☐ Updated employer financial statements (if required)
☐ Employer tax clearance (if required)
☐ Company registration still valid

EMPLOYMENT STATUS
☐ Employment relationship stable
☐ No employment disputes
☐ Good standing with employer
☐ Performance evaluations positive (if available)

========================================
RENEWAL APPLICATION PROCESS
========================================

APPLICATION FORM
☐ Renewal application form completed
☐ Form filled accurately
☐ Form signed and dated
☐ All sections completed
☐ Supporting documents attached

SUBMISSION
☐ Application submitted to cantonal office
☐ Submission before permit expiry
☐ Submission confirmation received
☐ Application tracking number noted
☐ Contact person identified

FEES
☐ Renewal fee paid (CHF 100-250, varies by canton)
☐ Payment receipt obtained
☐ Payment method confirmed

========================================
SPECIFIC RENEWAL SCENARIOS
========================================

L PERMIT RENEWAL (Year 1 to Year 2)
☐ Continued employment confirmed
☐ Project/work still temporary
☐ Employer justification for renewal
☐ Maximum 24 months total duration noted
☐ B permit conversion plan (if applicable)

B PERMIT ANNUAL RENEWAL
☐ Annual renewal required (non-EU)
☐ Integration progress demonstrated
☐ Language skills improved (if applicable)
☐ Tax compliance maintained
☐ Employment stability confirmed

B PERMIT TO C PERMIT (After 5/10 years)
☐ Residence duration requirement met
☐ 5 years (EU/EFTA) or 10 years (non-EU)
☐ Integration requirements met
☐ Language proficiency certified (B1)
☐ Financial independence proven
☐ C permit application prepared

EMPLOYMENT CHANGE RENEWAL
☐ New employment contract obtained
☐ New employer documentation
☐ Job change notification submitted
☐ Cantonal approval for job change
☐ Updated permit reflects new employment

========================================
COMMON RENEWAL ISSUES
========================================

EMPLOYMENT GAPS
☐ Unemployment period documented
☐ Job search evidence (if applicable)
☐ New employment secured
☐ Employment gap explanation prepared

SALARY REDUCTIONS
☐ Salary reduction explained
☐ Still meets minimum requirements
☐ Employer justification provided
☐ Cantonal approval obtained (if required)

INTEGRATION DEFICIENCIES
☐ Language improvement plan
☐ Integration course enrollment
☐ Progress documentation
☐ Extension request prepared (if needed)

TAX ISSUES
☐ Tax debts resolved
☐ Payment plans arranged
☐ Tax clearance obtained
☐ Compliance demonstrated

========================================
RENEWAL SUCCESS FACTORS
========================================

TIMELY SUBMISSION
✓ Submit 2-3 weeks before expiry
✓ Avoid last-minute submissions
✓ Allow processing time
✓ Plan for potential delays

COMPLETE DOCUMENTATION
✓ All required documents provided
✓ Documents are current and valid
✓ No missing information
✓ Quality documents submitted

COMPLIANCE
✓ All obligations met
✓ Taxes paid
✓ Insurance maintained
✓ Employment stable

INTEGRATION PROGRESS
✓ Language skills improved
✓ Social integration demonstrated
✓ Cultural adaptation shown
✓ Community involvement (optional)

========================================
RENEWAL REJECTION PREVENTION
========================================

COMMON REJECTION REASONS
☐ Late submission (after expiry)
☐ Missing documents
☐ Employment terminated
☐ Tax non-compliance
☐ Integration deficiencies
☐ Criminal convictions
☐ Insurance lapsed

PREVENTION STRATEGIES
☐ Start early (2-3 weeks before)
☐ Complete checklist thoroughly
☐ Maintain employment stability
☐ Stay tax compliant
☐ Continue integration efforts
☐ Keep insurance current
☐ Maintain clean record

========================================
POST-RENEWAL ACTIONS
========================================

APPROVAL RECEIVED
☐ Renewal approval notification received
☐ New permit validity period noted
☐ Permit card updated (if applicable)
☐ All systems updated with new dates

RENEWAL CONDITIONS
☐ Any conditions noted
☐ Conditions understood
☐ Compliance plan for conditions
☐ Follow-up scheduled

DOCUMENTATION
☐ New permit copy saved
☐ Renewal confirmation filed
☐ Next renewal date noted
☐ Calendar reminder set

========================================
LONG-TERM PLANNING
========================================

PATH TO C PERMIT
☐ Years of residence tracked
☐ Integration milestones planned
☐ Language goals set
☐ C permit eligibility researched
☐ C permit application timeline planned

CITIZENSHIP PATHWAY
☐ Citizenship requirements researched
☐ Language proficiency goals
☐ Integration milestones
☐ Long-term planning completed

========================================
RENEWAL CHECKLIST SUMMARY
========================================

BEFORE RENEWAL
☐ Permit expiry date confirmed
☐ Renewal timeline planned
☐ All documents gathered
☐ Application form ready
☐ Fees prepared

DURING RENEWAL
☐ Application submitted on time
☐ Submission confirmed
☐ Tracking set up
☐ Follow-up planned

AFTER RENEWAL
☐ Approval received
☐ New permit dates noted
☐ Next renewal planned
☐ Documentation filed

========================================
LEGAL BASIS
========================================

Primary Legislation:
- AuG (Foreign Nationals Act) Art. 34-40
- VZAE (Implementation Ordinance) Art. 26-30
- Cantonal renewal regulations

Official Sources:
- SEM: sem.admin.ch
- Cantonal Migration Offices
- Integration Offices

========================================
RESOURCES
========================================

Swiss Immigration Pro:
- Employment Hub: /employment
- Renewal Guides: /resources
- Expert Support: Available in paid packs

Official Resources:
- Cantonal Migration Offices
- Integration Offices
- Tax Offices

========================================
DISCLAIMER
========================================

This renewal checklist provides comprehensive guidance but is
general information only (updated November 2025). Renewal
requirements vary by canton, permit type, and individual
circumstances. Always consult with your cantonal migration office
or a certified Swiss immigration lawyer for your specific case.

Generated: ${new Date().toLocaleDateString()}
© 2025 Swiss Immigration Pro`
  },
  'employment-integration-checklist': {
    title: 'Employment Integration Checklist',
    content: () => `SWISS IMMIGRATION PRO
Employment Integration Checklist 2025

========================================
COMPREHENSIVE INTEGRATION GUIDE
========================================

Integration is essential for permit renewal and long-term success
in Switzerland. This checklist covers all integration requirements.

========================================
LANGUAGE INTEGRATION
========================================

LANGUAGE REQUIREMENTS BY PERMIT
☐ L Permit: Basic language skills (A1-A2 recommended)
☐ B Permit: B1 level required for renewal (non-EU)
☐ B Permit: A2-B1 recommended (EU/EFTA)
☐ C Permit: B1 oral, A2 written (certified)
☐ Citizenship: B1 oral, A2 written (certified)

LANGUAGE LEARNING PLAN
☐ Target language identified (German/French/Italian)
☐ Language level assessed (current level)
☐ Target level determined (B1/B2)
☐ Learning plan created
☐ Language course enrolled
☐ Study schedule established
☐ Practice opportunities identified

LANGUAGE COURSES
☐ Language school researched
☐ Course level appropriate
☐ Course schedule fits work schedule
☐ Course fees budgeted
☐ Course materials obtained
☐ Regular attendance planned

LANGUAGE CERTIFICATION
☐ Certification exam researched
☐ Exam requirements understood
☐ Exam date scheduled
☐ Exam preparation completed
☐ Certificate obtained
☐ Certificate valid for permit renewal

LANGUAGE PRACTICE
☐ Speaking practice opportunities
☐ Language exchange partner found
☐ Local language groups joined
☐ Media consumption in target language
☐ Workplace language use
☐ Daily practice routine established

========================================
SOCIAL INTEGRATION
========================================

COMMUNITY INVOLVEMENT
☐ Local community groups identified
☐ Hobby groups joined
☐ Sports clubs joined
☐ Cultural associations joined
☐ Volunteer opportunities found
☐ Regular participation planned

SOCIAL NETWORKING
☐ Swiss colleagues relationships built
☐ Local friends made
☐ Expat community connections
☐ Professional network expanded
☐ Social events attended regularly

CULTURAL INTEGRATION
☐ Swiss culture researched
☐ Cultural norms understood
☐ Local customs learned
☐ Cultural events attended
☐ Traditional celebrations participated
☐ Cultural adaptation demonstrated

NEIGHBORHOOD INTEGRATION
☐ Neighborhood explored
☐ Local shops and services used
☐ Neighbors relationships built
☐ Community events attended
☐ Local knowledge acquired

========================================
PROFESSIONAL INTEGRATION
========================================

WORKPLACE INTEGRATION
☐ Swiss work culture understood
☐ Workplace norms followed
☐ Colleagues relationships built
☐ Professional network expanded
☐ Industry events attended
☐ Professional development pursued

CAREER DEVELOPMENT
☐ Swiss qualifications researched
☐ Professional certifications obtained
☐ Industry knowledge updated
☐ Career advancement planned
☐ Professional goals set

NETWORKING
☐ Professional associations joined
☐ Industry events attended
☐ Networking events participated
☐ Professional contacts maintained
☐ Mentorship sought

========================================
ADMINISTRATIVE INTEGRATION
========================================

BUREAUCRATIC NAVIGATION
☐ Swiss administrative system understood
☐ Important offices located
☐ Administrative procedures learned
☐ Forms and applications mastered
☐ Deadlines tracked

ESSENTIAL SERVICES
☐ Health insurance understood and used
☐ Banking system navigated
☐ Tax system understood
☐ Social security system learned
☐ Public services accessed

DOCUMENTATION
☐ Important documents organized
☐ Administrative records maintained
☐ Deadlines tracked
☐ Renewals planned
☐ Compliance maintained

========================================
FINANCIAL INTEGRATION
========================================

BANKING
☐ Swiss bank account opened
☐ Banking services understood
☐ Online banking set up
☐ Payment systems learned
☐ Financial planning done

TAX INTEGRATION
☐ Swiss tax system understood
☐ Tax obligations met
☐ Tax returns filed on time
☐ Tax advisor consulted (if needed)
☐ Tax compliance maintained

INSURANCE
☐ Health insurance understood
☐ Insurance coverage optimized
☐ Additional insurance considered
☐ Insurance claims process learned

FINANCIAL PLANNING
☐ Budget created
☐ Savings plan established
☐ Retirement planning considered
☐ Investment options researched
☐ Financial goals set

========================================
HOUSING INTEGRATION
========================================

ACCOMMODATION
☐ Stable housing secured
☐ Rental market understood
☐ Tenant rights learned
☐ Housing contracts understood
☐ Maintenance responsibilities known

NEIGHBORHOOD
☐ Neighborhood explored
☐ Local amenities identified
☐ Public transport learned
☐ Local services located
☐ Community resources found

HOUSING STABILITY
☐ Long-term housing plan
☐ Housing stability demonstrated
☐ Good tenant record maintained
☐ Housing compliance met

========================================
EDUCATION INTEGRATION (If Applicable)
========================================

CHILDREN EDUCATION
☐ Swiss school system researched
☐ School enrollment completed
☐ Parent-teacher relationships built
☐ School events attended
☐ Educational support provided

ADULT EDUCATION
☐ Further education considered
☐ Swiss qualifications researched
☐ Training opportunities identified
☐ Professional development pursued
☐ Lifelong learning embraced

========================================
HEALTH INTEGRATION
========================================

HEALTHCARE SYSTEM
☐ Swiss healthcare system understood
☐ Health insurance coverage known
☐ Doctors and specialists found
☐ Healthcare services accessed
☐ Preventive care maintained

WELLNESS
☐ Healthy lifestyle maintained
☐ Sports and fitness activities
☐ Mental health support accessed
☐ Work-life balance achieved

========================================
LEGAL INTEGRATION
========================================

LEGAL AWARENESS
☐ Swiss laws researched
☐ Legal rights understood
☐ Legal obligations known
☐ Legal support identified
☐ Compliance maintained

PERMIT COMPLIANCE
☐ Permit conditions understood
☐ Permit obligations met
☐ Renewal requirements known
☐ Compliance demonstrated
☐ Violations avoided

========================================
INTEGRATION MILESTONES
========================================

YEAR 1 MILESTONES
☐ Basic language skills (A2)
☐ Employment stable
☐ Housing secured
☐ Basic services accessed
☐ Initial social connections

YEAR 2-3 MILESTONES
☐ Intermediate language (B1)
☐ Social network expanded
☐ Cultural adaptation progressed
☐ Professional integration advanced
☐ Administrative systems mastered

YEAR 4-5 MILESTONES
☐ Advanced language (B2)
☐ Strong social integration
☐ Deep cultural understanding
☐ Professional success
☐ C permit eligibility

YEAR 6-10 MILESTONES
☐ Fluent language (C1)
☐ Complete integration
☐ Citizenship eligibility
☐ Long-term stability
☐ Full participation

========================================
INTEGRATION ASSESSMENT
========================================

SELF-ASSESSMENT
☐ Language level assessed
☐ Integration progress evaluated
☐ Areas for improvement identified
☐ Goals set and tracked
☐ Progress documented

EXTERNAL ASSESSMENT
☐ Integration course completed (if required)
☐ Integration test passed (if required)
☐ Official assessment completed
☐ Integration certificate obtained
☐ Assessment results documented

========================================
INTEGRATION SUPPORT
========================================

PROFESSIONAL SUPPORT
☐ Integration counselor consulted
☐ Language tutor engaged
☐ Career advisor consulted
☐ Legal advisor available
☐ Support network established

COMMUNITY SUPPORT
☐ Expat groups joined
☐ Integration programs participated
☐ Community resources accessed
☐ Peer support received
☐ Mentorship obtained

========================================
INTEGRATION DOCUMENTATION
========================================

CERTIFICATES
☐ Language certificates obtained
☐ Integration course certificates
☐ Professional certifications
☐ All certificates filed safely

DOCUMENTATION
☐ Integration progress documented
☐ Milestones recorded
☐ Achievements noted
☐ Documentation organized
☐ Ready for permit renewal

========================================
COMMON INTEGRATION CHALLENGES
========================================

LANGUAGE BARRIERS
☐ Challenge: Language learning difficulty
☐ Solution: Structured courses, practice, immersion
☐ Support: Language schools, tutors, exchange

CULTURAL DIFFERENCES
☐ Challenge: Cultural adaptation
☐ Solution: Research, observation, participation
☐ Support: Cultural associations, expat groups

SOCIAL ISOLATION
☐ Challenge: Building social network
☐ Solution: Active participation, openness
☐ Support: Community groups, events

PROFESSIONAL INTEGRATION
☐ Challenge: Workplace integration
☐ Solution: Cultural awareness, networking
☐ Support: Professional associations, mentors

========================================
INTEGRATION SUCCESS TIPS
========================================

LANGUAGE
✓ Start learning immediately
✓ Practice daily
✓ Immerse yourself
✓ Take structured courses
✓ Get certified

SOCIAL
✓ Be open and friendly
✓ Join groups and clubs
✓ Attend events
✓ Build relationships
✓ Participate actively

CULTURAL
✓ Research Swiss culture
✓ Observe and learn
✓ Respect local customs
✓ Adapt gradually
✓ Embrace differences

PROFESSIONAL
✓ Understand work culture
✓ Build professional network
✓ Develop Swiss qualifications
✓ Advance career
✓ Contribute meaningfully

========================================
INTEGRATION TIMELINE
========================================

MONTHS 1-6
☐ Basic language learning
☐ Employment stability
☐ Housing secured
☐ Essential services accessed
☐ Initial social connections

MONTHS 7-12
☐ Language improvement
☐ Social network expansion
☐ Cultural learning
☐ Professional integration
☐ Administrative mastery

YEARS 2-3
☐ Intermediate language (B1)
☐ Strong social integration
☐ Cultural adaptation
☐ Professional success
☐ Integration assessment

YEARS 4-5
☐ Advanced language (B2)
☐ Complete social integration
☐ Deep cultural understanding
☐ Professional advancement
☐ C permit preparation

YEARS 6-10
☐ Fluent language (C1)
☐ Full integration
☐ Citizenship preparation
☐ Long-term stability
☐ Complete participation

========================================
LEGAL BASIS
========================================

Primary Legislation:
- AuG (Foreign Nationals Act) Art. 54a
- VZAE (Implementation Ordinance) Art. 85a-85c
- Integration Ordinance (VIntA)
- Cantonal integration regulations

Official Sources:
- SEM Integration: sem.admin.ch
- Cantonal Integration Offices
- Integration Courses

========================================
RESOURCES
========================================

Swiss Immigration Pro:
- Employment Hub: /employment
- Integration Guides: /resources
- Expert Support: Available in paid packs

Official Resources:
- Integration Offices
- Language Schools
- Integration Courses
- Community Centers

========================================
DISCLAIMER
========================================

This integration checklist provides comprehensive guidance but is
general information only (updated November 2025). Integration
requirements vary by canton, permit type, and individual
circumstances. Always consult with your cantonal integration
office or a certified Swiss immigration advisor for your specific
integration plan.

Generated: ${new Date().toLocaleDateString()}
© 2025 Swiss Immigration Pro`
  },
  'employment-tax-benefits-checklist': {
    title: 'Employment Tax & Benefits Checklist',
    content: () => `SWISS IMMIGRATION PRO
Employment Tax & Benefits Checklist 2025

========================================
COMPREHENSIVE TAX & BENEFITS GUIDE
========================================

Understanding Swiss taxes and benefits is essential for financial
planning and permit compliance. This checklist covers everything.

========================================
TAX OBLIGATIONS
========================================

TAX RESIDENCY
☐ Tax residency status determined
☐ Resident vs. non-resident status understood
☐ Tax obligations clarified
☐ Double taxation agreements researched
☐ Tax advisor consulted (if needed)

INCOME TAX
☐ Income tax system understood
☐ Tax brackets researched
☐ Effective tax rate calculated
☐ Tax deductions identified
☐ Tax optimization strategies considered

CANTONAL TAXES
☐ Cantonal tax rates researched
☐ Municipal tax rates researched
☐ Federal tax rates understood
☐ Total tax burden calculated
☐ Tax comparison by canton done

TAX FILING
☐ Tax filing requirements understood
☐ Filing deadlines noted
☐ Tax forms obtained
☐ Tax documents organized
☐ Tax return prepared
☐ Tax return filed on time
☐ Tax payment made

TAX DEDUCTIONS
☐ Deductible expenses identified
☐ Professional expenses documented
☐ Health insurance premiums
☐ Pension contributions
☐ Other deductions claimed

========================================
SOCIAL SECURITY CONTRIBUTIONS
========================================

AHV/AVS (Old Age Pension)
☐ AHV contributions understood
☐ Contribution rate known (8.7% of salary)
☐ Employer contribution (50%)
☐ Employee contribution (50%)
☐ Contribution limits known

IV/AI (Disability Insurance)
☐ IV contributions understood
☐ Contribution rate known (1.4% of salary)
☐ Coverage understood
☐ Benefits researched

ALV/AC (Unemployment Insurance)
☐ ALV contributions understood
☐ Contribution rate known (2.2% of salary)
☐ Eligibility requirements known
☐ Benefits researched
☐ Claim process understood

EO/APG (Loss of Earnings)
☐ EO contributions understood
☐ Contribution rate known (0.5% of salary)
☐ Coverage for military service
☐ Benefits researched

TOTAL SOCIAL SECURITY
☐ Total contribution rate calculated (~13%)
☐ Employer share understood
☐ Employee share understood
☐ Net salary calculated
☐ Benefits eligibility confirmed

========================================
HEALTH INSURANCE
========================================

KVG REQUIREMENTS
☐ Health insurance mandatory (KVG)
☐ Insurance policy obtained
☐ Premium calculated
☐ Deductible chosen
☐ Coverage understood

INSURANCE OPTIONS
☐ Insurance model selected
☐ Basic insurance (Grundversicherung)
☐ Supplementary insurance considered
☐ Insurance comparison done
☐ Best option chosen

INSURANCE COSTS
☐ Monthly premium calculated
☐ Deductible amount chosen
☐ Co-payment understood
☐ Total annual cost estimated
☐ Budget allocated

INSURANCE BENEFITS
☐ Coverage scope understood
☐ Medical services covered
☐ Hospital coverage
☐ Prescription coverage
☐ Preventive care coverage

========================================
PENSION SYSTEM
========================================

THREE-PILLAR SYSTEM
☐ Pillar 1 (AHV) understood
☐ Pillar 2 (BVG) understood
☐ Pillar 3 (Private) considered
☐ Total pension strategy planned

BVG (Occupational Pension)
☐ BVG contributions understood
☐ Employer contribution
☐ Employee contribution
☐ Pension fund selected
☐ Benefits calculated

PILLAR 3A (Tax-Advantaged)
☐ Pillar 3A account opened
☐ Annual contribution limit known (CHF 7,056)
☐ Tax deduction benefit
☐ Investment options researched
☐ Contribution plan established

PILLAR 3B (Private)
☐ Private pension considered
☐ Investment options researched
☐ Tax implications understood
☐ Retirement planning done

========================================
EMPLOYMENT BENEFITS
========================================

SALARY COMPONENTS
☐ Base salary confirmed
☐ 13th month salary (if applicable)
☐ Bonuses structure understood
☐ Equity/stock options (if applicable)
☐ Total compensation calculated

VACATION & TIME OFF
☐ Vacation days entitlement (minimum 20)
☐ Public holidays understood
☐ Sick leave policy
☐ Maternity/paternity leave
☐ Other leave types

WORKING CONDITIONS
☐ Working hours per week
☐ Overtime policy
☐ Flexible working arrangements
☐ Remote work options
☐ Work-life balance

ADDITIONAL BENEFITS
☐ Company car (if applicable)
☐ Meal vouchers (Lunch checks)
☐ Gym membership
☐ Training and development
☐ Other perks

========================================
TAX OPTIMIZATION
========================================

LEGAL DEDUCTIONS
☐ Professional expenses
☐ Commuting costs
☐ Home office expenses
☐ Professional development
☐ Other deductible expenses

TAX PLANNING
☐ Tax-efficient salary structure
☐ Pillar 3A contributions maximized
☐ Deductions optimized
☐ Tax advisor consulted
☐ Long-term tax strategy

CANTONAL OPTIMIZATION
☐ Low-tax cantons researched
☐ Tax rates compared
☐ Relocation considered (if applicable)
☐ Tax optimization opportunities

========================================
FINANCIAL PLANNING
========================================

BUDGET PLANNING
☐ Monthly budget created
☐ Income calculated (net)
☐ Expenses categorized
☐ Savings plan established
☐ Emergency fund planned

COST OF LIVING
☐ Housing costs budgeted
☐ Food and groceries
☐ Transportation costs
☐ Health insurance
☐ Other living expenses

SAVINGS STRATEGY
☐ Savings goals set
☐ Savings rate determined
☐ Investment strategy planned
☐ Retirement planning
☐ Financial goals tracked

========================================
BANKING & FINANCIAL SERVICES
========================================

BANK ACCOUNT
☐ Swiss bank account opened
☐ Account type selected
☐ Banking services understood
☐ Online banking set up
☐ Payment methods learned

BANKING FEES
☐ Account fees understood
☐ Transaction fees known
☐ Foreign exchange fees
☐ Banking costs optimized

FINANCIAL SERVICES
☐ Credit cards considered
☐ Loans and mortgages researched
☐ Investment services
☐ Insurance products
☐ Financial advisor consulted

========================================
TAX COMPLIANCE
========================================

TAX FILING DEADLINES
☐ Federal tax deadline (March 31)
☐ Cantonal deadlines vary
☐ Extension requests (if needed)
☐ Late filing penalties understood
☐ Compliance maintained

TAX DOCUMENTATION
☐ Tax documents organized
☐ Receipts kept
☐ Expense documentation
☐ Income documentation
☐ Tax records maintained

TAX AUDIT PREPARATION
☐ Records organized
☐ Documentation complete
☐ Compliance demonstrated
☐ Professional support available

========================================
BENEFITS ELIGIBILITY
========================================

SOCIAL BENEFITS
☐ Unemployment benefits eligibility
☐ Disability benefits eligibility
☐ Maternity benefits eligibility
☐ Other social benefits
☐ Claim processes understood

FAMILY BENEFITS
☐ Child allowances (if applicable)
☐ Family allowances
☐ Education benefits
☐ Other family support

HEALTH BENEFITS
☐ Health insurance benefits
☐ Preventive care benefits
☐ Maternity care benefits
☐ Other health services

========================================
RETIREMENT PLANNING
========================================

PENSION CALCULATION
☐ AHV pension estimated
☐ BVG pension estimated
☐ Total pension calculated
☐ Pension gap identified
☐ Supplementation planned

RETIREMENT GOALS
☐ Retirement age target
☐ Retirement income goal
☐ Savings required calculated
☐ Investment strategy
☐ Retirement plan created

RETIREMENT ACCOUNTS
☐ Pillar 3A maximized
☐ Pillar 3B considered
☐ Investment strategy
☐ Risk tolerance assessed
☐ Portfolio diversified

========================================
TAX TREATIES & AGREEMENTS
========================================

DOUBLE TAXATION
☐ Home country tax treaty researched
☐ Double taxation avoided
☐ Tax credit mechanisms
☐ Tax advisor consulted
☐ Compliance maintained

FOREIGN INCOME
☐ Foreign income reporting
☐ Tax obligations understood
☐ Foreign tax credits
☐ Compliance maintained

ASSETS ABROAD
☐ Foreign assets declared
☐ Reporting requirements met
☐ Tax implications understood
☐ Compliance maintained

========================================
TAX SEASON PREPARATION
========================================

DOCUMENT GATHERING
☐ Salary statements collected
☐ Bank statements gathered
☐ Expense receipts organized
☐ Insurance certificates
☐ Other tax documents

TAX RETURN PREPARATION
☐ Tax forms obtained
☐ Information entered accurately
☐ Deductions claimed
☐ Calculations verified
☐ Review completed

TAX FILING
☐ Return filed on time
☐ Payment made (if owed)
☐ Confirmation received
☐ Records filed
☐ Next year planned

========================================
FINANCIAL ADVISORS
========================================

WHEN TO CONSULT
☐ Complex tax situation
☐ High income levels
☐ Multiple income sources
☐ Foreign assets
☐ Tax optimization needed

ADVISOR SELECTION
☐ Qualified tax advisor found
☐ Credentials verified
☐ Experience confirmed
☐ Fees understood
☐ Services agreed

ONGOING SUPPORT
☐ Regular consultations
☐ Tax planning sessions
☐ Compliance monitoring
☐ Strategy adjustments
☐ Long-term relationship

========================================
COMMON TAX MISTAKES
========================================

AVOID THESE ERRORS
☐ Missing filing deadlines
☐ Incomplete documentation
☐ Missing deductions
☐ Incorrect calculations
☐ Non-compliance

PREVENTION
☐ Start early
☐ Stay organized
☐ Keep receipts
☐ Consult professionals
☐ File on time

========================================
BENEFITS MAXIMIZATION
========================================

OPTIMIZE BENEFITS
☐ All eligible benefits claimed
☐ Benefits packages compared
☐ Employer benefits maximized
☐ Government benefits accessed
☐ Private benefits considered

COST REDUCTION
☐ Tax deductions maximized
☐ Insurance optimized
☐ Banking costs minimized
☐ Living costs optimized
☐ Overall efficiency improved

========================================
FINANCIAL CHECKLIST SUMMARY
========================================

TAXES
☐ Tax obligations understood
☐ Tax returns filed on time
☐ Tax compliance maintained
☐ Tax optimization done

SOCIAL SECURITY
☐ Contributions understood
☐ Benefits eligibility known
☐ Benefits claimed (if applicable)
☐ Compliance maintained

INSURANCE
☐ Health insurance obtained
☐ Coverage optimized
☐ Costs managed
☐ Benefits understood

PENSION
☐ Pension system understood
☐ Contributions made
☐ Retirement planned
☐ Goals set

FINANCIAL PLANNING
☐ Budget created
☐ Savings plan established
☐ Investments considered
☐ Long-term goals set

========================================
LEGAL BASIS
========================================

Primary Legislation:
- Federal Tax Law (DBG)
- Cantonal Tax Laws
- Social Security Law (AHVG)
- Health Insurance Law (KVG)
- Occupational Pension Law (BVG)

Official Sources:
- Federal Tax Administration: estv.admin.ch
- Cantonal Tax Offices
- Social Security Office: ahv-iv.ch
- Health Insurance: bag.admin.ch

========================================
RESOURCES
========================================

Swiss Immigration Pro:
- Employment Hub: /employment
- Tax Guides: /resources
- Expert Support: Available in paid packs

Official Resources:
- Tax Administration
- Social Security Office
- Health Insurance Providers
- Pension Funds

========================================
DISCLAIMER
========================================

This tax and benefits checklist provides comprehensive guidance
but is general information only (updated November 2025). Tax
and benefit requirements vary by canton, income level, and
individual circumstances. Always consult with a qualified tax
advisor or financial professional for your specific situation.

Generated: ${new Date().toLocaleDateString()}
© 2025 Swiss Immigration Pro`
  },
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ resourceId: string }> }
) {
  try {
    const { resourceId } = await params
    const resource = RESOURCE_CONTENT[resourceId]

    if (!resource) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      )
    }

    // Create PDF
    const JsPDF = await getJsPDF()
    const doc = new JsPDF()
    const content = resource.content()
    const lines = content.split('\n')
    
    let yPos = 20
    const pageHeight = doc.internal.pageSize.height
    const margin = 20
    const lineHeight = 7
    const maxWidth = 170

    // Add title
    doc.setFontSize(16)
    doc.setFont(undefined, 'bold')
    doc.text(resource.title, margin, yPos)
    yPos += 10

    // Add content
    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')
    
    for (const line of lines) {
      if (yPos > pageHeight - margin) {
        doc.addPage()
        yPos = margin
      }

      // Handle special formatting
      if (line.startsWith('===')) {
        // Section divider - skip or style differently
        yPos += 5
        continue
      }

      if (line.trim().startsWith('☐')) {
        // Checklist item
        doc.setFont(undefined, 'normal')
        doc.text('☐', margin, yPos)
        doc.text(line.substring(1).trim(), margin + 5, yPos)
        yPos += lineHeight
        continue
      }

      if (line.trim().length === 0) {
        yPos += 3
        continue
      }

      // Bold headers (all caps or specific patterns)
      if (line === line.toUpperCase() && line.length > 3 && !line.includes(' ')) {
        doc.setFont(undefined, 'bold')
        doc.setFontSize(12)
        yPos += 5
        doc.text(line, margin, yPos)
        yPos += lineHeight
        doc.setFontSize(10)
        doc.setFont(undefined, 'normal')
        continue
      }

      // Regular text - wrap if needed
      const wrapped = doc.splitTextToSize(line, maxWidth)
      doc.text(wrapped, margin, yPos)
      yPos += wrapped.length * lineHeight
    }

    // Generate PDF buffer
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'))

    // Return PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${resourceId}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}

