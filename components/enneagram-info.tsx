"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function EnneagramInfo() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleInitializeEnneagram = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/init-enneagram", {
        method: "POST",
      })
      const data = await response.json()

      if (data.success) {
        setSuccess(data.message)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError(`Error initializing Enneagram data: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Understanding the Enneagram</CardTitle>
        <CardDescription>
          Explore the ancient personality system that identifies nine distinct types of human personality
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="mb-4">
          <Button onClick={handleInitializeEnneagram} disabled={loading} variant="outline" size="sm">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Initializing...
              </>
            ) : (
              "Initialize Enneagram Data"
            )}
          </Button>
          <p className="text-xs text-slate-500 mt-1">
            This will populate the Firebase database with Enneagram type data.
          </p>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="centers">Centers of Intelligence</TabsTrigger>
            <TabsTrigger value="wings">Wings</TabsTrigger>
            <TabsTrigger value="paths">Growth & Stress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-4">
              <p>
                The Enneagram is a powerful tool for personal and spiritual growth that describes nine distinct
                personality types and their interrelationships. Each type has its own set of motivations, fears,
                desires, and coping mechanisms.
              </p>
              <p>
                The word "Enneagram" comes from the Greek words "ennea" (nine) and "grammos" (a written symbol), and
                refers to the nine-pointed geometric figure that represents the system. The Enneagram helps us
                understand ourselves at a deeper level and provides a path for personal development.
              </p>
              <p>
                Unlike other personality systems, the Enneagram focuses on the underlying motivations and fears that
                drive behavior, rather than just the behavior itself. It acknowledges that people can express their type
                in healthy, average, or unhealthy ways depending on their level of self-awareness and development.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="centers">
            <div className="space-y-4">
              <p>
                The nine Enneagram types are organized into three centers of intelligence, each containing three types:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Head Center (5, 6, 7)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Types in the Head Center process information primarily through thinking. They tend to analyze,
                      plan, and strategize to manage anxiety and feel secure.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Heart Center (2, 3, 4)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Types in the Heart Center process information primarily through feeling. They focus on image,
                      connection, and how they are perceived by others.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Body Center (8, 9, 1)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Types in the Body Center process information primarily through instinct and gut reactions. They
                      focus on control, boundaries, and physical presence.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="wings">
            <div className="space-y-4">
              <p>
                Each Enneagram type is influenced by the types on either side of it, which are called "wings." Most
                people have one dominant wing that flavors their primary type, though some people express both wings
                equally.
              </p>
              <p>
                For example, a Type 1 can have either a 9 wing (written as 1w9) or a 2 wing (written as 1w2). A 1w9 will
                show more characteristics of Type 9, such as being more relaxed and conflict-avoidant, while a 1w2 will
                show more characteristics of Type 2, such as being more people-oriented and helpful.
              </p>
              <p>
                Wings add nuance and depth to our understanding of each type, explaining why people of the same type can
                appear quite different from each other.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="paths">
            <div className="space-y-4">
              <p>
                The Enneagram also describes how each type behaves under stress (disintegration) and when moving toward
                growth (integration).
              </p>
              <p>
                When moving toward growth, a type takes on the positive qualities of another type. For example, Type 1
                moves toward Type 7, becoming more spontaneous, joyful, and optimistic.
              </p>
              <p>
                When under stress, a type takes on the negative qualities of another type. For example, Type 1 moves
                toward Type 4, becoming more moody, irrational, and emotionally volatile.
              </p>
              <p>
                These paths of integration and disintegration provide valuable insights into our patterns of behavior
                and offer guidance for personal development.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
