"use client"

import { invalidateCache } from "./cache"

// Function to revalidate a path and cache
export async function revalidatePathAndCache(path: string, cacheKey: string) {
  try {
    // Invalidate client-side cache
    invalidateCache(cacheKey)

    // Call the revalidate API route
    const response = await fetch(`/api/revalidate?path=${encodeURIComponent(path)}`)

    if (!response.ok) {
      throw new Error(`Failed to revalidate path: ${path}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error revalidating path and cache:", error)
    throw error
  }
}

// Function to revalidate a tag and cache
export async function revalidateTagAndCache(tag: string, cacheKey: string) {
  try {
    // Invalidate client-side cache
    invalidateCache(cacheKey)

    // Call the revalidate API route
    const response = await fetch(`/api/revalidate?tag=${encodeURIComponent(tag)}`)

    if (!response.ok) {
      throw new Error(`Failed to revalidate tag: ${tag}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error revalidating tag and cache:", error)
    throw error
  }
}

// Function to revalidate all cache
export async function revalidateAll() {
  try {
    // Invalidate all client-side cache
    invalidateCache("*")

    // Call the revalidate API route
    const response = await fetch("/api/revalidate?all=true")

    if (!response.ok) {
      throw new Error("Failed to revalidate all")
    }

    return await response.json()
  } catch (error) {
    console.error("Error revalidating all cache:", error)
    throw error
  }
}
