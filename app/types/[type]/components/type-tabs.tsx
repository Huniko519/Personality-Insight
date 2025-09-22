"use client"

import { memo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TypeOverview from "./type-overview"
import TypePortrait from "./type-portrait"
import TypeStrengths from "./type-strengths"
import TypeWeaknesses from "./type-weaknesses"
import TypeCareers from "./type-careers"
import TypeRelationships from "./type-relationships"
import TypeGrowth from "./type-growth"
import TypeFunctions from "./type-functions"

interface TypeTabsProps {
  typeCode: string
  personalityType: any
}

const TypeTabs = memo(({ typeCode, personalityType }: TypeTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="mb-12">
      <TabsList className="grid grid-cols-8 mb-8">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="portrait">Portrait</TabsTrigger>
        <TabsTrigger value="strengths">Strengths</TabsTrigger>
        <TabsTrigger value="weaknesses">Challenges</TabsTrigger>
        <TabsTrigger value="careers">Careers</TabsTrigger>
        <TabsTrigger value="relationships">Relationships</TabsTrigger>
        <TabsTrigger value="growth">Growth</TabsTrigger>
        <TabsTrigger value="functions">Functions</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <TypeOverview personalityType={personalityType} />
      </TabsContent>
      
      <TabsContent value="portrait">
        <TypePortrait typeCode={typeCode} personalityType={personalityType} />
      </TabsContent>
      
      <TabsContent value="strengths">
        <TypeStrengths strengths={personalityType.strengths} />
      </TabsContent>
      
      <TabsContent value="weaknesses">
        <TypeWeaknesses weaknesses={personalityType.weaknesses} />
      </TabsContent>
      
      <TabsContent value="careers">
        <TypeCareers personalityType={personalityType} />
      </TabsContent>
      
      <TabsContent value="relationships">
        <TypeRelationships typeCode={typeCode} personalityType={personalityType} />
      </TabsContent>
      
      <TabsContent value="growth">
        <TypeGrowth typeCode={typeCode} personalityType={personalityType} />
      </TabsContent>
      
      <TabsContent value="functions">
        <TypeFunctions cognitiveFunctions={personalityType.cognitiveFunctions} />
      </TabsContent>
    </Tabs>
  )
})

TypeTabs.displayName = "TypeTabs"

export default TypeTabs



