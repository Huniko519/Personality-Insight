"use client"

import { useState } from "react"

// Simple toast interface
interface Toast {
  id: string
  title: string
  description?: string
  variant?: "default" | "destructive"
}

// Toast hook return type
interface UseToastReturn {
  toast: (props: Omit<Toast, "id">) => void
  dismissToast: (id: string) => void
  toasts: Toast[]
}

// Create a simple toast hook
export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ title, description, variant = "default" }: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, title, description, variant }])

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      dismissToast(id)
    }, 5000)
  }

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return {
    toast,
    dismissToast,
    toasts,
  }
}

// Create a mock toast function for server-side rendering
export const mockToast = {
  toast: (props: Omit<Toast, "id">) => {
    console.log("Toast:", props)
  },
  dismissToast: (id: string) => {
    console.log("Dismiss toast:", id)
  },
  toasts: [],
}
