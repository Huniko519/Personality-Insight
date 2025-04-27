"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User, Mail, Camera, AlertCircle, CheckCircle, Award, Clock } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/lib/auth"
import { getUserTestResults, type TestResult } from "@/lib/firebase"

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-rose-50/30">
          <ProfileContent />
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}

function ProfileContent() {
  const { user, updateUserProfile, signOut, error: authError } = useAuth()
  const router = useRouter()
  const [displayName, setDisplayName] = useState(user?.displayName || "")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [latestResult, setLatestResult] = useState<TestResult | null>(null)
  const [isLoadingResults, setIsLoadingResults] = useState(false)

  useEffect(() => {
    // Fetch test results from Firebase
    const fetchTestResults = async () => {
      if (!user) return

      try {
        setIsLoadingResults(true)
        const results = await getUserTestResults(user.uid)

        if (results && results.length > 0) {
          setTestResults(results)
          setLatestResult(results[0]) // The first result is the most recent one
        }
      } catch (err) {
        console.error("Error fetching test results:", err)
      } finally {
        setIsLoadingResults(false)
      }
    }

    fetchTestResults()
  }, [user])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await updateUserProfile(displayName)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (err) {
      console.error("Sign out error:", err)
    }
  }

  // Format the date from ISO string to a more readable format
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString()
    } catch (e) {
      return dateString
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-rose-800">Your Profile</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-rose-700">Profile Information</CardTitle>
              <CardDescription>Manage your account details</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative mb-4">
                {user?.photoURL ? (
                  <div
                    className="w-24 h-24 rounded-full bg-cover bg-center border-4 border-rose-200"
                    style={{ backgroundImage: `url(${user.photoURL})` }}
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-rose-100 flex items-center justify-center border-4 border-rose-200">
                    <User className="h-12 w-12 text-rose-500" />
                  </div>
                )}
                <button className="absolute bottom-0 right-0 bg-rose-500 text-white p-1 rounded-full hover:bg-rose-600 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              <h3 className="text-xl font-semibold text-rose-800">{user?.displayName || "User"}</h3>
              <p className="text-gray-500 flex items-center mt-1">
                <Mail className="h-4 w-4 mr-1" />
                {user?.email}
              </p>

              {latestResult && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Your Personality Type</p>
                  <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-200 transition-colors text-base px-3 py-1">
                    {latestResult.type}
                  </Badge>
                </div>
              )}

              <Button
                variant="outline"
                onClick={handleSignOut}
                className="mt-6 w-full border-rose-200 text-rose-700 hover:bg-rose-50"
              >
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="account">
            <TabsList className="grid w-full grid-cols-3 bg-rose-100">
              <TabsTrigger value="account" className="data-[state=active]:bg-rose-600 data-[state=active]:text-white">
                Account
              </TabsTrigger>
              <TabsTrigger value="results" className="data-[state=active]:bg-rose-600 data-[state=active]:text-white">
                Test Results
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
              >
                Preferences
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="mt-4">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-rose-700">Account Settings</CardTitle>
                  <CardDescription>Update your account information</CardDescription>
                </CardHeader>
                <CardContent>
                  {success && (
                    <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription>Your profile has been updated successfully!</AlertDescription>
                    </Alert>
                  )}

                  {(error || authError) && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error || authError}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Your name"
                        className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={user?.email || ""} disabled className="bg-gray-50 border-rose-200" />
                      <p className="text-xs text-gray-500">Email cannot be changed</p>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleUpdateProfile} disabled={isLoading} className="bg-rose-600 hover:bg-rose-700">
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="mt-4">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-rose-700">Your Test Results</CardTitle>
                  <CardDescription>View your personality test results</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingResults ? (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin mx-auto"></div>
                      <p className="mt-4 text-rose-600">Loading your test results...</p>
                    </div>
                  ) : testResults.length > 0 ? (
                    <div className="space-y-6">
                      <div className="bg-white p-6 rounded-lg border border-rose-200 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-rose-800">{latestResult?.type}</h3>
                            <p className="text-gray-500 flex items-center mt-1">
                              <Clock className="h-4 w-4 mr-1" />
                              Taken on {latestResult?.date ? formatDate(latestResult.date) : "Unknown date"}
                            </p>
                          </div>
                          <Badge className="bg-rose-100 text-rose-800">
                            {latestResult?.confidence
                              ? `${Math.round(latestResult.confidence * 100)}% match`
                              : "Completed"}
                          </Badge>
                        </div>

                        <div className="mt-4">
                          <h4 className="font-medium text-gray-700 mb-2">Your Personality Dimensions</h4>

                          {latestResult?.dimensions ? (
                            <div className="space-y-3">
                              <div className="bg-rose-50 p-2 rounded">
                                <span className="font-medium">{latestResult.dimensions.EI.preference}</span> -
                                Extraversion/Introversion ({Math.round(latestResult.dimensions.EI.strength * 100)}%)
                              </div>
                              <div className="bg-rose-50 p-2 rounded">
                                <span className="font-medium">{latestResult.dimensions.SN.preference}</span> -
                                Sensing/Intuition ({Math.round(latestResult.dimensions.SN.strength * 100)}%)
                              </div>
                              <div className="bg-rose-50 p-2 rounded">
                                <span className="font-medium">{latestResult.dimensions.TF.preference}</span> -
                                Thinking/Feeling ({Math.round(latestResult.dimensions.TF.strength * 100)}%)
                              </div>
                              <div className="bg-rose-50 p-2 rounded">
                                <span className="font-medium">{latestResult.dimensions.JP.preference}</span> -
                                Judging/Perceiving ({Math.round(latestResult.dimensions.JP.strength * 100)}%)
                              </div>
                            </div>
                          ) : latestResult?.type ? (
                            <div className="space-y-3">
                              {latestResult.type.split("").map((letter, index) => {
                                const dimensions = [
                                  "Extraversion/Introversion",
                                  "Sensing/Intuition",
                                  "Thinking/Feeling",
                                  "Judging/Perceiving",
                                ]
                                return (
                                  <div key={index} className="bg-rose-50 p-2 rounded">
                                    <span className="font-medium">{letter}</span> - {dimensions[index]}
                                  </div>
                                )
                              })}
                            </div>
                          ) : (
                            <p>No dimension data available</p>
                          )}
                        </div>

                        <div className="mt-6 flex justify-end">
                          <Link href={`/results?type=${latestResult?.type}&time=${latestResult?.timeToComplete}`}>
                            <Button className="bg-rose-600 hover:bg-rose-700">
                              <Award className="h-4 w-4 mr-2" />
                              View Detailed Results
                            </Button>
                          </Link>
                        </div>
                      </div>

                      {testResults.length > 1 && (
                        <div className="bg-white p-6 rounded-lg border border-rose-200 shadow-sm">
                          <h3 className="font-semibold text-rose-800 mb-4">Previous Test Results</h3>
                          <div className="space-y-3">
                            {testResults.slice(1).map((result, index) => (
                              <div key={index} className="flex justify-between items-center p-3 bg-rose-50 rounded-md">
                                <div>
                                  <span className="font-medium text-rose-700">{result.type}</span>
                                  <p className="text-sm text-gray-500">
                                    {result.date ? formatDate(result.date) : "Unknown date"}
                                  </p>
                                </div>
                                <Link href={`/results?type=${result.type}&time=${result.timeToComplete}`}>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-rose-300 text-rose-600 hover:bg-rose-50"
                                  >
                                    View
                                  </Button>
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="text-center">
                        <Link href="/quiz">
                          <Button variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-50">
                            Take the Test Again
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100">
                        <Award className="h-8 w-8 text-rose-500" />
                      </div>
                      <h3 className="text-xl font-medium mb-2 text-rose-800">No Test Results Yet</h3>
                      <p className="text-gray-500 mb-6">Take the personality test to discover your type</p>
                      <Button asChild className="bg-rose-600 hover:bg-rose-700">
                        <Link href="/quiz">Take the Test</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="mt-4">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-rose-700">Preferences</CardTitle>
                  <CardDescription>Manage your notification and privacy settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 py-8 text-center">Preferences settings coming soon.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
