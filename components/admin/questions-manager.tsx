"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Loader2, Plus, Edit, Trash, Save, ArrowUp, ArrowDown, HelpCircle, Filter } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { EditableList } from "./editable-list"
import { fetchFromFirebase, writeToFirebase } from "@/lib/firebase"

export default function QuestionsManager() {
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [editingQuestion, setEditingQuestion] = useState<any | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [questionToDelete, setQuestionToDelete] = useState<number | null>(null)
  const [filter, setFilter] = useState<string>("all")

  // Form state for new/edit question
  const [formData, setFormData] = useState({
    text: "",
    options: [] as string[],
    dimension: "EI",
    weight: "1",
    subtype: "",
  })

  const fetchQuestions = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchFromFirebase("/questions")
      if (data && Array.isArray(data)) {
        setQuestions(data)
      } else {
        setQuestions([])
      }
    } catch (err) {
      console.error("Error fetching questions:", err)
      setError("Failed to fetch questions. Please try again.")
      setQuestions([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleOptionsChange = (options: string[]) => {
    setFormData((prev) => ({ ...prev, options }))
  }

  const resetForm = () => {
    setFormData({
      text: "",
      options: [],
      dimension: "EI",
      weight: "1",
      subtype: "",
    })
  }

  const handleEdit = (question: any, index: number) => {
    setEditingQuestion({ ...question, index })
    setFormData({
      text: question.text || "",
      options: question.options || [],
      dimension: question.dimension || "EI",
      weight: question.weight?.toString() || "1",
      subtype: question.subtype || "",
    })
    setIsEditing(true)
  }

  const handleCreate = () => {
    resetForm()
    setIsCreating(true)
  }

  const handleDelete = (index: number) => {
    setQuestionToDelete(index)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = async () => {
    if (questionToDelete === null) return

    setLoading(true)
    setError(null)
    try {
      const updatedQuestions = [...questions]
      updatedQuestions.splice(questionToDelete, 1)
      await writeToFirebase("/questions", updatedQuestions)
      setSuccess("Question deleted successfully")
      setQuestions(updatedQuestions)
    } catch (err) {
      console.error("Error deleting question:", err)
      setError("Failed to delete question. Please try again.")
    } finally {
      setLoading(false)
      setDeleteConfirmOpen(false)
      setQuestionToDelete(null)
    }
  }

  const handleMoveQuestion = async (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === questions.length - 1)) {
      return
    }

    const newIndex = direction === "up" ? index - 1 : index + 1
    const updatedQuestions = [...questions]
    const temp = updatedQuestions[index]
    updatedQuestions[index] = updatedQuestions[newIndex]
    updatedQuestions[newIndex] = temp

    setLoading(true)
    try {
      await writeToFirebase("/questions", updatedQuestions)
      setQuestions(updatedQuestions)
      setSuccess(`Question moved ${direction} successfully`)
    } catch (err) {
      console.error(`Error moving question ${direction}:`, err)
      setError(`Failed to move question ${direction}. Please try again.`)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const questionData = {
        text: formData.text,
        options: formData.options,
        dimension: formData.dimension,
        weight: Number.parseInt(formData.weight),
        subtype: formData.subtype || undefined,
      }

      if (isEditing && editingQuestion) {
        // Update existing question
        const updatedQuestions = [...questions]
        updatedQuestions[editingQuestion.index] = questionData
        await writeToFirebase("/questions", updatedQuestions)
        setQuestions(updatedQuestions)
        setSuccess(`Question updated successfully`)
      } else {
        // Create new question
        const updatedQuestions = [...questions, questionData]
        await writeToFirebase("/questions", updatedQuestions)
        setQuestions(updatedQuestions)
        setSuccess(`Question created successfully`)
      }

      // Reset form and state
      resetForm()
      setIsEditing(false)
      setIsCreating(false)
    } catch (err) {
      console.error("Error saving question:", err)
      setError("Failed to save question. Please check your data and try again.")
    } finally {
      setLoading(false)
    }
  }

  // Filter questions based on selected dimension
  const filteredQuestions = filter === "all" ? questions : questions.filter((q) => q.dimension === filter)

  // Get dimension label
  const getDimensionLabel = (code: string) => {
    switch (code) {
      case "EI":
        return "Extraversion vs. Introversion"
      case "SN":
        return "Sensing vs. Intuition"
      case "TF":
        return "Thinking vs. Feeling"
      case "JP":
        return "Judging vs. Perceiving"
      default:
        return code
    }
  }

  // Get dimension badge color
  const getDimensionColor = (code: string) => {
    switch (code) {
      case "EI":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "SN":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "TF":
        return "bg-green-100 text-green-800 border-green-200"
      case "JP":
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-slate-800">Questions Manager</CardTitle>
            <CardDescription className="text-slate-600">
              Manage personality test questions and answer options
            </CardDescription>
          </div>
          <Button onClick={handleCreate} className="bg-slate-800 hover:bg-slate-900">
            <Plus className="h-4 w-4 mr-2" />
            Add New Question
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={isEditing || isCreating ? "edit" : "list"} className="w-full">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger value="list" className="data-[state=active]:bg-white">
              Question List
            </TabsTrigger>
            {(isEditing || isCreating) && (
              <TabsTrigger value="edit" className="data-[state=active]:bg-white">
                {isEditing ? "Edit Question" : "New Question"}
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="list">
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="mb-6">
              <div className="flex items-center gap-3">
                <Filter className="h-4 w-4 text-slate-400" />
                <Label htmlFor="filter" className="text-sm font-medium">
                  Filter by Dimension:
                </Label>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[240px] border-slate-200">
                    <SelectValue placeholder="Select dimension" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dimensions</SelectItem>
                    <SelectItem value="EI">Extraversion vs. Introversion</SelectItem>
                    <SelectItem value="SN">Sensing vs. Intuition</SelectItem>
                    <SelectItem value="TF">Thinking vs. Feeling</SelectItem>
                    <SelectItem value="JP">Judging vs. Perceiving</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
              </div>
            ) : filteredQuestions.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                <HelpCircle className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 mb-4">No questions found. Create your first question!</p>
                <Button onClick={handleCreate} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Question
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-md border border-slate-200">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Question</TableHead>
                      <TableHead>Dimension</TableHead>
                      <TableHead>Options</TableHead>
                      <TableHead>Weight</TableHead>
                      <TableHead>Subtype</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQuestions.map((question, index) => {
                      // Find the actual index in the full questions array
                      const actualIndex = questions.findIndex(
                        (q) => q.text === question.text && q.dimension === question.dimension,
                      )

                      return (
                        <TableRow key={index} className="hover:bg-slate-50">
                          <TableCell className="font-medium max-w-md truncate">{question.text}</TableCell>
                          <TableCell>
                            <Badge className={getDimensionColor(question.dimension)}>{question.dimension}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              {question.options && question.options.length > 0 ? (
                                <div className="text-xs text-slate-500">{question.options.length} options</div>
                              ) : (
                                <span className="text-xs text-red-500">No options</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-slate-50">
                              {question.weight || 1}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {question.subtype ? (
                              <span className="text-xs text-slate-600">{question.subtype}</span>
                            ) : (
                              <span className="text-xs text-slate-400">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMoveQuestion(actualIndex, "up")}
                                disabled={actualIndex === 0}
                                className="h-8 w-8 p-0"
                                title="Move Up"
                              >
                                <ArrowUp className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMoveQuestion(actualIndex, "down")}
                                disabled={actualIndex === questions.length - 1}
                                className="h-8 w-8 p-0"
                                title="Move Down"
                              >
                                <ArrowDown className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(question, actualIndex)}
                                className="h-8 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                              >
                                <Edit className="h-3.5 w-3.5 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(actualIndex)}
                                className="h-8 border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                              >
                                <Trash className="h-3.5 w-3.5 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          {(isEditing || isCreating) && (
            <TabsContent value="edit">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="text" className="text-sm font-medium">
                        Question Text
                      </Label>
                      <Textarea
                        id="text"
                        name="text"
                        value={formData.text}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="border-slate-200"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dimension" className="text-sm font-medium">
                          Dimension
                        </Label>
                        <Select
                          value={formData.dimension}
                          onValueChange={(value) => handleSelectChange("dimension", value)}
                        >
                          <SelectTrigger className="border-slate-200">
                            <SelectValue placeholder="Select dimension" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="EI">Extraversion vs. Introversion</SelectItem>
                            <SelectItem value="SN">Sensing vs. Intuition</SelectItem>
                            <SelectItem value="TF">Thinking vs. Feeling</SelectItem>
                            <SelectItem value="JP">Judging vs. Perceiving</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="weight" className="text-sm font-medium">
                          Weight
                        </Label>
                        <Select value={formData.weight} onValueChange={(value) => handleSelectChange("weight", value)}>
                          <SelectTrigger className="border-slate-200">
                            <SelectValue placeholder="Select weight" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 - Standard</SelectItem>
                            <SelectItem value="2">2 - Important</SelectItem>
                            <SelectItem value="3">3 - Very Important</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subtype" className="text-sm font-medium">
                          Subtype (optional)
                        </Label>
                        <Input
                          id="subtype"
                          name="subtype"
                          value={formData.subtype}
                          onChange={handleInputChange}
                          placeholder="e.g., social-energy"
                          className="border-slate-200"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <EditableList
                      items={formData.options}
                      onChange={handleOptionsChange}
                      label="Answer Options"
                      placeholder="Add an option and press Enter..."
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      Add each answer option that will be presented to the user. The order matters - typically options
                      should progress from one extreme to the other.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetForm()
                      setIsEditing(false)
                      setIsCreating(false)
                    }}
                    className="border-slate-200"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading} className="bg-slate-800 hover:bg-slate-900">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Question
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
              Are you sure you want to delete this question? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)} className="border-slate-200">
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
