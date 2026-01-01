# 🤖 Chatbot Setup Guide

## Overview

Your chatbot is already integrated into the application! It appears as a floating chat widget in the bottom-right corner. This guide will help you complete the setup.

---

## ✅ What's Already Done

- ✅ Chatbot UI component (`FloatingChatWidget.tsx`)
- ✅ Chatbot provider (`ChatbotProvider.tsx`)
- ✅ API route (`/api/chat/route.ts`)
- ✅ Integrated in main layout (`app/layout.tsx`)
- ✅ All dependencies installed

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Install Dependencies

If you haven't already, install the required packages:

```bash
cd swiss-immigration-pro
npm install
```

**Key dependencies:**
- `@ai-sdk/groq` - Groq AI integration (primary)
- `@ai-sdk/openai` - OpenAI integration (fallback)
- `@ai-sdk/xai` - xAI/Grok integration (fallback)
- `@google/generative-ai` - Google Gemini (fallback)
- `@huggingface/inference` - Hugging Face (free fallback)
- `ai` - Vercel AI SDK for streaming

---

### Step 2: Get an API Key (Choose One)

The chatbot supports multiple AI providers with automatic fallback. **You only need ONE key to get started.**

#### Option A: Groq (Recommended - FREE & Fast) ⭐

1. Go to [https://console.groq.com/](https://console.groq.com/)
2. Sign up (free account)
3. Navigate to **API Keys**
4. Click **"Create API Key"**
5. Copy your key (starts with `gsk_...`)

**Free Tier:** 14,400 requests/day, very fast responses

#### Option B: OpenAI (Backup)

1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or login
3. Create a new API key
4. Copy your key (starts with `sk-...`)

#### Option C: Google Gemini (FREE Tier)

1. Go to [https://aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Create API key
3. Copy your key

**Free Tier:** 15 requests/min, 1,500 requests/day

#### Option D: xAI/Grok (Backup)

1. Go to [https://console.x.ai/](https://console.x.ai/)
2. Sign up
3. Get API key

---

### Step 3: Configure Environment Variables

1. **Create or edit `.env.local`** in the project root:
   ```
   swiss-immigration-pro/.env.local
   ```

2. **Add your API key(s):**
   ```env
   # Groq AI (Primary - Recommended)
   GROQ_API_KEY=gsk_your_actual_groq_key_here
   
   # OpenAI (Optional - Backup)
   OPENAI_API_KEY=sk-your_openai_key_here
   
   # Google Gemini (Optional - Free Tier)
   GOOGLE_GEMINI_API_KEY=your_gemini_key_here
   
   # xAI/Grok (Optional - Backup)
   XAI_API_KEY=your_xai_key_here
   
   # Hugging Face (Optional - Free, no key needed for public models)
   HUGGINGFACE_API_KEY=hf_your_token_here
   ```

3. **Save the file**

---

### Step 4: Restart Development Server

The API keys are loaded at startup, so restart your server:

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

---

## 🎯 How It Works

### AI Provider Priority (Automatic Fallback)

The chatbot tries providers in this order:

1. **Groq** (if `GROQ_API_KEY` set) → **Llama 3.1 70B** ⚡ Fastest & Best
2. **OpenAI** (if `OPENAI_API_KEY` set) → GPT models
3. **xAI/Grok** (if `XAI_API_KEY` set) → Grok models
4. **Google Gemini** (if `GOOGLE_GEMINI_API_KEY` set) → Gemini Pro
5. **Hugging Face** (if `HUGGINGFACE_API_KEY` set) → Free models
6. **Knowledge Base** (always available) → Local responses

**Note:** If no API keys are set, the chatbot will use the knowledge base (still functional, but limited).

---

## ✅ Test the Chatbot

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:** `http://localhost:5050` (or the port you're using)

3. **Look for the chat button** in the bottom-right corner (blue circle with message icon)

4. **Click it** to open the chat widget

5. **Try asking:**
   - "What are the requirements for a B permit?"
   - "How do I apply for Swiss citizenship?"
   - "What's the difference between L and B permits?"

6. **You should see a response!**

---

## 🎨 Features

- ✅ **Floating chat widget** - Always accessible
- ✅ **File uploads** - Users can upload documents (CVs, PDFs, images)
- ✅ **Suggested queries** - Quick-start questions
- ✅ **Message limits** - Free tier: 30 messages/day
- ✅ **Anonymous users** - Works without login (localStorage tracking)
- ✅ **Layer-specific context** - Adapts to user's immigration pathway
- ✅ **Streaming responses** - Real-time AI responses
- ✅ **Minimize/Maximize** - Users can minimize the chat

---

## 🛠️ Troubleshooting

### ❌ Chatbot button doesn't appear

**Possible causes:**
1. Server not running
2. JavaScript errors in console
3. Component not mounted

**Fix:**
1. Check browser console for errors
2. Verify `ChatbotProvider` is in `app/layout.tsx` (line 225)
3. Restart dev server

### ❌ "Failed to get response" error

**Possible causes:**
1. API key missing or invalid
2. API rate limit reached
3. Network issue

**Fix:**
1. Check `.env.local` has valid API key
2. Verify key format (Groq: `gsk_...`, OpenAI: `sk-...`)
3. Restart dev server after adding key
4. Check server console for detailed errors
5. Try a different API provider

### ❌ "Daily message limit reached"

**Cause:** Free tier limit (30 messages/day for anonymous users)

**Fix:**
- Wait until tomorrow (resets daily)
- Sign up for an account (may have higher limits)
- Upgrade to paid pack (unlimited messages)

### ❌ Chatbot not responding / Empty responses

**Possible causes:**
1. All API providers failed
2. Knowledge base fallback not working

**Fix:**
1. Check server console logs for API errors
2. Verify at least one API key is set correctly
3. Check network tab in browser DevTools
4. Try a simple greeting like "Hello" to test

### ❌ API Key not being read

**Fix:**
1. Ensure file is named `.env.local` (not `.env`)
2. File must be in project root (`swiss-immigration-pro/`)
3. Restart dev server after adding keys
4. Check for typos in variable names
5. No quotes needed around values: `GROQ_API_KEY=gsk_abc123` ✅ (not `GROQ_API_KEY="gsk_abc123"` ❌)

---

## 📊 Configuration

### Chatbot Settings (`lib/config.ts`)

```typescript
ai: {
  provider: 'groq',              // Primary provider
  model: 'llama-3.1-70b-versatile', // Model name
  maxTokens: 1000,               // Max response length
  freeDailyLimit: 30,            // Free tier daily limit
  temperature: 0.7,              // Creativity (0-1)
}
```

### Available Models

**Groq:**
- `llama-3.1-70b-versatile` (default) - Best balance
- `llama-3.1-8b-instant` - Faster
- `mixtral-8x7b-32768` - Longer context

**OpenAI:**
- `gpt-4o-mini` - Fast, cost-effective
- `gpt-4o` - More accurate

**Google Gemini:**
- `gemini-1.5-flash` - Fast, free tier
- `gemini-pro` - More capable

---

## 🔒 Security Notes

1. **Never commit `.env.local`** - It's in `.gitignore`
2. **Don't share API keys** - Treat them like passwords
3. **Rotate keys** if exposed
4. **Use environment variables** in production (Vercel, etc.)

---

## 🚀 Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Go to **Project Settings → Environment Variables**
2. Add your API key(s):
   - `GROQ_API_KEY` = `gsk_...`
   - `OPENAI_API_KEY` = `sk-...` (optional)
   - etc.
3. **Redeploy** your application

The chatbot will automatically use the production API keys!

---

## 📝 Code Structure

```
swiss-immigration-pro/
├── components/
│   └── chat/
│       ├── FloatingChatWidget.tsx    # Main chat UI
│       └── ChatbotProvider.tsx       # Provider wrapper
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts              # API endpoint
│   └── layout.tsx                    # Includes ChatbotProvider
└── lib/
    ├── config.ts                     # Chatbot configuration
    └── knowledge-base.ts             # Fallback knowledge base
```

---

## ✅ Verification Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] API key obtained (Groq recommended)
- [ ] `.env.local` file created
- [ ] API key added to `.env.local`
- [ ] Dev server restarted
- [ ] Chatbot button appears on site
- [ ] Test message sent successfully
- [ ] Response received from AI

---

## 🎉 You're Done!

Your chatbot should now be fully functional! Users can:
- ✅ Ask questions about Swiss immigration
- ✅ Upload documents for analysis
- ✅ Get personalized responses based on their pathway
- ✅ Use it anonymously (30 free messages/day)

**Need Help?** Check the server console logs or browser DevTools for detailed error messages.

---

## 📚 Additional Resources

- [Groq Documentation](https://console.groq.com/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [OpenAI API Docs](https://platform.openai.com/docs)


