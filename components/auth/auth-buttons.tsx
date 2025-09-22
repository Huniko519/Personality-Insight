"use client"
import Link from "next/link"
import { LogIn, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { memo, useCallback } from "react"

// Memoized profile link component
const ProfileLink = memo<{ displayName?: string }>(({ displayName }) => (
  <Link
    href="/profile"
    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-100 to-rose-200 hover:from-rose-200 hover:to-rose-300 text-rose-700 font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border border-rose-300/50"
  >
    <User className="w-4 h-4" />
    {displayName || "Profile"}
  </Link>
))

ProfileLink.displayName = 'ProfileLink'

// Memoized sign out button component
const SignOutButton = memo<{ onSignOut: () => void }>(({ onSignOut }) => (
  <Button
    onClick={onSignOut}
    className="bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
  >
    <LogOut className="w-4 h-4" />
    Sign Out
  </Button>
))

SignOutButton.displayName = 'SignOutButton'

// Memoized sign in button component
const SignInButton = memo(() => (
  <Link href="/auth/signin">
    <Button className="bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5">
      <LogIn className="w-4 h-4 mr-2" />
      Sign In
    </Button>
  </Link>
))

SignInButton.displayName = 'SignInButton'

// Memoized authenticated user section
const AuthenticatedUser = memo<{ user: any; onSignOut: () => void }>(({ user, onSignOut }) => (
  <div className="flex items-center gap-2">
    <ProfileLink displayName={user.displayName} />
    <SignOutButton onSignOut={onSignOut} />
  </div>
))

AuthenticatedUser.displayName = 'AuthenticatedUser'

export function AuthButtons() {
  const { user, signOut } = useAuth()

  const handleSignOut = useCallback(async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }, [signOut])

  if (user) {
    return <AuthenticatedUser user={user} onSignOut={handleSignOut} />
  }

  return <SignInButton />
}
