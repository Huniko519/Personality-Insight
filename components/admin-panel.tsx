"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminPanel() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleInitializeDatabase = async () => {
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
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Admin Panel</CardTitle>
        <CardDescription>Manage your Firebase database</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Database Initialization</h3>
            <p className="text-sm text-gray-500 mb-2">
              Initialize your Firebase Realtime Database with all static data from the application. This will create the
              necessary structure and populate it with questions, personality types, explanations, career data, and
              more.
            </p>
            <Button onClick={handleInitializeDatabase} disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? "Initializing..." : "Initialize Database"}
            </Button>
          </div>

          {result && (
            <div
              className={`p-4 rounded-md ${result.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
            >
              <p className="font-medium">{result.success ? "Success!" : "Error"}</p>
              <p>{result.message}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-gray-500">Note: Initialization will overwrite existing data in your database.</p>
      </CardFooter>
    </Card>
  )
}
