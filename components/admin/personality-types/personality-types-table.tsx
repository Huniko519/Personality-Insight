"use client"

import { memo, useCallback } from "react"
import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PersonalityType } from "../types/personality-types"

interface PersonalityTypesTableProps {
  types: PersonalityType[]
  onEdit: (typeCode: string) => void
}

// Memoized type row component
const TypeRow = memo<{
  type: PersonalityType
  onEdit: (typeCode: string) => void
}>(({ type, onEdit }) => {
  const handleEdit = useCallback(() => onEdit(type.code), [type.code, onEdit])

  return (
    <TableRow key={type.code}>
      <TableCell className="font-medium">
        <div>
          <div className="font-semibold">{type.code}</div>
          <div className="text-sm text-gray-500">{type.name}</div>
        </div>
      </TableCell>
      <TableCell>
        <div className="max-w-xs truncate">{type.description}</div>
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {type.strengths.slice(0, 2).map((strength, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {strength}
            </Badge>
          ))}
          {type.strengths.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{type.strengths.length - 2}
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {type.cognitiveFunctions.slice(0, 2).map((func, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {func.function}
            </Badge>
          ))}
          {type.cognitiveFunctions.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{type.cognitiveFunctions.length - 2}
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {type.careerSuggestions.slice(0, 2).map((career, index) => (
            <Badge key={index} variant="default" className="text-xs bg-blue-100 text-blue-800">
              {career}
            </Badge>
          ))}
          {type.careerSuggestions.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{type.careerSuggestions.length - 2}
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Button size="sm" variant="outline" onClick={handleEdit}>
          <Edit className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  )
})

TypeRow.displayName = 'TypeRow'

export const PersonalityTypesTable = memo<PersonalityTypesTableProps>(({ types, onEdit }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Strengths</TableHead>
          <TableHead>Cognitive Functions</TableHead>
          <TableHead>Career Suggestions</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {types.map((type) => (
          <TypeRow
            key={type.code}
            type={type}
            onEdit={onEdit}
          />
        ))}
      </TableBody>
    </Table>
  )
})

PersonalityTypesTable.displayName = 'PersonalityTypesTable'
