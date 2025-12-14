/**
 * Translation Helper
 * Ensures all content including dynamic masterclass content gets translated
 */

export const initTranslationObserver = () => {
  if (typeof window === 'undefined') return

  // Simplified observer - only watch for major changes, not every mutation
  let debounceTimer: NodeJS.Timeout
  
  const observer = new MutationObserver((mutations) => {
    // Debounce to avoid excessive processing
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      // Only process if there are significant changes
      const hasSignificantChanges = mutations.some(
        mutation => mutation.addedNodes.length > 0 && 
        mutation.addedNodes[0].nodeType === Node.ELEMENT_NODE
      )
      
      if (hasSignificantChanges) {
        markContentAsTranslatable()
      }
    }, 300) // 300ms debounce
  })

  // Only observe childList, not subtree (less intensive)
  observer.observe(document.body, {
    childList: true,
    subtree: false, // Don't watch all descendants
  })

  return observer
}

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

export const forceRetranslate = () => {
  if (typeof window === 'undefined') return

  // Trigger Google Translate to re-scan the page
  const event = new Event('DOMContentLoaded', {
    bubbles: true,
    cancelable: true,
  })
  document.dispatchEvent(event)
}

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

// Items that should NOT be translated
export const NO_TRANSLATE_SELECTORS = [
  'code',
  'pre',
  '.notranslate',
  '[translate="no"]',
  'input[type="email"]',
  'input[type="password"]',
  'input[type="url"]',
]

