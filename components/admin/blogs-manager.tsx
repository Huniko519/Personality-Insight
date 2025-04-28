"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ImageIcon, Loader2, Plus, Edit, Trash, Save, Calendar, Clock, User, FileText } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { EditableList } from "./editable-list"
import { RichTextEditor } from "./rich-text-editor"
import { fetchFromFirebase, writeToFirebase } from "@/lib/firebase"

export default function BlogsManager() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [editingBlog, setEditingBlog] = useState<any | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
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

  const fetchBlogs = async () => {
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
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }))
  }

  const handleTagsChange = (tags: string[]) => {
    setFormData((prev) => ({ ...prev, tags }))
  }

  const resetForm = () => {
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
  }

  const handleEdit = (blog: any) => {
    setEditingBlog(blog)
    setFormData({
      title: blog.title || "",
      slug: blog.id || "",
      excerpt: blog.excerpt || "",
      content: typeof blog.content === "string" ? blog.content : JSON.stringify(blog.content, null, 2),
      author: blog.author || "",
      date: blog.date || "",
      readTime: blog.readTime || "",
      category: blog.category || "",
      image: blog.image || "",
      tags: blog.tags || [],
      featured: blog.featured || false,
    })
    setIsEditing(true)
    // No need to manually click the tab - the controlled Tabs component will handle it
  }

  const handleCreate = () => {
    resetForm()
    setIsCreating(true)
    // No need to manually click the tab - the controlled Tabs component will handle it
  }

  const handleDelete = (id: string) => {
    setBlogToDelete(id)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = async () => {
    if (!blogToDelete) return

    setLoading(true)
    setError(null)
    try {
      await writeToFirebase(`/blogs/${blogToDelete}`, null)
      setSuccess(`Blog deleted successfully`)
      fetchBlogs()
    } catch (err) {
      console.error("Error deleting blog:", err)
      setError("Failed to delete blog. Please try again.")
    } finally {
      setLoading(false)
      setDeleteConfirmOpen(false)
      setBlogToDelete(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Process form data
      let processedContent = formData.content
      try {
        // Try to parse content as JSON if it looks like JSON
        if (
          typeof formData.content === "string" &&
          (formData.content.trim().startsWith("{") || formData.content.trim().startsWith("["))
        ) {
          processedContent = JSON.parse(formData.content)
        }
      } catch (err) {
        // If parsing fails, use as string
        processedContent = formData.content
      }

      const slug =
        formData.slug ||
        formData.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-")

      const blogData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: processedContent,
        author: formData.author,
        date: formData.date,
        readTime: formData.readTime,
        category: formData.category,
        image: formData.image,
        tags: formData.tags,
        featured: formData.featured,
        slug,
      }

      if (isEditing && editingBlog) {
        // Update existing blog
        await writeToFirebase(`/blogs/${editingBlog.id}`, blogData)
        setSuccess(`Blog "${formData.title}" updated successfully`)
      } else {
        // Create new blog
        await writeToFirebase(`/blogs/${slug}`, {
          ...blogData,
          id: slug,
        })
        setSuccess(`Blog "${formData.title}" created successfully`)
      }

      // Refresh blogs list
      fetchBlogs()

      // Reset form and state
      resetForm()
      setIsEditing(false)
      setIsCreating(false)
    } catch (err) {
      console.error("Error saving blog:", err)
      setError("Failed to save blog. Please check your data and try again.")
    } finally {
      setLoading(false)
    }
  }

  const generateSlugFromTitle = () => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
      setFormData((prev) => ({ ...prev, slug }))
    }
  }

  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-slate-800">Blogs Manager</CardTitle>
            <CardDescription className="text-slate-600">Create, edit, and manage your blog posts</CardDescription>
          </div>
          <Button onClick={handleCreate} className="bg-slate-800 hover:bg-slate-900">
            <Plus className="h-4 w-4 mr-2" />
            Add New Blog
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={isEditing || isCreating ? "edit" : "list"} className="w-full">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger value="list" className="data-[state=active]:bg-white">
              Blog List
            </TabsTrigger>
            {(isEditing || isCreating) && (
              <TabsTrigger value="edit" className="data-[state=active]:bg-white">
                {isEditing ? "Edit Blog" : "New Blog"}
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
            ) : blogs.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 mb-4">No blogs found. Create your first blog post!</p>
                <Button onClick={handleCreate} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Blog
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-md border border-slate-200">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogs.map((blog, index) => (
                      <TableRow key={`${blog.id}-${index}`} className="hover:bg-slate-50">
                        <TableCell className="font-medium">{blog.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-3.5 w-3.5 text-slate-400" />
                            <span>{blog.author}</span>
                          </div>
                        </TableCell>
                        <TableCell>{blog.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5 text-slate-400" />
                            <span>{blog.date}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {blog.tags && blog.tags.length > 0 ? (
                              blog.tags.slice(0, 2).map((tag: string, i: number) => (
                                <Badge key={i} variant="outline" className="bg-slate-50">
                                  {tag}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-slate-400 text-sm">No tags</span>
                            )}
                            {blog.tags && blog.tags.length > 2 && (
                              <Badge variant="outline" className="bg-slate-50">
                                +{blog.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {blog.featured ? (
                            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">
                              Featured
                            </Badge>
                          ) : (
                            <span className="text-slate-400 text-sm">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(blog)}
                              className="h-8 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                            >
                              <Edit className="h-3.5 w-3.5 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(blog.id)}
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
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm font-medium">
                        Title
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="border-slate-200"
                        onBlur={generateSlugFromTitle}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="slug" className="text-sm font-medium">
                        Slug (URL)
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="slug"
                          name="slug"
                          value={formData.slug}
                          onChange={handleInputChange}
                          className="border-slate-200"
                          placeholder="auto-generated-from-title"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={generateSlugFromTitle}
                          className="whitespace-nowrap"
                        >
                          Generate
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500">
                        Leave blank to auto-generate from title. Used in the URL: /blog/your-slug
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="excerpt" className="text-sm font-medium">
                        Excerpt
                      </Label>
                      <Input
                        id="excerpt"
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleInputChange}
                        required
                        className="border-slate-200"
                      />
                      <p className="text-xs text-slate-500">
                        A short summary that appears in blog listings and search results
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="author" className="text-sm font-medium">
                          Author
                        </Label>
                        <div className="relative">
                          <Input
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleInputChange}
                            required
                            className="border-slate-200 pl-8"
                          />
                          <User className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date" className="text-sm font-medium">
                          Date
                        </Label>
                        <div className="relative">
                          <Input
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                            className="border-slate-200 pl-8"
                            placeholder="YYYY-MM-DD"
                          />
                          <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="readTime" className="text-sm font-medium">
                          Read Time
                        </Label>
                        <div className="relative">
                          <Input
                            id="readTime"
                            name="readTime"
                            value={formData.readTime}
                            onChange={handleInputChange}
                            required
                            className="border-slate-200 pl-8"
                            placeholder="5 min"
                          />
                          <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-sm font-medium">
                          Category
                        </Label>
                        <Input
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                          className="border-slate-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image" className="text-sm font-medium">
                        Featured Image URL
                      </Label>
                      <div className="relative">
                        <Input
                          id="image"
                          name="image"
                          value={formData.image}
                          onChange={handleInputChange}
                          className="border-slate-200 pl-8"
                          placeholder="/images/blog/your-image.jpg"
                        />
                        <ImageIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                      </div>
                      <p className="text-xs text-slate-500">
                        Path to the image file or URL. Leave blank if no featured image.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <EditableList
                        items={formData.tags}
                        onChange={handleTagsChange}
                        label="Tags"
                        placeholder="Add a tag and press Enter..."
                      />
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 rounded border-slate-300 text-slate-600 focus:ring-slate-500"
                      />
                      <Label htmlFor="featured" className="text-sm font-medium">
                        Featured Post (appears in highlights)
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="content" className="text-sm font-medium">
                        Content
                      </Label>
                      <RichTextEditor value={formData.content} onChange={handleContentChange} minHeight="400px" />
                      <p className="text-xs text-slate-500">
                        Use the editor to format your content with headings, lists, and other elements.
                      </p>
                    </div>
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
                        Save Blog
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
              Are you sure you want to delete this blog post? This action cannot be undone.
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
