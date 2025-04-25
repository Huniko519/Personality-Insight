"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Loader2, Plus, Edit, Trash, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { EditableList } from "./editable-list"
import { fetchFromFirebase, writeToFirebase } from "@/lib/firebase"

export default function CareerDatabaseManager() {
  const [careers, setCareers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [editingCareer, setEditingCareer] = useState<any | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [careerToDelete, setCareerToDelete] = useState<number | null>(null)

  // Form state for new/edit career
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    category: "",
    description: "",
    suitableTypes: "",
    goodFitTypes: "",
    skills: "",
    education: "",
    salary: "",
    growthPotential: "",
    workEnvironment: "",
    personalityTraits: "",
    challenges: "",
    dayToDay: "",
  })

  const fetchCareers = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchFromFirebase("/career-database")
      if (data && Array.isArray(data)) {
        setCareers(data)
      } else {
        setCareers([])
      }
    } catch (err) {
      console.error("Error fetching careers:", err)
      setError("Failed to fetch careers. Please try again.")
      setCareers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCareers()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      category: "",
      description: "",
      suitableTypes: "",
      goodFitTypes: "",
      skills: "",
      education: "",
      salary: "",
      growthPotential: "",
      workEnvironment: "",
      personalityTraits: "",
      challenges: "",
      dayToDay: "",
    })
  }

  const handleEdit = (career: any, index: number) => {
    setEditingCareer({ ...career, index })
    setFormData({
      id: career.id || "",
      title: career.title || "",
      category: career.category || "",
      description: career.description || "",
      suitableTypes: career.suitableTypes || [],
      goodFitTypes: career.goodFitTypes || [],
      skills: career.skills || [],
      education: career.education || "",
      salary: career.salary || "",
      growthPotential: career.growthPotential || "",
      workEnvironment: career.workEnvironment || "",
      personalityTraits: career.personalityTraits || [],
      challenges: career.challenges || [],
      dayToDay: career.dayToDay || [],
    })
    setIsEditing(true)
  }

  const handleCreate = () => {
    resetForm()
    setIsCreating(true)
  }

  const handleDelete = (index: number) => {
    setCareerToDelete(index)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = async () => {
    if (careerToDelete === null) return

    setLoading(true)
    setError(null)
    try {
      const updatedCareers = [...careers]
      updatedCareers.splice(careerToDelete, 1)
      await writeToFirebase("/career-database", updatedCareers)
      setSuccess("Career deleted successfully")
      setCareers(updatedCareers)
    } catch (err) {
      console.error("Error deleting career:", err)
      setError("Failed to delete career. Please try again.")
    } finally {
      setLoading(false)
      setDeleteConfirmOpen(false)
      setCareerToDelete(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const careerData = {
        id: formData.id || formData.title.toLowerCase().replace(/\s+/g, "-"),
        title: formData.title,
        category: formData.category,
        description: formData.description,
        suitableTypes: formData.suitableTypes,
        goodFitTypes: formData.goodFitTypes,
        skills: formData.skills,
        education: formData.education,
        salary: formData.salary,
        growthPotential: formData.growthPotential,
        workEnvironment: formData.workEnvironment,
        personalityTraits: formData.personalityTraits,
        challenges: formData.challenges,
        dayToDay: formData.dayToDay,
      }

      if (isEditing && editingCareer) {
        // Update existing career
        const updatedCareers = [...careers]
        updatedCareers[editingCareer.index] = careerData
        await writeToFirebase("/career-database", updatedCareers)
        setCareers(updatedCareers)
        setSuccess(`Career "${formData.title}" updated successfully`)
      } else {
        // Create new career
        const updatedCareers = [...careers, careerData]
        await writeToFirebase("/career-database", updatedCareers)
        setCareers(updatedCareers)
        setSuccess(`Career "${formData.title}" created successfully`)
      }

      // Reset form and state
      resetForm()
      setIsEditing(false)
      setIsCreating(false)
    } catch (err) {
      console.error("Error saving career:", err)
      setError("Failed to save career. Please check your data and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Career Database Manager</CardTitle>
            <CardDescription>Manage your career database entries</CardDescription>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Career
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={isEditing || isCreating ? "edit" : "list"}>
          <TabsList>
            <TabsTrigger value="list">Career List</TabsTrigger>
            {(isEditing || isCreating) && (
              <TabsTrigger value="edit">{isEditing ? "Edit Career" : "New Career"}</TabsTrigger>
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
            ) : careers.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <p>No careers found. Create your first career entry!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Suitable Types</TableHead>
                      <TableHead>Salary</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {careers.map((career, index) => (
                      <TableRow key={career.id || index}>
                        <TableCell className="font-medium">{career.title}</TableCell>
                        <TableCell>{career.category}</TableCell>
                        <TableCell>
                          {career.suitableTypes &&
                            career.suitableTypes.map((type: string, i: number) => (
                              <span
                                key={i}
                                className="inline-block bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded mr-1 mb-1"
                              >
                                {type}
                              </span>
                            ))}
                        </TableCell>
                        <TableCell>{career.salary}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(career, index)}>
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
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="basic-info">
                    <AccordionTrigger>Basic Information</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div>
                          <Label htmlFor="id">ID (URL slug)</Label>
                          <Input
                            id="id"
                            name="id"
                            value={formData.id}
                            onChange={handleInputChange}
                            placeholder="e.g., software-developer"
                          />
                          <p className="text-xs text-slate-500 mt-1">Leave blank to auto-generate from title</p>
                        </div>

                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
                        </div>

                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Input
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g., Technology, Healthcare"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            rows={3}
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="personality-fit">
                    <AccordionTrigger>Personality Fit</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div>
                          <EditableList
                            items={formData.suitableTypes || []}
                            onChange={(items) => setFormData((prev) => ({ ...prev, suitableTypes: items }))}
                            label="Suitable Types"
                            placeholder="Add a type and press Enter..."
                          />
                        </div>

                        <div>
                          <EditableList
                            items={formData.goodFitTypes || []}
                            onChange={(items) => setFormData((prev) => ({ ...prev, goodFitTypes: items }))}
                            label="Good Fit Types"
                            placeholder="Add a type and press Enter..."
                          />
                        </div>

                        <div>
                          <EditableList
                            items={formData.skills || []}
                            onChange={(items) => setFormData((prev) => ({ ...prev, skills: items }))}
                            label="Skills"
                            placeholder="Add a skill and press Enter..."
                          />
                        </div>

                        <div>
                          <EditableList
                            items={formData.personalityTraits || []}
                            onChange={(items) => setFormData((prev) => ({ ...prev, personalityTraits: items }))}
                            label="Personality Traits"
                            placeholder="Add a trait and press Enter..."
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="career-details">
                    <AccordionTrigger>Career Details</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div>
                          <Label htmlFor="education">Education</Label>
                          <Input
                            id="education"
                            name="education"
                            value={formData.education}
                            onChange={handleInputChange}
                            placeholder="e.g., Bachelor's degree in Computer Science"
                          />
                        </div>

                        <div>
                          <Label htmlFor="salary">Salary Range</Label>
                          <Input
                            id="salary"
                            name="salary"
                            value={formData.salary}
                            onChange={handleInputChange}
                            placeholder="e.g., $70,000 - $150,000"
                          />
                        </div>

                        <div>
                          <Label htmlFor="growthPotential">Growth Potential</Label>
                          <Input
                            id="growthPotential"
                            name="growthPotential"
                            value={formData.growthPotential}
                            onChange={handleInputChange}
                            placeholder="e.g., High, Medium, Low"
                          />
                        </div>

                        <div>
                          <Label htmlFor="workEnvironment">Work Environment</Label>
                          <Input
                            id="workEnvironment"
                            name="workEnvironment"
                            value={formData.workEnvironment}
                            onChange={handleInputChange}
                            placeholder="e.g., Office, remote work, collaborative teams"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <EditableList
                            items={formData.challenges || []}
                            onChange={(items) => setFormData((prev) => ({ ...prev, challenges: items }))}
                            label="Challenges"
                            placeholder="Add a challenge and press Enter..."
                          />
                        </div>

                        <div className="md:col-span-2">
                          <EditableList
                            items={formData.dayToDay || []}
                            onChange={(items) => setFormData((prev) => ({ ...prev, dayToDay: items }))}
                            label="Day-to-Day Activities"
                            placeholder="Add an activity and press Enter..."
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

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
                        Save Career
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
              Are you sure you want to delete this career? This action cannot be undone.
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
