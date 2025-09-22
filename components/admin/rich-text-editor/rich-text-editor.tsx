"use client"

import { useState, useEffect, useRef, memo, useCallback } from "react"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  label?: string
  minHeight?: string
  maxHeight?: string
}

// Memoized toolbar button component
const ToolbarButton = memo<{
  icon: React.ReactNode
  onClick: () => void
  title: string
  disabled?: boolean
}>(({ icon, onClick, title, disabled }) => (
  <Button
    type="button"
    variant="ghost"
    size="sm"
    onClick={onClick}
    disabled={disabled}
    className="h-8 w-8 p-0"
    title={title}
  >
    {icon}
  </Button>
))

ToolbarButton.displayName = 'ToolbarButton'

// Memoized toolbar separator component
const ToolbarSeparator = memo(() => (
  <div className="w-px h-8 bg-slate-300 mx-1"></div>
))

ToolbarSeparator.displayName = 'ToolbarSeparator'

// Memoized text formatting toolbar component
const TextFormattingToolbar = memo<{
  onExecCommand: (command: string, value?: string) => void
}>(({ onExecCommand }) => (
  <>
    <ToolbarButton
      icon={<Bold className="h-4 w-4" />}
      onClick={() => onExecCommand("bold")}
      title="Bold"
    />
    <ToolbarButton
      icon={<Italic className="h-4 w-4" />}
      onClick={() => onExecCommand("italic")}
      title="Italic"
    />
    <ToolbarSeparator />
  </>
))

TextFormattingToolbar.displayName = 'TextFormattingToolbar'

// Memoized heading toolbar component
const HeadingToolbar = memo<{
  onExecCommand: (command: string, value?: string) => void
}>(({ onExecCommand }) => (
  <>
    <ToolbarButton
      icon={<Heading1 className="h-4 w-4" />}
      onClick={() => onExecCommand("formatBlock", "<h1>")}
      title="Heading 1"
    />
    <ToolbarButton
      icon={<Heading2 className="h-4 w-4" />}
      onClick={() => onExecCommand("formatBlock", "<h2>")}
      title="Heading 2"
    />
    <ToolbarButton
      icon={<Heading3 className="h-4 w-4" />}
      onClick={() => onExecCommand("formatBlock", "<h3>")}
      title="Heading 3"
    />
    <ToolbarSeparator />
  </>
))

HeadingToolbar.displayName = 'HeadingToolbar'

// Memoized list toolbar component
const ListToolbar = memo<{
  onExecCommand: (command: string, value?: string) => void
}>(({ onExecCommand }) => (
  <>
    <ToolbarButton
      icon={<List className="h-4 w-4" />}
      onClick={() => onExecCommand("insertUnorderedList")}
      title="Bullet List"
    />
    <ToolbarButton
      icon={<ListOrdered className="h-4 w-4" />}
      onClick={() => onExecCommand("insertOrderedList")}
      title="Numbered List"
    />
    <ToolbarSeparator />
  </>
))

ListToolbar.displayName = 'ListToolbar'

// Memoized alignment toolbar component
const AlignmentToolbar = memo<{
  onExecCommand: (command: string, value?: string) => void
}>(({ onExecCommand }) => (
  <>
    <ToolbarButton
      icon={<AlignLeft className="h-4 w-4" />}
      onClick={() => onExecCommand("justifyLeft")}
      title="Align Left"
    />
    <ToolbarButton
      icon={<AlignCenter className="h-4 w-4" />}
      onClick={() => onExecCommand("justifyCenter")}
      title="Align Center"
    />
    <ToolbarButton
      icon={<AlignRight className="h-4 w-4" />}
      onClick={() => onExecCommand("justifyRight")}
      title="Align Right"
    />
    <ToolbarSeparator />
  </>
))

AlignmentToolbar.displayName = 'AlignmentToolbar'

// Memoized link toolbar component
const LinkToolbar = memo<{
  onExecCommand: (command: string, value?: string) => void
  onLinkClick: () => void
}>(({ onLinkClick }) => (
  <ToolbarButton
    icon={<Link className="h-4 w-4" />}
    onClick={onLinkClick}
    title="Insert Link"
  />
))

LinkToolbar.displayName = 'LinkToolbar'

// Memoized history toolbar component
const HistoryToolbar = memo<{
  onExecCommand: (command: string, value?: string) => void
}>(({ onExecCommand }) => (
  <>
    <ToolbarButton
      icon={<Undo className="h-4 w-4" />}
      onClick={() => onExecCommand("undo")}
      title="Undo"
    />
    <ToolbarButton
      icon={<Redo className="h-4 w-4" />}
      onClick={() => onExecCommand("redo")}
      title="Redo"
    />
  </>
))

HistoryToolbar.displayName = 'HistoryToolbar'

// Memoized toolbar component
const EditorToolbar = memo<{
  onExecCommand: (command: string, value?: string) => void
  onLinkClick: () => void
}>(({ onExecCommand, onLinkClick }) => (
  <div className="bg-slate-100 p-2 border-b flex flex-wrap gap-1">
    <TextFormattingToolbar onExecCommand={onExecCommand} />
    <HeadingToolbar onExecCommand={onExecCommand} />
    <ListToolbar onExecCommand={onExecCommand} />
    <AlignmentToolbar onExecCommand={onExecCommand} />
    <LinkToolbar onExecCommand={onExecCommand} onLinkClick={onLinkClick} />
    <HistoryToolbar onExecCommand={onExecCommand} />
  </div>
))

EditorToolbar.displayName = 'EditorToolbar'

// Memoized editor content component
const EditorContent = memo<{
  editorRef: React.RefObject<HTMLDivElement>
  minHeight: string
  maxHeight: string
  onContentChange: () => void
}>(({ editorRef, minHeight, maxHeight, onContentChange }) => (
  <div
    ref={editorRef}
    contentEditable
    onInput={onContentChange}
    onBlur={onContentChange}
    className="p-3 outline-none min-h-[200px] max-h-[500px] overflow-y-auto"
    style={{ minHeight, maxHeight }}
    suppressContentEditableWarning
  />
))

EditorContent.displayName = 'EditorContent'

export function RichTextEditor({
  value,
  onChange,
  label,
  minHeight = "200px",
  maxHeight = "500px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [html, setHtml] = useState(value)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const handleContentChange = useCallback(() => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML
      setHtml(newContent)
      onChange(newContent)
    }
  }, [onChange])

  const execCommand = useCallback((command: string, value = "") => {
    document.execCommand(command, false, value)
    handleContentChange()
    editorRef.current?.focus()
  }, [handleContentChange])

  const handleLinkClick = useCallback(() => {
    const url = prompt("Enter URL:", "https://")
    if (url) {
      execCommand("createLink", url)
    }
  }, [execCommand])

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}

      <div className="border rounded-md overflow-hidden">
        <EditorToolbar onExecCommand={execCommand} onLinkClick={handleLinkClick} />
        <EditorContent
          editorRef={editorRef}
          minHeight={minHeight}
          maxHeight={maxHeight}
          onContentChange={handleContentChange}
        />
      </div>
    </div>
  )
}
