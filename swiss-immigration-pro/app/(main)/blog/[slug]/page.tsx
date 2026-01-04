import { Metadata } from 'next'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import { Calendar, Clock, Tag } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import MainHeader from '@/components/layout/MainHeader'
import { generateMetadata as generateMeta, generateFAQSchema, generateArticleSchema, formatLastUpdated } from '@/lib/seo/meta-helpers'

// Blog posts data - in production, this would come from a CMS or markdown files
const BLOG_POSTS: Record<string, {
  slug: string
  title: string
  description: string
  content: string
  publishedAt: string
  updatedAt?: string
  author: string
  tags: string[]
  category: string
  ogImage?: string
  faqs?: Array<{ question: string; answer: string }>
}> = {
  'swiss-l-permit-guide': {
    slug: 'swiss-l-permit-guide',
    title: 'Complete Guide to Swiss L Permit (Short-term Residence)',
    description: 'Everything you need to know about the Swiss L permit: requirements, application process, timeline, and tips for success. Updated for 2025.',
    content: `# Complete Guide to Swiss L Permit (Short-term Residence)

The Swiss L permit is a short-term residence permit for temporary employment in Switzerland. This comprehensive guide covers everything you need to know.

## What is the L Permit?

The L permit allows you to work in Switzerland for up to 12 months (renewable for a maximum of 24 months total). It's designed for:

- Temporary employment contracts
- Project-based work
- Seasonal employment
- Short-term assignments

## Requirements

### Basic Requirements

- Valid employment contract (minimum 12 months)
- Salary meeting cantonal minimums
- Health insurance (KVG-compliant)
- Valid passport
- Educational certificates (apostilled if non-EU)
- Criminal record certificate

### Quota System

For non-EU/EFTA citizens, the L permit is subject to annual quotas:
- **2025 Quota**: 4,000 permits total
- Quotas fill quickly, especially in popular cantons like Zurich and Geneva
- Early application is crucial

## Application Process

1. **Document Preparation** (2-4 weeks)
   - Gather all required documents
   - Get apostilles for non-EU documents
   - Secure health insurance

2. **Application Submission** (1-2 weeks)
   - Submit to cantonal migration office
   - Pay application fees (CHF 100-250)

3. **Processing** (4-8 weeks)
   - Cantonal review
   - SEM (State Secretariat for Migration) approval
   - Quota verification

4. **Decision** (1-2 weeks)
   - Receive permit decision
   - Collect permit card

## Timeline

- **Total Time**: 8-12 weeks for non-EU citizens
- **EU/EFTA Citizens**: 2-4 weeks (no quota)
- **Processing**: 4-8 weeks after submission

## Tips for Success

1. **Apply Early**: Quotas fill fast, especially in Q1-Q2
2. **Choose Right Canton**: Some cantons have better approval rates
3. **Salary Matters**: Ensure salary meets cantonal minimums
4. **Complete Documentation**: Missing documents cause delays
5. **Health Insurance**: Must be KVG-compliant

## Renewal

The L permit can be renewed once for a maximum total of 24 months. After that, you must either:
- Convert to B permit (if eligible)
- Leave Switzerland
- Apply for a new L permit (subject to quota)

## Common Mistakes

1. Waiting too long to apply (quota exhaustion)
2. Incomplete documentation
3. Wrong canton selection
4. Insufficient salary justification
5. Non-compliant health insurance

## Next Steps

Ready to apply? Check our [permit calculator](/tools/permit-calculator) to assess your eligibility and get personalized guidance.`,
    publishedAt: '2025-01-15',
    updatedAt: '2025-01-20',
    author: 'Swiss Immigration Pro',
    tags: ['L Permit', 'Work Permit', 'Swiss Visa', 'Immigration'],
    category: 'Permits & Visas',
    ogImage: '/images/blog/l-permit-guide.jpg',
    faqs: [
      {
        question: 'How long does it take to get an L permit?',
        answer: 'For non-EU citizens, the L permit typically takes 8-12 weeks from application submission. EU/EFTA citizens can expect 2-4 weeks as they are not subject to quotas.',
      },
      {
        question: 'Can I renew my L permit?',
        answer: 'Yes, the L permit can be renewed once for a maximum total of 24 months. After that, you must convert to a B permit or leave Switzerland.',
      },
      {
        question: 'What is the quota for L permits in 2025?',
        answer: 'The 2025 quota for L permits is 4,000 permits for non-EU/EFTA citizens. These quotas fill quickly, especially in popular cantons.',
      },
      {
        question: 'Do I need health insurance for an L permit?',
        answer: 'Yes, health insurance is mandatory and must be KVG-compliant (Swiss health insurance law). Non-compliant insurance will result in rejection.',
      },
      {
        question: 'What salary do I need for an L permit?',
        answer: 'Salary requirements vary by canton, but generally you need to meet the cantonal minimum wage. For competitive applications, salaries above CHF 80k are recommended.',
      },
    ],
  },
  'swiss-b-permit-complete-guide': {
    slug: 'swiss-b-permit-complete-guide',
    title: 'Swiss B Permit: Complete Guide to Long-term Residence',
    description: 'Master the Swiss B permit application process. Learn about requirements, timeline, renewal, and path to permanent residence.',
    content: `# Swiss B Permit: Complete Guide to Long-term Residence

The B permit is Switzerland's long-term residence permit for employed persons. This guide covers everything you need to know.

## What is the B Permit?

The B permit allows you to live and work in Switzerland for up to 5 years (renewable). It's the most common permit for long-term employment.

## Requirements

- Employment contract (unlimited or 5+ years)
- Salary above CHF 90k (recommended CHF 100k+)
- Integration proof (language, social)
- Health insurance (KVG-compliant)
- Valid passport
- Educational certificates

## Application Timeline

- **Total Time**: 8-12 weeks
- **Processing**: 6-10 weeks after submission

## Renewal

B permits are renewable every 5 years, provided you maintain employment and integration requirements.

## Path to Permanent Residence

After 10 years with B permit, you can apply for C permit (permanent residence).`,
    publishedAt: '2025-01-10',
    updatedAt: '2025-01-18',
    author: 'Swiss Immigration Pro',
    tags: ['B Permit', 'Residence Permit', 'Swiss Visa'],
    category: 'Permits & Visas',
    faqs: [
      {
        question: 'How long is a B permit valid?',
        answer: 'The B permit is valid for 5 years and can be renewed indefinitely as long as you maintain employment and meet integration requirements.',
      },
      {
        question: 'Can I change jobs with a B permit?',
        answer: 'Yes, you can change jobs with a B permit, but you must notify the cantonal migration office and may need to provide proof of new employment.',
      },
    ],
  },
  'swiss-citizenship-guide': {
    slug: 'swiss-citizenship-guide',
    title: 'Swiss Citizenship: Complete Naturalization Guide 2025',
    description: 'Everything about Swiss citizenship: requirements, process, timeline, and tips for successful naturalization.',
    content: `# Swiss Citizenship: Complete Naturalization Guide 2025

Swiss citizenship offers numerous benefits including EU freedom of movement, voting rights, and permanent residency.

## Requirements

- 10 years residence (5 years for EU/EFTA)
- C permit holder
- Language proficiency (B1 oral, A2 written)
- Integration proof
- No criminal record
- Financial independence

## Process

1. Application submission
2. Language test
3. Integration interview
4. Cantonal review
5. Federal approval

## Timeline

- **Total Time**: 2-3 years
- **Processing**: 18-24 months`,
    publishedAt: '2025-01-05',
    author: 'Swiss Immigration Pro',
    tags: ['Citizenship', 'Naturalization', 'Swiss Passport'],
    category: 'Citizenship',
    faqs: [
      {
        question: 'How long do I need to live in Switzerland for citizenship?',
        answer: 'You need 10 years of residence for ordinary naturalization, or 5 years if you are an EU/EFTA citizen.',
      },
      {
        question: 'What language level do I need for citizenship?',
        answer: 'You need B1 oral and A2 written proficiency in the local language (German, French, Italian, or Romansh).',
      },
    ],
  },
}

// Generate metadata for each blog post
export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS[slug]

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return generateMeta({
    title: post.title,
    description: post.description,
    keywords: post.tags,
    image: post.ogImage,
    url: `/blog/${slug}`,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    author: post.author,
    section: post.category,
    tags: post.tags,
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = BLOG_POSTS[slug]

  if (!post) {
    notFound()
  }

  const faqSchema = post.faqs ? generateFAQSchema(post.faqs) : null
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.description,
    image: post.ogImage,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    author: post.author,
    url: `/blog/${slug}`,
  })

  return (
    <>
      {/* JSON-LD Structured Data */}
      {faqSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <div className="min-h-screen bg-white">
        <MainHeader />

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <header className="mb-12">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                <Tag className="w-4 h-4" />
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.description}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 border-b border-gray-200 pb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>

              {post.updatedAt && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-100 text-green-800 font-medium">
                    {formatLastUpdated(post.updatedAt)}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <span>By {post.author}</span>
              </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* FAQ Section */}
          {post.faqs && post.faqs.length > 0 && (
            <section className="mt-16 pt-12 border-t border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {post.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </>
  )
}
