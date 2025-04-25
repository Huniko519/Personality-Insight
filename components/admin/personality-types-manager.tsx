"use client"

import { useState, useEffect } from "react"
import { Loader2, Edit, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { EditableList } from "./editable-list"
import { RichTextEditor } from "./rich-text-editor"
import { fetchFromFirebase, writeToFirebase } from "@/lib/firebase"

export default function PersonalityTypesManager() {
  const [types, setTypes] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [editingType, setEditingType] = useState<string | null>(null)
  const [typeData, setTypeData] = useState<any>({})

  const fetchTypes = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchFromFirebase("/personality-types")
      if (data) {
        setTypes(data)
      } else {
        setTypes({})
      }
    } catch (err) {
      console.error("Error fetching personality types:", err)
      setError("Failed to fetch personality types. Please try again.")
      setTypes({})
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTypes()
  }, [])

  const handleEdit = (typeCode: string) => {
    setEditingType(typeCode)
    setTypeData(types[typeCode] || {})
  }

  const handleInputChange = (field: string, value: string) => {
    setTypeData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleArrayInputChange = (field: string, value: string) => {
    // Convert comma-separated string to array
    const arrayValue = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item)
    setTypeData((prev) => ({
      ...prev,
      [field]: arrayValue,
    }))
  }

  const handleNestedInputChange = (parent: string, field: string, value: string) => {
    setTypeData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }))
  }

  const handleNestedArrayInputChange = (parent: string, field: string, value: string) => {
    // Convert comma-separated string to array
    const arrayValue = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item)
    setTypeData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: arrayValue,
      },
    }))
  }

  const handleCognitiveFunctionChange = (index: number, field: string, value: string) => {
    const updatedFunctions = [...(typeData.cognitiveFunctions || [])]
    if (!updatedFunctions[index]) {
      updatedFunctions[index] = {}
    }
    updatedFunctions[index] = {
      ...updatedFunctions[index],
      [field]: value,
    }

    setTypeData((prev) => ({
      ...prev,
      cognitiveFunctions: updatedFunctions,
    }))
  }

  const handleSave = async () => {
    if (!editingType) return

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await writeToFirebase(`/personality-types/${editingType}`, typeData)
      setSuccess(`Personality type ${editingType} updated successfully`)

      // Update local state
      setTypes((prev) => ({
        ...prev,
        [editingType]: typeData,
      }))
    } catch (err) {
      console.error("Error saving personality type:", err)
      setError("Failed to save personality type. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personality Types Manager</CardTitle>
        <CardDescription>Manage personality type descriptions and details</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={editingType ? "edit" : "list"}>
          <TabsList>
            <TabsTrigger value="list">Type List</TabsTrigger>
            {editingType && <TabsTrigger value="edit">Edit {editingType}</TabsTrigger>}
          </TabsList>

          <TabsContent value="list">
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

            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
              </div>
            ) : Object.keys(types).length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <p>No personality types found. Initialize your database first.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type Code</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Nickname</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(types).map(([code, data]: [string, any]) => (
                      <TableRow key={code}>
                        <TableCell className="font-medium">{code}</TableCell>
                        <TableCell>{data.name}</TableCell>
                        <TableCell>{data.nickname}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(code)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {editingType && (
            <TabsContent value="edit">
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

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Editing {editingType}</h3>
                  <Button variant="outline" onClick={() => setEditingType(null)}>
                    Back to List
                  </Button>
                </div>

                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="basic-info">
                    <AccordionTrigger>Basic Information</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={typeData.name || ""}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                          />
                        </div>

                        <div>
                          <Label htmlFor="nickname">Nickname</Label>
                          <Input
                            id="nickname"
                            value={typeData.nickname || ""}
                            onChange={(e) => handleInputChange("nickname", e.target.value)}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <Label htmlFor="shortDescription">Short Description</Label>
                          <Input
                            id="shortDescription"
                            value={typeData.shortDescription || ""}
                            onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <Label htmlFor="description">Description</Label>
                          <RichTextEditor
                            value={typeData.description || ""}
                            onChange={(value) => handleInputChange("description", value)}
                            minHeight="150px"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <Label htmlFor="detailedDescription">Detailed Description</Label>
                          <RichTextEditor
                            value={typeData.detailedDescription || ""}
                            onChange={(value) => handleInputChange("detailedDescription", value)}
                            minHeight="200px"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="traits-values">
                    <AccordionTrigger>Traits & Values</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div>
                          <EditableList
                            items={typeData.traits || []}
                            onChange={(items) => setTypeData((prev) => ({ ...prev, traits: items }))}
                            label="Traits"
                            placeholder="Add a trait and press Enter..."
                          />
                        </div>

                        <div>
                          <EditableList
                            items={typeData.values || []}
                            onChange={(items) => setTypeData((prev) => ({ ...prev, values: items }))}
                            label="Values"
                            placeholder="Add a value and press Enter..."
                          />
                        </div>

                        <div>
                          <EditableList
                            items={typeData.strengths || []}
                            onChange={(items) => setTypeData((prev) => ({ ...prev, strengths: items }))}
                            label="Strengths"
                            placeholder="Add a strength and press Enter..."
                          />
                        </div>

                        <div>
                          <EditableList
                            items={typeData.weaknesses || []}
                            onChange={(items) => setTypeData((prev) => ({ ...prev, weaknesses: items }))}
                            label="Weaknesses"
                            placeholder="Add a weakness and press Enter..."
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="careers">
                    <AccordionTrigger>Careers</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div className="md:col-span-2">
                          <EditableList
                            items={typeData.careers || []}
                            onChange={(items) => setTypeData((prev) => ({ ...prev, careers: items }))}
                            label="Careers"
                            placeholder="Add a career and press Enter..."
                          />
                        </div>

                        <div>
                          <EditableList
                            items={typeData.careerStrengths || []}
                            onChange={(items) => setTypeData((prev) => ({ ...prev, careerStrengths: items }))}
                            label="Career Strengths"
                            placeholder="Add a career strength and press Enter..."
                          />
                        </div>

                        <div>
                          <EditableList
                            items={typeData.careerChallenges || []}
                            onChange={(items) => setTypeData((prev) => ({ ...prev, careerChallenges: items }))}
                            label="Career Challenges"
                            placeholder="Add a career challenge and press Enter..."
                          />
                        </div>

                        <div>
                          <EditableList
                            items={typeData.careerTraits || []}
                            onChange={(items) => setTypeData((prev) => ({ ...prev, careerTraits: items }))}
                            label="Career Traits"
                            placeholder="Add a career trait and press Enter..."
                          />
                        </div>

                        <div>
                          <Label htmlFor="careerEnvironment">Career Environment</Label>
                          <Textarea
                            id="careerEnvironment"
                            rows={4}
                            value={typeData.careerEnvironment || ""}
                            onChange={(e) => handleInputChange("careerEnvironment", e.target.value)}
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="relationships">
                    <AccordionTrigger>Relationships</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div className="md:col-span-2">
                          <EditableList
                            items={typeData.famousPeople || []}
                            onChange={(items) => setTypeData((prev) => ({ ...prev, famousPeople: items }))}
                            label="Famous People"
                            placeholder="Add a famous person and press Enter..."
                          />
                        </div>

                        <div>
                          <EditableList
                            items={typeData.compatibility?.best || []}
                            onChange={(items) =>
                              setTypeData((prev) => ({
                                ...prev,
                                compatibility: {
                                  ...prev.compatibility,
                                  best: items,
                                },
                              }))
                            }
                            label="Best Compatible Types"
                            placeholder="Add a type and press Enter..."
                          />
                        </div>

                        <div>
                          <EditableList
                            items={typeData.compatibility?.good || []}
                            onChange={(items) =>
                              setTypeData((prev) => ({
                                ...prev,
                                compatibility: {
                                  ...prev.compatibility,
                                  good: items,
                                },
                              }))
                            }
                            label="Good Compatible Types"
                            placeholder="Add a type and press Enter..."
                          />
                        </div>

                        <div>
                          <Label htmlFor="relationships-communication">Communication Style</Label>
                          <RichTextEditor
                            value={typeData.relationships?.communication || ""}
                            onChange={(value) => handleNestedInputChange("relationships", "communication", value)}
                            minHeight="150px"
                          />
                        </div>

                        <div>
                          <Label htmlFor="relationships-asFriends">As Friends</Label>
                          <RichTextEditor
                            value={typeData.relationships?.asFriends || ""}
                            onChange={(value) => handleNestedInputChange("relationships", "asFriends", value)}
                            minHeight="150px"
                          />
                        </div>

                        <div>
                          <Label htmlFor="relationships-asPartners">As Partners</Label>
                          <RichTextEditor
                            value={typeData.relationships?.asPartners || ""}
                            onChange={(value) => handleNestedInputChange("relationships", "asPartners", value)}
                            minHeight="150px"
                          />
                        </div>

                        <div>
                          <Label htmlFor="asParents">As Parents</Label>
                          <RichTextEditor
                            value={typeData.asParents || ""}
                            onChange={(value) => handleInputChange("asParents", value)}
                            minHeight="150px"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="cognitive-functions">
                    <AccordionTrigger>Cognitive Functions</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-6 pt-4">
                        {(typeData.cognitiveFunctions || []).map((func: any, index: number) => (
                          <div key={index} className="border p-4 rounded-md">
                            <h3 className="font-medium mb-3">Function {index + 1}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`function-${index}-name`}>Name</Label>
                                <Input
                                  id={`function-${index}-name`}
                                  value={func.name || ""}
                                  onChange={(e) => handleCognitiveFunctionChange(index, "name", e.target.value)}
                                />
                              </div>

                              <div className="md:col-span-2">
                                <Label htmlFor={`function-${index}-description`}>Description</Label>
                                <Textarea
                                  id={`function-${index}-description`}
                                  rows={3}
                                  value={func.description || ""}
                                  onChange={(e) => handleCognitiveFunctionChange(index, "description", e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save {editingType}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  )
}
