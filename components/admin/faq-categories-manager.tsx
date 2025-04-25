"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Loader2, Plus, Edit, Trash, Save, MessageSquare } from "lucide-react"
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { fetchFromFirebase, writeToFirebase } from "@/lib/firebase"

// Define types for FAQ data
interface FAQ {
  question: string
  answer: string
}

interface FAQCategory {
  id: string
  name: string // Changed from title to name
  icon: string
  description?: string // Made optional since it's not in the screenshot
  questions: FAQ[] // Changed from faqs to questions
}

// Available icons for selection
const availableIcons = [
  "HelpCircle",
  "Info",
  "Users",
  "Shield",
  "Settings",
  "FileQuestion",
  "MessageCircle",
  "Book",
  "Lightbulb",
  "Briefcase",
  "Heart",
  "Brain",
  "Puzzle",
  "Zap",
  "Star",
]

export default function FAQCategoriesManager() {
  const [categories, setCategories] = useState<FAQCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [editingCategory, setEditingCategory] = useState<FAQCategory | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null)
  const [viewingQuestions, setViewingQuestions] = useState<number | null>(null)
  const [editingQuestion, setEditingQuestion] = useState<{ index: number; question: FAQ } | null>(null)
  const [deletingQuestion, setDeletingQuestion] = useState<{ categoryIndex: number; questionIndex: number } | null>(
    null,
  )
  const [deleteQuestionConfirmOpen, setDeleteQuestionConfirmOpen] = useState(false)

  // Form state for new/edit category
  const [formData, setFormData] = useState<FAQCategory>({
    id: "",
    name: "", // Changed from title to name
    icon: "HelpCircle",
    description: "",
    questions: [], // Changed from faqs to questions
  })

  // Form state for new/edit question
  const [questionFormData, setQuestionFormData] = useState<FAQ>({
    question: "",
    answer: "",
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchFromFirebase("/faq-categories")
      if (data && Array.isArray(data)) {
        setCategories(data)
      } else {
        setCategories([])
      }
    } catch (err) {
      console.error("Error fetching FAQ categories:", err)
      setError("Failed to fetch FAQ categories. Please try again.")
      setCategories([])
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleQuestionInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setQuestionFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      id: "",
      name: "", // Changed from title to name
      icon: "HelpCircle",
      description: "",
      questions: [], // Changed from faqs to questions
    })
  }

  const resetQuestionForm = () => {
    setQuestionFormData({
      question: "",
      answer: "",
    })
  }

  const handleEdit = (category: FAQCategory, index: number) => {
    setEditingCategory({ ...category, index: index as any })
    setFormData({
      id: category.id || "",
      name: category.name || "", // Changed from title to name
      icon: category.icon || "HelpCircle",
      description: category.description || "",
      questions: category.questions || [], // Changed from faqs to questions
    })
    setIsEditing(true)
  }

  const handleCreate = () => {
    resetForm()
    setIsCreating(true)
  }

  const handleDelete = (index: number) => {
    setCategoryToDelete(index)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = async () => {
    if (categoryToDelete === null) return

    setLoading(true)
    setError(null)
    try {
      const updatedCategories = [...categories]
      updatedCategories.splice(categoryToDelete, 1)
      await writeToFirebase("/faq-categories", updatedCategories)
      setSuccess("FAQ category deleted successfully")
      setCategories(updatedCategories)
    } catch (err) {
      console.error("Error deleting FAQ category:", err)
      setError("Failed to delete FAQ category. Please try again.")
    } finally {
      setLoading(false)
      setDeleteConfirmOpen(false)
      setCategoryToDelete(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Validate form data
      if (!formData.name.trim()) {
        // Changed from title to name
        throw new Error("Category name is required")
      }

      // Generate ID from name if not provided
      const categoryId = formData.id.trim() || formData.name.toLowerCase().replace(/\s+/g, "-") // Changed from title to name

      const categoryData = {
        id: categoryId,
        name: formData.name, // Changed from title to name
        icon: formData.icon,
        description: formData.description,
        questions: formData.questions || [], // Changed from faqs to questions
      }

      if (isEditing && editingCategory) {
        // Update existing category
        const updatedCategories = [...categories]
        const index = (editingCategory as any).index
        updatedCategories[index] = categoryData
        await writeToFirebase("/faq-categories", updatedCategories)
        setCategories(updatedCategories)
        setSuccess(`FAQ category "${formData.name}" updated successfully`) // Changed from title to name
      } else {
        // Create new category
        const updatedCategories = [...categories, categoryData]
        await writeToFirebase("/faq-categories", updatedCategories)
        setCategories(updatedCategories)
        setSuccess(`FAQ category "${formData.name}" created successfully`) // Changed from title to name
      }

      // Reset form and state
      resetForm()
      setIsEditing(false)
      setIsCreating(false)
    } catch (err: any) {
      console.error("Error saving FAQ category:", err)
      setError(err.message || "Failed to save FAQ category. Please check your data and try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleViewQuestions = (index: number) => {
    setViewingQuestions(index)
  }

  const handleEditQuestion = (question: FAQ, index: number) => {
    setEditingQuestion({ index, question })
    setQuestionFormData({
      question: question.question,
      answer: question.answer,
    })
  }

  const handleAddQuestion = () => {
    resetQuestionForm()
    setEditingQuestion({ index: -1, question: { question: "", answer: "" } })
  }

  const handleDeleteQuestion = (categoryIndex: number, questionIndex: number) => {
    setDeletingQuestion({ categoryIndex, questionIndex })
    setDeleteQuestionConfirmOpen(true)
  }

  const confirmDeleteQuestion = async () => {
    if (!deletingQuestion) return

    setLoading(true)
    setError(null)
    try {
      const { categoryIndex, questionIndex } = deletingQuestion
      const updatedCategories = [...categories]
      updatedCategories[categoryIndex].questions.splice(questionIndex, 1) // Changed from faqs to questions
      await writeToFirebase("/faq-categories", updatedCategories)
      setSuccess("Question deleted successfully")
      setCategories(updatedCategories)
    } catch (err) {
      console.error("Error deleting question:", err)
      setError("Failed to delete question. Please try again.")
    } finally {
      setLoading(false)
      setDeleteQuestionConfirmOpen(false)
      setDeletingQuestion(null)
    }
  }

  const handleSaveQuestion = async () => {
    if (!editingQuestion || viewingQuestions === null) return

    setLoading(true)
    setError(null)
    try {
      // Validate form data
      if (!questionFormData.question.trim() || !questionFormData.answer.trim()) {
        throw new Error("Question and answer are required")
      }

      const updatedCategories = [...categories]
      const categoryIndex = viewingQuestions

      if (editingQuestion.index === -1) {
        // Add new question
        updatedCategories[categoryIndex].questions.push({
          // Changed from faqs to questions
          question: questionFormData.question,
          answer: questionFormData.answer,
        })
      } else {
        // Update existing question
        updatedCategories[categoryIndex].questions[editingQuestion.index] = {
          // Changed from faqs to questions
          question: questionFormData.question,
          answer: questionFormData.answer,
        }
      }

      await writeToFirebase("/faq-categories", updatedCategories)
      setCategories(updatedCategories)
      setSuccess(editingQuestion.index === -1 ? "Question added successfully" : "Question updated successfully")
      setEditingQuestion(null)
    } catch (err: any) {
      console.error("Error saving question:", err)
      setError(err.message || "Failed to save question. Please check your data and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-slate-800">FAQ Categories Manager</CardTitle>
            <CardDescription className="text-slate-600">Manage FAQ categories and questions</CardDescription>
          </div>
          <Button onClick={handleCreate} className="bg-slate-800 hover:bg-slate-900">
            <Plus className="h-4 w-4 mr-2" />
            Add New Category
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs
          value={isEditing || isCreating ? "edit" : viewingQuestions !== null ? "questions" : "list"}
          className="w-full"
        >
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger value="list" className="data-[state=active]:bg-white">
              Categories List
            </TabsTrigger>
            {(isEditing || isCreating) && (
              <TabsTrigger value="edit" className="data-[state=active]:bg-white">
                {isEditing ? "Edit Category" : "New Category"}
              </TabsTrigger>
            )}
            {viewingQuestions !== null && (
              <TabsTrigger value="questions" className="data-[state=active]:bg-white">
                Manage Questions
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

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 mb-4">No FAQ categories found. Create your first category!</p>
                <Button onClick={handleCreate} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Category
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-md border border-slate-200">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Icon</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category, index) => (
                      <TableRow key={category.id} className="hover:bg-slate-50">
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{category.icon}</TableCell>
                        <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                        <TableCell>
                          <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100 border-slate-200">
                            {Array.isArray(category.questions) ? category.questions.length : 0} Questions
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewQuestions(index)}
                              className="h-8 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                            >
                              <MessageSquare className="h-3.5 w-3.5 mr-1" />
                              Manage Questions
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(category, index)}
                              className="h-8 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                            >
                              <Edit className="h-3.5 w-3.5 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(index)}
                              className="h-8 border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                            >
                              <Trash className="h-3.5 w-3.5 mr-1" />
                              Delete
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
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Category Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="border-slate-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="id" className="text-sm font-medium">
                      Category ID
                    </Label>
                    <Input
                      id="id"
                      name="id"
                      value={formData.id}
                      onChange={handleInputChange}
                      className="border-slate-200"
                      placeholder="auto-generated-from-name"
                    />
                    <p className="text-xs text-slate-500">Leave blank to auto-generate from name</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="icon" className="text-sm font-medium">
                      Icon
                    </Label>
                    <Select value={formData.icon} onValueChange={(value) => handleSelectChange("icon", value)}>
                      <SelectTrigger className="border-slate-200">
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableIcons.map((icon) => (
                          <SelectItem key={icon} value={icon}>
                            {icon}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">
                      Description (Optional)
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description || ""}
                      onChange={handleInputChange}
                      rows={3}
                      className="border-slate-200"
                    />
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
                        Save Category
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
          )}

          {viewingQuestions !== null && (
            <TabsContent value="questions">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-slate-800">
                      Managing Questions for: {categories[viewingQuestions]?.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      Add, edit, or remove frequently asked questions in this category
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setViewingQuestions(null)} className="border-slate-200">
                      Back to Categories
                    </Button>
                    <Button onClick={handleAddQuestion} className="bg-slate-800 hover:bg-slate-900">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Question
                    </Button>
                  </div>
                </div>

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

                {editingQuestion ? (
                  <div className="border rounded-md p-6 bg-slate-50">
                    <h4 className="text-md font-medium mb-4">
                      {editingQuestion.index === -1 ? "Add New Question" : "Edit Question"}
                    </h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="question" className="text-sm font-medium">
                          Question
                        </Label>
                        <Input
                          id="question"
                          name="question"
                          value={questionFormData.question}
                          onChange={handleQuestionInputChange}
                          required
                          className="border-slate-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="answer" className="text-sm font-medium">
                          Answer
                        </Label>
                        <Textarea
                          id="answer"
                          name="answer"
                          value={questionFormData.answer}
                          onChange={handleQuestionInputChange}
                          required
                          rows={5}
                          className="border-slate-200"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setEditingQuestion(null)}
                          className="border-slate-200"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={handleSaveQuestion}
                          disabled={loading}
                          className="bg-slate-800 hover:bg-slate-900"
                        >
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
                    </div>
                  </div>
                ) : (
                  <>
                    {!Array.isArray(categories[viewingQuestions]?.questions) ||
                    categories[viewingQuestions]?.questions.length === 0 ? (
                      <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                        <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500 mb-4">
                          No questions found in this category. Add your first question!
                        </p>
                        <Button onClick={handleAddQuestion} variant="outline">
                          <Plus className="h-4 w-4 mr-2" />
                          Add New Question
                        </Button>
                      </div>
                    ) : (
                      <Accordion type="multiple" className="w-full border rounded-md">
                        {Array.isArray(categories[viewingQuestions]?.questions) &&
                          categories[viewingQuestions]?.questions.map((question, questionIndex) => (
                            <AccordionItem
                              key={questionIndex}
                              value={`question-${questionIndex}`}
                              className="border-b last:border-0"
                            >
                              <AccordionTrigger className="px-4 py-3 hover:bg-slate-50">
                                <div className="flex items-center justify-between w-full pr-4">
                                  <div className="font-medium text-left">{question.question}</div>
                                  <div className="flex space-x-2">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleEditQuestion(question, questionIndex)
                                      }}
                                      className="h-8 w-8 p-0"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleDeleteQuestion(viewingQuestions, questionIndex)
                                      }}
                                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="px-4 py-3 text-slate-600 whitespace-pre-line">
                                {question.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                      </Accordion>
                    )}
                  </>
                )}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>

      {/* Delete Category Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this FAQ category? This action cannot be undone.
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

      {/* Delete Question Confirmation Dialog */}
      <Dialog open={deleteQuestionConfirmOpen} onOpenChange={setDeleteQuestionConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this question? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteQuestionConfirmOpen(false)} className="border-slate-200">
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteQuestion} disabled={loading}>
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
