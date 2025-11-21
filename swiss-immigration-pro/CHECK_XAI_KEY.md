# Check if XAI_API_KEY is Set

## Quick Check

Run this in your terminal (in the project directory):

```bash
# Windows PowerShell
$env:XAI_API_KEY

# Or check if it's in .env.local
Get-Content .env.local | Select-String "XAI"
```

## Add to .env.local

Make sure your `.env.local` file has:

```
XAI_API_KEY=your_xai_api_key_here
```

## Restart Server

After adding the key, restart:
```bash
npm run dev
```

## Check Server Logs

When you send a message, you should see in the terminal:
- "Attempting xAI/Grok API call with model: grok-4-latest"
- "XAI_API_KEY present: Yes"
- "xAI/Grok response received, length: XXX"

If you see "XAI_API_KEY not found", the key isn't being read.




