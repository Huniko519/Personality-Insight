"use client"

import { memo } from "react"

const ContactHeader = memo(() => (
  <div className="text-center mb-12">
    <h1 className="text-4xl font-bold text-rose-800 mb-4">Contact Us</h1>
    <p className="text-xl text-rose-700 max-w-3xl mx-auto">
      Have questions or feedback? We'd love to hear from you. Reach out to our team using the form below.
    </p>
  </div>
))

ContactHeader.displayName = 'ContactHeader'

export { ContactHeader }
