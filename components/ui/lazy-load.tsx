"use client"

import { memo, useState, useEffect } from 'react'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'

interface LazyLoadProps {
  children: React.ReactNode
  placeholder?: React.ReactNode
  threshold?: number
  rootMargin?: string
  className?: string
}

export const LazyLoad = memo<LazyLoadProps>(({
  children,
  placeholder,
  threshold = 0.1,
  rootMargin = '50px',
  className = ''
}) => {
  const [shouldLoad, setShouldLoad] = useState(false)
  const [elementRef, isIntersecting] = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible: true
  })

  useEffect(() => {
    if (isIntersecting && !shouldLoad) {
      setShouldLoad(true)
    }
  }, [isIntersecting, shouldLoad])

  return (
    <div ref={elementRef} className={className}>
      {shouldLoad ? children : placeholder}
    </div>
  )
})

LazyLoad.displayName = 'LazyLoad'
