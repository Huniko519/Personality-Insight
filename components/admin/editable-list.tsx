"use client"

import type React from "react"
import { useState, memo, useCallback } from "react"
import { Plus, X, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface EditableListProps {
  items: string[]
  onChange: (items: string[]) => void
  label?: string
  placeholder?: string
}

// Memoized add item form component
const AddItemForm = memo<{
  newItem: string
  onNewItemChange: (value: string) => void
  onAddItem: () => void
  placeholder?: string
}>(({ newItem, onNewItemChange, onAddItem, placeholder }) => {
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onAddItem()
    }
  }, [onAddItem])

  return (
    <div className="flex gap-2 mb-2">
      <Input
        value={newItem}
        onChange={(e) => onNewItemChange(e.target.value)}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        className="flex-1"
      />
      <Button type="button" onClick={onAddItem}>
        <Plus className="h-4 w-4 mr-1" />
        Add
      </Button>
    </div>
  )
})

AddItemForm.displayName = 'AddItemForm'

// Memoized item actions component
const ItemActions = memo<{
  index: number
  totalItems: number
  onMoveUp: () => void
  onMoveDown: () => void
  onRemove: () => void
}>(({ index, totalItems, onMoveUp, onMoveDown, onRemove }) => (
  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onMoveUp}
      disabled={index === 0}
      className="h-7 w-7 p-0"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onMoveDown}
      disabled={index === totalItems - 1}
      className="h-7 w-7 p-0"
    >
      <ArrowDown className="h-4 w-4" />
    </Button>
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onRemove}
      className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
    >
      <X className="h-4 w-4" />
    </Button>
  </div>
))

ItemActions.displayName = 'ItemActions'

// Memoized list item component
const ListItem = memo<{
  item: string
  index: number
  totalItems: number
  onMoveUp: () => void
  onMoveDown: () => void
  onRemove: () => void
}>(({ item, index, totalItems, onMoveUp, onMoveDown, onRemove }) => (
  <li className="flex items-center justify-between group">
    <Badge className="px-3 py-1.5 bg-white text-slate-800 border hover:bg-white">
      {item}
    </Badge>
    <ItemActions
      index={index}
      totalItems={totalItems}
      onMoveUp={onMoveUp}
      onMoveDown={onMoveDown}
      onRemove={onRemove}
    />
  </li>
))

ListItem.displayName = 'ListItem'

// Memoized items list component
const ItemsList = memo<{
  items: string[]
  onMoveItem: (index: number, direction: "up" | "down") => void
  onRemoveItem: (index: number) => void
}>(({ items, onMoveItem, onRemoveItem }) => {
  if (items.length === 0) return null

  return (
    <div className="border rounded-md bg-slate-50">
      <ul className="space-y-2">
        {items.map((item, index) => (
          <ListItem
            key={`${item}-${index}`}
            item={item}
            index={index}
            totalItems={items.length}
            onMoveUp={() => onMoveItem(index, "up")}
            onMoveDown={() => onMoveItem(index, "down")}
            onRemove={() => onRemoveItem(index)}
          />
        ))}
      </ul>
    </div>
  )
})

ItemsList.displayName = 'ItemsList'

export function EditableList({ items = [], onChange, label, placeholder = "Add item..." }: EditableListProps) {
  const [newItem, setNewItem] = useState("")

  const handleAddItem = useCallback(() => {
    if (newItem.trim()) {
      const updatedItems = [...items, newItem.trim()]
      onChange(updatedItems)
      setNewItem("")
    }
  }, [newItem, items, onChange])

  const handleRemoveItem = useCallback((index: number) => {
    const updatedItems = [...items]
    updatedItems.splice(index, 1)
    onChange(updatedItems)
  }, [items, onChange])

  const handleMoveItem = useCallback((index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === items.length - 1)) {
      return
    }

    const newIndex = direction === "up" ? index - 1 : index + 1
    const updatedItems = [...items]
    const temp = updatedItems[index]
    updatedItems[index] = updatedItems[newIndex]
    updatedItems[newIndex] = temp
    onChange(updatedItems)
  }, [items, onChange])

  const handleNewItemChange = useCallback((value: string) => {
    setNewItem(value)
  }, [])

  return (
    <div>
      {label && <Label>{label}</Label>}

      <AddItemForm
        newItem={newItem}
        onNewItemChange={handleNewItemChange}
        onAddItem={handleAddItem}
        placeholder={placeholder}
      />

      <ItemsList
        items={items}
        onMoveItem={handleMoveItem}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  )
}
