"use client"

import { memo } from "react"
import Image from "next/image"

const OurStorySection = memo(() => (
  <div className="mb-16">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-rose-800 mb-2">Our Story</h2>
      <div className="w-24 h-1 bg-rose-500 mx-auto"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <p className="text-rose-700 mb-4">
          PersonaIQ was founded in 2020 by a team of psychologists, data scientists, and designers
          passionate about making personality psychology accessible and practical for everyone.
        </p>
        <p className="text-rose-700 mb-4">
          Our journey began when we noticed how transformative personality insights could be in people's lives -
          from making better career choices to improving relationships and fostering personal growth.
        </p>
        <p className="text-rose-700">
          What started as a simple personality assessment has grown into a comprehensive platform offering
          personalized insights, career guidance, relationship compatibility analysis, and educational resources
          about personality psychology.
        </p>
      </div>
      <div className="rounded-xl overflow-hidden">
        <Image src="/logo.png" width={500} height={500} alt="Our team" className="w-full h-auto" />
      </div>
    </div>
  </div>
))

OurStorySection.displayName = 'OurStorySection'

export { OurStorySection }
