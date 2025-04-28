// Cache durations in milliseconds
export const CACHE_DURATIONS = {
  VERY_SHORT: 10 * 1000, // 10 seconds
  SHORT: 60 * 1000, // 1 minute
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 24 * 60 * 60 * 1000, // 24 hours
  VERY_LONG: 7 * 24 * 60 * 60 * 1000, // 7 days
}

// Cache storage
interface CacheItem<T> {
  data: T
  expiry: number
}

// Use a Map for better performance
const cache = new Map<string, CacheItem<any>>()

// Function to get data from cache
export function getFromCache<T>(key: string): T | null {
  try {
    const item = cache.get(key)

    if (!item) {
      return null
    }

    // Check if cache has expired
    if (Date.now() > item.expiry) {
      cache.delete(key)
      return null
    }

    return item.data as T
  } catch (error) {
    console.error(`Error getting data from cache for key ${key}:`, error)
    return null
  }
}

// Function to set data in cache
export function setInCache<T>(key: string, data: T, duration: number): void {
  try {
    const expiry = Date.now() + duration
    cache.set(key, { data, expiry })
  } catch (error) {
    console.error(`Error setting data in cache for key ${key}:`, error)
  }
}

// Function to invalidate cache
export function invalidateCache(keyPrefix: string): void {
  try {
    if (keyPrefix === "*") {
      // Clear all cache
      cache.clear()
      console.log("Cleared all cache")
      return
    }

    // Delete specific key or keys with prefix
    for (const key of cache.keys()) {
      if (key === keyPrefix || key.startsWith(`${keyPrefix}:`)) {
        cache.delete(key)
        console.log(`Invalidated cache for ${key}`)
      }
    }
  } catch (error) {
    console.error(`Error invalidating cache for prefix ${keyPrefix}:`, error)
  }
}

// Function to get cache stats
export function getCacheStats() {
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
  }
}
