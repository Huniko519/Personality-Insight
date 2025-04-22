"use client"

import Link from "next/link"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-rose-800 mb-4">Contact Us</h1>
            <p className="text-xl text-rose-700 max-w-3xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Reach out to our team using the form below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <Card className="border-rose-200 shadow-md h-full">
                <CardHeader>
                  <CardTitle className="text-rose-800">Get in Touch</CardTitle>
                  <CardDescription>Our team is here to help you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-rose-600 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-rose-800">Email Us</h3>
                      <p className="text-rose-700">support@personalityinsight.com</p>
                      <p className="text-sm text-rose-600 mt-1">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-rose-600 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-rose-800">Call Us</h3>
                      <p className="text-rose-700">(555) 123-4567</p>
                      <p className="text-sm text-rose-600 mt-1">Monday-Friday, 9am-5pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-rose-600 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-rose-800">Visit Us</h3>
                      <p className="text-rose-700">123 Personality Lane</p>
                      <p className="text-rose-700">Psychology City, PC 12345</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-rose-100">
                    <h3 className="font-medium text-rose-800 mb-2">Connect With Us</h3>
                    <div className="flex space-x-4">
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 hover:bg-rose-200 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 hover:bg-rose-200 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 hover:bg-rose-200 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 hover:bg-rose-200 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-rose-200 shadow-md">
                <CardHeader>
                  <CardTitle className="text-rose-800">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-rose-800 mb-2">Message Sent Successfully!</h3>
                      <p className="text-rose-700 mb-6">
                        Thank you for reaching out. We've received your message and will respond shortly.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)} className="bg-rose-600 hover:bg-rose-700">
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-rose-700 mb-1">
                            Your Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="border-rose-200"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-rose-700 mb-1">
                            Your Email
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="border-rose-200"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-rose-700 mb-1">
                          Subject
                        </label>
                        <Select value={formData.subject} onValueChange={handleSelectChange} required>
                          <SelectTrigger className="border-rose-200">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-rose-700 mb-1">
                          Your Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="border-rose-200 min-h-[150px]"
                          placeholder="How can we help you?"
                        />
                      </div>

                      <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-rose-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-rose-700 mb-6 max-w-2xl mx-auto">
              Find quick answers to common questions on our FAQ page
            </p>
            <Button variant="outline" className="border-rose-600 text-rose-600 hover:bg-rose-50" asChild>
              <Link href="/faq">View FAQ</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
