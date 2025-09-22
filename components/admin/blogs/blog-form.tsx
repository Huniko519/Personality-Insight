"use client"

import { memo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { EditableList } from "../editable-list"
import { RichTextEditor } from "../rich-text-editor"

interface BlogFormData {
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
}

interface BlogFormProps {
  formData: BlogFormData
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onContentChange: (content: string) => void
  onTagsChange: (tags: string[]) => void
  onSave: () => void
  onCancel: () => void
  isSaving: boolean
  isEditing: boolean
}

// Memoized form field component
const FormField = memo<{
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  placeholder?: string
  type?: string
}>(({ label, name, value, onChange, placeholder, type = "text" }) => (
  <div className="space-y-2">
    <Label htmlFor={name}>{label}</Label>
    <Input
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  </div>
))

FormField.displayName = 'FormField'

// Memoized checkbox field component
const CheckboxField = memo<{
  label: string
  name: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}>(({ label, name, checked, onChange }) => (
  <div className="flex items-center space-x-2">
    <Checkbox
      id={name}
      name={name}
      checked={checked}
      onChange={onChange}
    />
    <Label htmlFor={name}>{label}</Label>
  </div>
))

CheckboxField.displayName = 'CheckboxField'

export const BlogForm = memo<BlogFormProps>(({
  formData,
  onInputChange,
  onCheckboxChange,
  onContentChange,
  onTagsChange,
  onSave,
  onCancel,
  isSaving,
  isEditing
}) => {
  const handleSave = useCallback(() => {
    onSave()
  }, [onSave])

  const handleCancel = useCallback(() => {
    onCancel()
  }, [onCancel])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Title"
          name="title"
          value={formData.title}
          onChange={onInputChange}
          placeholder="Enter blog title"
        />
        <FormField
          label="Slug"
          name="slug"
          value={formData.slug}
          onChange={onInputChange}
          placeholder="blog-post-url"
        />
      </div>

      <FormField
        label="Excerpt"
        name="excerpt"
        value={formData.excerpt}
        onChange={onInputChange}
        placeholder="Brief description of the blog post"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          label="Author"
          name="author"
          value={formData.author}
          onChange={onInputChange}
          placeholder="Author name"
        />
        <FormField
          label="Date"
          name="date"
          value={formData.date}
          onChange={onInputChange}
          type="date"
        />
        <FormField
          label="Read Time"
          name="readTime"
          value={formData.readTime}
          onChange={onInputChange}
          placeholder="5 min read"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Category"
          name="category"
          value={formData.category}
          onChange={onInputChange}
          placeholder="Blog category"
        />
        <FormField
          label="Image URL"
          name="image"
          value={formData.image}
          onChange={onInputChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <EditableList
          items={formData.tags}
          onItemsChange={onTagsChange}
          placeholder="Add a tag"
        />
      </div>

      <CheckboxField
        label="Featured Post"
        name="featured"
        checked={formData.featured}
        onChange={onCheckboxChange}
      />

      <div className="space-y-2">
        <Label>Content</Label>
        <RichTextEditor
          value={formData.content}
          onChange={onContentChange}
          placeholder="Write your blog content here..."
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : isEditing ? "Update Blog" : "Create Blog"}
        </Button>
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )
})

BlogForm.displayName = 'BlogForm'
