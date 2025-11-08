# AI Chat Setup - Quick Fix Guide

## 🚨 Current Issue
AI chat may not be working if API keys are missing or incorrect.

## ✅ Solution: Use Groq (100% FREE, Best Option)

### Why Groq?
- ✅ **100% FREE** - No credit card required
- ✅ **Unlimited monthly requests** (30 requests/minute)
- ✅ **Fast** - 1-3 second responses
- ✅ **Powerful** - Llama 3.1 70B model
- ✅ **No rate limits** that matter for most use cases

### Quick Setup (2 minutes):

1. **Get Free Groq API Key:**
   - Go to: https://console.groq.com
   - Sign up (free, no credit card)
   - Go to: https://console.groq.com/keys
   - Click "Create API Key"
   - Copy your key (starts with `gsk_`)

2. **Add to `.env.local`:**
   ```env
   GROQ_API_KEY=gsk_your_actual_key_here
   ```

3. **Restart Dev Server:**
   ```bash
   npm run dev
   ```

## 🔄 Alternative: Google Gemini (FREE but Limited)

### Gemini Free Tier:
- ✅ **FREE** - No credit card required
- ⚠️ **Rate Limits**: 15 requests/minute, 1,500 requests/day
- ✅ **Good quality** - Gemini Flash model

### Setup:
1. Go to: https://makersuite.google.com/app/apikey
2. Create API key (free)
3. Add to `.env.local`:
   ```env
   GOOGLE_GEMINI_API_KEY=your_gemini_key_here
   ```

## 📊 API Priority Order:

The system tries in this order:
1. **Groq** (if `GROQ_API_KEY` set) → BEST, FREE, FAST ⭐
2. **OpenAI** (if `OPENAI_API_KEY` set) → PAID
3. **Gemini** (if `GOOGLE_GEMINI_API_KEY` set) → FREE with limits
4. **Knowledge Base** (always works, no API key) → FREE, site-specific
5. **Hugging Face** (fallback) → FREE but may fail

## 🎯 Recommendation:

**Use Groq** - It's the best free option:
- No limits for practical use
- Fast responses
- Powerful model
- Easy setup

## 🔍 Troubleshooting:

### If AI doesn't work:

1. **Check API Key:**
   ```bash
   # In .env.local, verify:
   GROQ_API_KEY=gsk_... (should start with gsk_)
   ```

2. **Check Console:**
   - Open browser console (F12)
   - Look for errors in Network tab
   - Check server logs

3. **Test API Key:**
   - Go to: https://console.groq.com/usage
   - Verify key is active

4. **Verify .env.local:**
   - File exists in project root
   - Key is correct format
   - No extra spaces

5. **Restart Server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

## 💡 Fallback System:

Even without API keys, the chat works using:
- **Knowledge Base** - Site-specific content, always free
- **Simple Responses** - Helpful fallback with links

## ✨ Current Status:

Your `.env.local` should have:
```env
GROQ_API_KEY=your_groq_api_key_here
```

This should work! If not, check:
1. Key is valid
2. Server restarted after adding key
3. No typos in key

## 🚀 Quick Test:

1. Open chat widget (bottom right)
2. Type: "What is the L permit?"
3. Should get detailed response

If it doesn't work, check server logs for errors.


