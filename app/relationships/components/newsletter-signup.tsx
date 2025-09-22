"use client"

import { memo } from "react"

const NewsletterSignup = memo(() => (
  <div className="bg-gradient-to-r from-rose-600 to-rose-700 rounded-xl p-8 shadow-md text-white">
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="mb-6 md:mb-0 md:mr-6">
        <h2 className="text-2xl font-bold mb-3">Get Relationship Insights</h2>
        <p className="max-w-md">
          Subscribe to our newsletter for tips, case studies, and the latest research on personality types in
          relationships.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="Your email address"
          className="px-4 py-3 rounded-lg focus:outline-none text-gray-800 min-w-[250px]"
        />
        <button className="bg-white text-rose-600 hover:bg-rose-100 font-medium py-3 px-6 rounded-lg shadow-md transition-colors whitespace-nowrap">
          Subscribe
        </button>
      </div>
    </div>
  </div>
))

NewsletterSignup.displayName = 'NewsletterSignup'

export { NewsletterSignup }
