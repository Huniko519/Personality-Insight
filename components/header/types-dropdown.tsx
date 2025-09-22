"use client"

import { memo, useState, useCallback } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface TypesDropdownProps {
  isOpen: boolean
  onToggle: () => void
  onLinkClick?: () => void
}

export const TypesDropdown = memo<TypesDropdownProps>(({ 
  isOpen, 
  onToggle, 
  onLinkClick 
}) => {
  const handleLinkClick = useCallback(() => {
    onToggle()
    onLinkClick?.()
  }, [onToggle, onLinkClick])

  return (
    <div className="relative group types-dropdown-container">
      <button
        className="text-rose-700 py-2 px-3 rounded-md flex items-center hover:bg-rose-50 transition-colors duration-200"
        onClick={onToggle}
      >
        Personality Types
        <ChevronDown className="ml-1 w-4 h-4" />
      </button>

      <div
        className={`absolute top-full left-0 bg-white rounded-md shadow-lg p-2 transition-all duration-200 w-64 origin-top-right z-50
          ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
      >
        <div className="grid grid-cols-2 gap-1">
          <Link
            href="/types/overview"
            className="px-3 py-2 hover:bg-rose-50 rounded-md text-sm"
            onClick={handleLinkClick}
          >
            Overview
          </Link>
          <Link
            href="/types"
            className="px-3 py-2 hover:bg-rose-50 rounded-md text-sm"
            onClick={handleLinkClick}
          >
            All Types
          </Link>
          <Link
            href="/types/intj"
            className="px-3 py-2 hover:bg-rose-50 rounded-md text-sm"
            onClick={handleLinkClick}
          >
            INTJ
          </Link>
          <Link
            href="/types/infj"
            className="px-3 py-2 hover:bg-rose-50 rounded-md text-sm"
            onClick={handleLinkClick}
          >
            INFJ
          </Link>
          <Link
            href="/types/entj"
            className="px-3 py-2 hover:bg-rose-50 rounded-md text-sm"
            onClick={handleLinkClick}
          >
            ENTJ
          </Link>
          <Link
            href="/types/enfj"
            className="px-3 py-2 hover:bg-rose-50 rounded-md text-sm"
            onClick={handleLinkClick}
          >
            ENFJ
          </Link>
          <Link
            href="/types/intp"
            className="px-3 py-2 hover:bg-rose-50 rounded-md text-sm"
            onClick={handleLinkClick}
          >
            INTP
          </Link>
          <Link
            href="/types/infp"
            className="px-3 py-2 hover:bg-rose-50 rounded-md text-sm"
            onClick={handleLinkClick}
          >
            INFP
          </Link>
          <Link
            href="/types/entp"
            className="px-3 py-2 hover:bg-rose-50 rounded-md text-sm"
            onClick={handleLinkClick}
          >
            ENTP
          </Link>
          <Link
            href="/types/enfp"
            className="px-3 py-2 hover:bg-rose-50 rounded-md text-sm"
            onClick={handleLinkClick}
          >
            ENFP
          </Link>
        </div>
      </div>
    </div>
  )
})

TypesDropdown.displayName = 'TypesDropdown'
