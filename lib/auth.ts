"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  type User as FirebaseUser,
  type UserCredential,
} from "firebase/auth"
import { app, database } from "./firebase-init"
import { ref, get, set } from "firebase/database"

// Initialize Firebase Auth
const auth = getAuth(app)

// Types
export type UserRole = "user" | "admin"

export interface UserData {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  role: UserRole
}

export type User = FirebaseUser | null

export interface AuthContextType {
  user: User
  userData: UserData | null
  loading: boolean
  error: string | null
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<UserCredential>
  signUp: (email: string, password: string, displayName?: string) => Promise<UserCredential>
  signInWithGoogle: () => Promise<UserCredential>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>
  getUserRole: (uid: string) => Promise<UserRole>
}

// Create Auth Context
const AuthContext = createContext<AuthContextType | null>(null)

// Helper function to get user role from Firebase
async function getUserRole(uid: string): Promise<UserRole> {
  try {
    const userRoleRef = ref(database, `users/${uid}/role`)
    const snapshot = await get(userRoleRef)

    if (snapshot.exists()) {
      return snapshot.val() as UserRole
    }

    // If no role is set, default to "user"
    await set(userRoleRef, "user")
    return "user"
  } catch (error) {
    console.error("Error getting user role:", error)
    return "user" // Default to user role on error
  }
}

// Helper function to set user role in Firebase
export async function setUserRole(uid: string, role: UserRole): Promise<void> {
  try {
    const userRoleRef = ref(database, `users/${uid}/role`)
    await set(userRoleRef, role)
    console.log(`User ${uid} role set to ${role}`)
  } catch (error) {
    console.error("Error setting user role:", error)
    throw error
  }
}

// Auth Provider Component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        setUser(user)

        if (user) {
          try {
            // Get user role from Firebase
            const role = await getUserRole(user.uid)

            // Set user data including role
            const userData: UserData = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              role: role,
            }

            setUserData(userData)
            setIsAdmin(role === "admin")
          } catch (error) {
            console.error("Error setting user data:", error)
          }
        } else {
          setUserData(null)
          setIsAdmin(false)
        }

        setLoading(false)
      },
      (error) => {
        console.error("Auth state change error:", error)
        setError(error.message)
        setLoading(false)
      },
    )

    // Cleanup subscription
    return () => unsubscribe()
  }, [])

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    setError(null)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      // Get user role after sign in
      const role = await getUserRole(userCredential.user.uid)

      // Update user data with role
      setUserData({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        role: role,
      })

      setIsAdmin(role === "admin")

      return userCredential
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to sign in"
      setError(errorMessage)
      throw error
    }
  }

  // Sign up with email and password
  const signUp = async (email: string, password: string, displayName?: string) => {
    setError(null)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Update profile if displayName is provided
      if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, { displayName })
      }

      // Set default role to "user" for new sign-ups
      await setUserRole(userCredential.user.uid, "user")

      // Update user data with role
      setUserData({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName || displayName || null,
        photoURL: userCredential.user.photoURL,
        role: "user",
      })

      return userCredential
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to sign up"
      setError(errorMessage)
      throw error
    }
  }

  // Sign in with Google
  const signInWithGoogle = async () => {
    setError(null)
    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)

      // Check if this is a first-time sign-in
      const userRoleRef = ref(database, `users/${userCredential.user.uid}/role`)
      const snapshot = await get(userRoleRef)

      if (!snapshot.exists()) {
        // First time sign-in, set default role to "user"
        await setUserRole(userCredential.user.uid, "user")
      }

      // Get user role
      const role = await getUserRole(userCredential.user.uid)

      // Update user data with role
      setUserData({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        role: role,
      })

      setIsAdmin(role === "admin")

      return userCredential
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to sign in with Google"
      setError(errorMessage)
      throw error
    }
  }

  // Sign out
  const signOut = async () => {
    setError(null)
    try {
      await firebaseSignOut(auth)
      setUserData(null)
      setIsAdmin(false)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to sign out"
      setError(errorMessage)
      throw error
    }
  }

  // Reset password
  const resetPassword = async (email: string) => {
    setError(null)
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to reset password"
      setError(errorMessage)
      throw error
    }
  }

  // Update user profile
  const updateUserProfile = async (displayName: string, photoURL?: string) => {
    setError(null)
    if (!auth.currentUser) {
      setError("No user is signed in")
      throw new Error("No user is signed in")
    }

    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: photoURL || auth.currentUser.photoURL,
      })

      // Update userData state
      if (userData) {
        setUserData({
          ...userData,
          displayName,
          photoURL: photoURL || userData.photoURL,
        })
      }

      // Force refresh the user object
      setUser({ ...auth.currentUser })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update profile"
      setError(errorMessage)
      throw error
    }
  }

  const value = {
    user,
    userData,
    loading,
    error,
    isAdmin,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateUserProfile,
    getUserRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use Auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Helper function to check if user is authenticated
export function useAuthGuard() {
  const { user, loading } = useAuth()
  return { isAuthenticated: !!user, loading }
}

// Helper function to check if user is an admin
export function useAdminGuard() {
  const { isAdmin, loading } = useAuth()
  return { isAdmin, loading }
}
