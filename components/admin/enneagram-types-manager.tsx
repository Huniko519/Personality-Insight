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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EnneagramTypesManager() {
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
      const data = await fetchFromFirebase("/enneagram-types")
      if (data) {
        setTypes(data)
      } else {
        setTypes({})
      }
    } catch (err) {
      console.error("Error fetching Enneagram types:", err)
      setError("Failed to fetch Enneagram types. Please try again.")
      setTypes({})
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTypes()
  }, [])

  const handleEdit = (typeNumber: string) => {
    setEditingType(typeNumber)
    setTypeData(types[typeNumber] || {})
  }

  const handleInputChange = (field: string, value: string) => {
    setTypeData((prev: any) => ({
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
    setTypeData((prev: any) => ({
      ...prev,
      [field]: arrayValue,
    }))
  }

  const handleColorChange = (value: string) => {
    setTypeData((prev: any) => ({
      ...prev,
      color: value,
    }))
  }

  const handleCenterChange = (value: string) => {
    setTypeData((prev: any) => ({
      ...prev,
      center: value,
    }))
  }

  const handleWingChange = (wing: "leftWing" | "rightWing", field: string, value: string) => {
    setTypeData((prev: any) => ({
      ...prev,
      wings: {
        ...prev.wings,
        [wing]: {
          ...prev.wings?.[wing],
          [field]: value,
        },
      },
    }))
  }

  const handlePathChange = (path: "growth" | "stress", value: string) => {
    setTypeData((prev: any) => ({
      ...prev,
      [path]: value,
    }))
  }

  const handleSave = async () => {
    if (!editingType) return

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await writeToFirebase(`/enneagram-types/${editingType}`, typeData)
      setSuccess(`Enneagram type ${editingType} updated successfully`)

      // Update local state
      setTypes((prev: any) => ({
        ...prev,
        [editingType]: typeData,
      }))
    } catch (err) {
      console.error("Error saving Enneagram type:", err)
      setError("Failed to save Enneagram type. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enneagram Types Manager</CardTitle>
        <CardDescription>Manage Enneagram type descriptions and details</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={editingType ? "edit" : "list"}>
          <TabsList>
            <TabsTrigger value="list">Type List</TabsTrigger>
            {editingType && <TabsTrigger value="edit">Edit Type {editingType}</TabsTrigger>}
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
                <p>No Enneagram types found. Initialize your database first.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type Number</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Center</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(types).map(([number, data]: [string, any]) => (
                      <TableRow key={number}>
                        <TableCell className="font-medium">{number}</TableCell>
                        <TableCell>{data.name}</TableCell>
                        <TableCell>{data.center}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(number)}>
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
                  <h3 className="text-lg font-medium">Editing Type {editingType}</h3>
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

                        <div>
                          <Label htmlFor="color">Color</Label>
                          <Select value={typeData.color || "#000000"} onValueChange={handleColorChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a color" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="#FF5252">Red</SelectItem>
                              <SelectItem value="#FF9800">Orange</SelectItem>
                              <SelectItem value="#FFEB3B">Yellow</SelectItem>
                              <SelectItem value="#4CAF50">Green</SelectItem>
                              <SelectItem value="#2196F3">Blue</SelectItem>
                              <SelectItem value="#673AB7">Purple</SelectItem>
                              <SelectItem value="#795548">Brown</SelectItem>
                              <SelectItem value="#607D8B">Gray</SelectItem>
                              <SelectItem value="#000000">Black</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="center">Center of Intelligence</Label>
                          <Select value={typeData.center || ""} onValueChange={handleCenterChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a center" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Head">Head (Thinking)</SelectItem>
                              <SelectItem value="Heart">Heart (Feeling)</SelectItem>
                              <SelectItem value="Body">Body (Instinct)</SelectItem>
                            </SelectContent>
                          </Select>
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
                    <AccordionTrigger>Traits & Keywords</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div>
                          <EditableList
                            items={typeData.keywords || []}
                            onChange={(items) => setTypeData((prev: any) => ({ ...prev, keywords: items }))}
                            label="Keywords"
                            placeholder="Add a keyword and press Enter..."
                          />
                        </div>

                        <div>
                          <EditableList
                            items={typeData.strengths || []}
                            onChange={(items) => setTypeData((prev: any) => ({ ...prev, strengths: items }))}
                            label="Strengths"
                            placeholder="Add a strength and press Enter..."
                          />
                        </div>

                        <div>
                          <EditableList
                            items={typeData.weaknesses || []}
                            onChange={(items) => setTypeData((prev: any) => ({ ...prev, weaknesses: items }))}
                            label="Weaknesses"
                            placeholder="Add a weakness and press Enter..."
                          />
                        </div>

                        <div>
                          <EditableList
                            items={typeData.fears || []}
                            onChange={(items) => setTypeData((prev: any) => ({ ...prev, fears: items }))}
                            label="Core Fears"
                            placeholder="Add a fear and press Enter..."
                          />
                        </div>

                        <div>
                          <EditableList
                            items={typeData.desires || []}
                            onChange={(items) => setTypeData((prev: any) => ({ ...prev, desires: items }))}
                            label="Core Desires"
                            placeholder="Add a desire and press Enter..."
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="wings">
                    <AccordionTrigger>Wings</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div>
                          <Label htmlFor="leftWing-number">Left Wing Number</Label>
                          <Input
                            id="leftWing-number"
                            value={typeData.wings?.leftWing?.number || ""}
                            onChange={(e) => handleWingChange("leftWing", "number", e.target.value)}
                            disabled={true}
                          />
                        </div>

                        <div>
                          <Label htmlFor="rightWing-number">Right Wing Number</Label>
                          <Input
                            id="rightWing-number"
                            value={typeData.wings?.rightWing?.number || ""}
                            onChange={(e) => handleWingChange("rightWing", "number", e.target.value)}
                            disabled={true}
                          />
                        </div>

                        <div>
                          <Label htmlFor="leftWing-description">Left Wing Description</Label>
                          <Textarea
                            id="leftWing-description"
                            value={typeData.wings?.leftWing?.description || ""}
                            onChange={(e) => handleWingChange("leftWing", "description", e.target.value)}
                            rows={4}
                          />
                        </div>

                        <div>
                          <Label htmlFor="rightWing-description">Right Wing Description</Label>
                          <Textarea
                            id="rightWing-description"
                            value={typeData.wings?.rightWing?.description || ""}
                            onChange={(e) => handleWingChange("rightWing", "description", e.target.value)}
                            rows={4}
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="growth-stress">
                    <AccordionTrigger>Growth & Stress Paths</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div>
                          <Label htmlFor="growth">Growth Path (Type)</Label>
                          <Input
                            id="growth"
                            value={typeData.growth || ""}
                            onChange={(e) => handlePathChange("growth", e.target.value)}
                            disabled={true}
                          />
                        </div>

                        <div>
                          <Label htmlFor="stress">Stress Path (Type)</Label>
                          <Input
                            id="stress"
                            value={typeData.stress || ""}
                            onChange={(e) => handlePathChange("stress", e.target.value)}
                            disabled={true}
                          />
                        </div>

                        <div>
                          <Label htmlFor="growthDescription">Growth Description</Label>
                          <Textarea
                            id="growthDescription"
                            value={typeData.growthDescription || ""}
                            onChange={(e) => handleInputChange("growthDescription", e.target.value)}
                            rows={4}
                          />
                        </div>

                        <div>
                          <Label htmlFor="stressDescription">Stress Description</Label>
                          <Textarea
                            id="stressDescription"
                            value={typeData.stressDescription || ""}
                            onChange={(e) => handleInputChange("stressDescription", e.target.value)}
                            rows={4}
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
                          <Label htmlFor="relationships">Relationship Patterns</Label>
                          <RichTextEditor
                            value={typeData.relationships || ""}
                            onChange={(value) => handleInputChange("relationships", value)}
                            minHeight="150px"
                          />
                        </div>

                        <div>
                          <Label htmlFor="compatibility">Compatibility</Label>
                          <RichTextEditor
                            value={typeData.compatibility || ""}
                            onChange={(value) => handleInputChange("compatibility", value)}
                            minHeight="150px"
                          />
                        </div>

                        <div>
                          <EditableList
                            items={typeData.compatibleTypes || []}
                            onChange={(items) => setTypeData((prev: any) => ({ ...prev, compatibleTypes: items }))}
                            label="Most Compatible Types"
                            placeholder="Add a type and press Enter..."
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="personal-growth">
                    <AccordionTrigger>Personal Growth</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 gap-6 pt-4">
                        <div>
                          <Label htmlFor="personalGrowth">Personal Growth Tips</Label>
                          <RichTextEditor
                            value={typeData.personalGrowth || ""}
                            onChange={(value) => handleInputChange("personalGrowth", value)}
                            minHeight="200px"
                          />
                        </div>

                        <div>
                          <EditableList
                            items={typeData.growthTips || []}
                            onChange={(items) => setTypeData((prev: any) => ({ ...prev, growthTips: items }))}
                            label="Growth Tips"
                            placeholder="Add a growth tip and press Enter..."
                          />
                        </div>
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
                        Save Type {editingType}
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
