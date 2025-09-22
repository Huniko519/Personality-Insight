"use client"

import { memo, useCallback } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'

interface TypeSelectorProps {
  selectedType1: string
  selectedType2: string
  onType1Change: (type: string) => void
  onType2Change: (type: string) => void
  personalityTypes: Record<string, any>
  isLoading?: boolean
}

const PERSONALITY_TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP'
]

export const TypeSelector = memo<TypeSelectorProps>(({
  selectedType1,
  selectedType2,
  onType1Change,
  onType2Change,
  personalityTypes,
  isLoading = false
}) => {
  const handleType1Change = useCallback((value: string) => {
    onType1Change(value)
  }, [onType1Change])

  const handleType2Change = useCallback((value: string) => {
    onType2Change(value)
  }, [onType2Change])

  return (
    <Card className="bg-white shadow-md">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Type 1 Selector */}
          <div>
            <label className="block text-sm font-medium text-rose-800 mb-2">
              First Personality Type
            </label>
            <Select value={selectedType1} onValueChange={handleType1Change} disabled={isLoading}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select first type" />
              </SelectTrigger>
              <SelectContent>
                {PERSONALITY_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    <div className="flex items-center">
                      <span className="font-medium">{type}</span>
                      {personalityTypes[type] && (
                        <span className="ml-2 text-gray-500 text-sm">
                          - {personalityTypes[type].nickname}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Type 2 Selector */}
          <div>
            <label className="block text-sm font-medium text-rose-800 mb-2">
              Second Personality Type
            </label>
            <Select value={selectedType2} onValueChange={handleType2Change} disabled={isLoading}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select second type" />
              </SelectTrigger>
              <SelectContent>
                {PERSONALITY_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    <div className="flex items-center">
                      <span className="font-medium">{type}</span>
                      {personalityTypes[type] && (
                        <span className="ml-2 text-gray-500 text-sm">
                          - {personalityTypes[type].nickname}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

TypeSelector.displayName = 'TypeSelector'
