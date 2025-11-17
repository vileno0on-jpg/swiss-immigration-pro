# 🚀 Free Powerful AI Model Setup

The chatbot currently uses free models, but for **powerful AI responses**, you can easily add a free API key.

## ✅ Current Setup (Works Out of the Box)

The chatbot uses:
1. **Knowledge Base** (primary) - Site-specific content, instant responses
2. **Free Hugging Face models** (fallback) - Basic AI responses
3. **Simple rule-based** (ultimate fallback) - Always works

## 💪 For Powerful AI (Recommended - FREE!)

### Option 1: Groq (BEST - Free Tier)

**Why Groq?**
- ✅ **FREE tier** - 30 requests/minute
- ✅ **Powerful models** - Llama 3.1 70B, Mixtral 8x7B
- ✅ **Super fast** - Responses in <1 second
- ✅ **No credit card** required
- ✅ **Easy setup** - Takes 2 minutes

**Setup Steps:**
1. Go to https://console.groq.com
2. Sign up (free, no credit card)
3. Click "API Keys" → "Create API Key"
4. Copy your key (starts with `gsk_`)
5. Add to `.env.local`:
   ```env
   GROQ_API_KEY=gsk_your_key_here
   ```
6. Restart server: `npm run dev`

**That's it!** Your chatbot will now use powerful Llama 3.1 70B model.

---

### Option 2: Google Gemini (Also Free)

**Why Gemini?**
- ✅ **FREE tier** - 15 requests/minute
- ✅ **Powerful** - Gemini Pro model
- ✅ **Good quality** responses

**Setup Steps:**
1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Create API key
4. Add to `.env.local`:
   ```env
   GOOGLE_GEMINI_API_KEY=your_key_here
   ```
5. Restart server

---

### Option 3: Hugging Face (Free but Limited)

**Why Hugging Face?**
- ✅ **FREE** - No API key needed for public models
- ⚠️ **Limited** - Basic models, may require auth for better ones
- ⚠️ **Rate limits** - May be slower

**Setup (Optional):**
1. Go to https://huggingface.co
2. Sign up (free)
3. Get token from https://huggingface.co/settings/tokens
4. Add to `.env.local`:
   ```env
   HUGGINGFACE_API_KEY=hf_your_token_here
   ```
5. Restart server

---

## 🎯 Model Priority

The chatbot tries models in this order:

1. **Groq** (if `GROQ_API_KEY` set) → **Llama 3.1 70B** ⚡ Most powerful
2. **OpenAI** (if `OPENAI_API_KEY` set) → GPT models
3. **Google Gemini** (if `GOOGLE_GEMINI_API_KEY` set) → Gemini Pro
4. **Hugging Face** (free, no key) → Basic models
5. **Knowledge Base** → Always works, instant responses

---

## 💡 Recommendation

**For best experience, add Groq API key:**
- Takes 2 minutes
- Free forever
- Powerful AI (Llama 3.1 70B)
- Super fast responses
- No credit card needed

Without any API keys, the chatbot still works using:
- Knowledge base (excellent for common questions)
- Free Hugging Face models (basic AI)
- Rule-based responses (always works)

---

## 🔧 Current Status

**Without API keys:**
- ✅ Knowledge base responses (instant, accurate)
- ✅ Basic AI responses (free Hugging Face)
- ✅ Always works (fallback system)

**With Groq API key:**
- ✅ Powerful AI (Llama 3.1 70B)
- ✅ Fast responses (<1 second)
- ✅ Better understanding
- ✅ More natural conversations

---

**Status:** Chatbot works without API keys, but adding a free Groq key gives you powerful AI! 🚀

