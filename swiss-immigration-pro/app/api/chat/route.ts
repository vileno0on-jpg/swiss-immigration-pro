import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { streamText } from 'ai'
import { groq } from '@ai-sdk/groq'
import { xai } from '@ai-sdk/xai'
import { CONFIG } from '@/lib/config'
import { createClient } from '@/lib/supabase/server'
import { HfInference } from '@huggingface/inference'
import { generateResponseFromKnowledge, findRelevantKnowledge } from '@/lib/knowledge-base'

// Check if a message is a simple greeting
function isGreeting(message: string): boolean {
  const greetings = ['hi', 'hello', 'hey', 'hola', 'bonjour', 'ciao', 'hallo', 'help', '?', '??']
  return greetings.includes(message.toLowerCase().trim())
}

function getSystemPrompt(layer?: string): string {
  const basePrompt = `You are a helpful and knowledgeable AI assistant specializing in Swiss immigration. You can answer any question on any topic, but you have extensive expertise in Swiss immigration matters. Be conversational, helpful, and provide detailed, accurate information.

You have extensive knowledge about Swiss immigration, but you can help with any topic the user asks about. Be natural, friendly, and provide the best answer you can.

When answering Swiss immigration questions, you know:
- Visa types: L permit (1 year, 4,000 quota), B permit (5 years, 4,500 quota), G permit (cross-border), C permit (permanent after 10 years)
- 2025 quotas: 8,500 total non-EU permits (4,000 L + 4,500 B)
- Processing times: EU/EFTA (2-4 weeks), US/CA (8-12 weeks), Others (8-16 weeks)
- Citizenship: 5 years (EU/EFTA), 10 years (others)
- Salary requirements: CHF 100k+ recommended for non-EU
- Language: B1 oral, A2 written for citizenship
- Documents: Apostille required for non-EU (4-6 weeks), KVG health insurance mandatory

Site pages available: /visas, /employment, /citizenship, /cantons, /resources, /tools, /europeans, /americans, /others

Answer naturally and helpfully. No restrictions on topics or response style.

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
    return `Hey there! 👋 I'm your Swiss Immigration AI Assistant. I'm especially knowledgeable about Swiss immigration, but I'm here to help with whatever you need!

🇨🇭 **Swiss Immigration (My Specialty):**
I know everything about Swiss visas, permits, citizenship, quotas, and processes. Ask me anything!

📚 **Quick Links:**
- [Visa Types](/visas) | [Work Permits](/employment) | [Citizenship](/citizenship)
- [EU/EFTA Pathway](/europeans) | [US/Canadian Pathway](/americans) | [Third-Country Pathway](/others)

What can I help you with today?`
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
    
    // Response is ready - no topic restrictions
    
    // Response is ready
    
    // Add relevant links if possible
    const relevant = findRelevantKnowledge(message)
    if (relevant.length > 0 && relevant[0].links.length > 0) {
      generatedText += '\n\n📚 **Learn more:**\n'
      relevant[0].links.forEach(link => {
        generatedText += `- [${link.label}](${link.url})\n`
      })
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
    // Provide actual information about Swiss immigration
    return `I can help with Swiss immigration! Here's what you need to know:

**Swiss Immigration Pathways:**
- **EU/EFTA Citizens**: No quotas, 2-4 weeks processing, 5-year citizenship path
- **US/Canadian Citizens**: 8,500 annual quota (highly competitive), 8-12 weeks processing, 10-year citizenship
- **Third-Country Nationals**: 8,500 annual quota, 8-16 weeks processing, 10-year citizenship

**Key Visa Types:**
- **L Permit**: 1-year temporary (4,000 quota for non-EU)
- **B Permit**: 5-year residence (4,500 quota for non-EU)
- **G Permit**: Cross-border commuter (unlimited)
- **C Permit**: Permanent settlement (after 10 years)

**2025 Quotas**: 8,500 total non-EU permits (4,000 L + 4,500 B)

What specific aspect of Swiss immigration would you like to know more about? I can provide detailed information about visas, permits, citizenship, quotas, requirements, or processes.`
  }
  
  // For non-immigration questions, be helpful
  return `I'm here to help! I'm especially knowledgeable about Swiss immigration, but I can assist with other questions too. 

For Swiss immigration questions, I can provide detailed information about:
- Visa types and requirements
- Work permit quotas and processes
- Citizenship pathways
- Cantonal variations
- Document requirements
- Processing timelines

What would you like to know?`
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

    // Get user from session (optional - allow anonymous users)
    const session = await getServerSession(authOptions)
    
    // Allow anonymous users - they can use the chat without authentication
    // Message limits are enforced client-side via localStorage

    // Try to get layer from user's quiz results if not provided (only for logged-in users)
    if (!userLayer && session?.user) {
      try {
        const supabase = await createClient()
        const { data: quizResult, error } = await supabase
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
        const supabase = await createClient()
        const { data: limitsResult, error } = await supabase
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

    // Call AI - Priority: Groq (PRIMARY) > OpenAI > xAI/Grok > Google Gemini > Knowledge Base
    let fullResponse = ''
    let usage = { totalTokens: 0 }
    
    // Try Groq FIRST (PRIMARY - User requested Groq)
    const groqKey = process.env.GROQ_API_KEY
    if (groqKey && groqKey.trim().length > 0 && !groqKey.includes('placeholder')) {
      try {
        console.log('🚀 Attempting Groq API call')
        console.log('✅ GROQ_API_KEY found (length:', groqKey.length, ', starts with:', groqKey.substring(0, 10), ')')
        
        // Use Llama 3.1 70B (fast and free) or mixtral-8x7b-32768
        const modelName = 'llama-3.1-70b-versatile' // Groq model name
        // Ensure API key is set (AI SDK reads from process.env.GROQ_API_KEY)
        if (!process.env.GROQ_API_KEY) {
          process.env.GROQ_API_KEY = groqKey
        }
        const aiModel = groq(modelName)
        console.log('Using Groq model:', modelName)
        console.log('System prompt length:', systemPrompt.length)
        console.log('User message:', message.substring(0, 100))
        
        const result = await streamText({
          model: aiModel,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message },
          ],
          temperature: CONFIG.ai.temperature,
        })
        
        console.log('✅ Groq stream started, reading chunks...')
        for await (const chunk of result.textStream) {
          fullResponse += chunk
        }
        usage = { totalTokens: (await result.usage)?.totalTokens || 0 }
        console.log('✅ Groq SUCCESS - Response length:', fullResponse.length, 'tokens:', usage.totalTokens)
        if (fullResponse.length > 0) {
          console.log('📝 Response preview:', fullResponse.substring(0, 200))
        } else {
          console.warn('⚠️ Groq returned empty response')
        }
      } catch (groqError: any) {
        console.error('❌ Groq API ERROR:', groqError?.message || groqError)
        console.error('Error details:', {
          message: groqError?.message,
          status: groqError?.status,
          statusCode: groqError?.statusCode,
          code: groqError?.code,
          cause: groqError?.cause,
          stack: groqError?.stack?.substring(0, 500)
        })
        // Fall through to next option
        fullResponse = ''
      }
    } else {
      console.log('❌ GROQ_API_KEY NOT FOUND or invalid')
    }
    
    // If Groq failed, try OpenAI
    if (!fullResponse && process.env.OPENAI_API_KEY) {
      try {
        console.log('🚀 Attempting OpenAI API call (fallback)')
        const { openai } = await import('@ai-sdk/openai')
        const modelName = 'gpt-4o-mini'
        const aiModel = openai(modelName)
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
      } catch (openaiError: any) {
        console.error('❌ OpenAI API ERROR:', openaiError?.message || openaiError)
        fullResponse = ''
      }
    }
    
    // If still no response, try xAI/Grok
    if (!fullResponse && process.env.XAI_API_KEY) {
      try {
        console.log('🚀 Attempting xAI/Grok API call (fallback)')
        const aiModel = xai('grok-beta')
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
      } catch (xaiError: any) {
        console.error('❌ xAI/Grok API ERROR:', xaiError?.message || xaiError)
        fullResponse = ''
      }
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
        
        // Response is ready
      } catch (geminiError: any) {
        console.error('Gemini API error:', geminiError?.message || geminiError)
        // Fall through to knowledge base
        fullResponse = ''
      }
    }
    
    // If still no response, use knowledge base ONLY (no generic fallbacks)
    if (!fullResponse || fullResponse.trim().length === 0) {
      console.log('⚠️ NO AI RESPONSE - All API calls failed or no API keys set')
      console.log('Available API keys:', {
        XAI: !!process.env.XAI_API_KEY,
        GROQ: !!process.env.GROQ_API_KEY,
        OPENAI: !!process.env.OPENAI_API_KEY,
        GEMINI: !!process.env.GOOGLE_GEMINI_API_KEY
      })
      console.log('Falling back to knowledge base...')
      const knowledgeResponse = generateResponseFromKnowledge(message)
      
      if (knowledgeResponse && knowledgeResponse.length > 50) {
        console.log('✅ Using knowledge base response')
        fullResponse = knowledgeResponse
        usage = { totalTokens: Math.ceil(fullResponse.length / 4) }
      } else {
        // If no knowledge base match, return error message asking user to check API key
        console.error('❌ No AI response and no knowledge base match')
        fullResponse = `I apologize, but I'm unable to process your request right now. 

**Possible issues:**
- OpenAI API key may not be configured correctly
- All AI services are currently unavailable
- Your question doesn't match any available knowledge base content

**To fix this:**
1. Check that OPENAI_API_KEY is set in your .env.local file
2. Ensure the API key is valid and has credits
3. Try rephrasing your question

**For Swiss immigration questions**, you can also visit:
- [Visa Types](/visas)
- [Employment Hub](/employment)  
- [Citizenship Guide](/citizenship)

Please check the server console for detailed error messages.`
        usage = { totalTokens: 0 }
      }
    } else {
      console.log('✅ Final response ready, length:', fullResponse.length)
    }

    // No post-processing restrictions - let Grok handle responses naturally
    // fullResponse = enhanceResponseWithLinks(fullResponse, message, userLayer)

    // Save message to database (only for logged-in users)
    if (session?.user) {
      try {
        const supabase = await createClient()

        // Insert chat message
        await supabase
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
          const { data: limitsResult } = await supabase
            .from('user_limits')
            .select('messages_today, last_reset_date')
            .eq('user_id', session.user.id)
            .single()

          const currentMessages = limitsResult?.last_reset_date === today
            ? (limitsResult.messages_today || 0) + 1
            : 1

          // Upsert user limits
          await supabase
            .from('user_limits')
            .upsert({
              user_id: session.user.id,
              messages_today: currentMessages,
              last_reset_date: today
            }, {
              onConflict: 'user_id'
            })
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
    
    // Always try to provide a helpful response, even on error
    try {
      // Try knowledge base first
      const knowledgeResponse = generateResponseFromKnowledge(message)
      if (knowledgeResponse && knowledgeResponse.length > 50) {
        return NextResponse.json({
          response: knowledgeResponse,
          tokens: 0,
        })
      }
      
      // Return error message instead of generic fallback
      return NextResponse.json({
        response: `I'm experiencing technical difficulties. Please check that your OpenAI API key is properly configured and try again. Error: ${error?.message || 'Unknown error'}`,
        tokens: 0,
      }, { status: 500 })
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

This will enable powerful AI responses with models like Llama 3.1 70B.`,
        tokens: 0,
      })
    }
  }
}

