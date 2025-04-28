"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      // Here you would implement the actual newsletter subscription logic
      // For example, calling an API endpoint

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setMessage("Thank you for subscribing!")
      setEmail("")
    } catch (error) {
      setMessage("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-grow px-4 py-2 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
      />
      <Button type="submit" className="bg-rose-600 hover:bg-rose-700" disabled={isSubmitting}>
        {isSubmitting ? "Subscribing..." : "Subscribe"}
      </Button>
      {message && <p className="text-center mt-2 text-sm text-rose-600">{message}</p>}
    </form>
  )
}
