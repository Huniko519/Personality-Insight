"use client"

import { memo } from "react"
import { Users, Award, Briefcase, BookOpen } from "lucide-react"

const achievements = [
  { icon: Users, number: "2M+", label: "Users Worldwide" },
  { icon: Award, number: "16", label: "Personality Types" },
  { icon: Briefcase, number: "500+", label: "Career Paths Analyzed" },
  { icon: BookOpen, number: "100+", label: "Research Articles" },
]

// Memoized achievement card component
const AchievementCard = memo<{
  achievement: {
    icon: React.ComponentType<{ className?: string }>
    number: string
    label: string
  }
}>(({ achievement }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <achievement.icon className="h-12 w-12 text-rose-600 mx-auto mb-4" />
    <div className="text-3xl font-bold text-rose-800 mb-2">{achievement.number}</div>
    <div className="text-rose-600">{achievement.label}</div>
  </div>
))

AchievementCard.displayName = 'AchievementCard'

const AchievementsSection = memo(() => (
  <div className="mb-16">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-rose-800 mb-2">Our Impact</h2>
      <div className="w-24 h-1 bg-rose-500 mx-auto mb-4"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
      {achievements.map((achievement, index) => (
        <AchievementCard key={index} achievement={achievement} />
      ))}
    </div>
  </div>
))

AchievementsSection.displayName = 'AchievementsSection'

export { AchievementsSection }
