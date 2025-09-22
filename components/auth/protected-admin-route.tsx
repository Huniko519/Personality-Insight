"use client"

import type React from "react"
import { useEffect, memo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Loading } from "@/components/loading"

interface ProtectedAdminRouteProps {
  children: React.ReactNode
}

// Memoized admin route content
const AdminContent = memo<{ children: React.ReactNode }>(({ children }) => (
  <>{children}</>
))

AdminContent.displayName = 'AdminContent'

export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { user, loading, isAdmin } = useAuth()
  const router = useRouter()

  const handleRedirect = useCallback(() => {
    // Only redirect if authentication check is complete and user is not admin
    if (!loading && (!user || !isAdmin)) {
      router.push("/admin/login")
    }
  }, [user, isAdmin, loading, router])

  useEffect(() => {
    handleRedirect()
  }, [handleRedirect])

  // Show loading state while checking authentication
  if (loading) {
    return <Loading />
  }

  // Don't render anything if not authenticated or not admin
  if (!user || !isAdmin) {
    return null
  }

  // User is authenticated and is an admin, render children
  return <AdminContent>{children}</AdminContent>
}
