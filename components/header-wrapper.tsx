"use client"

import { useAuth } from "@/lib/auth"
import Header from "@/components/header"

export default function HeaderWrapper() {
  const { user, loading } = useAuth()

  return <Header user={user} loading={loading} />
}
