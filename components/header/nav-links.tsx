"use client"

import { memo } from 'react'
import Link from 'next/link'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

const NavLink = memo<NavLinkProps>(({ href, children, className = "" }) => (
  <Link
    href={href}
    className={`text-rose-700 py-2 px-3 rounded-md hover:bg-rose-50 transition-colors duration-200 ${className}`}
  >
    {children}
  </Link>
))

NavLink.displayName = 'NavLink'

interface NavLinksProps {
  onLinkClick?: () => void
}

export const NavLinks = memo<NavLinksProps>(({ onLinkClick }) => (
  <>
    <NavLink href="/" onClick={onLinkClick}>Home</NavLink>
    <NavLink href="/quiz" onClick={onLinkClick}>Take the Test</NavLink>
  </>
))

NavLinks.displayName = 'NavLinks'
