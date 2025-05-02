import { ref, get, set } from "firebase/database"
import { database } from "./firebase-init"
import { CACHE_DURATIONS, getFromCache, setInCache, invalidateCache } from "./cache"

// Function to fetch data from Firebase with caching
export async function fetchFromFirebaseWithCache<T>(path: string, cacheDuration = CACHE_DURATIONS.MEDIUM): Promise<T> {
  // Check if database is initialized
  if (!database) {
    console.error("Firebase database not initialized")
    throw new Error("Firebase database not initialized")
  }

  try {
    // Try to get from cache first
    const cacheKey = `firebase:${path}`
    const cachedData = getFromCache<T>(cacheKey)

    if (cachedData) {
      console.log(`Cache hit for ${path}`)
      return cachedData
    }

    console.log(`Cache miss for ${path}, fetching from Firebase`)
    const snapshot = await get(ref(database, path))

    if (snapshot.exists()) {
      const data = snapshot.val() as T
      // Store in cache
      setInCache(cacheKey, data, cacheDuration)
      return data
    } else {
      console.warn(`No data available at path: ${path}`)
      throw new Error(`No data available at path: ${path}`)
    }
  } catch (error) {
    console.error(`Error fetching data from ${path}:`, error)
    throw error
  }
}

// Function to write data to Firebase and invalidate cache
export async function writeToFirebaseAndInvalidateCache(path: string, data: any): Promise<void> {
  // Check if database is initialized
  if (!database) {
    console.error("Firebase database not initialized")
    throw new Error("Firebase database not initialized")
  }

  try {
    // Write to Firebase - FIXING THIS LINE
    await set(ref(database, path), data)

    // Invalidate cache
    const cacheKey = `firebase:${path}`
    invalidateCache(cacheKey)

    // Also invalidate parent paths
    const pathParts = path.split("/")
    while (pathParts.length > 1) {
      pathParts.pop()
      const parentPath = pathParts.join("/")
      invalidateCache(`firebase:${parentPath}`)
    }

    console.log(`Data successfully written to ${path} and cache invalidated`)
  } catch (error) {
    console.error(`Error writing data to ${path}:`, error)
    throw error
  }
}
