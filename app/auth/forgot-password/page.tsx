"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, AlertCircle, CheckCircle } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ForgotPasswordPage() {
  const { resetPassword, error: authError } = useAuth()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await resetPassword(email)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send reset email")
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
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h2>
                  <p className="text-gray-600">We'll send you a link to reset your password</p>
                </div>

                {(error || authError) && (
                  <Alert variant="destructive" className="mb-6 animate-fade-in">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error || authError}</AlertDescription>
                  </Alert>
                )}

                {success ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 animate-fade-in">
                    <div className="flex">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <div>
                        <h3 className="text-green-800 font-medium">Email sent!</h3>
                        <p className="text-green-700 text-sm mt-1">
                          Check your inbox for instructions to reset your password.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleResetPassword} className="space-y-5">
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
                          Sending...
                        </div>
                      ) : (
                        "Send Reset Link"
                      )}
                    </Button>
                  </form>
                )}

                <p className="text-center text-sm mt-8">
                  Remember your password?{" "}
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
