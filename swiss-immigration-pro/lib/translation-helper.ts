/**
 * Translation Helper for DeepL
 * Ensures all content including dynamic content gets translated
 */

// Elements that should not be translated
export const NO_TRANSLATE_SELECTORS = [
  'script',
  'style',
  'noscript',
  'code',
  'pre',
  '.notranslate',
  '[translate="no"]',
  'input[type="email"]',
  'input[type="password"]',
  'input[type="url"]',
  'input[type="search"]',
  'textarea',
  'select',
]

// Check if element should be translated
export const shouldTranslate = (element: Element): boolean => {
  // Skip if element or parent has notranslate class
  if (element.closest('.notranslate')) {
    return false
  }

  // Skip if element matches no-translate selectors
  for (const selector of NO_TRANSLATE_SELECTORS) {
    if (element.matches(selector) || element.closest(selector)) {
      return false
    }
  }

  // Skip if element has translate="no" attribute
  if (element.getAttribute('translate') === 'no') {
    return false
  }

  // Skip empty or whitespace-only text
  const text = element.textContent?.trim()
  if (!text || text.length === 0) {
    return false
  }

  // Skip if it's already translated (has data-deepl attribute)
  if (element.hasAttribute('data-deepl-translated')) {
    return false
  }

  return true
}

// Mark content as translatable (for future use)
export const markContentAsTranslatable = (selector: string = 'body') => {
  if (typeof window === 'undefined') return

  // Only mark main content areas, not every element
  const mainSelectors = [
    'main',
    'article', 
    'section',
    '.content',
    '[role="main"]'
  ]
  
  mainSelectors.forEach(sel => {
    const elements = document.querySelectorAll(sel)
    elements.forEach((element) => {
      if (!element.classList.contains('notranslate')) {
        element.setAttribute('translate', 'yes')
      }
    })
  })
}

// Add no-translate class to specific selectors
export const addNoTranslateClass = (selectors: string[]) => {
  if (typeof window === 'undefined') return

  selectors.forEach((selector) => {
    const elements = document.querySelectorAll(selector)
    elements.forEach((element) => {
      element.classList.add('notranslate')
      element.setAttribute('translate', 'no')
    })
  })
}

// Reset translation (restore original text)
export const resetTranslation = () => {
  if (typeof window === 'undefined') return

  const translatedElements = document.querySelectorAll('[data-deepl-translated]')
  translatedElements.forEach((el) => {
    const originalText = el.getAttribute('data-deepl-original')
    if (originalText !== null && el.textContent) {
      el.textContent = originalText
      el.removeAttribute('data-deepl-translated')
      el.removeAttribute('data-deepl-original')
    }
  })

  // Clear translation cache
  if (typeof window !== 'undefined' && (window as any).translationCache) {
    (window as any).translationCache.clear()
  }
}
