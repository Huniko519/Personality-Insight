"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { invalidateCache } from "@/lib/cache"

interface CacheContextType {
  invalidateCache: (key: string) => void
  clearAllCache: () => void
}

const CacheContext = createContext<CacheContextType | undefined>(undefined)

export function CacheProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  const clearAllCache = () => {
    invalidateCache("*")
  }

  const value = {
    invalidateCache,
    clearAllCache,
  }

  if (!mounted) {
    return <>{children}</>
  }

  return <CacheContext.Provider value={value}>{children}</CacheContext.Provider>
}

export function useCache() {
  const context = useContext(CacheContext)
  if (context === undefined) {
    throw new Error("useCache must be used within a CacheProvider")
  }
  return context
}
