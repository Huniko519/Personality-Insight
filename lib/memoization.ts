// Simple memoization utility
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  getKey?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>()
  
  return ((...args: Parameters<T>) => {
    const key = getKey ? getKey(...args) : JSON.stringify(args)
    
    if (cache.has(key)) {
      return cache.get(key)
    }
    
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

// WeakMap-based memoization for objects
export function memoizeWeak<T extends object, R>(
  fn: (obj: T) => R
): (obj: T) => R {
  const cache = new WeakMap<T, R>()
  
  return (obj: T) => {
    if (cache.has(obj)) {
      return cache.get(obj)!
    }
    
    const result = fn(obj)
    cache.set(obj, result)
    return result
  }
}

// LRU Cache implementation
export class LRUCache<K, V> {
  private capacity: number
  private cache = new Map<K, V>()
  
  constructor(capacity: number) {
    this.capacity = capacity
  }
  
  get(key: K): V | undefined {
    if (!this.cache.has(key)) {
      return undefined
    }
    
    // Move to end (most recently used)
    const value = this.cache.get(key)!
    this.cache.delete(key)
    this.cache.set(key, value)
    return value
  }
  
  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    } else if (this.cache.size >= this.capacity) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
    
    this.cache.set(key, value)
  }
  
  clear(): void {
    this.cache.clear()
  }
  
  size(): number {
    return this.cache.size
  }
}

// Memoization with LRU cache
export function memoizeLRU<T extends (...args: any[]) => any>(
  fn: T,
  capacity: number = 100
): T {
  const cache = new LRUCache<string, ReturnType<T>>(capacity)
  
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args)
    
    const cached = cache.get(key)
    if (cached !== undefined) {
      return cached
    }
    
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}
