"use client"

import { useState, useEffect, useCallback, useMemo, memo } from "react"
import { Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BlogsTable } from "./blogs/blogs-table"
import { BlogForm } from "./blogs/blog-form"
import { fetchFromFirebase, writeToFirebase } from "@/lib/firebase"
import { useDebounce } from "@/hooks/use-debounce"

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
  tags: string[]
  featured: boolean
  createdAt?: string
  updatedAt?: string
}

// Memoized alert component
const StatusAlert = memo<{ type: "error" | "success"; message: string | null }>(({ type, message }) => {
  if (!message) return null

  return (
    <Alert variant={type === "error" ? "destructive" : "default"}>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
})

StatusAlert.displayName = 'StatusAlert'

// Memoized create button component
const CreateButton = memo<{ onClick: () => void }>(({ onClick }) => (
  <Button onClick={onClick} className="mb-4">
    <Plus className="h-4 w-4 mr-2" />
    Create New Blog
  </Button>
))

CreateButton.displayName = 'CreateButton'

// Memoized delete confirmation dialog
const DeleteConfirmDialog = memo<{
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  blogTitle?: string
}>(({ isOpen, onConfirm, onCancel, blogTitle }) => (
  <Dialog open={isOpen} onOpenChange={onCancel}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Blog</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete "{blogTitle}"? This action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={onConfirm}>
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
))

DeleteConfirmDialog.displayName = 'DeleteConfirmDialog'

export default function BlogsManager() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null)

  // Form state for new/edit blog
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    date: "",
    readTime: "",
    category: "",
    image: "",
    tags: [] as string[],
    featured: false,
  })

  // Memoized fetch blogs function
  const fetchBlogs = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchFromFirebase("/blogs")
      if (data) {
        // Convert object to array
        const blogsArray = Object.entries(data).map(([id, blog]: [string, any]) => ({
          id,
          ...blog,
        }))
        setBlogs(blogsArray)
      } else {
        setBlogs([])
      }
    } catch (err) {
      console.error("Error fetching blogs:", err)
      setError("Failed to fetch blogs. Please try again.")
      setBlogs([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  // Memoized input change handler
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  // Memoized checkbox change handler
  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }, [])

  // Memoized content change handler
  const handleContentChange = useCallback((content: string) => {
    setFormData((prev) => ({ ...prev, content }))
  }, [])

  // Memoized tags change handler
  const handleTagsChange = useCallback((tags: string[]) => {
    setFormData((prev) => ({ ...prev, tags }))
  }, [])

  // Memoized form reset function
  const resetForm = useCallback(() => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author: "",
      date: "",
      readTime: "",
      category: "",
      image: "",
      tags: [],
      featured: false,
    })
  }, [])

  // Memoized create blog handler
  const handleCreateBlog = useCallback(() => {
    setIsCreating(true)
    setIsEditing(false)
    setEditingBlog(null)
    resetForm()
  }, [resetForm])

  // Memoized edit blog handler
  const handleEditBlog = useCallback((blog: Blog) => {
    setEditingBlog(blog)
    setIsEditing(true)
    setIsCreating(false)
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      date: blog.date,
      readTime: blog.readTime,
      category: blog.category,
      image: blog.image,
      tags: blog.tags,
      featured: blog.featured,
    })
  }, [])

  // Memoized delete blog handler
  const handleDeleteBlog = useCallback((blogId: string) => {
    setBlogToDelete(blogId)
    setDeleteConfirmOpen(true)
  }, [])

  // Memoized confirm delete handler
  const handleConfirmDelete = useCallback(async () => {
    if (!blogToDelete) return

    try {
      await writeToFirebase(`/blogs/${blogToDelete}`, null)
      setSuccess("Blog deleted successfully!")
      fetchBlogs()
    } catch (err) {
      setError("Failed to delete blog. Please try again.")
    } finally {
      setDeleteConfirmOpen(false)
      setBlogToDelete(null)
    }
  }, [blogToDelete, fetchBlogs])

  // Memoized save blog handler
  const handleSaveBlog = useCallback(async () => {
    setIsSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const blogData = {
        ...formData,
        createdAt: isEditing ? editingBlog?.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      if (isEditing && editingBlog) {
        await writeToFirebase(`/blogs/${editingBlog.id}`, blogData)
        setSuccess("Blog updated successfully!")
      } else {
        const newId = Date.now().toString()
        await writeToFirebase(`/blogs/${newId}`, blogData)
        setSuccess("Blog created successfully!")
      }

      fetchBlogs()
      resetForm()
      setIsCreating(false)
      setIsEditing(false)
      setEditingBlog(null)
    } catch (err) {
      setError("Failed to save blog. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }, [formData, isEditing, editingBlog, fetchBlogs, resetForm])

  // Memoized cancel handler
  const handleCancel = useCallback(() => {
    setIsCreating(false)
    setIsEditing(false)
    setEditingBlog(null)
    resetForm()
  }, [resetForm])

  // Memoized cancel delete handler
  const handleCancelDelete = useCallback(() => {
    setDeleteConfirmOpen(false)
    setBlogToDelete(null)
  }, [])

  // Memoized blog to delete title
  const blogToDeleteTitle = useMemo(() => {
    if (!blogToDelete) return ""
    const blog = blogs.find(b => b.id === blogToDelete)
    return blog?.title || ""
  }, [blogToDelete, blogs])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Blogs Manager</CardTitle>
          <CardDescription>Create, edit, and manage your blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          <StatusAlert type="error" message={error} />
          <StatusAlert type="success" message={success} />

          <Tabs defaultValue="list">
            <TabsList>
              <TabsTrigger value="list">All Blogs</TabsTrigger>
              <TabsTrigger value="create" onClick={handleCreateBlog}>
                Create New
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              <CreateButton onClick={handleCreateBlog} />
              <BlogsTable
                blogs={blogs}
                onEdit={handleEditBlog}
                onDelete={handleDeleteBlog}
              />
            </TabsContent>

            <TabsContent value="create">
              {(isCreating || isEditing) && (
                <BlogForm
                  formData={formData}
                  onInputChange={handleInputChange}
                  onCheckboxChange={handleCheckboxChange}
                  onContentChange={handleContentChange}
                  onTagsChange={handleTagsChange}
                  onSave={handleSaveBlog}
                  onCancel={handleCancel}
                  isSaving={isSaving}
                  isEditing={isEditing}
                />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        isOpen={deleteConfirmOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        blogTitle={blogToDeleteTitle}
      />
    </div>
  )
}
