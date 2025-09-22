"use client"

import { useState, useCallback, memo } from "react"
import { Button } from "@/components/ui/button"

const NewsletterForm = memo(() => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error">("success")

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      // Here you would implement the actual newsletter subscription logic
      // For example, calling an API endpoint

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setMessage("Thank you for subscribing!")
      setMessageType("success")
      setEmail("")
    } catch (error) {
      setMessage("Something went wrong. Please try again.")
      setMessageType("error")
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }, [])

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={handleEmailChange}
        required
        disabled={isSubmitting}
        className="flex-grow px-4 py-2 border border-rose-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <Button 
        type="submit" 
        className="bg-rose-600 hover:bg-rose-700 disabled:opacity-50" 
        disabled={isSubmitting}
      >
        {isSubmitting ? "Subscribing..." : "Subscribe"}
      </Button>
      {message && (
        <p className={`text-center mt-2 text-sm ${messageType === "success" ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </form>
  )
})

NewsletterForm.displayName = 'NewsletterForm'

export default NewsletterForm
