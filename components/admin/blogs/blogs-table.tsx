"use client"

import { memo, useCallback } from "react"
import { Edit, Trash, Calendar, Clock, User, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

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

interface BlogsTableProps {
  blogs: Blog[]
  onEdit: (blog: Blog) => void
  onDelete: (blogId: string) => void
}

// Memoized blog row component
const BlogRow = memo<{
  blog: Blog
  onEdit: (blog: Blog) => void
  onDelete: (blogId: string) => void
}>(({ blog, onEdit, onDelete }) => {
  const handleEdit = useCallback(() => onEdit(blog), [blog, onEdit])
  const handleDelete = useCallback(() => onDelete(blog.id), [blog.id, onDelete])

  return (
    <TableRow key={blog.id}>
      <TableCell className="font-medium">{blog.title}</TableCell>
      <TableCell>{blog.author}</TableCell>
      <TableCell>{blog.category}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {blog.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {blog.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{blog.tags.length - 3}
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="h-3 w-3" />
          {blog.date}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-3 w-3" />
          {blog.readTime}
        </div>
      </TableCell>
      <TableCell>
        {blog.featured ? (
          <Badge variant="default" className="bg-rose-500">
            Featured
          </Badge>
        ) : (
          <Badge variant="outline">Regular</Badge>
        )}
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handleEdit}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={handleDelete}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
})

BlogRow.displayName = 'BlogRow'

export const BlogsTable = memo<BlogsTableProps>(({ blogs, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Tags</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Read Time</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {blogs.map((blog) => (
          <BlogRow
            key={blog.id}
            blog={blog}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  )
})

BlogsTable.displayName = 'BlogsTable'
