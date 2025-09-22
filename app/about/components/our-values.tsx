"use client"

import { memo } from "react"
import { Brain, Users, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const OurValuesSection = memo(() => (
  <div className="mb-16">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-rose-800 mb-2">Our Values</h2>
      <div className="w-24 h-1 bg-rose-500 mx-auto mb-4"></div>
      <p className="text-rose-700 max-w-3xl mx-auto">
        These core principles guide everything we do at PersonaIQ
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card className="border-rose-200 shadow-md">
        <CardHeader className="pb-2">
          <Brain className="h-8 w-8 text-rose-600 mb-2" />
          <CardTitle className="text-rose-800">Scientific Integrity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-rose-700">
            We're committed to accuracy, transparency about the strengths and limitations of personality
            assessments, and staying current with psychological research.
          </p>
        </CardContent>
      </Card>

      <Card className="border-rose-200 shadow-md">
        <CardHeader className="pb-2">
          <Users className="h-8 w-8 text-rose-600 mb-2" />
          <CardTitle className="text-rose-800">Empowering Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-rose-700">
            We believe personality insights should expand possibilities, not limit them. Our goal is to help
            people leverage their strengths while developing in all areas.
          </p>
        </CardContent>
      </Card>

      <Card className="border-rose-200 shadow-md">
        <CardHeader className="pb-2">
          <Globe className="h-8 w-8 text-rose-600 mb-2" />
          <CardTitle className="text-rose-800">Celebrating Diversity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-rose-700">
            We honor the unique value of all personality types and strive to create inclusive resources that
            respect cultural differences in personality expression.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
))

OurValuesSection.displayName = 'OurValuesSection'

export { OurValuesSection }
