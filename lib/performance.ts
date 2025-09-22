// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number[]> = new Map()
  private observers: Map<string, PerformanceObserver> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  // Measure function execution time
  measureFunction<T>(name: string, fn: () => T): T {
    const start = performance.now()
    try {
      const result = fn()
      const end = performance.now()
      this.recordMetric(name, end - start)
      return result
    } catch (error) {
      const end = performance.now()
      this.recordMetric(`${name}_error`, end - start)
      throw error
    }
  }

  // Measure async function execution time
  async measureAsyncFunction<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now()
    try {
      const result = await fn()
      const end = performance.now()
      this.recordMetric(name, end - start)
      return result
    } catch (error) {
      const end = performance.now()
      this.recordMetric(`${name}_error`, end - start)
      throw error
    }
  }

  // Record a metric
  recordMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, [])
    }
    this.metrics.get(name)!.push(value)
  }

  // Get metrics for a specific name
  getMetrics(name: string): number[] {
    return this.metrics.get(name) || []
  }

  // Get average metric
  getAverageMetric(name: string): number {
    const values = this.getMetrics(name)
    if (values.length === 0) return 0
    return values.reduce((sum, value) => sum + value, 0) / values.length
  }

  // Get median metric
  getMedianMetric(name: string): number {
    const values = this.getMetrics(name)
    if (values.length === 0) return 0
    
    const sorted = [...values].sort((a, b) => a - b)
    const middle = Math.floor(sorted.length / 2)
    
    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2
    }
    return sorted[middle]
  }

  // Monitor long tasks
  startLongTaskMonitoring(): void {
    if (typeof PerformanceObserver === 'undefined') return

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) { // Tasks longer than 50ms
          console.warn('Long task detected:', {
            name: entry.name,
            duration: entry.duration,
            startTime: entry.startTime
          })
        }
      }
    })

    observer.observe({ entryTypes: ['longtask'] })
    this.observers.set('longtask', observer)
  }

  // Monitor layout shifts
  startLayoutShiftMonitoring(): void {
    if (typeof PerformanceObserver === 'undefined') return

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShift = entry as any
        if (layoutShift.value > 0.1) { // Layout shifts greater than 0.1
          console.warn('Layout shift detected:', {
            value: layoutShift.value,
            sources: layoutShift.sources
          })
        }
      }
    })

    observer.observe({ entryTypes: ['layout-shift'] })
    this.observers.set('layout-shift', observer)
  }

  // Monitor first input delay
  startFirstInputMonitoring(): void {
    if (typeof PerformanceObserver === 'undefined') return

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const firstInput = entry as any
        if (firstInput.processingStart - firstInput.startTime > 100) {
          console.warn('Slow first input detected:', {
            name: firstInput.name,
            delay: firstInput.processingStart - firstInput.startTime
          })
        }
      }
    })

    observer.observe({ entryTypes: ['first-input'] })
    this.observers.set('first-input', observer)
  }

  // Stop all monitoring
  stopMonitoring(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.observers.clear()
  }

  // Get performance report
  getReport(): Record<string, any> {
    const report: Record<string, any> = {}
    
    for (const [name, values] of this.metrics) {
      if (values.length > 0) {
        report[name] = {
          count: values.length,
          average: this.getAverageMetric(name),
          median: this.getMedianMetric(name),
          min: Math.min(...values),
          max: Math.max(...values)
        }
      }
    }
    
    return report
  }

  // Clear all metrics
  clearMetrics(): void {
    this.metrics.clear()
  }
}

// React performance utilities
export function withPerformanceMonitoring<T extends object>(
  Component: React.ComponentType<T>,
  name: string
): React.ComponentType<T> {
  return React.memo((props: T) => {
    const monitor = PerformanceMonitor.getInstance()
    
    return monitor.measureFunction(name, () => {
      return React.createElement(Component, props)
    })
  })
}

// Hook for measuring component render time
export function useRenderTime(name: string): void {
  React.useEffect(() => {
    const monitor = PerformanceMonitor.getInstance()
    const start = performance.now()
    
    return () => {
      const end = performance.now()
      monitor.recordMetric(`${name}_render`, end - start)
    }
  }, [name])
}

// Hook for measuring effect execution time
export function useEffectTime(name: string, deps: React.DependencyList): void {
  React.useEffect(() => {
    const monitor = PerformanceMonitor.getInstance()
    const start = performance.now()
    
    return () => {
      const end = performance.now()
      monitor.recordMetric(`${name}_effect`, end - start)
    }
  }, deps)
}
