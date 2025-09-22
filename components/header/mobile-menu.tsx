"use client"

import { memo, useCallback } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NavLinks } from './nav-links'
import { TypesDropdown } from './types-dropdown'
import { AuthButtons } from '@/components/auth/auth-buttons'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  isTypesDropdownOpen: boolean
  onTypesDropdownToggle: () => void
  user?: any
  loading?: boolean
}

export const MobileMenu = memo<MobileMenuProps>(({
  isOpen,
  onClose,
  isTypesDropdownOpen,
  onTypesDropdownToggle,
  user,
  loading
}) => {
  const handleLinkClick = useCallback(() => {
    onClose()
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-rose-800">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-rose-50 rounded-md transition-colors"
          >
            <X className="h-6 w-6 text-rose-700" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Navigation Links */}
          <div className="space-y-4">
            <NavLinks onLinkClick={handleLinkClick} />
            
            {/* Types Dropdown */}
            <div className="border-t pt-4">
              <TypesDropdown
                isOpen={isTypesDropdownOpen}
                onToggle={onTypesDropdownToggle}
                onLinkClick={handleLinkClick}
              />
            </div>
          </div>

          {/* Additional Links */}
          <div className="space-y-2 border-t pt-4">
            <Link
              href="/about"
              className="block text-rose-700 py-2 px-3 rounded-md hover:bg-rose-50 transition-colors"
              onClick={handleLinkClick}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-rose-700 py-2 px-3 rounded-md hover:bg-rose-50 transition-colors"
              onClick={handleLinkClick}
            >
              Contact
            </Link>
            <Link
              href="/faq"
              className="block text-rose-700 py-2 px-3 rounded-md hover:bg-rose-50 transition-colors"
              onClick={handleLinkClick}
            >
              FAQ
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="border-t pt-4">
            <AuthButtons user={user} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  )
})

MobileMenu.displayName = 'MobileMenu'
