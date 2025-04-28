import useSWR from "swr"
import { get, ref } from "firebase/database"
import { database } from "@/lib/firebase-init"

// Firebase fetcher function
const firebaseFetcher = async (path: string) => {
  if (!database) {
    throw new Error("Firebase database not initialized")
  }

  try {
    const snapshot = await get(ref(database, path))
    if (snapshot.exists()) {
      return snapshot.val()
    }
    return null
  } catch (error) {
    console.error(`Error fetching data from Firebase path ${path}:`, error)
    throw error
  }
}

// Custom hook for using Firebase with SWR
export function useFirebaseSWR<T>(path: string | null, options = {}) {
  return useSWR<T>(path, path ? firebaseFetcher : null, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  })
}
