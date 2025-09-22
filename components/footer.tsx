import { memo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, Twitter, Instagram, Linkedin } from "lucide-react"

// Memoized footer link component
const FooterLink = memo<{ href: string; children: React.ReactNode }>(({ href, children }) => (
  <li>
    <Link href={href} className="text-rose-100 hover:text-white transition-colors flex items-center">
      <span className="hover:translate-x-1 transition-transform inline-block">{children}</span>
    </Link>
  </li>
))

FooterLink.displayName = 'FooterLink'

// Memoized social media link component
const SocialLink = memo<{ href: string; icon: React.ReactNode; label: string }>(({ href, icon, label }) => (
  <a href={href} className="bg-rose-700/50 hover:bg-rose-600 p-2 rounded-full transition-colors">
    {icon}
    <span className="sr-only">{label}</span>
  </a>
))

SocialLink.displayName = 'SocialLink'

// Memoized footer section component
const FooterSection = memo<{ title: string; children: React.ReactNode }>(({ title, children }) => (
  <div className="space-y-4">
    <h4 className="font-bold text-lg border-b border-rose-700 pb-2 mb-4">{title}</h4>
    <ul className="space-y-3">
      {children}
    </ul>
  </div>
))

FooterSection.displayName = 'FooterSection'

// Memoized newsletter component
const NewsletterSignup = memo(() => (
  <div>
    <h4 className="font-bold text-lg border-b border-rose-700 pb-2 mb-4">Stay Connected</h4>
    <p className="text-rose-100 mb-4">
      Join our community and get the latest updates on personality insights.
    </p>

    <div className="flex space-x-1 mb-6">
      <input
        type="email"
        placeholder="Your email address"
        className="bg-rose-700/30 border border-rose-700 rounded px-2 py-2 text-white placeholder-rose-300 flex-grow focus:outline-none focus:ring-2 focus:ring-rose-500"
      />
      <button className="bg-rose-600 hover:bg-rose-500 transition-colors text-white font-medium px-4 py-2 rounded-r-md">
        Subscribe
      </button>
    </div>
  </div>
))

NewsletterSignup.displayName = 'NewsletterSignup'

// Memoized social media section
const SocialMediaSection = memo(() => (
  <div>
    <h4 className="font-medium mb-3">Follow Us</h4>
    <div className="flex space-x-4">
      <SocialLink href="#" icon={<Twitter size={20} className="text-white" />} label="Twitter" />
      <SocialLink href="#" icon={<Instagram size={20} className="text-white" />} label="Instagram" />
      <SocialLink href="#" icon={<Linkedin size={20} className="text-white" />} label="LinkedIn" />
      <SocialLink href="/contact" icon={<Mail size={20} className="text-white" />} label="Contact" />
    </div>
  </div>
))

SocialMediaSection.displayName = 'SocialMediaSection'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-rose-800 to-rose-900 text-white py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdjZoLTZ2LTZoNnptLTYgMGgtNnY2aDZ2LTZ6bTEyIDB2LTZoLTZ2Nmg2em0tNi02aC02djZoNnYtNnptLTYgMGgtNnY2aDZ2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4 space-y-6">
            <div>
              <div className="mb-2">
                <Image src="/logo.png" alt="PersonalQ Logo" width={150} height={40} className="brightness-0 invert" />
              </div>
              <div className="h-1 w-20 bg-rose-600 rounded-full mb-4"></div>
              <p className="text-rose-100 leading-relaxed">
                Discover your personality type and gain valuable insights into your strengths, challenges, and
                potential. Our scientifically-backed assessments help you understand yourself better.
              </p>
            </div>
            <div className="pt-4">
              <p className="text-rose-200 font-medium">Made by Huniko</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <FooterSection title="Explore">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/quiz">Take the Test</FooterLink>
              <FooterLink href="/enneagram-test">Enneagram Test</FooterLink>
              <FooterLink href="/types">Personality Types</FooterLink>
              <FooterLink href="/visualization">Visualizations</FooterLink>
              <FooterLink href="/entrepreneurs">Entrepreneur Types</FooterLink>
            </FooterSection>
          </div>

          <div className="md:col-span-2">
            <FooterSection title="Resources">
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/enneagram">Enneagram</FooterLink>
              <FooterLink href="/careers">Career Matches</FooterLink>
              <FooterLink href="/relationships">Relationships</FooterLink>
              <FooterLink href="/learning">Learning</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/about">About</FooterLink>
            </FooterSection>
          </div>

          <div className="md:col-span-4 space-y-6">
            <NewsletterSignup />
            <SocialMediaSection />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-rose-700/50 text-center">
          <p className="text-rose-200">© {new Date().getFullYear()} PersonaIQ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
