# AI API Keys Needed

## 🚨 Current Status

The AI chatbot needs an API key to work properly. Without it, you'll get generic answers.

## ✅ BEST FREE OPTION: Groq (Recommended)

**Groq is FREE and POWERFUL** - No credit card needed!

1. **Get FREE API Key:**
   - Go to: https://console.groq.com/
   - Sign up (free, no credit card)
   - Go to API Keys section
   - Create new API key
   - Copy the key (starts with `gsk_`)

2. **Add to `.env.local`:**
   ```
   GROQ_API_KEY=gsk_your_actual_key_here
   ```

3. **Restart your dev server:**
   ```bash
   npm run dev
   ```

**Why Groq?**
- ✅ 100% FREE (no credit card needed)
- ✅ Fast responses (Llama 3.1 70B model)
- ✅ 30 requests/minute limit (plenty for testing)
- ✅ No monthly limits
- ✅ Best quality free option

---

## 🔄 Alternative: xAI Grok (If you have access)

**Grok requires xAI API access** (may need waitlist or paid plan)

1. **Get API Key:**
   - Go to: https://console.x.ai/
   - Sign up / Join waitlist
   - Get API key

2. **Add to `.env.local`:**
   ```
   XAI_API_KEY=xai_your_actual_key_here
   ```

---

## 💰 Paid Options (If you want)

### OpenAI (GPT-4)
- Requires paid API key
- Add: `OPENAI_API_KEY=sk-your-key`

### Google Gemini
- Free tier available (limited)
- Add: `GOOGLE_GEMINI_API_KEY=your-key`

---

## 🎯 Current Priority Order

1. **Groq** (if `GROQ_API_KEY` set) → BEST FREE ⭐
2. **xAI/Grok** (if `XAI_API_KEY` set)
3. **OpenAI** (if `OPENAI_API_KEY` set)
4. **Google Gemini** (if `GOOGLE_GEMINI_API_KEY` set)
5. **Knowledge Base** (fallback - site-specific but limited)

---

## ⚡ Quick Fix

**Just add Groq (it's free!):**

1. Sign up: https://console.groq.com/
2. Get API key
3. Add to `.env.local`: `GROQ_API_KEY=gsk_...`
4. Restart: `npm run dev`

That's it! Your AI will work perfectly with non-generic answers.




