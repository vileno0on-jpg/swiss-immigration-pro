import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { generateText, streamText } from 'ai'
import { groq } from '@ai-sdk/groq'
import { google } from '@ai-sdk/google'
import { openai } from '@ai-sdk/openai'
import { xai } from '@ai-sdk/xai'
import { HfInference } from '@huggingface/inference'
import { KNOWLEDGE_BASE, findRelevantKnowledge } from '@/lib/knowledge-base'

// Document paths - documents are in the parent directory (sip root)
const getDocumentPaths = () => {
  const parentDir = join(process.cwd(), '..')
  return [
    join(parentDir, 'weisungen-aug-f.md'),
    join(parentDir, 'hb-bueg20-kap3-f.md'),
    join(parentDir, 'hb-bueg20-kap4-f.md'),
    join(parentDir, 'weisungen-aug-kap4-f.md'),
  ]
}

// Cache for document content
let documentCache: string | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour

async function loadDocuments(): Promise<string> {
  const now = Date.now()
  
  // Return cached content if still valid
  if (documentCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return documentCache
  }

  try {
    const documents = getDocumentPaths()
    const contents = await Promise.all(
      documents.map(async (path) => {
        try {
          const content = await readFile(path, 'utf-8')
          const fileName = path.split(/[/\\]/).pop() || 'unknown'
          return `\n\n=== Document: ${fileName} ===\n\n${content}`
        } catch (error) {
          console.error(`Error reading document ${path}:`, error)
          return ''
        }
      })
    )
    
    documentCache = contents.filter(Boolean).join('\n\n')
    cacheTimestamp = now
    return documentCache
  } catch (error) {
    console.error('Error loading documents:', error)
    return ''
  }
}

// Site-wide knowledge about pages, features, and content
const SITE_KNOWLEDGE = `
# Swiss Immigration Pro - Complete Site Information

## Main Pages and Routes:

### Public Pages:
- / (Homepage) - Main landing page with live statistics, features overview
- /visas - Complete guide to all visa types (L, B, G, C permits)
- /employment - Employment hub with quota information, job market insights
- /citizenship - Swiss citizenship pathways and requirements
- /cantons - Information about all 26 Swiss cantons
- /pricing - Pricing plans (Free, Immigration Pack CHF 29, Advanced Pack CHF 69, Citizenship Pack CHF 199)
- /resources - Downloads, templates, checklists, guides
- /contact - Contact form for inquiries
- /faq - Frequently asked questions
- /about - About the platform
- /tools - Immigration tools and calculators
- /cv-templates - CV templates for Swiss job applications

### Layer-Specific Pages (based on user origin):
- /eu or /europeans - EU/EFTA citizens pathway
- /us or /americans - US/Canadian citizens pathway  
- /other or /others - Third-country nationals pathway
- Each layer has: /[layer]/visas, /[layer]/process, /[layer]/requirements, /[layer]/resources, /[layer]/quiz

### User Pages:
- /dashboard - User dashboard with progress tracking, modules, downloads
- /profile - User profile management
- /modules/[id] - Individual module content

### Auth Pages:
- /auth/login - User login
- /auth/register - User registration
- /auth/reset-password - Password reset

### Legal Pages:
- /privacy - Privacy policy
- /terms - Terms of service
- /cookie-policy - Cookie policy
- /disclaimer - Legal disclaimer
- /refund-policy - Refund policy

## Site Features:

### Pricing Tiers:
1. Free Pack: Basic guides, 10 AI chatbot messages/day, limited access
2. Immigration Pack (CHF 29): Comprehensive visa guides, checklists, CV templates, unlimited AI chatbot
3. Advanced Pack (CHF 69): All Immigration Pack features + advanced modules, job market strategies, salary negotiations, 20+ CV templates
4. Citizenship Pack (CHF 199): Everything + citizenship roadmap, cantonal deep dives, all modules

### Modules Available:
- Module 1: Swiss Immigration Fast-Track Foundations
- Module 2: Work Permit Application Process
- Module 3: CV Templates and Job Applications
- Module 4: Salary Benchmarks and Negotiations
- Module 5: Cantonal Strategies
- Module 6: Integration Requirements
- Module 7: Tax Planning
- Module 8: Family Reunification
- Module 9: Permanent Residence (C Permit)
- Module 10: Citizenship Application

### Tools Available:
- Quota calculator
- Salary benchmark tool
- Permit probability calculator
- CV builder
- Document checklist generator

### Key Statistics:
- 87% success rate
- 18,500+ successful applicants
- 26 cantons covered
- Real-time quota tracking
- Weekly SEM updates

## Important Links to Suggest:
- For visa information: /visas
- For employment: /employment
- For citizenship: /citizenship
- For pricing: /pricing
- For tools: /tools
- For resources: /resources
- For contact: /contact
- For dashboard: /dashboard (requires login)
- For modules: /modules/[id] (requires subscription)
`

// Simple text search in documents
function searchDocuments(query: string, documents: string): string {
  const queryLower = query.toLowerCase()
  const queryWords = queryLower.split(/\s+/).filter(w => w.length > 2)
  
  // Split documents into paragraphs
  const paragraphs = documents.split(/\n\n+/)
  
  // Score paragraphs based on keyword matches
  const scored = paragraphs.map(para => {
    const paraLower = para.toLowerCase()
    let score = 0
    
    queryWords.forEach(word => {
      const matches = (paraLower.match(new RegExp(word, 'g')) || []).length
      score += matches
    })
    
    // Bonus for exact phrase match
    if (paraLower.includes(queryLower)) {
      score += 10
    }
    
    return { para, score }
  })
  
  // Get top 5 most relevant paragraphs
  const topParagraphs = scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(item => item.para)
  
  return topParagraphs.join('\n\n')
}

// Get relevant links based on query
function getRelevantLinks(query: string): Array<{ label: string; url: string }> {
  const lowerQuery = query.toLowerCase()
  const links: Array<{ label: string; url: string }> = []
  
  // Find relevant knowledge entries
  const relevant = findRelevantKnowledge(query)
  relevant.forEach(entry => {
    entry.links.forEach(link => {
      if (!links.find(l => l.url === link.url)) {
        links.push(link)
      }
    })
  })
  
  // Add context-specific links
  if (lowerQuery.includes('visa') || lowerQuery.includes('permit')) {
    links.push({ label: 'All Visa Types', url: '/visas' })
  }
  if (lowerQuery.includes('job') || lowerQuery.includes('employment') || lowerQuery.includes('work')) {
    links.push({ label: 'Employment Hub', url: '/employment' })
  }
  if (lowerQuery.includes('citizenship') || lowerQuery.includes('naturalization')) {
    links.push({ label: 'Citizenship Guide', url: '/citizenship' })
  }
  if (lowerQuery.includes('canton')) {
    links.push({ label: 'Cantonal Information', url: '/cantons' })
  }
  if (lowerQuery.includes('pricing') || lowerQuery.includes('price') || lowerQuery.includes('cost')) {
    links.push({ label: 'Pricing Plans', url: '/pricing' })
  }
  if (lowerQuery.includes('module') || lowerQuery.includes('course') || lowerQuery.includes('learn')) {
    links.push({ label: 'View Modules', url: '/dashboard' })
  }
  if (lowerQuery.includes('tool') || lowerQuery.includes('calculator')) {
    links.push({ label: 'Immigration Tools', url: '/tools' })
  }
  if (lowerQuery.includes('cv') || lowerQuery.includes('resume')) {
    links.push({ label: 'CV Templates', url: '/cv-templates' })
  }
  
  // Always add helpful links
  if (links.length === 0) {
    links.push(
      { label: 'Visa Types', url: '/visas' },
      { label: 'Employment Hub', url: '/employment' },
      { label: 'Pricing Plans', url: '/pricing' }
    )
  }
  
  return links.slice(0, 5) // Limit to 5 links
}

// Try to get response from free AI models
async function getFreeAIResponse(
  query: string,
  context: string,
  siteKnowledge: string,
  relevantLinks: Array<{ label: string; url: string }>,
  conversationHistory: Array<{ role: string; content: string }>
): Promise<string | null> {
  // Limit context size to avoid token limits
  const limitedContext = context.substring(0, 6000)
  const limitedSiteKnowledge = siteKnowledge.substring(0, 2000)
  
  // Format links for the prompt
  const linksText = relevantLinks.map(link => `- [${link.label}](${link.url})`).join('\n')
  
  const systemPrompt = `You are a helpful Swiss immigration assistant for Swiss Immigration Pro (swissimmigrationpro.com). You have access to:

1. Official Swiss immigration documents (Weisungen, Handbuch chapters)
2. Complete site knowledge including all pages, features, modules, and tools
3. Knowledge base of common immigration questions

IMPORTANT INSTRUCTIONS:
- Always provide helpful, accurate information about Swiss immigration
- ALWAYS include relevant links to site pages in your responses using markdown format: [Link Text](/page-url)
- Reference specific site features, modules, or tools when relevant
- If the question is about site features, pages, or content, use the site knowledge provided
- If the question is about immigration law, use the document context provided
- Be friendly, professional, and helpful
- If you don't know something, admit it and suggest consulting a lawyer or checking official sources

Site Knowledge:
${limitedSiteKnowledge}

Document Context:
${limitedContext}

Relevant Links to Include:
${linksText}

When responding, always format links properly and include at least 2-3 relevant links to site pages.`

  const messages = [
    { role: 'system' as const, content: systemPrompt },
    ...conversationHistory.slice(-6).map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    })),
    { role: 'user' as const, content: query },
  ]

  // Try models in priority order
  const models = [
    // Groq (free tier) - BEST OPTION
    async () => {
      if (!process.env.GROQ_API_KEY) return null
      try {
        const { text } = await generateText({
          model: groq('llama-3.1-70b-versatile'),
          messages,
          maxTokens: 1500,
          temperature: 0.7,
        })
        return text
      } catch (error) {
        console.error('Groq error:', error)
        return null
      }
    },
    // Google Gemini (free tier)
    async () => {
      if (!process.env.GOOGLE_GEMINI_API_KEY) return null
      try {
        const { text } = await generateText({
          model: google('gemini-1.5-flash'),
          messages,
          maxTokens: 1500,
          temperature: 0.7,
        })
        return text
      } catch (error) {
        console.error('Gemini error:', error)
        return null
      }
    },
    // OpenAI (paid)
    async () => {
      if (!process.env.OPENAI_API_KEY) return null
      try {
        const { text } = await generateText({
          model: openai('gpt-4o-mini'),
          messages,
          maxTokens: 1500,
          temperature: 0.7,
        })
        return text
      } catch (error) {
        console.error('OpenAI error:', error)
        return null
      }
    },
    // xAI Grok (if available)
    async () => {
      if (!process.env.XAI_API_KEY) return null
      try {
        const { text } = await generateText({
          model: xai('grok-beta'),
          messages,
          maxTokens: 1500,
          temperature: 0.7,
        })
        return text
      } catch (error) {
        console.error('xAI error:', error)
        return null
      }
    },
    // Hugging Face (free, no key needed for some models)
    async () => {
      try {
        const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)
        const response = await hf.textGeneration({
          model: 'mistralai/Mistral-7B-Instruct-v0.2',
          inputs: `${systemPrompt}\n\nUser: ${query}\n\nAssistant:`,
          parameters: {
            max_new_tokens: 800,
            return_full_text: false,
            temperature: 0.7,
          },
        })
        return response.generated_text?.trim() || null
      } catch (error) {
        console.error('Hugging Face error:', error)
        return null
      }
    },
  ]

  // Try each model until one works
  for (const modelFn of models) {
    try {
      const response = await modelFn()
      if (response) {
        return response
      }
    } catch (error) {
      console.error('Model error:', error)
      continue
    }
  }

  return null
}

export async function POST(req: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await req.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Load documents
    const documents = await loadDocuments()
    
    // Search for relevant context from documents
    const documentContext = searchDocuments(message, documents)
    
    // Get relevant knowledge base entries
    const knowledgeEntries = findRelevantKnowledge(message)
    const knowledgeContext = knowledgeEntries.map(entry => 
      `${entry.topic}:\n${entry.content}`
    ).join('\n\n')
    
    // Combine contexts
    const combinedContext = documentContext || knowledgeContext || documents.substring(0, 6000)
    
    // Get relevant links
    const relevantLinks = getRelevantLinks(message)
    
    // Try to get AI response
    let response = await getFreeAIResponse(
      message, 
      combinedContext, 
      SITE_KNOWLEDGE,
      relevantLinks,
      conversationHistory
    )

    // Fallback to knowledge base if AI fails
    if (!response) {
      if (knowledgeEntries.length > 0) {
        const entry = knowledgeEntries[0]
        response = entry.content
        
        // Add links
        if (entry.links.length > 0 || relevantLinks.length > 0) {
          response += '\n\n📚 Learn More:\n'
          const allLinks = [...entry.links, ...relevantLinks]
          const uniqueLinks = allLinks.filter((link, index, self) => 
            index === self.findIndex(l => l.url === link.url)
          )
          uniqueLinks.slice(0, 5).forEach(link => {
            response += `- [${link.label}](${link.url})\n`
          })
        }
      } else if (documentContext) {
        response = `Based on the official documents, here's what I found:\n\n${documentContext.substring(0, 1000)}\n\n📚 Useful Links:\n`
        relevantLinks.forEach(link => {
          response += `- [${link.label}](${link.url})\n`
        })
        response += '\n\nFor more detailed information, please consult the full documents or contact a Swiss immigration expert.'
      } else {
        response = `I'm here to help with Swiss immigration questions! I have access to:\n\n- Official Swiss immigration documents (Weisungen, Handbuch)\n- Complete site knowledge about all pages and features\n- Comprehensive guides and resources\n\n📚 Explore Our Site:\n`
        relevantLinks.forEach(link => {
          response += `- [${link.label}](${link.url})\n`
        })
        response += '\n\nCould you please rephrase your question? I can help with:\n- Visa and permit requirements\n- Application processes\n- Site features and pages\n- Modules and courses\n- Tools and calculators\n\nFor complex questions, I recommend consulting with a certified Swiss immigration lawyer.'
      }
    }

    // Ensure response includes links if not already present
    if (!response.includes('[') || !response.includes('](')) {
      if (relevantLinks.length > 0) {
        response += '\n\n📚 Helpful Links:\n'
        relevantLinks.forEach(link => {
          response += `- [${link.label}](${link.url})\n`
        })
      }
    }

    // Remove all double asterisks from response
    response = response.replace(/\*\*/g, '')

    return NextResponse.json({
      response,
      source: 'chatbot',
      links: relevantLinks,
    })
  } catch (error) {
    console.error('Chatbot API error:', error)
    return NextResponse.json(
      { 
        error: 'An error occurred while processing your request',
        response: 'I apologize, but I encountered an error. Please try rephrasing your question or visit our [Contact Page](/contact) for assistance.\n\n📚 Quick Links:\n- [Visa Types](/visas)\n- [Employment Hub](/employment)\n- [Pricing Plans](/pricing)'
      },
      { status: 500 }
    )
  }
}
