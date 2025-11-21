# Debug xAI/Grok Integration

## Check Terminal Logs

When you send a message, look for these in your terminal:

### ✅ If Working:
```
🚀 Attempting xAI/Grok API call
✅ XAI_API_KEY found (length: 95, starts with: xai-BJBkMR)
Using model: grok-beta
✅ xAI/Grok SUCCESS - Response length: XXX
📝 Response preview: ...
```

### ❌ If Not Working:
```
❌ XAI_API_KEY NOT FOUND in environment variables
```
OR
```
❌ xAI/Grok API ERROR: [error message]
```

## Common Issues:

1. **API Key Not Loaded**: Server needs restart after adding to .env.local
2. **Wrong Model Name**: Try "grok-beta" (current), "grok-2-1212", or "grok-4-latest"
3. **API Error**: Check error message - might be authentication or rate limit

## Manual Test:

Test the API key directly:

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
    "model": "grok-beta",
    "stream": false
  }'
```

If this works, the key is valid and the issue is with the SDK integration.




