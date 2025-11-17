# 🤖 FREE AI Chatbot Setup Guide

## Overview
Your Swiss Immigration Pro has an AI chatbot that can use **FREE API options**. This guide shows you how to set it up at NO COST.

---

## Option 1: Groq API (RECOMMENDED - 100% FREE) ⭐

### Why Groq?
- ✅ **Completely FREE** (no credit card required)
- ✅ **Fast** (fastest inference in the world)
- ✅ **No rate limits** for free tier
- ✅ **Llama 3.1 70B** model (excellent quality)
- ✅ **Easy setup** (5 minutes)

### Step-by-Step Setup:

#### 1. Create Groq Account (FREE)
1. Go to: **https://console.groq.com**
2. Click "Sign Up" (top right)
3. Sign up with:
   - Google account (fastest)
   - OR Email + password
4. **No credit card needed!**

#### 2. Get Your FREE API Key
1. After login, go to: **https://console.groq.com/keys**
2. Click "Create API Key"
3. Give it a name: `SwissImmigrationPro`
4. Click "Create"
5. **COPY the API key** (starts with `gsk_...`)
   - ⚠️ Save it somewhere safe - you won't see it again!

#### 3. Add API Key to Your Project
1. Open your project folder:
   ```
   C:\Users\vilen\Downloads\New folder\swiss-immigration-pro
   ```

2. Find the file: `.env.local`
   - If it doesn't exist, copy `env.local.txt` to `.env.local`

3. Open `.env.local` in Notepad

4. Find this line:
   ```
   GROQ_API_KEY=gsk_placeholder
   ```

5. Replace with YOUR key:
   ```
   GROQ_API_KEY=gsk_YOUR_ACTUAL_KEY_HERE
   ```

6. Save the file

#### 4. Test It!
1. Start your server:
   ```bash
   npm run dev -- -p 3009
   ```

2. Go to: http://localhost:3009

3. Look for the chat widget (bottom right)

4. Type a question: "What is a B permit?"

5. You should get an AI response! 🎉

---

## Option 2: OpenAI FREE Credits (Alternative)

### Setup:
OpenAI gives **$5 FREE credits** to new accounts.

#### 1. Create OpenAI Account
1. Go to: **https://platform.openai.com/signup**
2. Sign up with email
3. Verify your email
4. You get **$5 FREE credits** (about 2,500-5,000 messages)

#### 2. Get API Key
1. Go to: **https://platform.openai.com/api-keys**
2. Click "Create new secret key"
3. Name it: `SwissImmigrationPro`
4. **COPY the key** (starts with `sk-proj-...`)

#### 3. Add to Project
1. Open `.env.local`
2. Find:
   ```
   OPENAI_API_KEY=sk-placeholder
   ```
3. Replace:
   ```
   OPENAI_API_KEY=sk-proj-YOUR_ACTUAL_KEY_HERE
   ```
4. Save

#### 4. Update Chat Route
Open `app/api/chat/route.ts` and ensure OpenAI is used:
```typescript
// Line ~20, change to:
const model = openai('gpt-3.5-turbo')
```

---

## Free Tier Comparison

| Feature | Groq (FREE) | OpenAI (FREE $5) |
|---------|-------------|------------------|
| **Cost** | FREE Forever | FREE $5 credits |
| **Credit Card** | NOT Required | Required (for verification) |
| **Messages** | Unlimited | ~2,500-5,000 |
| **Speed** | Very Fast | Fast |
| **Model** | Llama 3.1 70B | GPT-3.5 Turbo |
| **Quality** | Excellent | Excellent |
| **Setup Time** | 5 minutes | 10 minutes |

**Recommendation**: Use **Groq** for truly unlimited free chatbot! ⭐

---

## Configure Chat Settings

### 1. Adjust Response Length
Open `app/api/chat/route.ts`:

```typescript
// Line ~35
const result = await streamText({
  model: groq('llama-3.1-70b-versatile'),
  messages,
  maxTokens: 1000, // Adjust: 500-2000 (longer = more detailed)
  temperature: 0.7, // Adjust: 0.1-1.0 (higher = more creative)
})
```

### 2. Change System Prompt
In `app/api/chat/route.ts`, find the system message:

```typescript
const messages = [
  {
    role: 'system',
    content: `You are a Swiss immigration expert assistant...`
  },
  ...userMessages
]
```

Customize this to change the chatbot's personality!

---

## Free Usage Limits

### Groq (Recommended):
- **Messages**: Unlimited
- **Rate Limit**: 30 requests/minute (plenty for most sites)
- **Duration**: Forever free
- **Upgrade**: Not needed

### OpenAI:
- **Messages**: Until $5 runs out
- **Rate Limit**: 3 requests/minute (free tier)
- **Duration**: Credits last 3 months
- **Upgrade**: $20/month after credits expire

---

## Testing Your Chatbot

### Test Questions:
1. "What is a B permit?"
2. "How do I get Swiss citizenship?"
3. "What are the costs to move to Switzerland?"
4. "Compare Zurich and Geneva"
5. "Can US citizens work in Switzerland?"

### Expected Response Time:
- **Groq**: 1-3 seconds
- **OpenAI**: 2-5 seconds

### If It's Not Working:

#### Check 1: API Key Format
- Groq: Starts with `gsk_`
- OpenAI: Starts with `sk-proj-` or `sk-`

#### Check 2: Environment Variables Loaded
1. Restart your dev server after adding keys
2. Check console for errors (F12 in browser)

#### Check 3: Network Issues
1. Open browser DevTools (F12)
2. Go to "Network" tab
3. Look for `/api/chat` request
4. Check if it returns 200 (success) or error

---

## Advanced Features (Optional)

### Add RAG (Retrieval Augmented Generation)

**What is RAG?**
- Chatbot uses your website content to answer questions
- More accurate responses
- Can cite specific guides

**How to Add:**
1. Create knowledge base from your guides
2. Use embeddings to store content
3. Retrieve relevant content before answering

**Free Tools:**
- Supabase Vector Store (FREE tier)
- Pinecone (FREE tier - 1 index)

---

## Cost Optimization Tips

### For Groq (Already Free!):
- No optimization needed
- Use freely without worry

### For OpenAI (If Using):
1. **Use GPT-3.5** instead of GPT-4 (10x cheaper)
2. **Limit message history** to last 5 messages
3. **Set maxTokens** to 500-1000 (not 2000+)
4. **Cache system prompts** (reduces costs)

Example optimization:
```typescript
// Keep only last 5 messages
const recentMessages = messages.slice(-5)

// Use cheaper model
const model = openai('gpt-3.5-turbo')

// Limit response length
maxTokens: 800
```

---

## Monitoring Usage

### Groq Dashboard:
1. Go to: https://console.groq.com/usage
2. See your request count
3. Check performance metrics

### OpenAI Dashboard:
1. Go to: https://platform.openai.com/usage
2. See credit usage
3. Monitor costs

---

## Upgrade Paths (Future)

### When You Outgrow Free Tier:

**Groq:**
- Stay on free tier (unlimited)
- OR upgrade for higher rate limits

**OpenAI:**
- **Pay-as-you-go**: ~$0.002 per 1K tokens
- **Pro**: $20/month for higher limits

**Alternative Free Options:**
- **Anthropic Claude**: $5 free credits
- **Google Gemini**: Free API (limited)
- **Hugging Face**: Free models (self-hosted)

---

## 🎯 Quick Setup Checklist

- [ ] Sign up for Groq (https://console.groq.com)
- [ ] Create API key (copy it!)
- [ ] Add key to `.env.local`
- [ ] Restart dev server
- [ ] Test chatbot on homepage
- [ ] Ask test questions
- [ ] Verify responses are working
- [ ] Celebrate! 🎉

---

## 🆘 Troubleshooting

### Error: "API key not found"
**Solution**: 
- Check `.env.local` exists (not `env.local.txt`)
- Restart server after adding key
- Verify no extra spaces in API key

### Error: "Rate limit exceeded"
**Solution**:
- Groq: Wait 1 minute, try again
- OpenAI: Upgrade to paid tier

### Error: "Invalid API key"
**Solution**:
- Regenerate key from dashboard
- Copy entire key (don't miss characters)
- Check for typos

### Chatbot Widget Not Showing
**Solution**:
1. Check if you're logged in
2. Look for widget in bottom-right corner
3. Check browser console for errors

---

## 📚 Resources

### Official Docs:
- **Groq**: https://console.groq.com/docs
- **OpenAI**: https://platform.openai.com/docs
- **Vercel AI SDK**: https://sdk.vercel.ai/docs

### Community:
- Groq Discord: https://groq.com/discord
- OpenAI Forum: https://community.openai.com

---

## ✅ Success!

You now have a **FREE AI chatbot** that can:
- ✅ Answer unlimited questions
- ✅ Provide Swiss immigration guidance
- ✅ Help users 24/7
- ✅ Cost you NOTHING

**Enjoy your free AI chatbot! 🤖✨**

---

*Last Updated: November 3, 2025*
*Tested with: Groq API (FREE tier)*
*Status: ✅ WORKING*

