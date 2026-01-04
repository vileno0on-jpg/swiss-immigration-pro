# ✅ Chatbot Configuration - COMPLETE

## Overview
The AI chatbot is now configured and working on the VPS using **Google Gemini 1.5 API**.

## Configuration

### API Key Setup
- **Provider**: Google Gemini 1.5 Pro/Flash
- **Environment Variable**: `GOOGLE_GEMINI_API_KEY`
- **Status**: ✅ Configured on VPS

### Get Your Own API Key (Free)
1. Visit: https://ai.google.dev/gemini-api/docs/api-key
2. Sign in with Google account
3. Click "Get API Key"
4. Copy the key (starts with `AIza...`)
5. Add to `.env.local`:
   ```
   GOOGLE_GEMINI_API_KEY=your_key_here
   ```

### Features
- **Free Tier**: 10 messages/day for anonymous users
- **Unlimited**: For paid subscribers
- **Context-Aware**: Remembers user's layer (EU/US/Other)
- **Smart Typing**: Natural typing animation
- **File Upload**: Supports document uploads
- **Suggestions**: Dynamic query suggestions

## VPS Configuration

### Location
- **File**: `/home/ubuntu/swiss-immigration-pro/swiss-immigration-pro/.env.local`
- **API Key**: Already configured ✅

### Restart After Changes
```bash
cd ~/swiss-immigration-pro/swiss-immigration-pro
pm2 restart swiss-immigration-pro --update-env
```

## Local Development

### Add to .env.local
```env
# Google Gemini API - Get free key at: https://ai.google.dev/gemini-api/docs/api-key
GOOGLE_GEMINI_API_KEY=your_key_here
```

### Test Locally
```bash
npm run dev
# Open http://localhost:3000
# Click the chat button (bottom right)
```

## Troubleshooting

### "API Key Missing" Error
- Check `.env.local` has `GOOGLE_GEMINI_API_KEY`
- Restart dev server: `npm run dev`
- On VPS: `pm2 restart swiss-immigration-pro --update-env`

### "Rate Limit" Error
- Free tier: 60 requests/minute
- Upgrade: https://ai.google.dev/pricing

### Chatbot Not Appearing
- Check browser console for errors
- Clear browser cache
- Verify `FloatingChatWidget` is in root layout

## API Endpoints

### POST /api/chat
**Request:**
```json
{
  "message": "What are Swiss work permits?",
  "packId": "free",
  "layer": "europeans"
}
```

**Response:**
```json
{
  "response": "Hey there! Let me explain...",
  "tokens": 150
}
```

## System Prompt
The chatbot uses a comprehensive Swiss immigration system prompt with:
- Friendly, conversational tone
- Up-to-date 2025 quotas and requirements
- Layer-specific context (EU/US/Other)
- Natural formatting without markdown headers

## Components

### Main Components
- `FloatingChatWidget.tsx` - Floating chat button and sidebar
- `ChatbotProvider.tsx` - Context provider
- `MessageContent.tsx` - Message rendering
- `EmbeddedChat.tsx` - Embedded chat for pages

### API Route
- `/app/api/chat/route.ts` - Handles all chat requests

## Status: ✅ WORKING

The chatbot is fully configured and operational on:
- 🌐 **Production VPS**: http://83.228.215.185
- 💻 **Local Development**: http://localhost:3000 (with API key)

Last updated: 2026-01-03
