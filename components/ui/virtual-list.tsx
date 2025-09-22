"use client"

import { memo, useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useThrottle } from '@/hooks/use-throttle'

interface VirtualListProps<T> {
  items: T[]
  height: number
  itemHeight: number
  renderItem: (item: T, index: number) => React.ReactNode
  overscan?: number
  className?: string
}

export function VirtualList<T>({
  items,
  height,
  itemHeight,
  renderItem,
  overscan = 5,
  className = ''
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Throttled scroll handler
  const throttledScrollHandler = useThrottle((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop)
  }, 16) // ~60fps

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight)
    const end = Math.min(
      start + Math.ceil(height / itemHeight) + overscan,
      items.length
    )
    const startWithOverscan = Math.max(0, start - overscan)
    
    return {
      start: startWithOverscan,
      end,
      offsetY: startWithOverscan * itemHeight
    }
  }, [scrollTop, itemHeight, height, overscan, items.length])

  // Get visible items
  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end)
  }, [items, visibleRange.start, visibleRange.end])

  // Memoized item renderer
  const renderVisibleItems = useCallback(() => {
    return visibleItems.map((item, index) => {
      const actualIndex = visibleRange.start + index
      return (
        <div
          key={`item-${actualIndex}`}
          style={{
            position: 'absolute',
            top: `${actualIndex * itemHeight}px`,
            height: `${itemHeight}px`,
            width: '100%'
          }}
        >
          {renderItem(item, actualIndex)}
        </div>
      )
    })
  }, [visibleItems, visibleRange.start, itemHeight, renderItem])

  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ height }}
      onScroll={throttledScrollHandler}
    >
      <div
        style={{
          position: 'relative',
          height: `${items.length * itemHeight}px`
        }}
      >
        {renderVisibleItems()}
      </div>
    </div>
  )
}

// Memoized version for better performance
export const MemoizedVirtualList = memo(VirtualList) as typeof VirtualList
