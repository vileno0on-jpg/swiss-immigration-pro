# Test xAI API Key

## Quick Test

The API key should be in `.env.local` like this:

```
XAI_API_KEY=your_xai_api_key_here
```

## Important Notes:

1. **NO SPACES** around the `=` sign
2. **NO QUOTES** around the value
3. Must be on its own line
4. Server must be restarted after adding

## Check Terminal Logs

When you send a message, look for these in your terminal:

✅ **If working:**
- "🚀 Attempting xAI/Grok API call..."
- "✅ XAI_API_KEY found (length: XX)"
- "✅ xAI/Grok SUCCESS - Response length: XXX"

❌ **If not working:**
- "❌ XAI_API_KEY NOT FOUND"
- "❌ xAI/Grok API ERROR: ..."

## Common Issues:

1. **Key not loaded**: Restart server after adding to .env.local
2. **Wrong format**: Make sure no spaces or quotes
3. **API error**: Check the error message in terminal

## Manual Test (Optional)

You can test the API key directly with curl:

```bash
curl https://api.x.ai/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_xai_api_key_here" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "Hello"
      }
    ],
    "model": "grok-4-latest",
    "stream": false,
    "temperature": 0.7
  }'
```

If this works, the key is valid. The issue is with how Next.js is reading it.




