"use client"

import { Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ContactHeader } from "./components/contact-header"
import { ContactInfo } from "./components/contact-info"
import { ContactForm } from "./components/contact-form"
import { FAQSection } from "./components/faq-section"

// Loading component for Suspense boundaries
const SectionLoader = () => (
  <div className="py-16 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="animate-pulse">
        <div className="h-8 bg-rose-200 rounded mb-4"></div>
        <div className="h-4 bg-rose-200 rounded mb-2"></div>
        <div className="h-4 bg-rose-200 rounded w-3/4"></div>
      </div>
    </div>
  </div>
)

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Suspense fallback={<SectionLoader />}>
            <ContactHeader />
          </Suspense>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Suspense fallback={<SectionLoader />}>
              <ContactInfo />
            </Suspense>

            <div className="lg:col-span-2">
              <Suspense fallback={<SectionLoader />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>

          <Suspense fallback={<SectionLoader />}>
            <FAQSection />
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  )
}
