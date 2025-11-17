# 🆓 Free AI Model Setup

The chat assistant now supports **free AI models** that work without any API keys!

## ✅ What's Included

The chat will automatically use free models in this priority order:

1. **Groq** (if `GROQ_API_KEY` is set) - Free tier available
2. **OpenAI** (if `OPENAI_API_KEY` is set)
3. **Google Gemini** (if `GOOGLE_GEMINI_API_KEY` is set) - Generous free tier
4. **Hugging Face** (automatic fallback) - **Completely free, no API key needed!**
5. **Simple Rule-Based** (ultimate fallback) - Works for common questions

## 🚀 How It Works

### Without Any API Keys

The chat will automatically use:
- **Hugging Face Inference API** - Free public models
- **Rule-based responses** - For common Swiss immigration questions

**You don't need to configure anything!** The chat will work out of the box.

### With Free API Keys (Recommended)

For better responses, you can optionally add free API keys:

#### Option 1: Groq (Recommended - Free Tier)
1. Sign up at https://console.groq.com
2. Get your free API key
3. Add to `.env.local`:
   ```env
   GROQ_API_KEY=gsk_your_key_here
   ```

#### Option 2: Google Gemini (Free Tier)
1. Sign up at https://makersuite.google.com/app/apikey
2. Get your free API key
3. Add to `.env.local`:
   ```env
   GOOGLE_GEMINI_API_KEY=your_key_here
   ```

#### Option 3: Hugging Face (Optional - Improves Free Model)
1. Sign up at https://huggingface.co
2. Get your token from https://huggingface.co/settings/tokens
3. Add to `.env.local`:
   ```env
   HUGGINGFACE_API_KEY=hf_your_token_here
   ```

## 📊 Model Comparison

| Model | Free Tier | Quality | Speed | Setup Required |
|-------|-----------|---------|-------|----------------|
| Hugging Face | ✅ Unlimited | Good | Medium | ❌ No |
| Groq | ✅ 30 req/min | Excellent | Fast | ✅ Yes |
| Google Gemini | ✅ 15 req/min | Excellent | Fast | ✅ Yes |
| OpenAI | ❌ Paid | Excellent | Fast | ✅ Yes |

## 🎯 Current Behavior

**Right now, your chat is using the free Hugging Face model** (or rule-based fallback) because no API keys are configured. It will:

✅ Answer common Swiss immigration questions  
✅ Provide basic information about visas, permits, citizenship  
✅ Work immediately without setup  
⚠️ May have limitations for complex questions  

## 💡 Tips

1. **For best results**: Add a free Groq API key (takes 2 minutes)
2. **For unlimited free**: Use Hugging Face (already working!)
3. **For production**: Consider paid plans for higher limits

## 🔧 Troubleshooting

### "Failed to process chat message"
- The free model might be temporarily unavailable
- Try again in a few seconds
- Or add a free Groq/Gemini key for better reliability

### Responses seem generic
- Add a free Groq API key for better quality
- Or upgrade to premium plans for unlimited access

---

**Status**: ✅ Free AI model is active and working!

