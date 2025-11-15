# 🤖 AI Chatbot Setup Guide

## Overview
Your chatbot is already configured to use **Groq AI** (fast, cost-effective) with a fallback option for OpenAI. Here's how to connect it.

---

## ✅ Current Setup

The chatbot uses:
- **Groq AI** by default (model: `llama-3.1-70b-versatile`)
- **Vercel AI SDK** (`ai` package) for streaming responses
- **System prompt** restricting to Swiss immigration, politics, and geography

---

## 🚀 Step 1: Get a Groq API Key

### Option A: Groq (Recommended - Fast & Free Tier Available)
1. Go to [https://console.groq.com/](https://console.groq.com/)
2. Sign up for a free account (or login if you have one)
3. Navigate to **API Keys** section
4. Click **"Create API Key"**
5. Copy your key (starts with `gsk_...`)

**Free Tier:** 14,400 requests/day, very fast responses

### Option B: OpenAI (Backup Option)
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or login
3. Create a new API key
4. Copy your key (starts with `sk-...`)

**Note:** OpenAI is more expensive but sometimes more accurate for complex queries.

---

## 🔧 Step 2: Add API Key to Environment

1. **Open your `.env.local` file** in the project root:
   ```
   swiss-immigration-pro/.env.local
   ```

2. **Find or add these lines:**
   ```env
   # Groq AI (Primary - Recommended)
   GROQ_API_KEY=gsk_your_actual_groq_key_here
   
   # OpenAI (Optional - Backup)
   OPENAI_API_KEY=sk-your_actual_openai_key_here
   ```

3. **Replace the placeholder** with your actual API key:
   ```env
   GROQ_API_KEY=gsk_abc123xyz789...
   ```

4. **Save the file**

---

## 🔄 Step 3: Restart Development Server

The API key is loaded at startup, so you need to restart:

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

---

## ✅ Step 4: Test the Chatbot

1. Open your browser: `http://localhost:3001`
2. Click the **chat icon** (bottom-right corner)
3. Try asking: *"What are the requirements for a B permit?"*
4. The chatbot should respond!

---

## 🎯 How It Works

### Request Flow:
```
User Types Message
    ↓
ChatWidget Component (Frontend)
    ↓
/api/chat API Route (Backend)
    ↓
Groq AI API (via @ai-sdk/groq)
    ↓
Stream Response Back
    ↓
Display in Chat Widget
```

### Code Location:
- **Chat Widget UI:** `components/chat/ChatWidget.tsx`
- **API Route:** `app/api/chat/route.ts`
- **System Prompt:** Defined in `app/api/chat/route.ts` (lines 7-51)
- **Config:** `lib/config.ts` (model, temperature settings)

---

## 🛠️ Troubleshooting

### ❌ "Failed to process chat message"
**Cause:** API key missing or invalid

**Fix:**
1. Check `.env.local` exists and has `GROQ_API_KEY=...`
2. Make sure key starts with `gsk_...`
3. Restart dev server
4. Check console for error details

### ❌ "Unauthorized" error
**Cause:** User not logged in

**Fix:** 
- The chatbot requires authentication
- Create account at `/auth/register`
- Or login at `/auth/login`

### ❌ Chatbot not responding
**Cause:** API rate limit or network issue

**Fix:**
1. Check Groq dashboard for rate limits
2. Verify internet connection
3. Check browser console for errors
4. Try again in a few seconds

### ❌ "Daily message limit reached"
**Cause:** Free tier limit (3 messages/day)

**Fix:** 
- Upgrade to a paid pack for unlimited messages
- Or wait until tomorrow

---

## 🔄 Switching Between AI Providers

To switch from Groq to OpenAI:

1. **Update `.env.local`:**
   ```env
   GROQ_API_KEY=  # Leave empty or remove
   OPENAI_API_KEY=sk-your_openai_key
   ```

2. **Update `lib/config.ts`:**
   ```typescript
   ai: {
     provider: 'openai', // Change from 'groq'
     model: 'gpt-4o-mini', // Change model
     // ...
   }
   ```

3. **Update `app/api/chat/route.ts`:**
   ```typescript
   import { openai } from '@ai-sdk/openai'
   
   // Change from:
   model: groq(CONFIG.ai.model),
   // To:
   model: openai(CONFIG.ai.model),
   ```

4. **Restart server**

---

## 📊 Available Models

### Groq Models:
- `llama-3.1-70b-versatile` (default) - Best balance
- `llama-3.1-8b-instant` - Faster, less accurate
- `mixtral-8x7b-32768` - Good for longer context
- `gemma-7b-it` - Alternative option

### OpenAI Models:
- `gpt-4o-mini` - Fast, cost-effective
- `gpt-4o` - More accurate, expensive
- `gpt-3.5-turbo` - Legacy option

---

## 💰 Cost Estimates

### Groq (Recommended):
- **Free Tier:** 14,400 requests/day
- **Paid:** ~$0.0001 per 1K tokens (very cheap)
- **Average cost:** $0.001-0.01 per conversation

### OpenAI:
- **gpt-4o-mini:** ~$0.15 per 1M input tokens
- **Average cost:** $0.01-0.10 per conversation

---

## 🔒 Security Notes

1. **Never commit `.env.local`** - It's in `.gitignore`
2. **Don't share API keys** - They're like passwords
3. **Rotate keys** if exposed
4. **Use environment variables** in production (Vercel, etc.)

---

## 🚀 Production Deployment

When deploying to Vercel/Netlify:

1. Go to **Project Settings → Environment Variables**
2. Add: `GROQ_API_KEY` = `gsk_...`
3. Redeploy

The chatbot will automatically use the production API key!

---

## ✅ Verification Checklist

- [ ] Groq account created
- [ ] API key generated
- [ ] `.env.local` file created
- [ ] `GROQ_API_KEY=...` added to `.env.local`
- [ ] Dev server restarted
- [ ] Chatbot widget appears on site
- [ ] Test message sent and received response

---

## 🎉 You're Done!

Your chatbot should now be fully functional. Users can ask questions about:
- ✅ Swiss immigration
- ✅ Swiss politics (when relevant)
- ✅ Swiss geography (when relevant)

And it will politely decline off-topic questions!

---

**Need Help?** Check the console logs or contact support.

