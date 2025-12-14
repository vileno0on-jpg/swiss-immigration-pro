# 🌍 DeepL Translation Setup

This application now uses **DeepL** for high-quality translations instead of Google Translate.

## ✅ What's Changed

- **Translation Provider**: Google Translate → DeepL
- **Quality**: DeepL provides more accurate, natural translations
- **API**: Server-side translation via DeepL API
- **Languages**: Supports 15+ languages

## 🚀 Quick Setup

### 1. Get DeepL API Key

1. Go to [DeepL Pro API](https://www.deepl.com/pro-api)
2. Sign up for an account (free tier available)
3. Navigate to **Account** → **API Keys**
4. Copy your API key

### 2. Add to Environment Variables

Add to your `.env.local` file:

```env
DEEPL_API_KEY=your_deepl_api_key_here
```

### 3. Restart Server

```bash
npm run dev
```

## 📋 Supported Languages

- 🇬🇧 English (EN)
- 🇩🇪 German (DE)
- 🇫🇷 French (FR)
- 🇮🇹 Italian (IT)
- 🇪🇸 Spanish (ES)
- 🇵🇹 Portuguese (PT)
- 🇨🇳 Chinese (ZH)
- 🇸🇦 Arabic (AR)
- 🇮🇳 Hindi (HI)
- 🇷🇺 Russian (RU)
- 🇯🇵 Japanese (JA)
- 🇰🇷 Korean (KO)
- 🇹🇷 Turkish (TR)
- 🇵🇱 Polish (PL)
- 🇳🇱 Dutch (NL)

And more...

## 🔧 How It Works

1. **User selects language** from the language switcher
2. **Page content is extracted** (excluding code, inputs, etc.)
3. **Text is sent to DeepL API** in batches
4. **Translated text replaces** original content
5. **Translations are cached** to avoid re-translating

## 💡 Features

- ✅ **High-quality translations** - DeepL's neural network
- ✅ **Auto-detection** - Detects source language automatically
- ✅ **Caching** - Translated text is cached for performance
- ✅ **Progress indicator** - Shows translation progress
- ✅ **Selective translation** - Skips code, inputs, and technical terms

## 🎯 Usage

The language switcher is available in the header. Simply:
1. Click the globe icon
2. Select your preferred language
3. Wait for translation to complete

## ⚠️ Important Notes

- **API Key Required**: Translation won't work without a valid DeepL API key
- **Rate Limits**: DeepL free tier has rate limits (check your plan)
- **Cost**: DeepL charges per character translated (free tier: 500,000 chars/month)
- **Performance**: First translation may take a few seconds

## 🔒 Security

- API key is stored server-side only (in `.env.local`)
- Never commit `.env.local` to git
- Translations are processed server-side for security

## 🆘 Troubleshooting

### Translation not working?

1. **Check API key**: Ensure `DEEPL_API_KEY` is set in `.env.local`
2. **Check server logs**: Look for DeepL API errors
3. **Verify API key**: Test your key at [DeepL API Status](https://www.deepl.com/pro-api)
4. **Check rate limits**: Free tier has monthly limits

### Slow translation?

- First translation is slower (API initialization)
- Large pages take longer (more text to translate)
- Consider caching translations for better performance

### Some text not translating?

- Code blocks (marked with `.notranslate`)
- Input fields (email, password, etc.)
- Elements with `translate="no"` attribute

## 📚 Resources

- [DeepL API Documentation](https://www.deepl.com/docs-api)
- [DeepL Pricing](https://www.deepl.com/pro-api#pricing)
- [Supported Languages](https://www.deepl.com/docs-api/translating-text/)

---

**Need help?** Check the main `SETUP_ENV.md` file for general environment setup.
