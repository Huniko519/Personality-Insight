"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock, User, AlertCircle } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/auth"

export default function SignUpPage() {
  const { user, signUp, signInWithGoogle, error: authError } = useAuth()
  const router = useRouter()
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      router.push("/profile")
    }
  }, [user, router])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (!acceptTerms) {
      setError("You must accept the terms and conditions")
      setIsLoading(false)
      return
    }

    try {
      await signUp(email, password, displayName)
      router.push("/profile")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign up")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await signInWithGoogle()
      router.push("/profile")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in with Google")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-rose-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-rose-100 transform transition-all hover:shadow-2xl">
              <div className="p-8 w-full">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
                  <p className="text-gray-600">Join us to discover your personality insights</p>
                </div>

                {(error || authError) && (
                  <Alert variant="destructive" className="mb-6 animate-fade-in">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error || authError}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSignUp} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="displayName" className="text-sm font-medium flex items-center gap-2">
                      <User className="h-4 w-4 text-rose-500" />
                      Full Name
                    </Label>
                    <Input
                      id="displayName"
                      placeholder="John Doe"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="rounded-lg border-gray-200 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 text-rose-500" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-lg border-gray-200 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                      <Lock className="h-4 w-4 text-rose-500" />
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-lg border-gray-200 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all"
                      required
                      minLength={6}
                    />
                    <p className="text-xs text-gray-500 pl-6">Password must be at least 6 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium flex items-center gap-2">
                      <Lock className="h-4 w-4 text-rose-500" />
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="rounded-lg border-gray-200 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all"
                      required
                    />
                  </div>

                  <div className="flex items-start space-x-2 mt-4">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(!!checked)}
                      required
                      className="mt-1 text-rose-500 focus:ring-rose-500"
                    />
                    <label htmlFor="terms" className="text-sm leading-tight text-gray-600">
                      I accept the{" "}
                      <Link
                        href="/terms"
                        className="text-rose-600 hover:text-rose-800 hover:underline transition-colors"
                      >
                        terms and conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-rose-600 hover:text-rose-800 hover:underline transition-colors"
                      >
                        privacy policy
                      </Link>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150 mt-4"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating Account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-4 text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 flex items-center justify-center gap-2 py-2 rounded-lg transition-all"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                </form>

                <p className="text-center text-sm mt-8">
                  Already have an account?{" "}
                  <Link
                    href="/auth/signin"
                    className="text-rose-600 hover:text-rose-800 font-medium hover:underline transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
