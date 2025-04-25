import { initializeApp } from "firebase/app"
import { getDatabase, ref, get, set } from "firebase/database"
import { getAnalytics } from "firebase/analytics"

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

// Firebase Config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

// Initialize Analytics only on client side
let analytics: any = null
if (typeof window !== "undefined") {
  analytics = getAnalytics(app)
}

// Generic function to fetch data from Firebase
export async function fetchFromFirebase<T>(path: string): Promise<T> {
  try {
    const snapshot = await get(ref(database, path))
    if (snapshot.exists()) {
      return snapshot.val() as T
    } else {
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

// Specific data fetching functions
export async function getQuestions() {
  return fetchFromFirebase<any[]>("/questions")
}

export async function getPersonalityExplanations() {
  return fetchFromFirebase<PersonalityExplanations>("/personality-explanations")
}

export async function getPersonalityTypes() {
  return fetchFromFirebase<any>("/personality-types")
}

export async function getPersonalityTypeByCode(code: string) {
  return fetchFromFirebase<any>(`/personality-types/${code.toUpperCase()}`)
}

export async function getAllPersonalityTypes() {
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
}

export async function getCaseStudies() {
  return fetchFromFirebase<any[]>("/case-studies")
}

export async function getCareerDatabase() {
  return fetchFromFirebase<any[]>("/career-database")
}

// Updated getBlogPosts function to ensure it returns an array
export async function getBlogPosts() {
  try {
    const snapshot = await get(ref(database, "/blogs"))
    if (snapshot.exists()) {
      const blogsData = snapshot.val()
      // Convert the object of blog posts to an array
      return Object.entries(blogsData).map(([slug, data]: [string, any]) => ({
        id: slug, // Use slug as id for compatibility with existing code
        slug,
        ...data,
      }))
    } else {
      console.warn("No blog posts found in Firebase, returning empty array")
      return []
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    // Return fallback data if Firebase fails
    return []
  }
}

// Updated getBlogPost function with better error handling and debugging
export async function getBlogPost(slug: string) {
  try {
    console.log(`Fetching blog post with slug: ${slug}`)
    const snapshot = await get(ref(database, `/blogs/${slug}`))

    if (snapshot.exists()) {
      const post = snapshot.val()
      console.log(`Successfully fetched blog post: ${post.title}`)
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
}

// Update the getCompatibilityData function to handle missing data better
export async function getCompatibilityData(type1: string, type2: string) {
  try {
    const snapshot = await get(ref(database, `/compatibility-matrix/${type1}/${type2}`))
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      console.warn(`No compatibility data found for ${type1} and ${type2}, returning null`)
      return null
    }
  } catch (error) {
    console.error(`Error fetching compatibility data for ${type1} and ${type2}:`, error)
    return null
  }
}

// Update the getCompatibilityMatrix function to handle missing data better
export async function getCompatibilityMatrix() {
  try {
    const snapshot = await get(ref(database, "/compatibility-matrix"))
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      console.warn("No compatibility matrix found in Firebase, returning null")
      return null
    }
  } catch (error) {
    console.error("Error fetching compatibility matrix:", error)
    return null
  }
}

// Function to fetch FAQ categories from Firebase
export const getFAQCategories = async () => {
  try {
    const data = await fetchFromFirebase("/faq-categories")
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error("Error fetching FAQ categories:", error)
    return []
  }

}
// Function to get case studies from Firebase
export async function getCaseStudiesFromFirebase() {
  try {
    return await fetchFromFirebase<any[]>("/case-studies")
  } catch (error) {
    console.error("Error fetching case studies from Firebase:", error)
    console.log("Falling back to static case studies data")
    return []
  }
}

// Function to get case studies filtered by tag
export async function getCaseStudiesByTag(tag: string) {
  const studies = await getCaseStudiesFromFirebase()
  return studies.filter((study) => study.tags.includes(tag))
}

// Function to get case studies involving a specific personality type
export async function getCaseStudiesByType(typeCode: string) {
  const studies = await getCaseStudiesFromFirebase()
  return studies.filter((study) => study.type1 === typeCode || study.type2 === typeCode)
}

// Function to get career database from Firebase
export async function getCareerDatabaseFromFirebase() {
  try {
    return await fetchFromFirebase<any[]>("/career-database")
  } catch (error) {
    console.error("Error fetching career database from Firebase:", error)
    console.log("Falling back to static career database")
    return []
  }
}

// Function to get careers suitable for a specific personality type
export async function getCareersForType(typeCode: string) {
  const careers = await getCareerDatabaseFromFirebase()
  return careers.filter((career) => career.suitableTypes?.includes(typeCode) || career.goodFitTypes?.includes(typeCode))
}

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

export { app, database, analytics }
