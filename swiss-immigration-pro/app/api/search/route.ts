import { NextRequest, NextResponse } from 'next/server'
import { groq } from '@ai-sdk/groq'
import { generateText } from 'ai'

// Search index data (same as in AdvancedSearch component)
const SEARCH_INDEX = [
  { id: '1', title: 'Home', description: 'Swiss Immigration Success Platform', url: '/', category: 'page', keywords: ['home', 'main', 'start', 'overview'] },
  { id: '2', title: 'Visas & Permits', description: 'L, B, G permits and requirements', url: '/visas', category: 'page', keywords: ['visa', 'permit', 'l permit', 'b permit', 'g permit', 'work permit'] },
  { id: '3', title: 'Employment', description: 'Swiss job market and work guides', url: '/employment', category: 'page', keywords: ['employment', 'job', 'work', 'salary', 'cv', 'resume'] },
  { id: '4', title: 'Citizenship', description: 'Path to Swiss citizenship', url: '/citizenship', category: 'page', keywords: ['citizenship', 'naturalization', 'passport', '10 years', 'swiss citizen'] },
  { id: '5', title: 'US Citizens Guide', description: 'Complete guide for Americans', url: '/us-citizens', category: 'page', keywords: ['usa', 'america', 'us citizens', 'americans', 'chf 3450', 'health insurance'] },
  { id: '6', title: 'Canton Information', description: 'Compare Swiss cantons', url: '/cantons', category: 'page', keywords: ['canton', 'zurich', 'geneva', 'basel', 'bern', 'zug', 'vaud'] },
  { id: '7', title: 'Pricing Plans', description: 'Choose your path to success', url: '/pricing', category: 'page', keywords: ['pricing', 'plans', 'subscription', 'cost', 'price', 'payment'] },
  { id: '8', title: 'Dashboard', description: 'Your personal immigration hub', url: '/dashboard', category: 'page', keywords: ['dashboard', 'profile', 'progress', 'account', 'my content'] },
  { id: '9', title: 'FAQ', description: 'Frequently asked questions', url: '/faq', category: 'page', keywords: ['faq', 'questions', 'help', 'support', 'answers'] },
  { id: '14', title: 'L Permit Guide', description: 'Short-term residence permit', url: '/visas#l-permit', category: 'guide', keywords: ['l permit', 'short term', '1 year', 'temporary'] },
  { id: '15', title: 'B Permit Guide', description: 'Long-term residence permit', url: '/visas#b-permit', category: 'guide', keywords: ['b permit', 'long term', '5 years', 'residence'] },
  { id: '16', title: 'G Permit Guide', description: 'Cross-border commuter permit', url: '/visas#g-permit', category: 'guide', keywords: ['g permit', 'cross border', 'commuter', 'frontier'] },
  { id: '17', title: 'Ordinary Naturalization', description: '10-year path to citizenship', url: '/citizenship#ordinary', category: 'guide', keywords: ['naturalization', '10 years', 'ordinary', 'citizenship path'] },
  { id: '18', title: 'Simplified Naturalization', description: 'Marriage-based citizenship', url: '/citizenship#simplified', category: 'guide', keywords: ['simplified', 'marriage', 'spouse', '5 years', 'swiss spouse'] },
  { id: '21', title: 'CV Templates', description: '20+ Swiss-style CV templates', url: '/resources#cv', category: 'resource', keywords: ['cv', 'resume', 'template', 'lebenslauf', 'curriculum vitae'] },
  { id: '22', title: 'Resources Library', description: 'Guides, PDFs, and checklists', url: '/resources', category: 'resource', keywords: ['resources', 'library', 'pdf', 'download', 'checklist'] },
  { id: '23', title: 'AI Chatbot', description: 'Get instant answers to your questions', url: '/#chat', category: 'tool', keywords: ['chatbot', 'ai', 'assistant', 'help', 'questions', 'chat'] },
  { id: '24', title: 'Apartment Finder', description: 'Find apartments across Switzerland (Homegate, ImmoScout24)', url: '/tools/apartment-finder', category: 'tool', keywords: ['apartment', 'housing', 'rent', 'home', 'flat', 'homegate', 'immoscout24', 'aggregator'] },
  { id: '25', title: 'Application Dossier Generator', description: 'Create professional Swiss-standard housing application packages', url: '/tools/dossier-generator', category: 'tool', keywords: ['dossier', 'housing', 'application', 'landlord', 'renting', 'documents', 'generator'] },
]

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json()

    if (!query || query.length < 2) {
      return NextResponse.json({ 
        results: [],
        aiSuggestion: null,
        directAnswer: null
      })
    }

    // First, do keyword-based search
    const searchTerm = query.toLowerCase()
    const keywordResults = SEARCH_INDEX.filter((item) => {
      return (
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.keywords.some((keyword) => keyword.includes(searchTerm))
      )
    }).slice(0, 6)

    // Try AI-powered semantic search if API key is available
    let aiResults: typeof SEARCH_INDEX = []
    let aiSuggestion: string | null = null
    let directAnswer: string | null = null

    const groqKey = process.env.GROQ_API_KEY
    if (groqKey && groqKey.trim().length > 0 && !groqKey.includes('placeholder') && !groqKey.includes('your_')) {
      try {
        // Use AI to find semantically similar results
        const searchContext = SEARCH_INDEX.map(item => 
          `${item.title}: ${item.description} (Keywords: ${item.keywords.join(', ')})`
        ).join('\n')

        const aiPrompt = `You are a search assistant for a Swiss immigration website. The user searched for: "${query}"

Available content:
${searchContext}

Based on the user's search query, return a JSON array of the most relevant item IDs (just the IDs, like ["2", "15", "3"]). Focus on semantic meaning, not just keywords. Return max 6 IDs. If the query is a question that can be answered directly, also provide a brief direct answer (1-2 sentences).

Format your response as JSON:
{
  "relevantIds": ["id1", "id2"],
  "directAnswer": "brief answer or null"
}`

        const { text } = await generateText({
          model: groq('llama-3.1-70b-versatile'),
          prompt: aiPrompt,
          temperature: 0.3,
        })

        try {
          const aiResponse = JSON.parse(text)
          if (aiResponse.relevantIds && Array.isArray(aiResponse.relevantIds)) {
            aiResults = SEARCH_INDEX.filter(item => 
              aiResponse.relevantIds.includes(item.id)
            ).slice(0, 6)
          }
          if (aiResponse.directAnswer) {
            directAnswer = aiResponse.directAnswer
          }
        } catch (parseError) {
          // If AI response isn't valid JSON, try to extract IDs from text
          console.log('AI response not valid JSON, using keyword search only')
        }

        // Generate AI suggestion for better search
        const suggestionPrompt = `The user searched for "${query}" on a Swiss immigration website. Suggest a better or more specific search query if needed, or return null if the query is good. Keep it brief (max 5 words).`

        const { text: suggestionText } = await generateText({
          model: groq('llama-3.1-70b-versatile'),
          prompt: suggestionPrompt,
          temperature: 0.5,
          maxTokens: 20,
        })

        if (suggestionText && suggestionText.toLowerCase() !== 'null' && suggestionText.toLowerCase() !== query.toLowerCase()) {
          aiSuggestion = suggestionText.trim()
        }
      } catch (aiError) {
        console.error('AI search error:', aiError)
        // Fall back to keyword search
      }
    }

    // Combine results (AI results first, then keyword results, remove duplicates)
    const combinedResults = [
      ...aiResults,
      ...keywordResults.filter(item => !aiResults.find(aiItem => aiItem.id === item.id))
    ].slice(0, 8)

    return NextResponse.json({
      results: combinedResults,
      aiSuggestion,
      directAnswer,
      hasAI: !!groqKey
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}



