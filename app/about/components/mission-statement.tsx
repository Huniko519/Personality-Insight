"use client"

import { memo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const MissionStatementSection = memo(() => (
  <div className="bg-rose-600 text-white rounded-xl shadow-lg p-8 mb-16">
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
      <p className="text-xl max-w-3xl mx-auto mb-8">
        "At PersonaIQ, our mission is to help people understand themselves and others better through
        the lens of personality type. We believe that self-awareness is the foundation of personal growth,
        effective communication, and meaningful relationships."
      </p>
      <div className="flex justify-center">
        <Link href="/quiz">
          <Button className="bg-white text-rose-600 hover:bg-rose-100 text-lg px-8 py-6">
            Discover Your Type
          </Button>
        </Link>
      </div>
    </div>
  </div>
))

MissionStatementSection.displayName = 'MissionStatementSection'

export { MissionStatementSection }
