"use client"

import { memo } from "react"
import { Mail, Phone, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const ContactInfo = memo(() => (
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
))

ContactInfo.displayName = 'ContactInfo'

export { ContactInfo }
