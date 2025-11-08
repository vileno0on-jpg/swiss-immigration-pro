import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { streamText } from 'ai'
import { groq } from '@ai-sdk/groq'
import { CONFIG } from '@/lib/config'
import { sql } from '@/lib/neon/db'
import { HfInference } from '@huggingface/inference'
import { generateResponseFromKnowledge, findRelevantKnowledge } from '@/lib/knowledge-base'

// Check if a message is a simple greeting
function isGreeting(message: string): boolean {
  const greetings = ['hi', 'hello', 'hey', 'hola', 'bonjour', 'ciao', 'hallo', 'help', '?', '??']
  return greetings.includes(message.toLowerCase().trim())
}

function getSystemPrompt(layer?: string): string {
  const basePrompt = `You are a STRICTLY RESTRICTED Swiss immigration assistant for Swiss Immigration Pro. 

CRITICAL RULES - YOU MUST FOLLOW THESE EXACTLY:

1. TOPIC RESTRICTION - You ONLY answer questions about:
   - Swiss visa types (L, B, G, C permits, Schengen visas)
   - Swiss work permits and quotas
   - Swiss citizenship and naturalization
   - Swiss immigration requirements and processes
   - Swiss cantons (only as related to immigration)
   - Swiss language requirements for immigration
   - Swiss integration requirements

2. MANDATORY REJECTIONS - You MUST immediately decline and redirect:
   - Questions about other countries' immigration → "I specialize ONLY in Swiss immigration. For [country], please consult country-specific resources."
   - General topics (weather, recipes, movies, sports, news, entertainment, cooking, etc.) → "I can ONLY assist with Swiss immigration topics. Please ask about visas, permits, citizenship, or related topics."
   - Questions about non-Swiss topics → "I specialize exclusively in Swiss immigration. How can I help you with Swiss visas, permits, or citizenship?"
   - Off-topic questions → "I'm a Swiss immigration specialist. I can help with: L/B/G/C permits, citizenship pathways, quotas, application processes, or language requirements."

3. LAYER-SPECIFIC CONTEXT:`

  if (layer === 'europeans') {
    return basePrompt + `
   - You are assisting an EU/EFTA citizen
   - They have freedom of movement rights under FMPA
   - No quota restrictions apply
   - Processing time: 2-4 weeks typically
   - Citizenship timeline: 5 years (vs 10 for non-EU)
   - Key permits: B permit (residence), L permit (short-term), G permit (cross-border)
   - Reference relevant laws: FMPA, AuG (SR 142.20), VZAE (SR 142.201)
   - Always mention their advantages: no quotas, faster processing, simplified documentation
   - Direct them to /europeans pages for detailed information
`
  } else if (layer === 'americans') {
    return basePrompt + `
   - You are assisting a US or Canadian citizen
   - They are subject to non-EU quotas (2025: 8,500 total permits)
   - Processing time: 8-12 weeks typically
   - Citizenship timeline: 10 years
   - Key permits: L permit (short-term, 4,000 quota), B permit (residence, 4,500 quota)
   - Salary threshold: CHF 100k+ recommended for competitiveness
   - Reference relevant laws: AuG (SR 142.20), VZAE (SR 142.201)
   - Important: Document apostille required (4-6 weeks for US/CA)
   - Direct them to /americans pages for detailed information
`
  } else if (layer === 'others') {
    return basePrompt + `
   - You are assisting a third-country national (non-EU, non-US/CA)
   - They are subject to strict quotas (2025: 8,500 total permits, highly competitive)
   - Processing time: 8-16 weeks typically
   - Citizenship timeline: 10 years
   - Key permits: L permit (4,000 quota), B permit (4,500 quota)
   - Salary threshold: CHF 100k-120k+ strongly recommended
   - Important: Document apostille and translation may be required
   - Embassy processing required in home country
   - Consider education pathway as quota-free alternative
   - Reference relevant laws: AuG (SR 142.20), VZAE (SR 142.201)
   - Direct them to /others pages for detailed information
`
  }

  return basePrompt + `
   - No specific layer detected - provide general Swiss immigration information
   - Always mention the three pathways: EU/EFTA (no quotas), Americans (quota), Others (quota)
   - Encourage users to take the quiz for personalized guidance
`
}

const SYSTEM_PROMPT = getSystemPrompt() // Default prompt

// Free AI model fallback - uses Hugging Face Inference API (no key required for public models)
async function getFreeAIResponse(message: string): Promise<string> {
  // Handle greetings immediately - provide helpful welcome message
  if (isGreeting(message) || message.toLowerCase().trim().length < 5) {
    return `Hello! 👋 I'm your Swiss immigration assistant. I can help you with:

🇨🇭 **Swiss Immigration Topics:**
- **Visa types** (L, B, G, C permits) - [Learn more](/visas)
- **Citizenship pathways** - [View guide](/citizenship)
- **Work permits and quotas** - [Check status](/visas)
- **Application processes** - [See steps](/visas)
- **Language requirements** - [Read guide](/citizenship)
- **Cantonal variations** - [Explore](/cantons)

📚 **Quick Links:**
- [All Visa Types](/visas)
- [Citizenship Guide](/citizenship)
- [Employment Hub](/employment)
- [Tools & Resources](/tools)

💡 **For Powerful AI Responses:**
Add a free Groq API key (2 minutes):
1. Sign up at https://console.groq.com (free, no credit card)
2. Get your API key
3. Add to .env.local: \`GROQ_API_KEY=your_key\`
This enables **Llama 3.1 70B** - a powerful AI model!

**What would you like to know about Swiss immigration?**

⚠️ General information only (updated Nov 2025). Not legal advice. Book consultation with a certified Swiss immigration lawyer for your specific case.`
  }
  
  // First check if we have knowledge base content
  const knowledgeResponse = generateResponseFromKnowledge(message)
  if (knowledgeResponse) {
    return knowledgeResponse
  }
  
  // STRICT TOPIC CHECK - Reject off-topic questions immediately
  const lowerMessage = message.toLowerCase()
  const swissImmigrationKeywords = ['swiss', 'switzerland', 'permit', 'visa', 'citizenship', 'quota', 'immigration', 'l permit', 'b permit', 'g permit', 'c permit', 'naturalization', 'canton', 'work permit', 'residence', 'integration', 'language requirement']
  const offTopicKeywords = ['recipe', 'weather', 'movie', 'sport', 'music', 'game', 'cooking', 'food', 'entertainment', 'news', 'politics', 'election', 'sports', 'weather', 'temperature', 'recipe', 'how to cook', 'how to make', 'movie review', 'film', 'song', 'artist', 'band']
  
  // Check if message contains Swiss immigration keywords
  const isSwissImmigration = swissImmigrationKeywords.some(keyword => lowerMessage.includes(keyword))
  
  // If it contains off-topic keywords AND doesn't mention Swiss immigration, reject
  if (offTopicKeywords.some(keyword => lowerMessage.includes(keyword)) && !isSwissImmigration) {
    return `I specialize EXCLUSIVELY in Swiss immigration topics. I can only assist with questions about:
- Swiss visa types (L, B, G, C permits)
- Swiss citizenship and naturalization
- Work permits and quotas
- Application processes
- Language requirements
- Cantonal variations

For questions about ${message}, please consult other resources.

📚 **Explore Swiss immigration topics:**
- [Visa Types](/visas)
- [Citizenship Guide](/citizenship)
- [Employment](/employment)

⚠️ General information only (updated Nov 2025). Not legal advice. Book consultation with a certified Swiss immigration lawyer for your specific case.`
  }
  
  try {
    // Use Hugging Face's free Inference API with a public model
    // Note: Some models may require API key, but we'll try without first
    const hf = process.env.HUGGINGFACE_API_KEY 
      ? new HfInference(process.env.HUGGINGFACE_API_KEY)
      : new HfInference()
    
    // Try using a better free model - use a model that's good at following instructions
    // Try multiple free models in order of preference
    const models = [
      'mistralai/Mistral-7B-Instruct-v0.2', // Good instruction following
      'meta-llama/Llama-2-7b-chat-hf', // Good for conversations
      'microsoft/DialoGPT-medium', // Fallback
    ]
    
    let response = null
    let lastError = null
    
    for (const model of models) {
      try {
        response = await hf.textGeneration({
          model: model,
          inputs: `${SYSTEM_PROMPT}\n\nUser: ${message}\n\nAssistant:`,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.3, // Lower temperature for more focused responses
            return_full_text: false,
          },
        })
        break // Success, exit loop
      } catch (error: any) {
        lastError = error
        console.log(`Model ${model} failed, trying next...`)
        continue
      }
    }
    
    if (!response) {
      throw lastError || new Error('All models failed')
    }

    let generatedText = response.generated_text || ''
    
    // Clean up the response
    if (generatedText.includes('Assistant:')) {
      generatedText = generatedText.split('Assistant:')[1].trim()
    }
    
    // Check if response is off-topic - if so, reject
    const generatedLower = generatedText.toLowerCase()
    if (offTopicKeywords.some(keyword => generatedLower.includes(keyword) && !generatedLower.includes('swiss'))) {
      return getSimpleFallbackResponse(message)
    }
    
    // Ensure disclaimer is included
    if (!generatedText.includes('⚠️')) {
      generatedText += '\n\n⚠️ General information only (updated Nov 2025). Not legal advice. Book consultation with a certified Swiss immigration lawyer for your specific case.'
    }
    
    // Add relevant links if possible
    const relevant = findRelevantKnowledge(message)
    if (relevant.length > 0 && relevant[0].links.length > 0) {
      generatedText += '\n\n📚 **Learn more:**\n'
      relevant[0].links.forEach(link => {
        generatedText += `- [${link.label}](${link.url})\n`
      })
    }
    
    return generatedText || getSimpleFallbackResponse(message)
  } catch (error: any) {
    console.error('Hugging Face API error:', error?.message || error)
    // Fallback to a simple response
    return getSimpleFallbackResponse(message)
  }
}

// Simple rule-based fallback using knowledge base
function getSimpleFallbackResponse(message: string): string {
  // First, try to use the knowledge base
  const knowledgeResponse = generateResponseFromKnowledge(message)
  if (knowledgeResponse) {
    return knowledgeResponse
  }
  
  // Check if it's an off-topic question
  const lowerMessage = message.toLowerCase()
  const offTopicKeywords = ['recipe', 'weather', 'recipe', 'movie', 'sport', 'music', 'game', 'cooking', 'recipe']
  if (offTopicKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return `I can only assist with Swiss immigration, Swiss geography (as it relates to immigration), and Swiss politics (as it relates to immigration) topics.

For questions about ${message.toLowerCase()}, please consult other resources.

If you have questions about Swiss immigration, I'm here to help! Try asking about:
- Visa types (L, B, G, C permits)
- Citizenship requirements
- Quota status
- Salary requirements
- Application process

📚 **Explore our site:**
- [Visa Types](/visas)
- [Citizenship Guide](/citizenship)
- [Employment](/employment)
- [Resources](/resources)

⚠️ General information only (updated Nov 2025). Not legal advice. Book consultation with a certified Swiss immigration lawyer for your specific case.`
  }
  
  // Default response with helpful links
  return `Thank you for your question about Swiss immigration.

I can help you with:
- **Visa types** (L, B, G, C permits) - [Learn more](/visas)
- **Citizenship pathways** - [View guide](/citizenship)
- **Quota status** - [Check quotas](/visas)
- **Application process** - [See steps](/visas)
- **Salary requirements** - [View benchmarks](/employment)
- **Language requirements** - [Read guide](/citizenship)

📚 **Explore our site:**
- [All Visa Types](/visas)
- [Citizenship Guide](/citizenship)
- [Employment Hub](/employment)
- [Tools & Resources](/tools)
- [Pricing Plans](/pricing)

For more detailed information, please visit the relevant pages above or upgrade to a premium plan for comprehensive guides.

⚠️ General information only (updated Nov 2025). Not legal advice. Book consultation with a certified Swiss immigration lawyer for your specific case.`
}

export async function POST(req: NextRequest) {
  let message = ''
  let packId = 'free'
  let userLayer: string | undefined = undefined
  
  try {
    const body = await req.json()
    message = body.message || ''
    packId = body.packId || 'free'
    userLayer = body.layer // Get layer from request (client should pass from localStorage)

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Get user from session
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Try to get layer from user's quiz results if not provided
    if (!userLayer && sql) {
      try {
        const quizResult = await sql`
          SELECT answers FROM quiz_results
          WHERE user_id = ${session.user.id}
          AND quiz_type = 'initial_assessment'
          ORDER BY created_at DESC
          LIMIT 1
        `
        if (quizResult && quizResult[0]) {
          const answers = quizResult[0].answers as any
          userLayer = answers?.layer
        }
      } catch (error) {
        console.error('Error fetching user layer:', error)
      }
    }

    // Get layer-specific system prompt
    const systemPrompt = getSystemPrompt(userLayer)

    // Check if free tier has hit limit (handled by client, but double-check server-side)
    if (packId === 'free' && sql) {
      try {
        const limitsResult = await sql`
          SELECT messages_today, last_reset_date FROM user_limits
          WHERE user_id = ${session.user.id}
        `

        if (limitsResult && limitsResult[0]) {
          const limits = limitsResult[0] as any
          const today = new Date().toISOString().split('T')[0]
          const currentMessages = limits.last_reset_date === today ? limits.messages_today : 0

          if (currentMessages >= CONFIG.ai.freeDailyLimit) {
            return NextResponse.json(
              { error: 'Daily message limit reached. Please upgrade.' },
              { status: 429 }
            )
          }
        }
      } catch (dbError) {
        console.error('Error checking user limits:', dbError)
        // Continue even if DB check fails
      }
    }

    // Call AI - Priority: Groq (FREE) > OpenAI > Google Gemini (FREE with limits) > Knowledge Base (FREE) > Simple Fallback
    let fullResponse = ''
    let usage = { totalTokens: 0 }
    
    if (process.env.GROQ_API_KEY) {
      // Use Groq (FREE tier - 30 requests/min, unlimited monthly)
      try {
        const aiModel = groq(CONFIG.ai.model)
        const result = await streamText({
          model: aiModel,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message },
          ],
          temperature: CONFIG.ai.temperature,
        })
        
        for await (const chunk of result.textStream) {
          fullResponse += chunk
        }
        usage = { totalTokens: (await result.usage)?.totalTokens || 0 }
        
        // Ensure response follows format
        if (!fullResponse.includes('⚠️')) {
          fullResponse += '\n\n⚠️ General information only (updated Nov 2025). Not legal advice. Book consultation with a certified Swiss immigration lawyer for your specific case.'
        }
      } catch (groqError: any) {
        console.error('Groq API error:', groqError?.message || groqError)
        // Fall through to next option
        fullResponse = ''
      }
    }
    
    // If Groq failed or not available, try OpenAI
    if (!fullResponse && process.env.OPENAI_API_KEY) {
      // Use OpenAI
      const { openai } = await import('@ai-sdk/openai')
      const aiModel = openai(CONFIG.ai.model)
      const result = await streamText({
        model: aiModel,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        temperature: CONFIG.ai.temperature,
      })
      
      for await (const chunk of result.textStream) {
        fullResponse += chunk
      }
      usage = { totalTokens: (await result.usage)?.totalTokens || 0 }
    }
    
    // If still no response, try Google Gemini (FREE tier - 15 requests/min, 1,500 requests/day)
    if (!fullResponse && process.env.GOOGLE_GEMINI_API_KEY) {
      try {
        const { GoogleGenerativeAI } = await import('@google/generative-ai')
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY)
        // Use gemini-1.5-flash (free tier) or gemini-pro (free tier with limits)
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
        
        const prompt = `${systemPrompt}\n\nUser: ${message}\n\nAssistant:`
        const result = await model.generateContent(prompt)
        fullResponse = result.response.text()
        usage = { totalTokens: result.response.usageMetadata?.totalTokenCount || 0 }
        
        // Ensure response follows format
        if (!fullResponse.includes('⚠️')) {
          fullResponse += '\n\n⚠️ General information only (updated Nov 2025). Not legal advice. Book consultation with a certified Swiss immigration lawyer for your specific case.'
        }
      } catch (geminiError: any) {
        console.error('Gemini API error:', geminiError?.message || geminiError)
        // Fall through to knowledge base
        fullResponse = ''
      }
    }
    
    // If still no response, use knowledge base (100% FREE, no API key needed)
    if (!fullResponse) {
      console.log('Using knowledge base (free, site-specific, no API key needed)')
      const knowledgeResponse = generateResponseFromKnowledge(message)
      
      if (knowledgeResponse) {
        // Found relevant knowledge - use it
        fullResponse = knowledgeResponse
        usage = { totalTokens: Math.ceil(fullResponse.length / 4) }
      } else {
        // Try Hugging Face as fallback, then simple response
        try {
          fullResponse = await getFreeAIResponse(message)
          usage = { totalTokens: Math.ceil(fullResponse.length / 4) }
        } catch (error: any) {
          console.error('Free AI model error:', error)
          // Use knowledge base or simple fallback with site links
          const fallbackKnowledge = generateResponseFromKnowledge(message)
          if (fallbackKnowledge) {
            fullResponse = fallbackKnowledge
          } else {
            fullResponse = getSimpleFallbackResponse(message)
          }
          usage = { totalTokens: 0 }
        }
      }
    }
    
    // Ensure we have a response
    if (!fullResponse || fullResponse.trim().length === 0) {
      fullResponse = getSimpleFallbackResponse(message)
    }

    // Save message to database (if database is available)
    if (sql) {
      try {
        await sql`
          INSERT INTO chat_messages (user_id, message, response, pack_id, tokens_used)
          VALUES (${session.user.id}, ${message}, ${fullResponse}, ${packId || 'free'}, ${usage?.totalTokens || 0})
        `

        // Update daily limit for free tier
        if (packId === 'free') {
          const today = new Date().toISOString().split('T')[0]
          const limitsResult = await sql`
            SELECT messages_today, last_reset_date FROM user_limits
            WHERE user_id = ${session.user.id}
          `
          
          if (limitsResult && limitsResult[0]) {
            const limits = limitsResult[0] as any
            const currentMessages = limits.last_reset_date === today ? limits.messages_today + 1 : 1
            
            await sql`
              INSERT INTO user_limits (user_id, messages_today, last_reset_date)
              VALUES (${session.user.id}, ${currentMessages}, ${today})
              ON CONFLICT (user_id) DO UPDATE
              SET messages_today = ${currentMessages},
                  last_reset_date = ${today}
            `
          } else {
            await sql`
              INSERT INTO user_limits (user_id, messages_today, last_reset_date)
              VALUES (${session.user.id}, 1, ${today})
              ON CONFLICT (user_id) DO UPDATE
              SET messages_today = 1,
                  last_reset_date = ${today}
            `
          }
        }
      } catch (dbError) {
        console.error('Error saving message to database:', dbError)
        // Continue even if DB save fails
      }
    }

    // Return response
    return NextResponse.json({
      response: fullResponse,
      tokens: usage?.totalTokens || 0,
    })
  } catch (error: any) {
    console.error('Chat API error:', error)
    console.error('Error details:', error?.message, error?.stack)
    
    // Always try to provide a helpful response, even on error
    try {
      // Try knowledge base first
      const knowledgeResponse = generateResponseFromKnowledge(message)
      if (knowledgeResponse) {
        return NextResponse.json({
          response: knowledgeResponse,
          tokens: 0,
        })
      }
      
      // Fallback to simple response
      const fallbackResponse = getSimpleFallbackResponse(message)
      return NextResponse.json({
        response: fallbackResponse,
        tokens: 0,
      })
    } catch (fallbackError) {
      // Last resort - return helpful error with instructions
      return NextResponse.json({
        response: `I apologize, but I'm experiencing technical difficulties. However, I can still help you with Swiss immigration information!

📚 **Explore our comprehensive guides:**
- [Swiss Visa Types](/visas) - Complete guide to L, B, G, C permits
- [Citizenship Pathways](/citizenship) - How to become a Swiss citizen
- [Employment Hub](/employment) - Work permits and quotas
- [Tools & Resources](/tools) - Calculators and helpful tools

💡 **For AI-powered responses:**
To get the best AI experience, consider adding a free Groq API key (takes 2 minutes):
1. Sign up at https://console.groq.com
2. Get your free API key
3. Add to .env.local: GROQ_API_KEY=your_key_here

This will enable powerful AI responses with models like Llama 3.1 70B.

⚠️ General information only (updated Nov 2025). Not legal advice. Book consultation with a certified Swiss immigration lawyer for your specific case.`,
        tokens: 0,
      })
    }
  }
}

