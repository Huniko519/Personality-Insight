import { ref, get, push, set } from "firebase/database"
import { cache } from "react"
import { app, auth, database, googleProvider, analytics } from "./firebase-init"

export interface PersonalityExplanations {
  cognitiveExplanation: string
  dimensionExplanations: {
    EI: string
    SN: string
    TF: string
    JP: string
  }
  growthExplanation: string
  relationshipExplanation: string
}

export interface TestResult {
  id?: string
  userId: string
  type: string
  date: string
  timeToComplete?: number
  confidence?: number
  testType?: "mbti" | "enneagram" // Add this line
  dimensions?: {
    EI: { preference: string; strength: number }
    SN: { preference: string; strength: number }
    TF: { preference: string; strength: number }
    JP: { preference: string; strength: number }
  }
}

export interface UserRole {
  uid: string
  email: string
  displayName?: string
  role: "admin" | "user"
  createdAt: string
}

// Generic function to fetch data from Firebase
export async function fetchFromFirebase<T>(path: string): Promise<T> {
  try {
    const snapshot = await get(ref(database, path))
    if (snapshot.exists()) {
      return snapshot.val() as T
    } else {
      console.warn(`No data available at path: ${path}`)
      throw new Error(`No data available at path: ${path}`)
    }
  } catch (error) {
    console.error(`Error fetching data from ${path}:`, error)
    throw error
  }
}

// Generic function to write data to Firebase
export async function writeToFirebase(path: string, data: any): Promise<void> {
  try {
    await set(ref(database, path), data)
    console.log(`Data successfully written to ${path}`)
  } catch (error) {
    console.error(`Error writing data to ${path}:`, error)
    throw error
  }
}

// User role management functions
export async function getUserRole(uid: string): Promise<"admin" | "user" | null> {
  try {
    const userRef = ref(database, `users/${uid}`)
    const snapshot = await get(userRef)
    if (snapshot.exists()) {
      const userData = snapshot.val()
      return userData?.role || "user" // Default to 'user' if role is not set
    }
    return "user"
  } catch (error) {
    console.error("Error getting user role:", error)
    return null
  }
}

export async function setUserRole(uid: string, role: "admin" | "user"): Promise<void> {
  try {
    const userRef = ref(database, `users/${uid}`)
    const snapshot = await get(userRef)

    if (snapshot.exists()) {
      const userData = snapshot.val()
      await writeToFirebase(`users/${uid}`, {
        ...userData,
        role,
      })
    } else {
      throw new Error(`User with ID ${uid} does not exist`)
    }
  } catch (error) {
    console.error("Error setting user role:", error)
    throw error
  }
}

export async function getAllUsers(): Promise<UserRole[]> {
  try {
    const usersRef = ref(database, "users")
    const snapshot = await get(usersRef)

    if (!snapshot.exists()) {
      return []
    }

    const usersData = snapshot.val()
    return Object.entries(usersData).map(([uid, data]: [string, any]) => ({
      uid,
      email: data.email,
      displayName: data.displayName || data.email,
      role: data.role || "user",
      createdAt: data.createdAt || new Date().toISOString(),
    }))
  } catch (error) {
    console.error("Error getting all users:", error)
    return []
  }
}

// Save test result to Firebase
export async function saveTestResult(result: TestResult) {
  try {
    const newResultRef = push(ref(database, "user-results"))
    await set(newResultRef, {
      ...result,
      id: newResultRef.key,
    })
    console.log("Test result saved successfully")
    return newResultRef.key
  } catch (error) {
    console.error("Error saving test result:", error)
    throw error
  }
}

// Get test results for a specific user
export async function getUserTestResults(userId: string): Promise<TestResult[]> {
  try {
    // Get all results and filter client-side to avoid indexing requirement
    const resultsRef = ref(database, "user-results")
    const snapshot = await get(resultsRef)

    if (!snapshot.exists()) {
      return []
    }

    const allResults = snapshot.val()
    const userResults: TestResult[] = []

    // Filter and transform results
    Object.keys(allResults).forEach((key) => {
      const result = allResults[key]
      if (result.userId === userId) {
        userResults.push({
          ...result,
          id: key,
        })
      }
    })

    // Sort by date (newest first)
    const sortedResults = userResults.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

    return sortedResults
  } catch (error) {
    console.error("Error fetching user test results:", error)
    return []
  }
}

// Specific data fetching functions with React cache for server components
export const getQuestions = cache(async () => {
  return fetchFromFirebase<any[]>("/questions")
})

export const getPersonalityExplanations = cache(async () => {
  return fetchFromFirebase<PersonalityExplanations>("/personality-explanations")
})

export const getPersonalityTypes = cache(async () => {
  return fetchFromFirebase<any>("/personality-types")
})

export const getPersonalityTypeByCode = cache(async (code: string) => {
  return fetchFromFirebase<any>(`/personality-types/${code.toUpperCase()}`)
})

export const getAllPersonalityTypes = cache(async () => {
  try {
    const types = await fetchFromFirebase<Record<string, any>>("/personality-types")
    return Object.entries(types).map(([code, type]) => ({
      code,
      ...type,
    }))
  } catch (error) {
    console.error("Error fetching personality types:", error)
    // Return empty array as fallback
    return []
  }
})

// Unified function to fetch array data with fallback
async function fetchArrayWithFallback<T>(path: string, fallback: T[] = []): Promise<T[]> {
  try {
    const data = await fetchFromFirebase<T[]>(path)
    return Array.isArray(data) ? data : fallback
  } catch (error) {
    console.error(`Error fetching array from ${path}:`, error)
    return fallback
  }
}

// Replace getCaseStudiesFromFirebase with getCaseStudies
export const getCaseStudies = cache(async () => {
  return fetchArrayWithFallback<any>("/case-studies")
})

// Replace getCareerDatabaseFromFirebase with getCareerDatabase
export const getCareerDatabase = cache(async () => {
  return fetchArrayWithFallback<any>("/career-database")
})

// Updated getBlogPosts function to ensure it returns an array
export const getBlogPosts = cache(async () => {
  try {
    const blogsData = await fetchFromFirebase<Record<string, any>>("/blogs")
    // Convert the object of blog posts to an array
    return Object.entries(blogsData).map(([slug, data]: [string, any]) => ({
      id: slug, // Use slug as id for compatibility with existing code
      slug,
      ...data,
    }))
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    // Return fallback data if Firebase fails
    return []
  }
})

// Remove unnecessary console.log in production for getBlogPost
export const getBlogPost = cache(async (slug: string) => {
  try {
    const post = await fetchFromFirebase<any>(`/blogs/${slug}`)
    if (post) {
      return {
        id: slug,
        slug,
        ...post,
      }
    } else {
      return null
    }
  } catch (error) {
    return null
  }
})

// Update the getCompatibilityData function to handle missing data better
export const getCompatibilityData = cache(async (type1: string, type2: string) => {
  try {
    return await fetchFromFirebase<any>(`/compatibility-matrix/${type1}/${type2}`)
  } catch (error) {
    console.error(`Error fetching compatibility data for ${type1} and ${type2}:`, error)
    return null
  }
})

// Update the getCompatibilityMatrix function to handle missing data better
export const getCompatibilityMatrix = cache(async () => {
  try {
    return await fetchFromFirebase<any>("/compatibility-matrix")
  } catch (error) {
    console.error("Error fetching compatibility matrix:", error)
    return null
  }
})

// Function to fetch FAQ categories from Firebase
export const getFAQCategories = cache(async () => {
  try {
    const data = await fetchFromFirebase<any[]>("/faq-categories")
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error("Error fetching FAQ categories:", error)
    return []
  }
})

// Function to get case studies filtered by tag
export const getCaseStudiesByTag = cache(async (tag: string) => {
  const studies = await getCaseStudies()
  return studies.filter((study) => study.tags.includes(tag))
})

// Function to get case studies involving a specific personality type
export const getCaseStudiesByType = cache(async (typeCode: string) => {
  const studies = await getCaseStudies()
  return studies.filter((study) => study.type1 === typeCode || study.type2 === typeCode)
})

// Function to initialize the database with static data
export const initializeDatabase = async () => {
  try {
    const backup = await import("@/data/backup.json").then((module) => module.default)
    await writeToFirebase("/", backup)
    return true
  } catch (error) {
    console.error("Error initializing database:", error)
    throw error
  }
}

// Function to get career-specific data for a personality type
export const getCareerDataForType = cache(async (typeCode: string) => {
  try {
    return await fetchFromFirebase<any>(`/career-data/${typeCode}`)
  } catch (error) {
    console.error(`Error fetching career data for ${typeCode}:`, error)
    return null
  }
})

// Function to get development strategies for a personality type
export const getDevStrategiesForType = cache(async (typeCode: string) => {
  try {
    return await fetchFromFirebase<any[]>(`/career-development-strategies/${typeCode}`)
  } catch (error) {
    console.error(`Error fetching development strategies for ${typeCode}:`, error)
    return []
  }
})

// Function to get communication tips for a personality type
export const getCommunicationTipsForType = cache(async (typeCode: string) => {
  try {
    return await fetchFromFirebase<any[]>(`/career-communication-tips/${typeCode}`)
  } catch (error) {
    console.error(`Error fetching communication tips for ${typeCode}:`, error)
    return []
  }
})

// Function to get all Enneagram types
export const getEnneagramTypes = cache(async () => {
  try {
    const types = await fetchFromFirebase<Record<string, any>>("/enneagram-types")
    return types
  } catch (error) {
    console.error("Error fetching Enneagram types:", error)
    // Return empty object as fallback
    return {}
  }
})

// Function to get a specific Enneagram type by number
export const getEnneagramTypeByNumber = cache(async (number: string) => {
  try {
    return await fetchFromFirebase<any>(`/enneagram-types/${number}`)
  } catch (error) {
    console.error(`Error fetching Enneagram type ${number}:`, error)
    return null
  }
})

// Function to get all Enneagram types as an array
export const getAllEnneagramTypes = cache(async () => {
  try {
    const types = await fetchFromFirebase<Record<string, any>>("/enneagram-types")
    return Object.entries(types).map(([number, type]) => ({
      number,
      ...type,
    }))
  } catch (error) {
    console.error("Error fetching Enneagram types:", error)
    // Return empty array as fallback
    return []
  }
})

export { auth, database, googleProvider, app, analytics }
