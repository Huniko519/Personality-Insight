import { Suspense } from "react"
import HeaderWrapper from "@/components/header-wrapper"
import Footer from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import { EntrepreneurSection } from "@/components/home/entrepreneur-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CTASection } from "@/components/home/cta-section"

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

export default function Home() {
  return (
    <>
      <HeaderWrapper />
      <main>
        {/* Hero Section */}
        <Suspense fallback={<SectionLoader />}>
          <HeroSection />
        </Suspense>

        {/* Features Section */}
        <Suspense fallback={<SectionLoader />}>
          <FeaturesSection />
        </Suspense>

        {/* Entrepreneur Section */}
        <Suspense fallback={<SectionLoader />}>
          <EntrepreneurSection />
        </Suspense>

        {/* Testimonials Section */}
        <Suspense fallback={<SectionLoader />}>
          <TestimonialsSection />
        </Suspense>

        {/* CTA Section */}
        <Suspense fallback={<SectionLoader />}>
          <CTASection />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
