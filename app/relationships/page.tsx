import { Suspense } from "react"
import HeaderWrapper from "@/components/header-wrapper"
import Footer from "@/components/footer"
import { RelationshipsHeroSection } from "./components/hero-section"
import { IntroductionSection } from "./components/introduction-section"
import { RelationshipTypesSection } from "./components/relationship-types"
import { CaseStudiesSection } from "./components/case-studies"
import { CompatibilityCTA } from "./components/compatibility-cta"
import { NewsletterSignup } from "./components/newsletter-signup"

// Loading component for Suspense boundaries
const SectionLoader = () => (
  <div className="py-16 px-4">
    <div className="max-w-5xl mx-auto">
      <div className="animate-pulse">
        <div className="h-8 bg-rose-200 rounded mb-4"></div>
        <div className="h-4 bg-rose-200 rounded mb-2"></div>
        <div className="h-4 bg-rose-200 rounded w-3/4"></div>
      </div>
    </div>
  </div>
)

export default async function RelationshipsPage() {
  return (
    <>
      <HeaderWrapper />
      <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16 md:py-20">
          <Suspense fallback={<SectionLoader />}>
            <RelationshipsHeroSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <IntroductionSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <RelationshipTypesSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <CaseStudiesSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <CompatibilityCTA />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <NewsletterSignup />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
