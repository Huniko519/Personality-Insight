export interface PersonalityType {
  id: string
  code: string
  name: string
  description: string
  strengths: string[]
  weaknesses: string[]
  cognitiveFunctions: CognitiveFunction[]
  careerSuggestions: string[]
  relationships: RelationshipInfo
  growthAreas: string[]
  famousExamples: string[]
  createdAt?: string
  updatedAt?: string
}

export interface CognitiveFunction {
  function: string
  position: string
  description: string
  examples: string[]
}

export interface RelationshipInfo {
  romantic: string[]
  friendship: string[]
  work: string[]
  family: string[]
}

export interface PersonalityTypesData {
  [key: string]: PersonalityType
}
