"use client"

import { memo } from "react"
import Image from "next/image"

const teamMembers = [
  {
    name: "Niko Hukka",
    role: "Founder & Chief Psychologist",
    image: "/assets/niko-hukka.png",
    type: "INFJ",
  },
  {
    name: "Michael Henry",
    role: "Lead Data Scientist",
    image: "/assets/michel-henry.png",
    type: "INTP",
  },
  {
    name: "Emma Rodriguez",
    role: "UX/UI Designer",
    image: "/assets/emma-rodriguez.png",
    type: "ENFP",
  },
  {
    name: "James Wilson",
    role: "Content Director",
    image: "/assets/james-wilson.png",
    type: "ENTJ",
  },
]

// Memoized team member card component
const TeamMemberCard = memo<{
  member: {
    name: string
    role: string
    image: string
    type: string
  }
}>(({ member }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden pt-2">
    <Image
      src={member.image || "/assets/placeholder.png"}
      alt={member.name}
      width={300}
      height={300}
      className="w-full h-64 object-cover"
    />
    <div className="p-4 text-center">
      <h3 className="text-xl font-semibold text-rose-800">{member.name}</h3>
      <p className="text-rose-600 mb-2">{member.role}</p>
      <div className="inline-block bg-rose-100 px-3 py-1 rounded-full text-rose-700 text-sm">
        {member.type}
      </div>
    </div>
  </div>
))

TeamMemberCard.displayName = 'TeamMemberCard'

const OurTeamSection = memo(() => (
  <div className="mb-16">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-rose-800 mb-2">Our Team</h2>
      <div className="w-24 h-1 bg-rose-500 mx-auto mb-4"></div>
      <p className="text-rose-700 max-w-3xl mx-auto">Meet the passionate experts behind PersonaIQ</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {teamMembers.map((member) => (
        <TeamMemberCard key={member.name} member={member} />
      ))}
    </div>
  </div>
))

OurTeamSection.displayName = 'OurTeamSection'

export { OurTeamSection }
