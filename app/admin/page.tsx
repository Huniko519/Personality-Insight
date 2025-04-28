"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, Shield, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import BlogsManager from "@/components/admin/blogs-manager"
import CaseStudiesManager from "@/components/admin/case-studies-manager"
import CareerDatabaseManager from "@/components/admin/career-database-manager"
import PersonalityTypesManager from "@/components/admin/personality-types-manager"
import QuestionsManager from "@/components/admin/questions-manager"
import PersonalityExplanationsManager from "@/components/admin/personality-explanations-manager"
import FAQCategoriesManager from "@/components/admin/faq-categories-manager"
import { ProtectedAdminRoute } from "@/components/auth/protected-admin-route"
import { useAuth } from "@/lib/auth"
import Image from "next/image"

// Dummy function for database initialization
const initializeDatabase = async () => {
  console.log("Database initialization function called")
  return Promise.resolve()
}

export default function AdminPage() {
  const [initializeLoading, setInitializeLoading] = useState(false)
  const [initializeSuccess, setInitializeSuccess] = useState(false)
  const [initializeError, setInitializeError] = useState<string | null>(null)
  const auth = useAuth()

  if (!auth) {
    throw new Error("Auth context is not available.")
  }

  const { signOut, user } = auth
  const router = useRouter()

  // Additional check to redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/admin/login")
    }
  }, [user, router])

  const handleInitializeDatabase = async () => {
    try {
      setInitializeLoading(true)
      setInitializeError(null)
      await initializeDatabase()
      setInitializeSuccess(true)
      setTimeout(() => setInitializeSuccess(false), 3000)
    } catch (error) {
      console.error("Error initializing database:", error)
      setInitializeError("Failed to initialize database. Check console for details.")
    } finally {
      setInitializeLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/admin/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <ProtectedAdminRoute>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <Image src="/logo.png" alt="Personality Insight Admin" width={120} height={32} className="h-8 w-auto" />
            </Link>
          </div>
          <div className="flex space-x-2">
            <Link href="/admin/users">
              <Button variant="outline" size="sm" className="border-slate-200">
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="border-slate-200" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </Button>
          </div>
        </div>

        {initializeError && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{initializeError}</AlertDescription>
          </Alert>
        )}

        {initializeSuccess && (
          <Alert className="bg-green-50 text-green-800 border-green-200">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Database initialized successfully!</AlertDescription>
          </Alert>
        )}

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Database Management</CardTitle>
            <CardDescription>Initialize or reset the database with default data</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleInitializeDatabase}
              disabled={initializeLoading}
              variant="outline"
              className="border-slate-200"
            >
              {initializeLoading ? "Initializing..." : "Initialize Database"}
            </Button>
            <p className="text-sm text-slate-500 mt-2">
              Warning: This will reset any custom data and replace it with default values.
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="blogs">
          <TabsList className="bg-slate-100 mb-6">
            <TabsTrigger value="blogs" className="data-[state=active]:bg-white">
              Blogs
            </TabsTrigger>
            <TabsTrigger value="personality-types" className="data-[state=active]:bg-white">
              Personality Types
            </TabsTrigger>
            <TabsTrigger value="questions" className="data-[state=active]:bg-white">
              Questions
            </TabsTrigger>
            <TabsTrigger value="personality-explanations" className="data-[state=active]:bg-white">
              Explanations
            </TabsTrigger>
            <TabsTrigger value="case-studies" className="data-[state=active]:bg-white">
              Case Studies
            </TabsTrigger>
            <TabsTrigger value="careers" className="data-[state=active]:bg-white">
              Careers
            </TabsTrigger>
            <TabsTrigger value="faq-categories" className="data-[state=active]:bg-white">
              FAQ Categories
            </TabsTrigger>
          </TabsList>
          <TabsContent value="blogs">
            <BlogsManager />
          </TabsContent>
          <TabsContent value="personality-types">
            <PersonalityTypesManager />
          </TabsContent>
          <TabsContent value="questions">
            <QuestionsManager />
          </TabsContent>
          <TabsContent value="personality-explanations">
            <PersonalityExplanationsManager />
          </TabsContent>
          <TabsContent value="case-studies">
            <CaseStudiesManager />
          </TabsContent>
          <TabsContent value="careers">
            <CareerDatabaseManager />
          </TabsContent>
          <TabsContent value="faq-categories">
            <FAQCategoriesManager />
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedAdminRoute>
  )
}
