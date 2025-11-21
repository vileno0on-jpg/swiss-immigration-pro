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

