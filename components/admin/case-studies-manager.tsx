"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Loader2, Plus, Edit, Trash, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { EditableList } from "./editable-list"
import { RichTextEditor } from "./rich-text-editor"
import { fetchFromFirebase, writeToFirebase } from "@/lib/firebase"

export default function CaseStudiesManager() {
  const [caseStudies, setCaseStudies] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [editingCase, setEditingCase] = useState<any | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [caseToDelete, setCaseToDelete] = useState<number | null>(null)

  // Form state for new/edit case study
  const [formData, setFormData] = useState({
    title: "",
    type1: "",
    type2: "",
    summary: "",
    tags: [],
    image: "",
  })

  const fetchCaseStudies = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchFromFirebase("/case-studies")
      if (data && Array.isArray(data)) {
        setCaseStudies(data)
      } else {
        setCaseStudies([])
      }
    } catch (err) {
      console.error("Error fetching case studies:", err)
      setError("Failed to fetch case studies. Please try again.")
      setCaseStudies([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCaseStudies()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      title: "",
      type1: "",
      type2: "",
      summary: "",
      tags: [],
      image: "",
    })
  }

  const handleEdit = (caseStudy: any, index: number) => {
    setEditingCase({ ...caseStudy, index })
    setFormData({
      title: caseStudy.title || "",
      type1: caseStudy.type1 || "",
      type2: caseStudy.type2 || "",
      summary: caseStudy.summary || "",
      tags: caseStudy.tags || [],
      image: caseStudy.image || "",
    })
    setIsEditing(true)
  }

  const handleCreate = () => {
    resetForm()
    setIsCreating(true)
  }

  const handleDelete = (index: number) => {
    setCaseToDelete(index)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = async () => {
    if (caseToDelete === null) return

    setLoading(true)
    setError(null)
    try {
      const updatedCaseStudies = [...caseStudies]
      updatedCaseStudies.splice(caseToDelete, 1)
      await writeToFirebase("/case-studies", updatedCaseStudies)
      setSuccess("Case study deleted successfully")
      setCaseStudies(updatedCaseStudies)
    } catch (err) {
      console.error("Error deleting case study:", err)
      setError("Failed to delete case study. Please try again.")
    } finally {
      setLoading(false)
      setDeleteConfirmOpen(false)
      setCaseToDelete(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const caseStudyData = {
        title: formData.title,
        type1: formData.type1,
        type2: formData.type2,
        summary: formData.summary,
        tags: formData.tags,
        image: formData.image,
      }

      if (isEditing && editingCase) {
        // Update existing case study
        const updatedCaseStudies = [...caseStudies]
        updatedCaseStudies[editingCase.index] = caseStudyData
        await writeToFirebase("/case-studies", updatedCaseStudies)
        setCaseStudies(updatedCaseStudies)
        setSuccess(`Case study "${formData.title}" updated successfully`)
      } else {
        // Create new case study
        const updatedCaseStudies = [...caseStudies, caseStudyData]
        await writeToFirebase("/case-studies", updatedCaseStudies)
        setCaseStudies(updatedCaseStudies)
        setSuccess(`Case study "${formData.title}" created successfully`)
      }

      // Reset form and state
      resetForm()
      setIsEditing(false)
      setIsCreating(false)
    } catch (err) {
      console.error("Error saving case study:", err)
      setError("Failed to save case study. Please check your data and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Case Studies Manager</CardTitle>
            <CardDescription>Manage your relationship case studies</CardDescription>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Case Study
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={isEditing || isCreating ? "edit" : "list"}>
          <TabsList>
            <TabsTrigger value="list">Case Studies List</TabsTrigger>
            {(isEditing || isCreating) && (
              <TabsTrigger value="edit">{isEditing ? "Edit Case Study" : "New Case Study"}</TabsTrigger>
            )}
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
            ) : caseStudies.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <p>No case studies found. Create your first case study!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Types</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {caseStudies.map((caseStudy, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{caseStudy.title}</TableCell>
                        <TableCell>
                          {caseStudy.type1} & {caseStudy.type2}
                        </TableCell>
                        <TableCell>
                          {caseStudy.tags &&
                            caseStudy.tags.map((tag: string, i: number) => (
                              <span
                                key={i}
                                className="inline-block bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded mr-1 mb-1"
                              >
                                {tag}
                              </span>
                            ))}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(caseStudy, index)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDelete(index)}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {(isEditing || isCreating) && (
            <TabsContent value="edit">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type1">Personality Type 1</Label>
                      <Input
                        id="type1"
                        name="type1"
                        value={formData.type1}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., INTJ"
                      />
                    </div>

                    <div>
                      <Label htmlFor="type2">Personality Type 2</Label>
                      <Input
                        id="type2"
                        name="type2"
                        value={formData.type2}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., ENFP"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="summary">Summary</Label>
                    <RichTextEditor
                      value={formData.summary}
                      onChange={(value) => setFormData((prev) => ({ ...prev, summary: value }))}
                      minHeight="150px"
                    />
                  </div>

                  <div className="space-y-2">
                    <EditableList
                      items={formData.tags ? formData.tags : []}
                      onChange={(tags) => setFormData((prev) => ({ ...prev, tags }))}
                      label="Tags"
                      placeholder="Add a tag and press Enter..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="/path/to/image.jpg"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetForm()
                      setIsEditing(false)
                      setIsCreating(false)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Case Study
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this case study? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
