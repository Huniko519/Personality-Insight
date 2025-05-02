"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Loading } from "@/components/loading"

interface ProtectedAdminRouteProps {
  children: React.ReactNode
}

export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { user, loading, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only redirect if authentication check is complete and user is not admin
    if (!loading && (!user || !isAdmin)) {
      router.push("/admin/login")
    }
  }, [user, isAdmin, loading, router])

  // Show loading state while checking authentication
  if (loading) {
    return <Loading />
  }

  // Don't render anything if not authenticated or not admin
  if (!user || !isAdmin) {
    return null
  }

  // User is authenticated and is an admin, render children
  return <>{children}</>
}
