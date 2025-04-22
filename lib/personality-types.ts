import intj from "@/data/personality-types/intj.json"
import intp from "@/data/personality-types/intp.json"
import entj from "@/data/personality-types/entj.json"
import entp from "@/data/personality-types/entp.json"
import infj from "@/data/personality-types/infj.json"
import infp from "@/data/personality-types/infp.json"
import enfj from "@/data/personality-types/enfj.json"
import enfp from "@/data/personality-types/enfp.json"
import istj from "@/data/personality-types/istj.json"
import isfj from "@/data/personality-types/isfj.json"
import estj from "@/data/personality-types/estj.json"
import esfj from "@/data/personality-types/esfj.json"
import istp from "@/data/personality-types/istp.json"
import isfp from "@/data/personality-types/isfp.json"
import estp from "@/data/personality-types/estp.json"
import esfp from "@/data/personality-types/esfp.json"

export interface PersonalityType {
  name: string
  nickname: string
  shortDescription: string
  description: string
  portraitDescription?: string
  poeticDescription?: string
  detailedDescription?: string
  stressResponse?: string
  naturalAbilities?: string
  careerTraits?: string[]
  careerEnvironment?: string
  traits: string[]
  values: string[]
  strengths: string[]
  weaknesses: string[]
  careers: string[]
  careerStrengths?: string[]
  careerChallenges?: string[]
  famousPeople: string[]
  compatibility: {
    best: string[]
    good: string[]
  }
  relationships: {
    communication: string
    asFriends: string
    asPartners: string
  }
  relationshipStrengths?: string[]
  relationshipWeaknesses?: string[]
  asParents?: string
  personalGrowth?: {
    meaningOfSuccess: string
    strengths: string[]
    problemAreas: string[]
    solutions: string[]
    rulesForSuccess: string[]
  }
  cognitiveFunctions: {
    name: string
    description: string
  }[]
}

export const personalityTypes: Record<string, PersonalityType> = {
  INTJ: intj,
  INTP: intp,
  ENTJ: entj,
  ENTP: entp,
  INFJ: infj,
  INFP: infp,
  ENFJ: enfj,
  ENFP: enfp,
  ISTJ: istj,
  ISFJ: isfj,
  ESTJ: estj,
  ESFJ: esfj,
  ISTP: istp,
  ISFP: isfp,
  ESTP: estp,
  ESFP: esfp,
}

export const getPersonalityTypeByCode = (code: string): PersonalityType | undefined => {
  return personalityTypes[code.toUpperCase()]
}

export const getAllPersonalityTypes = (): (PersonalityType & { code: string })[] => {
  return Object.entries(personalityTypes).map(([code, type]) => ({
    code,
    ...type,
  }))
}
