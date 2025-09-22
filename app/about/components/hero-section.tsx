"use client"

import { memo } from "react"
import Image from "next/image"

const AboutHeroSection = memo(() => (
  <div className="relative rounded-2xl overflow-hidden mb-16">
    <div className="absolute inset-0 bg-rose-900 opacity-70"></div>
    <Image
      src="/assets/team-collaboration.jpg"
      width={1200}
      height={400}
      alt="Team collaboration"
      className="w-full h-64 md:h-96 object-cover"
    />
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About PersonaIQ</h1>
      <p className="text-xl text-white max-w-3xl">
        Helping people understand themselves and others through the science of personality
      </p>
    </div>
  </div>
))

AboutHeroSection.displayName = 'AboutHeroSection'

export { AboutHeroSection }
