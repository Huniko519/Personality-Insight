"use client"

import { useState, useEffect } from "react"
import { Loader2, Save, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RichTextEditor } from "./rich-text-editor"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchFromFirebase, writeToFirebase } from "@/lib/firebase"

export default function PersonalityExplanationsManager() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [explanations, setExplanations] = useState<any>({
    dimensionExplanations: {},
    cognitiveExplanations: {},
    typeExplanations: {},
    applicationExplanations: {},
  })
  const [activeTab, setActiveTab] = useState<string>("dimensions")
  const [editingDimension, setEditingDimension] = useState<string | null>(null)
  const [editingFunction, setEditingFunction] = useState<string | null>(null)
  const [isEditingType, setIsEditingType] = useState(false)
  const [isEditingApplication, setIsEditingApplication] = useState(false)

  const fetchExplanations = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchFromFirebase("/personality-explanations")
      if (data) {
        setExplanations(data)
      }
    } catch (err) {
      console.error("Error fetching personality explanations:", err)
      setError("Failed to fetch personality explanations. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExplanations()
  }, [])

  const handleEditDimension = (dimension: string) => {
    setEditingDimension(dimension)
    setActiveTab("dimensions")
  }

  const handleEditFunction = (func: string) => {
    setEditingFunction(func)
    setActiveTab("cognitive")
  }

  const handleEditType = () => {
    setIsEditingType(true)
    setActiveTab("type")
  }

  const handleEditApplication = () => {
    setIsEditingApplication(true)
    setActiveTab("application")
  }

  const handleSaveDimensionExplanations = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      await writeToFirebase("/personality-explanations/dimensionExplanations", explanations.dimensionExplanations)
      setSuccess("Dimension explanations saved successfully")
      setEditingDimension(null)
    } catch (err) {
      console.error("Error saving dimension explanations:", err)
      setError("Failed to save dimension explanations. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveCognitiveExplanations = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      await writeToFirebase("/personality-explanations/cognitiveExplanations", explanations.cognitiveExplanations)
      setSuccess("Cognitive function explanations saved successfully")
      setEditingFunction(null)
    } catch (err) {
      console.error("Error saving cognitive explanations:", err)
      setError("Failed to save cognitive function explanations. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveTypeExplanations = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      await writeToFirebase("/personality-explanations/typeExplanations", explanations.typeExplanations)
      setSuccess("Type development explanations saved successfully")
      setIsEditingType(false)
    } catch (err) {
      console.error("Error saving type explanations:", err)
      setError("Failed to save type development explanations. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveApplicationExplanations = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      await writeToFirebase("/personality-explanations/applicationExplanations", explanations.applicationExplanations)
      setSuccess("Application explanations saved successfully")
      setIsEditingApplication(false)
    } catch (err) {
      console.error("Error saving application explanations:", err)
      setError("Failed to save application explanations. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (section: string, field: string, value: string) => {
    setExplanations((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handleDimensionDetailChange = (dimension: string, field: string, value: string | any) => {
    setExplanations((prev: any) => ({
      ...prev,
      dimensionExplanations: {
        ...prev.dimensionExplanations,
        [dimension]: {
          ...prev.dimensionExplanations[dimension],
          [field]: value,
        },
      },
    }))
  }

  const handleCognitiveFunctionChange = (func: string, field: string, value: string) => {
    setExplanations((prev: any) => ({
      ...prev,
      cognitiveExplanations: {
        ...prev.cognitiveExplanations,
        functionDescriptions: {
          ...prev.cognitiveExplanations.functionDescriptions,
          [func]: {
            ...prev.cognitiveExplanations.functionDescriptions[func],
            [field]: value,
          },
        },
      },
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personality Explanations Manager</CardTitle>
        <CardDescription>Manage explanations for personality dimensions, cognitive functions, and more</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
            <TabsTrigger value="cognitive">Cognitive Functions</TabsTrigger>
            <TabsTrigger value="type">Type Development</TabsTrigger>
            <TabsTrigger value="application">Applications</TabsTrigger>
          </TabsList>

          {/* Dimensions Tab */}
          <TabsContent value="dimensions">
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
            ) : editingDimension ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    Editing {explanations.dimensionExplanations[editingDimension]?.title || editingDimension}
                  </h3>
                  <Button variant="outline" onClick={() => setEditingDimension(null)}>
                    Back to List
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`${editingDimension}-title`}>Title</Label>
                    <Input
                      id={`${editingDimension}-title`}
                      value={explanations.dimensionExplanations[editingDimension]?.title || ""}
                      onChange={(e) => handleDimensionDetailChange(editingDimension, "title", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`${editingDimension}-description`}>Short Description</Label>
                    <Input
                      id={`${editingDimension}-description`}
                      value={explanations.dimensionExplanations[editingDimension]?.description || ""}
                      onChange={(e) => handleDimensionDetailChange(editingDimension, "description", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`${editingDimension}-details`}>Detailed Explanation</Label>
                    <RichTextEditor
                      value={explanations.dimensionExplanations[editingDimension]?.details || ""}
                      onChange={(value) => handleDimensionDetailChange(editingDimension, "details", value)}
                      minHeight="200px"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveDimensionExplanations} disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Dimension
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Dimension</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {explanations.dimensionExplanations &&
                      Object.keys(explanations.dimensionExplanations).map((dimension) => (
                        <TableRow key={dimension}>
                          <TableCell className="font-medium">{dimension}</TableCell>
                          <TableCell>{explanations.dimensionExplanations[dimension]?.title || ""}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            {explanations.dimensionExplanations[dimension]?.description || ""}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" onClick={() => handleEditDimension(dimension)}>
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

          {/* Cognitive Functions Tab */}
          <TabsContent value="cognitive">
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
            ) : editingFunction ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    Editing {editingFunction} -{" "}
                    {explanations.cognitiveExplanations?.functionDescriptions?.[editingFunction]?.name || ""}
                  </h3>
                  <Button variant="outline" onClick={() => setEditingFunction(null)}>
                    Back to List
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`${editingFunction}-name`}>Name</Label>
                    <Input
                      id={`${editingFunction}-name`}
                      value={explanations.cognitiveExplanations?.functionDescriptions?.[editingFunction]?.name || ""}
                      onChange={(e) => handleCognitiveFunctionChange(editingFunction, "name", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`${editingFunction}-description`}>Short Description</Label>
                    <Input
                      id={`${editingFunction}-description`}
                      value={
                        explanations.cognitiveExplanations?.functionDescriptions?.[editingFunction]?.description || ""
                      }
                      onChange={(e) => handleCognitiveFunctionChange(editingFunction, "description", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`function-${editingFunction}-details`}>Detailed Description</Label>
                    <RichTextEditor
                      value={explanations.cognitiveExplanations?.functionDescriptions?.[editingFunction]?.details || ""}
                      onChange={(value) => handleCognitiveFunctionChange(editingFunction, "details", value)}
                      minHeight="150px"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveCognitiveExplanations} disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Function
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">General Information</h3>
                    <Button variant="outline" onClick={() => handleEditType()}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit General Info
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-medium">Title</Label>
                      <p>{explanations.cognitiveExplanations?.title || "Not set"}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Description</Label>
                      <p>{explanations.cognitiveExplanations?.description || "Not set"}</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-medium mt-6">Function Descriptions</h3>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Function</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {explanations.cognitiveExplanations?.functionDescriptions &&
                      Object.keys(explanations.cognitiveExplanations.functionDescriptions).map((func) => (
                        <TableRow key={func}>
                          <TableCell className="font-medium">{func}</TableCell>
                          <TableCell>
                            {explanations.cognitiveExplanations.functionDescriptions[func]?.name || ""}
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {explanations.cognitiveExplanations.functionDescriptions[func]?.description || ""}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" onClick={() => handleEditFunction(func)}>
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

          {/* Type Development Tab */}
          <TabsContent value="type">
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
            ) : isEditingType ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Editing Type Development</h3>
                  <Button variant="outline" onClick={() => setIsEditingType(false)}>
                    Back to View
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="type-title">Title</Label>
                    <Input
                      id="type-title"
                      value={explanations.typeExplanations?.title || ""}
                      onChange={(e) => handleInputChange("typeExplanations", "title", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="type-description">Description</Label>
                    <Input
                      id="type-description"
                      value={explanations.typeExplanations?.description || ""}
                      onChange={(e) => handleInputChange("typeExplanations", "description", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="type-details">Details</Label>
                    <RichTextEditor
                      value={explanations.typeExplanations?.details || ""}
                      onChange={(value) => handleInputChange("typeExplanations", "details", value)}
                      minHeight="300px"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveTypeExplanations} disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Type Development
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Type Development Information</h3>
                  <Button variant="outline" onClick={() => handleEditType()}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>

                <div className="space-y-4 border p-4 rounded-md">
                  <div>
                    <Label className="font-medium">Title</Label>
                    <p>{explanations.typeExplanations?.title || "Not set"}</p>
                  </div>

                  <div>
                    <Label className="font-medium">Description</Label>
                    <p>{explanations.typeExplanations?.description || "Not set"}</p>
                  </div>

                  <div>
                    <Label className="font-medium">Details</Label>
                    <div className="border p-4 rounded-md bg-slate-50 mt-2">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: explanations.typeExplanations?.details || "No details provided",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="application">
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
            ) : isEditingApplication ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Editing Applications</h3>
                  <Button variant="outline" onClick={() => setIsEditingApplication(false)}>
                    Back to View
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="application-title">Title</Label>
                    <Input
                      id="application-title"
                      value={explanations.applicationExplanations?.title || ""}
                      onChange={(e) => handleInputChange("applicationExplanations", "title", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="application-description">Description</Label>
                    <Input
                      id="application-description"
                      value={explanations.applicationExplanations?.description || ""}
                      onChange={(e) => handleInputChange("applicationExplanations", "description", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="application-details">Details</Label>
                    <RichTextEditor
                      value={explanations.applicationExplanations?.details || ""}
                      onChange={(value) => handleInputChange("applicationExplanations", "details", value)}
                      minHeight="300px"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveApplicationExplanations} disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Application Explanations
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Application Information</h3>
                  <Button variant="outline" onClick={() => handleEditApplication()}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>

                <div className="space-y-4 border p-4 rounded-md">
                  <div>
                    <Label className="font-medium">Title</Label>
                    <p>{explanations.applicationExplanations?.title || "Not set"}</p>
                  </div>

                  <div>
                    <Label className="font-medium">Description</Label>
                    <p>{explanations.applicationExplanations?.description || "Not set"}</p>
                  </div>

                  <div>
                    <Label className="font-medium">Details</Label>
                    <div className="border p-4 rounded-md bg-slate-50 mt-2">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: explanations.applicationExplanations?.details || "No details provided",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
