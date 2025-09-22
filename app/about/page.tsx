import { Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { AboutHeroSection } from "./components/hero-section"
import { OurStorySection } from "./components/our-story"
import { OurApproachSection } from "./components/our-approach"
import { OurValuesSection } from "./components/our-values"
import { OurTeamSection } from "./components/our-team"
import { MissionStatementSection } from "./components/mission-statement"
import { AchievementsSection } from "./components/achievements"
import { CTASection } from "./components/cta-section"

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

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Suspense fallback={<SectionLoader />}>
            <AboutHeroSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <OurStorySection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <OurApproachSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <OurValuesSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <OurTeamSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <MissionStatementSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <AchievementsSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <CTASection />
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  )
}
