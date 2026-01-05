import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { Calendar, Clock, Tag, FileText } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import MainHeader from '@/components/layout/MainHeader'
import { generateMetadata as generateMeta, generateFAQSchema, generateArticleSchema, generateBreadcrumbSchema, formatLastUpdated } from '@/lib/seo/meta-helpers'

// Parse frontmatter from markdown
function parseFrontmatter(content: string): {
  frontmatter: Record<string, any>
  body: string
} {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return { frontmatter: {}, body: content }
  }

  const frontmatterText = match[1]
  const body = match[2]

  const frontmatter: Record<string, any> = {}
  frontmatterText.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim()
      let value = line.substring(colonIndex + 1).trim()

      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }

      // Parse arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value
          .slice(1, -1)
          .split(',')
          .map((item) => item.trim().replace(/^["']|["']$/g, ''))
      }

      frontmatter[key] = value
    }
  })

  return { frontmatter, body }
}

// Get all visa markdown files
function getAllVisaSlugs(): string[] {
  try {
    const contentDir = join(process.cwd(), 'content', 'visas')
    const files = readdirSync(contentDir)
    return files
      .filter((file: string) => file.endsWith('.md'))
      .map((file: string) => file.replace('.md', ''))
  } catch {
    return []
  }
}

// Get visa post by slug
function getVisaPost(slug: string): {
  frontmatter: Record<string, any>
  content: string
} | null {
  try {
    const filePath = join(process.cwd(), 'content', 'visas', `${slug}.md`)
    const fileContent = readFileSync(filePath, 'utf-8')
    const { frontmatter, body } = parseFrontmatter(fileContent)
    return { frontmatter, content: body }
  } catch {
    return null
  }
}

// Generate static params for all visa pages
export async function generateStaticParams() {
  const slugs = getAllVisaSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

// Generate metadata for each visa page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getVisaPost(slug)

  if (!post) {
    return {
      title: 'Visa Guide Not Found',
    }
  }

  const { frontmatter } = post

  // Extract FAQs from content (look for FAQ section)
  const faqs: Array<{ question: string; answer: string }> = []
  const faqSection = post.content.match(/## Frequently Asked Questions\n([\s\S]*?)(?=\n## |$)/)
  if (faqSection) {
    const faqMatches = faqSection[1].matchAll(/### (.+?)\n\n(.+?)(?=\n### |$)/g)
    for (const match of faqMatches) {
      faqs.push({
        question: match[1].trim(),
        answer: match[2].trim(),
      })
    }
  }

  return generateMeta({
    title: frontmatter.title || 'Swiss Visa Guide',
    description: frontmatter.description || '',
    keywords: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    image: frontmatter.ogImage || '/og-image.jpg', // Ensure og:image is always set
    url: `/visas/${slug}`,
    type: 'article',
    publishedTime: frontmatter.publishedAt,
    modifiedTime: frontmatter.updatedAt,
    author: frontmatter.author || 'Swiss Immigration Pro',
    section: frontmatter.category,
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
  })
}

export default async function VisaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getVisaPost(slug)

  if (!post) {
    notFound()
  }

  const { frontmatter, content } = post

  // Extract FAQs from content
  const faqs: Array<{ question: string; answer: string }> = []
  const faqSection = content.match(/## Frequently Asked Questions\n([\s\S]*?)(?=\n## |$)/)
  if (faqSection) {
    const faqMatches = Array.from(faqSection[1].matchAll(/### (.+?)\n\n(.+?)(?=\n### |$)/gs))
    for (const match of faqMatches) {
      faqs.push({
        question: match[1].trim(),
        answer: match[2].trim(),
      })
    }
  }

  const faqSchema = faqs.length > 0 ? generateFAQSchema(faqs) : null
  const articleSchema = generateArticleSchema({
    title: frontmatter.title || 'Swiss Visa Guide',
    description: frontmatter.description || '',
    image: frontmatter.ogImage || '/og-image.jpg', // Ensure og:image is set
    publishedTime: frontmatter.publishedAt || new Date().toISOString(),
    modifiedTime: frontmatter.updatedAt,
    author: frontmatter.author || 'Swiss Immigration Pro',
    url: `/visas/${slug}`,
  })
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Visas & Permits', url: '/visas' },
    { name: frontmatter.title || 'Swiss Visa Guide', url: `/visas/${slug}` },
  ])

  // Remove FAQ section from content (we'll render it separately)
  const contentWithoutFAQ = content.replace(/## Frequently Asked Questions\n[\s\S]*$/, '')

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
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
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
                {frontmatter.category || 'Permits & Visas'}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {frontmatter.title || 'Swiss Visa Guide'}
            </h1>

            {frontmatter.description && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {frontmatter.description}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 border-b border-gray-200 pb-6">
              {frontmatter.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={frontmatter.publishedAt}>
                    {new Date(frontmatter.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              )}

              {frontmatter.updatedAt && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-100 text-green-800 font-medium">
                    {formatLastUpdated(frontmatter.updatedAt)}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>By {frontmatter.author || 'Swiss Immigration Pro'}</span>
              </div>
            </div>

            {/* Tags */}
            {Array.isArray(frontmatter.tags) && frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {frontmatter.tags.map((tag: string) => (
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
          <div className="prose prose-lg max-w-none mb-12">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {contentWithoutFAQ}
            </ReactMarkdown>
          </div>

          {/* FAQ Section */}
          {faqs.length > 0 && (
            <section className="mt-16 pt-12 border-t border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <div className="prose prose-sm max-w-none text-gray-700">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {faq.answer}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Links */}
          <section className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="/tools/permit-calculator"
                className="block p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Permit Calculator</h3>
                <p className="text-sm text-gray-600">Assess your eligibility for Swiss permits</p>
              </a>
              <a
                href="/consultation"
                className="block p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Book Consultation</h3>
                <p className="text-sm text-gray-600">Get personalized guidance from our experts</p>
              </a>
            </div>
          </section>
        </article>
      </div>
    </>
  )
}
