import { useEffect, useRef, useState, useCallback } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false
  } = options

  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)

  const callback = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      const isElementIntersecting = entry.isIntersecting
      
      if (isElementIntersecting && !hasIntersected) {
        setHasIntersected(true)
      }
      
      if (!freezeOnceVisible || !hasIntersected) {
        setIsIntersecting(isElementIntersecting)
      }
    },
    [freezeOnceVisible, hasIntersected]
  )

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(callback, {
      threshold,
      root,
      rootMargin
    })

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [callback, threshold, root, rootMargin])

  return [elementRef, isIntersecting, hasIntersected] as const
}
