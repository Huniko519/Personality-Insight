"use client"

import { useState, useCallback, memo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Memoized result display component
const ResultDisplay = memo<{ result: { success: boolean; message: string } | null }>(({ result }) => {
  if (!result) return null

  return (
    <div
      className={`p-4 rounded-md ${result.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
    >
      <p className="font-medium">{result.success ? "Success!" : "Error"}</p>
      <p>{result.message}</p>
    </div>
  )
})

ResultDisplay.displayName = 'ResultDisplay'

// Memoized initialization section component
const InitializationSection = memo<{
  isLoading: boolean
  onInitialize: () => void
}>(({ isLoading, onInitialize }) => (
  <div>
    <h3 className="text-lg font-medium">Database Initialization</h3>
    <p className="text-sm text-gray-500 mb-2">
      Initialize your Firebase Realtime Database with all static data from the application. This will create the
      necessary structure and populate it with questions, personality types, explanations, career data, and
      more.
    </p>
    <Button onClick={onInitialize} disabled={isLoading} className="w-full sm:w-auto">
      {isLoading ? "Initializing..." : "Initialize Database"}
    </Button>
  </div>
))

InitializationSection.displayName = 'InitializationSection'

// Memoized footer note component
const FooterNote = memo(() => (
  <p className="text-sm text-gray-500">
    Note: Initialization will overwrite existing data in your database.
  </p>
))

FooterNote.displayName = 'FooterNote'

export default function AdminPanel() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleInitializeDatabase = useCallback(async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/init-database")
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        message: `Error: ${error instanceof Error ? error.message : String(error)}`,
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Admin Panel</CardTitle>
        <CardDescription>Manage your Firebase database</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <InitializationSection isLoading={isLoading} onInitialize={handleInitializeDatabase} />
          <ResultDisplay result={result} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <FooterNote />
      </CardFooter>
    </Card>
  )
}
