'use client'

import { useEffect, useRef, useCallback, useState } from 'react'

/**
 * Performance optimization hooks for smooth, fluid interactions
 */

/**
 * Use Intersection Observer for progressive loading
 * Only renders content when it enters viewport
 */
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const elementRef = useRef<HTMLElement | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
        ...options,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [hasIntersected, options])

  return { elementRef, isIntersecting, hasIntersected }
}

/**
 * Debounce function to prevent excessive re-renders
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Throttle function for scroll events and other frequent updates
 */
export function useThrottle<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
): ((...args: Parameters<T>) => void) {
  const lastRun = useRef<number>(0)
  const storedCallback = useRef(callback)

  useEffect(() => {
    storedCallback.current = callback
  }, [callback])

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()
      if (now - lastRun.current >= delay) {
        storedCallback.current(...args)
        lastRun.current = now
      }
    },
    [delay]
  )
}

/**
 * Request Animation Frame hook for smooth animations
 */
export function useAnimationFrame(callback: () => void, isActive: boolean) {
  const requestRef = useRef<number | null>(null)
  const previousTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isActive) return

    const animate = (time: number) => {
      if (previousTimeRef.current !== null) {
        callback()
      }
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isActive, callback])
}

/**
 * Prefetch resources for faster loading
 */
export function usePrefetch(href: string) {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = href
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [href])
}

/**
 * Monitor performance metrics
 */
export function usePerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.performance) return

    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      try {
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries() as PerformanceEntry[]
          const lastEntry = entries[entries.length - 1] as LargestContentfulPaint | undefined
          if (lastEntry) {
            console.log('LCP:', lastEntry.renderTime ?? lastEntry.loadTime ?? 0)
          }
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries() as PerformanceEntry[]
          entries.forEach((entry) => {
            if (entry.entryType === 'first-input') {
              const timing = entry as PerformanceEventTiming
              console.log('FID:', timing.processingStart - timing.startTime)
            }
          })
        })
        fidObserver.observe({ entryTypes: ['first-input'] })

        // Cumulative Layout Shift (CLS)
        let clsValue = 0
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries() as LayoutShift[]
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
              console.log('CLS:', clsValue)
            }
          })
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })

        return () => {
          lcpObserver.disconnect()
          fidObserver.disconnect()
          clsObserver.disconnect()
        }
      } catch {
        // Performance Observer not supported
      }
    }
  }, [])
}

