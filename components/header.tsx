"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AuthButtons } from "@/components/auth/auth-buttons"
import { NavLinks } from "./header/nav-links"
import { TypesDropdown } from "./header/types-dropdown"
import { MobileMenu } from "./header/mobile-menu"
import { useThrottle } from "@/hooks/use-throttle"

interface HeaderProps {
  user?: any
  loading?: boolean
}

export default function Header({ user, loading }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isTypesDropdownOpen, setIsTypesDropdownOpen] = useState(false)

  // Throttled scroll handler to prevent excessive updates
  const throttledScrollHandler = useThrottle(() => {
    const scrolled = window.scrollY > 10
    setIsScrolled(scrolled)
  }, 100)

  // Memoized header classes to prevent unnecessary re-computations
  const headerClasses = useMemo(() => {
    const baseClasses = "sticky top-0 z-50 w-full transition-all duration-300"
    const scrolledClasses = isScrolled 
      ? "bg-white/95 backdrop-blur-sm shadow-md py-2" 
      : "bg-white shadow py-4"
    return `${baseClasses} ${scrolledClasses}`
  }, [isScrolled])

  // Handle scroll effect with throttling
  useEffect(() => {
    const handleScroll = () => throttledScrollHandler()
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [throttledScrollHandler])

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".types-dropdown-container") && isTypesDropdownOpen) {
        setIsTypesDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isTypesDropdownOpen])

  // Memoized callback functions to prevent unnecessary re-renders
  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  const handleTypesDropdownToggle = useCallback(() => {
    setIsTypesDropdownOpen(prev => !prev)
  }, [])

  const handleMobileMenuClose = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo.png"
              alt="PersonalQ Logo"
              width={150}
              height={40}
              className="transition-transform group-hover:scale-105 duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLinks />
            <TypesDropdown
              isOpen={isTypesDropdownOpen}
              onToggle={handleTypesDropdownToggle}
            />
            
            {/* Additional Desktop Links */}
            <Link
              href="/about"
              className="text-rose-700 py-2 px-3 rounded-md hover:bg-rose-50 transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-rose-700 py-2 px-3 rounded-md hover:bg-rose-50 transition-colors duration-200"
            >
              Contact
            </Link>
            <Link
              href="/faq"
              className="text-rose-700 py-2 px-3 rounded-md hover:bg-rose-50 transition-colors duration-200"
            >
              FAQ
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <AuthButtons user={user} loading={loading} />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-rose-50 rounded-md transition-colors"
            onClick={handleMobileMenuToggle}
            aria-label="Toggle mobile menu"
          >
            <Menu className="h-6 w-6 text-rose-700" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        isTypesDropdownOpen={isTypesDropdownOpen}
        onTypesDropdownToggle={handleTypesDropdownToggle}
        user={user}
        loading={loading}
      />
    </header>
  )
}
