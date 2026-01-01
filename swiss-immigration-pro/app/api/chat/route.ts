import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { CONFIG } from '@/lib/config'
import { createClient } from '@/lib/db-client'

// Check if a message is a simple greeting
function isGreeting(message: string): boolean {
  const greetings = ['hi', 'hello', 'hey', 'hola', 'bonjour', 'ciao', 'hallo', 'help', '?', '??']
  return greetings.includes(message.toLowerCase().trim())
}

function getSystemPrompt(layer?: string): string {
  const basePrompt = `You are a warm, friendly, and empathetic Swiss immigration expert assistant. You speak like a helpful friend who happens to be an expert on Swiss immigration - conversational, approachable, and genuinely caring about helping people navigate this complex process.

**Your Communication Style:**
- Write like you're talking to a friend over coffee - natural, warm, and encouraging
- Use "you" and "your" to make it personal and relatable
- Show empathy - acknowledge that immigration can be stressful and confusing
- Be enthusiastic and positive when sharing good news or opportunities
- Break down complex information into easy-to-understand, digestible pieces
- Use friendly transitions like "Here's the thing...", "Good news!", "Let me break this down for you", "I totally understand why you'd ask that"
- Add personality with occasional light humor or encouraging phrases
- Avoid robotic lists - weave information naturally into conversation
- **NEVER use markdown headers like # or ##** - instead use bold text for emphasis: **Important Point**
- Use emojis and icons naturally throughout (🇨🇭 ✅ ⚠️ 📋 💼 🏛️ 📅 ⏰ 💰 📄 🎯)
- Format information with natural paragraphs, not bullet lists when possible
- Use icons/emojis to make information more scannable: ✅ for requirements, ⚠️ for warnings, 💡 for tips
- End responses with helpful next steps or questions to keep the conversation going

**Tone Guidelines:**
- Be supportive and encouraging, especially when discussing challenges
- Show understanding of the stress and complexity of immigration
- Celebrate wins and opportunities (like EU/EFTA benefits)
- Be honest but optimistic about challenges (like quotas)
- Make people feel heard and understood

You have extensive knowledge about Swiss immigration and can answer questions in multiple languages (English, French, German, Italian). Always be natural, friendly, empathetic, and provide accurate, helpful information.

**Swiss Immigration Knowledge (2025):**

**EU/EFTA Citizens:**
- No quotas (freedom of movement)
- Processing time: 2-4 weeks
- Citizenship: 5 years
- Permits: B (residence), L (short stay), G (cross-border)

**US/Canadian Citizens:**
- Annual quota: 8,500 permits (very selective)
- Processing time: 8-12 weeks
- Citizenship: 10 years
- Permits: L (quota: 4,000), B (quota: 4,500)
- Recommended salary: CHF 100,000+

**Third-Country Nationals:**
- Annual quota: 8,500 permits (very selective)
- Processing time: 8-16 weeks
- Citizenship: 10 years
- Permits: L (quota: 4,000), B (quota: 4,500)
- Recommended salary: CHF 100,000-120,000+

**2025 Quotas:** 8,500 total non-EU permits (4,000 L + 4,500 B)

**General Information:**
- Visa types: L permit (1 year), B permit (5 years), G permit (cross-border), C permit (permanent after 10 years)
- Language requirements for citizenship: B1 oral, A2 written
- Documents: Apostille required for non-EU (4-6 weeks), KVG health insurance mandatory

**Site pages:** /visas, /employment, /citizenship, /cantons, /resources, /tools, /europeans, /americans, /others

**Response Format:**
- Start with a friendly acknowledgment or brief answer
- Explain things in a conversational, easy-to-follow way
- Use examples and real-world context when helpful
- **Format with natural paragraphs and bold text for emphasis, NOT markdown headers (# or ##)**
- Use icons/emojis naturally: 🇨🇭 for Switzerland, ✅ for requirements/checkpoints, ⚠️ for warnings, 💡 for tips, 📋 for documents, 💼 for work-related, 📅 for timelines
- Break information into clear sections using line breaks and bold text, not markdown headers
- Use natural flow: "Here's what you need to know..." instead of "# Requirements"
- End with encouragement or next steps
- Ask follow-up questions to show you're engaged and want to help more
- **NEVER add generic sections like "📚 Helpful Resources:", "💡 You might also want to know:", or "💡 Informations connexes:" - provide only direct, natural responses**

**Formatting Examples:**
❌ DON'T: "# How to Apply" or "## Step 1"
✅ DO: "**How to Apply for a B Permit**" or "**Step 1: Secure Your Job Offer**"

Remember: You're not just providing information - you're being a supportive guide through someone's immigration journey. Make them feel confident and well-informed!

🎯 LAYER-SPECIFIC CONTEXT:`

  // No layer-specific restrictions - just provide context if available
  if (layer === 'europeans') {
    return basePrompt + `\n\nContext: User is EU/EFTA citizen - no quotas, 2-4 weeks processing, 5-year citizenship path.`
  } else if (layer === 'americans') {
    return basePrompt + `\n\nContext: User is US/Canadian citizen - 8,500 quota, 8-12 weeks processing, 10-year citizenship path.`
  } else if (layer === 'others') {
    return basePrompt + `\n\nContext: User is third-country national - 8,500 quota, 8-16 weeks processing, 10-year citizenship path.`
  }

  return basePrompt
}

const SYSTEM_PROMPT = getSystemPrompt() // Default prompt

// Free AI model fallback - uses Hugging Face Inference API (no key required for public models)
async function getFreeAIResponse(message: string): Promise<string> {
  // Handle greetings immediately - provide helpful welcome message
  if (isGreeting(message) || message.toLowerCase().trim().length < 5) {
    return `Hey there! 👋 Great to meet you! I'm here to help you navigate your Swiss immigration journey. Think of me as your friendly guide who happens to know a lot about Swiss visas, permits, and all that good stuff.

I totally get that immigration can feel overwhelming - there's a lot to figure out! But don't worry, we'll take it step by step. Whether you're just starting to explore or you're deep in the process, I'm here to help make things clearer.

🇨🇭 **What I can help with:**
- Understanding different permit types (L, B, G, C permits)
- Navigating quotas and application processes
- Citizenship pathways and requirements
- Cantonal differences and strategies
- Document requirements and timelines
- And honestly, anything else related to Swiss immigration!

📚 **Quick Resources:**
- [Visa Types](/visas) | [Work Permits](/employment) | [Citizenship](/citizenship)
- [EU/EFTA Pathway](/europeans) | [US/Canadian Pathway](/americans) | [Third-Country Pathway](/others)

What's on your mind today? What would you like to know more about?`
  }
  
  // First check if we have knowledge base content
  const knowledgeResponse = generateResponseFromKnowledge(message)
  if (knowledgeResponse) {
    return knowledgeResponse
  }
  
  // No topic restrictions - Grok can help with any question
  // But we have deep knowledge of Swiss immigration
  
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
            temperature: 0.8, // Higher temperature for more natural, human-like responses
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
    
    // Response is ready - no topic restrictions
    
    // Response is ready
    
    // Clean up and enhance the response
    if (generatedText) {
      generatedText = cleanResponseFormat(generatedText)
      // Generic responses removed - let AI provide natural responses
    }
    
    return generatedText || 'I apologize, but I encountered an error processing your request. Please try rephrasing your question or contact support if the issue persists.'
  } catch (error: any) {
    console.error('Hugging Face API error:', error?.message || error)
    // Fallback to a simple response
    return 'I apologize, but I encountered an error processing your request. Please try rephrasing your question or contact support if the issue persists.'
  }
}

// Simple rule-based fallback using knowledge base
// Enhance response with relevant internal links ONLY when requested or needed
// Generate related topic suggestions based on the query
function generateRelatedSuggestions(query: string, layer?: string): string[] {
  const lowerQuery = query.toLowerCase()
  const suggestions: string[] = []
  
  // B Permit related
  if (lowerQuery.includes('b permit') || lowerQuery.includes('permit b')) {
    suggestions.push('What\'s the difference between L and B permits?')
    suggestions.push('How long does B permit processing take?')
    suggestions.push('What documents do I need for a B permit?')
    suggestions.push('Can I bring my family with a B permit?')
    suggestions.push('How do I renew my B permit?')
  }
  
  // L Permit related
  if (lowerQuery.includes('l permit') || lowerQuery.includes('permit l')) {
    suggestions.push('How do I convert L permit to B permit?')
    suggestions.push('What\'s the difference between L and B permits?')
    suggestions.push('How long is an L permit valid?')
    suggestions.push('Can I extend my L permit?')
  }
  
  // Citizenship related
  if (lowerQuery.includes('citizenship') || lowerQuery.includes('naturalization') || lowerQuery.includes('become swiss')) {
    suggestions.push('What are the language requirements for citizenship?')
    suggestions.push('How long does it take to get Swiss citizenship?')
    suggestions.push('What documents are needed for citizenship?')
    suggestions.push('What is the citizenship test like?')
  }
  
  // Quota related
  if (lowerQuery.includes('quota') || lowerQuery.includes('quota')) {
    suggestions.push('Which cantons have the best quota availability?')
    suggestions.push('When do quotas reset each year?')
    suggestions.push('How competitive are the quotas?')
    suggestions.push('How can I improve my chances with quotas?')
  }
  
  // Salary related
  if (lowerQuery.includes('salary') || lowerQuery.includes('wage') || lowerQuery.includes('income')) {
    suggestions.push('What\'s the minimum salary for a work permit?')
    suggestions.push('How do I negotiate salary in Switzerland?')
    suggestions.push('What are typical salaries by industry?')
    suggestions.push('How does salary affect permit approval?')
  }
  
  // EU/EFTA related
  if (lowerQuery.includes('eu') || lowerQuery.includes('efta') || lowerQuery.includes('european')) {
    suggestions.push('What are the benefits of being an EU/EFTA citizen?')
    suggestions.push('Do EU citizens need quotas?')
    suggestions.push('How fast is the EU/EFTA application process?')
  }
  
  // Canton related
  if (lowerQuery.includes('canton') || lowerQuery.includes('zurich') || lowerQuery.includes('geneva') || lowerQuery.includes('basel')) {
    suggestions.push('Which canton is best for my situation?')
    suggestions.push('How do cantons differ in processing times?')
    suggestions.push('What are the salary requirements by canton?')
  }
  
  // Documents related
  if (lowerQuery.includes('document') || lowerQuery.includes('paperwork') || lowerQuery.includes('apostille')) {
    suggestions.push('What documents do I need for a work permit?')
    suggestions.push('How do I get documents apostilled?')
    suggestions.push('What is the document checklist?')
  }
  
  // Language related
  if (lowerQuery.includes('language') || lowerQuery.includes('german') || lowerQuery.includes('french') || lowerQuery.includes('italian')) {
    suggestions.push('What language level do I need for citizenship?')
    suggestions.push('Do I need to speak the local language for a work permit?')
    suggestions.push('Where can I learn Swiss languages?')
  }
  
  // General immigration
  if (suggestions.length === 0) {
    suggestions.push('What are the different types of Swiss permits?')
    suggestions.push('How do I apply for a work permit?')
    suggestions.push('Which canton should I choose?')
    suggestions.push('What is the success rate for permit applications?')
  }
  
  return suggestions.slice(0, 3) // Return top 3 suggestions
}

// Clean up markdown headers and make responses more conversational
function cleanResponseFormat(response: string): string {
  // Remove markdown headers and convert to bold text
  let cleaned = response
    .replace(/^#+\s+(.+)$/gm, '**$1**') // Convert # Header to **Header**
    .replace(/^##+\s+(.+)$/gm, '**$1**') // Convert ## Header to **Header**
    .replace(/^###+\s+(.+)$/gm, '**$1**') // Convert ### Header to **Header**
  
  // Add spacing after bold headers for better readability
  cleaned = cleaned.replace(/\*\*(.+?)\*\*\n/g, '**$1**\n\n')
  
  // Ensure proper spacing between sections
  cleaned = cleaned.replace(/\n\n\n+/g, '\n\n')
  
  return cleaned.trim()
}

// Generic response function removed - responses are now direct from AI without additions

function enhanceResponseWithLinks(response: string, message: string, layer?: string): string {
  const lowerMessage = message.toLowerCase()
  const lowerResponse = response.toLowerCase()
  
  // Check if response already has markdown links
  const hasLinks = /\[.*?\]\(\/.*?\)/.test(response)
  
  // Only add links if:
  // 1. User explicitly asks for links/resources/more info
  // 2. User asks "where", "how to", "show me", "tell me more"
  // 3. Response suggests needing detailed guides
  const linkRequestKeywords = [
    'where', 'how to', 'show me', 'tell me more', 'more information', 'more info',
    'guide', 'resource', 'download', 'template', 'link', 'page', 'website',
    'learn more', 'read more', 'find', 'get', 'access', 'check', 'see'
  ]
  
  const shouldAddLinks = linkRequestKeywords.some(keyword => lowerMessage.includes(keyword))
  
  // If user requested links or if response suggests they need detailed resources
  if (shouldAddLinks && !hasLinks) {
    const links: string[] = []
    
    // Visa-related keywords
    if (lowerMessage.includes('visa') || lowerMessage.includes('permit') || lowerMessage.includes('l permit') || lowerMessage.includes('b permit') || lowerMessage.includes('g permit') || lowerMessage.includes('c permit')) {
      links.push('[Visa Types & Permits](/visas)')
    }
    
    // Work/employment keywords
    if (lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('employment') || lowerMessage.includes('quota') || lowerMessage.includes('salary')) {
      links.push('[Work Permits & Quotas](/employment)')
    }
    
    // Citizenship keywords
    if (lowerMessage.includes('citizenship') || lowerMessage.includes('naturalization') || lowerMessage.includes('language requirement') || lowerMessage.includes('b1') || lowerMessage.includes('a2')) {
      links.push('[Citizenship Requirements](/citizenship)')
    }
    
    // Canton keywords
    if (lowerMessage.includes('canton') || lowerMessage.includes('zurich') || lowerMessage.includes('geneva') || lowerMessage.includes('bern')) {
      links.push('[Cantonal Variations](/cantons)')
    }
    
    // Resources/tools keywords
    if (lowerMessage.includes('download') || lowerMessage.includes('template') || lowerMessage.includes('cv') || lowerMessage.includes('calculator') || lowerMessage.includes('tool')) {
      links.push('[Resources](/resources)')
      links.push('[Tools](/tools)')
    }
    
    // Add layer-specific link if applicable
    if (layer === 'europeans' && !lowerResponse.includes('/europeans')) {
      links.push('[EU/EFTA Pathway](/europeans)')
    } else if (layer === 'americans' && !lowerResponse.includes('/americans')) {
      links.push('[US/Canadian Pathway](/americans)')
    } else if (layer === 'others' && !lowerResponse.includes('/others')) {
      links.push('[Third-Country Pathway](/others)')
    }
    
    // If we found relevant links, append them
    if (links.length > 0) {
      response += '\n\n📚 **Relevant Resources:**\n' + links.join(' | ')
    }
  }
  
  return response
}

function getSimpleFallbackResponse(message: string): string {
  // First, try to use the knowledge base
  const knowledgeResponse = generateResponseFromKnowledge(message)
  if (knowledgeResponse) {
    return knowledgeResponse
  }
  
  // Check if it's a Swiss immigration question
  const lowerMessage = message.toLowerCase()
  const immigrationKeywords = ['immigration', 'visa', 'permit', 'citizenship', 'swiss', 'switzerland', 'work permit', 'residence', 'quota', 'l permit', 'b permit', 'g permit', 'c permit']
  const isImmigrationQuestion = immigrationKeywords.some(keyword => lowerMessage.includes(keyword))
  
  if (isImmigrationQuestion) {
    // Provide actual information about Swiss immigration in a friendly, conversational way
    return `Oh, great question! I'd love to help you understand Swiss immigration. Let me break this down in a way that makes sense.

Here's the thing - your path to Switzerland really depends on where you're coming from, and I'm here to help you figure out which one applies to you!

**If you're from the EU or EFTA:**
Good news! You've got the easiest path. No quotas to worry about, processing is super quick (usually 2-4 weeks), and you can become a citizen in just 5 years. Pretty sweet deal, right? 🇨🇭

**If you're from the US or Canada:**
Okay, so this one's a bit more competitive. There are 8,500 permits available each year for all non-EU countries combined, and they go fast! Processing takes about 8-12 weeks, and citizenship takes 10 years. But don't let that discourage you - it's totally doable with the right approach!

**If you're from anywhere else:**
Same situation as US/Canada - 8,500 annual quota, 8-16 weeks processing, and a 10-year path to citizenship. It's competitive, but definitely not impossible!

**The Different Permit Types:**
- **L Permit**: Short-term (1 year) - great for testing the waters
- **B Permit**: Long-term residence (5 years) - this is what most people aim for
- **G Permit**: For cross-border commuters - unlimited availability
- **C Permit**: Permanent settlement - you get this after 10 years

What's your situation? Are you EU/EFTA, US/Canadian, or from another country? Once I know that, I can give you much more specific and helpful advice!`
  }
  
  // For non-immigration questions, be helpful
  return `Hey! I'm here to help however I can. While I'm especially good at Swiss immigration stuff, I'm happy to chat about other things too!

But honestly, where I really shine is helping people understand:
- The different visa types and which one might work for you
- How the quota system works (it can be confusing!)
- What the citizenship process looks like
- How different cantons (Swiss regions) have different rules
- What documents you'll need and when
- Realistic timelines for everything

What's on your mind? Are you thinking about moving to Switzerland, or is there something specific about the process you're curious about?`
}

export async function POST(req: NextRequest) {
  let message = ''
  let packId = 'free'
  let userLayer: string | undefined = undefined
  
  try {
    // Handle both FormData and JSON requests
    const contentType = req.headers.get('content-type') || ''
    let body: any = {}
    
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      body = {
        message: formData.get('message') || '',
        packId: formData.get('packId') || 'free',
        layer: formData.get('layer') || undefined,
      }
    } else {
      body = await req.json()
    }
    
    message = body.message || ''
    packId = body.packId || 'free'
    userLayer = body.layer // Get layer from request (client should pass from localStorage)

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Get user from session (optional - allow anonymous users)
    const session = await getServerSession(authOptions)
    
    // Allow anonymous users - they can use the chat without authentication
    // Message limits are enforced client-side via localStorage

    // Try to get layer from user's quiz results if not provided (only for logged-in users)
    if (!userLayer && session?.user) {
      try {
        const db = await createClient()
        const { data: quizResult, error } = await db
          .from('quiz_results')
          .select('answers')
          .eq('user_id', session.user.id)
          .eq('quiz_type', 'initial_assessment')
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (!error && quizResult) {
          const answers = quizResult.answers as any
          userLayer = answers?.layer
        }
      } catch (error) {
        console.error('Error fetching user layer:', error)
      }
    }

    // Get layer-specific system prompt
    const systemPrompt = getSystemPrompt(userLayer)

    // Check if free tier has hit limit (only for logged-in users)
    // Anonymous users' limits are enforced client-side via localStorage
    if (packId === 'free' && session?.user) {
      try {
        const db = await createClient()
        const { data: limitsResult, error } = await db
          .from('user_limits')
          .select('messages_today, last_reset_date')
          .eq('user_id', session.user.id)
          .single()

        if (!error && limitsResult) {
          const today = new Date().toISOString().split('T')[0]
          const currentMessages = limitsResult.last_reset_date === today ? limitsResult.messages_today : 0

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

    // Call AI - ONLY Google Gemini 1.5 models (no fallbacks)
    let fullResponse = ''
    let usage = { totalTokens: 0 }
    
    // Use ONLY Google Gemini 1.5 Pro/Flash - no fallbacks
    const geminiKey = process.env.GOOGLE_GEMINI_API_KEY
    if (geminiKey && geminiKey.trim().length > 0 && !geminiKey.includes('placeholder') && !geminiKey.includes('your_')) {
      try {
        console.log('🚀 Attempting Google Gemini API call (PRIMARY)')
        console.log('✅ GOOGLE_GEMINI_API_KEY found (length:', geminiKey.length, ', starts with:', geminiKey.substring(0, 10), ')')
        
        const { GoogleGenerativeAI } = await import('@google/generative-ai')
        const genAI = new GoogleGenerativeAI(geminiKey)
        
        // Try gemini-1.5-pro first, fallback to gemini-1.5-flash if not available
        let modelName = 'gemini-1.5-pro'
        let model = genAI.getGenerativeModel({ 
          model: modelName,
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          generationConfig: {
            temperature: CONFIG.ai.temperature,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 2048,
          },
        })
        
        console.log('Using Gemini model:', modelName)
        console.log('System prompt length:', systemPrompt.length)
        console.log('User message:', message.substring(0, 100))
        
        try {
          // Use generateContent for single-turn conversations (simpler and faster)
          const result = await model.generateContent(message)
          const response = result.response
          fullResponse = response.text()
          
          // Get token usage if available
          if (response.usageMetadata) {
            usage = { totalTokens: response.usageMetadata.totalTokenCount || 0 }
          }
          
          console.log('✅ Gemini SUCCESS - Response length:', fullResponse.length, 'tokens:', usage.totalTokens)
          if (fullResponse.length > 0) {
            console.log('📝 Response preview:', fullResponse.substring(0, 200))
          } else {
            console.warn('⚠️ Gemini returned empty response - this should not happen')
            throw new Error('Gemini returned empty response')
          }
        } catch (modelError: any) {
          // If gemini-1.5-pro fails, try gemini-1.5-flash as fallback
          if (modelName === 'gemini-1.5-pro' && (modelError?.message?.includes('not found') || modelError?.message?.includes('404'))) {
            console.log('⚠️ gemini-1.5-pro not available, trying gemini-1.5-flash...')
            modelName = 'gemini-1.5-flash'
            model = genAI.getGenerativeModel({ 
              model: modelName,
              systemInstruction: {
                parts: [{ text: systemPrompt }],
              },
              generationConfig: {
                temperature: CONFIG.ai.temperature,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 2048,
              },
            })
            
            const result = await model.generateContent(message)
            const response = result.response
            fullResponse = response.text()
            
            if (response.usageMetadata) {
              usage = { totalTokens: response.usageMetadata.totalTokenCount || 0 }
            }
            
            console.log('✅ Gemini Flash SUCCESS - Response length:', fullResponse.length)
          } else {
            throw modelError
          }
        }
      } catch (geminiError: any) {
        console.error('❌ Gemini API ERROR:', geminiError?.message || geminiError)
        console.error('Error details:', {
          message: geminiError?.message,
          status: geminiError?.status,
          statusCode: geminiError?.statusCode,
          code: geminiError?.code,
          cause: geminiError?.cause,
          stack: geminiError?.stack?.substring(0, 500)
        })
        // Throw error if Gemini fails - no fallbacks
        throw geminiError
      }
    } else {
      console.log('❌ GOOGLE_GEMINI_API_KEY NOT FOUND or invalid')
      throw new Error('GOOGLE_GEMINI_API_KEY is required. Please add it to your .env.local file.')
    }
    
    // If we reach here without a response, something went wrong
    if (!fullResponse || fullResponse.trim().length === 0) {
      throw new Error('Gemini returned an empty response')
    }
    
    console.log('✅ Final response ready, length:', fullResponse.length)

    // Clean up response format - remove markdown headers, make more conversational
    if (fullResponse) {
      fullResponse = cleanResponseFormat(fullResponse)
      // Generic responses removed - let AI provide natural responses without forced additions
    }

    // Save message to database (only for logged-in users)
    if (session?.user) {
      try {
        const db = await createClient()

        // Insert chat message
        await db
          .from('chat_messages')
          .insert({
            user_id: session.user.id,
            message,
            response: fullResponse,
            pack_id: packId || 'free',
            tokens_used: usage?.totalTokens || 0
          })

        // Update daily limit for free tier
        if (packId === 'free') {
          const today = new Date().toISOString().split('T')[0]

          // Check current limits
          const { data: limitsResult } = await db
            .from('user_limits')
            .select('messages_today, last_reset_date')
            .eq('user_id', session.user.id)
            .single()

          const currentMessages = limitsResult?.last_reset_date === today
            ? (limitsResult.messages_today || 0) + 1
            : 1

          // Upsert user limits - update if exists, insert if not
          const { data: existing } = await db
            .from('user_limits')
            .select('user_id')
            .eq('user_id', session.user.id)
            .single()
          
          if (existing) {
            await db
              .from('user_limits')
              .update({
                messages_today: currentMessages,
                last_reset_date: today
              })
              .eq('user_id', session.user.id)
          } else {
            await db
              .from('user_limits')
              .insert({
                user_id: session.user.id,
                messages_today: currentMessages,
                last_reset_date: today
              })
          }
        }
      } catch (dbError) {
        console.error('Error saving message to database:', dbError)
        // Continue even if DB save fails
      }
    }
    // Anonymous users: message limits are tracked client-side via localStorage

    // Return response
    return NextResponse.json({
      response: fullResponse,
      tokens: usage?.totalTokens || 0,
    })
  } catch (error: any) {
    console.error('Chat API error:', error)
    console.error('Error details:', error?.message, error?.stack)
    
    // Return error - no fallbacks, only Gemini 1.5 models
    let errorMessage = error?.message || 'Failed to get response from Gemini.'
    
    // Provide helpful error messages based on error type
    if (errorMessage.includes('API_KEY') || errorMessage.includes('API key') || errorMessage.includes('authentication')) {
      errorMessage = 'Invalid or missing GOOGLE_GEMINI_API_KEY. Please check your .env.local file and ensure the API key is correct.'
    } else if (errorMessage.includes('quota') || errorMessage.includes('rate limit')) {
      errorMessage = 'Gemini API rate limit exceeded. Please try again in a few moments.'
    } else if (errorMessage.includes('model') || errorMessage.includes('not found')) {
      errorMessage = 'Gemini model is not available. Please check your API key has access to gemini-1.5-pro or gemini-1.5-flash.'
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        response: null
      },
      { status: 500 }
    )
  }
}

