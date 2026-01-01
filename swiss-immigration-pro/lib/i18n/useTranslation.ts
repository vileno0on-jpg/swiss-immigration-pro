// React hook for translations - provides natural French translations

'use client'

import { useMemo } from 'react'
import { getCurrentLanguage, isFrench } from './index'
import { LAYER_CONTENT_FR } from './fr/layerContent'
import { LAYER_CONTENT } from '../layerContent'
import type { LayerContent } from '../layerContent'
import type { LayerType } from '../layerLogic'

/**
 * Hook to get layer content in the current language
 * Returns French translations when language is French, otherwise English
 */
export function useLayerContent(layer: LayerType): LayerContent {
  return useMemo(() => {
    const lang = getCurrentLanguage()
    
    if (lang === 'fr') {
      // Map layer types to French content
      const layerMap: Record<LayerType, keyof typeof LAYER_CONTENT_FR> = {
        europeans: 'europeans',
        americans: 'americans',
        others: 'others',
      }
      
      const frenchKey = layerMap[layer] || 'europeans'
      return LAYER_CONTENT_FR[frenchKey] || LAYER_CONTENT[layer]
    }
    
    // Return English content
    return LAYER_CONTENT[layer]
  }, [layer])
}

/**
 * Hook to check if current language is French
 */
export function useIsFrench(): boolean {
  return useMemo(() => isFrench(), [])
}

/**
 * Hook to get current language
 */
export function useLanguage(): 'en' | 'fr' {
  return useMemo(() => getCurrentLanguage(), [])
}





