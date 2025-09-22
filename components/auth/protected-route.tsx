"use client"

import type React from "react"
import { useEffect, memo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Loading } from "@/components/loading"

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

// Memoized protected route content
const ProtectedContent = memo<{ children: React.ReactNode }>(({ children }) => (
  <>{children}</>
))

ProtectedContent.displayName = 'ProtectedContent'

export function ProtectedRoute({ children, redirectTo = "/" }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  const handleRedirect = useCallback(() => {
    if (!loading && !user) {
      router.push(redirectTo)
    }
  }, [user, loading, router, redirectTo])

  useEffect(() => {
    handleRedirect()
  }, [handleRedirect])

  if (loading) {
    return <Loading />
  }

  if (!user) {
    return null
  }

  return <ProtectedContent>{children}</ProtectedContent>
}
