"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, Search } from "lucide-react"
import Image from "next/image"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isTypesDropdownOpen, setIsTypesDropdownOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".types-dropdown-container") && isTypesDropdownOpen) {
        setIsTypesDropdownOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isTypesDropdownOpen])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-2" : "bg-white shadow py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo.png"
              alt="PersonaIQ Logo"
              width={150}
              height={40}
              className="transition-transform group-hover:scale-105 duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/quiz">Take the Test</NavLink>

            <div className="relative group types-dropdown-container">
              <button
                className="text-rose-700 py-2 px-3 rounded-md flex items-center hover:bg-rose-50 transition-colors duration-200"
                onClick={() => setIsTypesDropdownOpen(!isTypesDropdownOpen)}
              >
                Personality Types
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>

              {/* Types Dropdown */}
              <div
                className={`absolute top-full left-0 bg-white rounded-md shadow-lg p-2 transition-all duration-200 w-64 origin-top-right z-50
                  ${isTypesDropdownOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
              >
                <div className="grid grid-cols-2 gap-1">
                  <Link
                    href="/types/overview"
                    className="px-3 py-2 hover:bg-rose-50 rounded-md text-sm"
                    onClick={() => setIsTypesDropdownOpen(false)}
                  >
                    Overview
                  </Link>
                  <Link
                    href="/types"
                    className="px-3 py-2 hover:bg-rose-50 rounded-md text-sm"
                    onClick={() => setIsTypesDropdownOpen(false)}
                  >
                    All Types
                  </Link>
                  <Link
                    href="/types/intj"
                    className="px-3 py-2 hover:bg-rose-50 rounded-md text-sm"
                    onClick={() => setIsTypesDropdownOpen(false)}
                  >
                    Analysts
                  </Link>
                  <Link
                    href="/types/infj"
                    className="px-3 py-2 hover:bg-rose-50 rounded-md text-sm"
                    onClick={() => setIsTypesDropdownOpen(false)}
                  >
                    Diplomats
                  </Link>
                  <Link
                    href="/types/istj"
                    className="px-3 py-2 hover:bg-rose-50 rounded-md text-sm"
                    onClick={() => setIsTypesDropdownOpen(false)}
                  >
                    Sentinels
                  </Link>
                  <Link
                    href="/types/istp"
                    className="px-3 py-2 hover:bg-rose-50 rounded-md text-sm"
                    onClick={() => setIsTypesDropdownOpen(false)}
                  >
                    Explorers
                  </Link>
                </div>
              </div>
            </div>

            <NavLink href="/about">About</NavLink>
            <NavLink href="/blog">Blog</NavLink>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="relative group">
              <button className="w-8 h-8 flex items-center justify-center text-rose-600 hover:text-rose-800 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <div className="absolute right-0 top-full scale-0 opacity-0 origin-top-right group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 bg-white shadow-lg rounded-md p-2 w-64">
                <div className="flex rounded-md overflow-hidden border border-rose-200 focus-within:ring-1 focus-within:ring-rose-500">
                  <input
                    type="text"
                    placeholder="Search personality types..."
                    className="w-full p-2 text-sm outline-none"
                  />
                  <button className="bg-rose-100 px-2 text-rose-700 hover:bg-rose-200 transition-colors">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <Link href="/quiz">
              <Button className="bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5">
                Start Test
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link href="/quiz" className="mr-2">
              <Button size="sm" className="bg-rose-600 hover:bg-rose-700">
                Take Test
              </Button>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-rose-50 text-rose-700"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col space-y-1">
            <MobileNavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/quiz" onClick={() => setIsMobileMenuOpen(false)}>
              Take the Test
            </MobileNavLink>
            <MobileNavLink href="/types" onClick={() => setIsMobileMenuOpen(false)}>
              Personality Types
            </MobileNavLink>
            <MobileNavLink href="/types/overview" onClick={() => setIsMobileMenuOpen(false)}>
              Type Overview
            </MobileNavLink>
            <MobileNavLink href="/about" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </MobileNavLink>
            <MobileNavLink href="/blog" onClick={() => setIsMobileMenuOpen(false)}>
              Blog
            </MobileNavLink>
          </nav>

          <div className="mt-4 pt-4 border-t border-rose-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Search personality types..."
                className="w-full p-2 text-sm rounded-md border border-rose-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-rose-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-rose-700 py-2 px-3 rounded-md hover:bg-rose-50 transition-colors duration-200">
      {children}
    </Link>
  )
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center p-3 rounded-md text-rose-700 hover:bg-rose-50 transition-colors"
    >
      {children}
    </Link>
  )
}
