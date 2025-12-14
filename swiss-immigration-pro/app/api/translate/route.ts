import { NextRequest, NextResponse } from 'next/server'
import * as deepl from 'deepl-node'

// DeepL language code mapping
const DEEPL_LANGUAGE_MAP: Record<string, string> = {
  en: 'EN',
  de: 'DE',
  fr: 'FR',
  it: 'IT',
  es: 'ES',
  pt: 'PT-PT', // Portuguese (Portugal)
  'pt-BR': 'PT-BR', // Portuguese (Brazil)
  zh: 'ZH',
  ar: 'AR',
  hi: 'HI',
  ru: 'RU',
  ja: 'JA',
  ko: 'KO',
  tr: 'TR',
  pl: 'PL',
  nl: 'NL',
  bg: 'BG',
  cs: 'CS',
  da: 'DA',
  el: 'EL',
  et: 'ET',
  fi: 'FI',
  hu: 'HU',
  id: 'ID',
  lv: 'LV',
  lt: 'LT',
  ms: 'MS',
  nb: 'NB',
  ro: 'RO',
  sk: 'SK',
  sl: 'SL',
  sv: 'SV',
  uk: 'UK',
}

export async function POST(request: NextRequest) {
  try {
    const { text, targetLang, sourceLang } = await request.json()

    if (!text || !targetLang) {
      return NextResponse.json(
        { error: 'Text and target language are required' },
        { status: 400 }
      )
    }

    const deeplApiKey = process.env.DEEPL_API_KEY
    if (!deeplApiKey) {
      return NextResponse.json(
        { error: 'DeepL API key not configured' },
        { status: 500 }
      )
    }

    const translator = new deepl.Translator(deeplApiKey)

    // Map language codes to DeepL format
    const targetLangCode = DEEPL_LANGUAGE_MAP[targetLang.toLowerCase()] || targetLang.toUpperCase()
    
    // Use sourceLang if provided, otherwise let DeepL auto-detect
    let sourceLangCode: deepl.SourceLanguageCode | null = null
    if (sourceLang) {
      sourceLangCode = (DEEPL_LANGUAGE_MAP[sourceLang.toLowerCase()] || sourceLang.toUpperCase()) as deepl.SourceLanguageCode
    }

    // Translate the text (DeepL will auto-detect if sourceLangCode is null)
    const result = await translator.translateText(
      text,
      sourceLangCode || null, // null = auto-detect
      targetLangCode as deepl.TargetLanguageCode
    )

    return NextResponse.json({
      translatedText: result.text,
      detectedSourceLang: result.detectedSourceLang,
    })
  } catch (error: any) {
    console.error('DeepL translation error:', error)
    return NextResponse.json(
      { error: error.message || 'Translation failed' },
      { status: 500 }
    )
  }
}

// GET endpoint to translate page content
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const targetLang = searchParams.get('targetLang')
    const text = searchParams.get('text')
    const sourceLang = searchParams.get('sourceLang')

    if (!text || !targetLang) {
      return NextResponse.json(
        { error: 'Text and target language are required' },
        { status: 400 }
      )
    }

    const deeplApiKey = process.env.DEEPL_API_KEY
    if (!deeplApiKey) {
      return NextResponse.json(
        { error: 'DeepL API key not configured' },
        { status: 500 }
      )
    }

    const translator = new deepl.Translator(deeplApiKey)

    // Map language codes to DeepL format
    const targetLangCode = DEEPL_LANGUAGE_MAP[targetLang.toLowerCase()] || targetLang.toUpperCase()
    
    // Use sourceLang if provided, otherwise let DeepL auto-detect
    let sourceLangCode: deepl.SourceLanguageCode | null = null
    if (sourceLang) {
      sourceLangCode = (DEEPL_LANGUAGE_MAP[sourceLang.toLowerCase()] || sourceLang.toUpperCase()) as deepl.SourceLanguageCode
    }

    // Translate the text (DeepL will auto-detect if sourceLangCode is null)
    const result = await translator.translateText(
      text,
      sourceLangCode || null, // null = auto-detect
      targetLangCode as deepl.TargetLanguageCode
    )

    return NextResponse.json({
      translatedText: result.text,
      detectedSourceLang: result.detectedSourceLang,
    })
  } catch (error: any) {
    console.error('DeepL translation error:', error)
    return NextResponse.json(
      { error: error.message || 'Translation failed' },
      { status: 500 }
    )
  }
}
