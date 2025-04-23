import Link from "next/link"
import { Mail, Twitter, Instagram, Linkedin, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-rose-800 to-rose-900 text-white py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdjZoLTZ2LTZoNnptLTYgMGgtNnY2aDZ2LTZ6bTEyIDB2LTZoLTZ2Nmg2em0tNi02aC02djZoNnYtNnptLTYgMGgtNnY2aDZ2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4 space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2 inline-flex items-center">
                PersonaIQ
                <span className="ml-2 bg-rose-700 rounded-full p-1">
                  <Heart size={14} className="text-white" />
                </span>
              </h3>
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

          <div className="md:col-span-2 space-y-4">
            <h4 className="font-bold text-lg border-b border-rose-700 pb-2 mb-4">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-rose-100 hover:text-white transition-colors flex items-center">
                  <span className="hover:translate-x-1 transition-transform inline-block">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="text-rose-100 hover:text-white transition-colors flex items-center">
                  <span className="hover:translate-x-1 transition-transform inline-block">Take the Test</span>
                </Link>
              </li>
              <li>
                <Link href="/types" className="text-rose-100 hover:text-white transition-colors flex items-center">
                  <span className="hover:translate-x-1 transition-transform inline-block">Personality Types</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/visualization"
                  className="text-rose-100 hover:text-white transition-colors flex items-center"
                >
                  <span className="hover:translate-x-1 transition-transform inline-block">Visualizations</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/entrepreneurs"
                  className="text-rose-100 hover:text-white transition-colors flex items-center"
                >
                  <span className="hover:translate-x-1 transition-transform inline-block">Entrepreneur Types</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="font-bold text-lg border-b border-rose-700 pb-2 mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/blog" className="text-rose-100 hover:text-white transition-colors flex items-center">
                  <span className="hover:translate-x-1 transition-transform inline-block">Blog</span>
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-rose-100 hover:text-white transition-colors flex items-center">
                  <span className="hover:translate-x-1 transition-transform inline-block">Career Matches</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/relationships"
                  className="text-rose-100 hover:text-white transition-colors flex items-center"
                >
                  <span className="hover:translate-x-1 transition-transform inline-block">Relationships</span>
                </Link>
              </li>
              <li>
                <Link href="/learning" className="text-rose-100 hover:text-white transition-colors flex items-center">
                  <span className="hover:translate-x-1 transition-transform inline-block">Learning</span>
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-rose-100 hover:text-white transition-colors flex items-center">
                  <span className="hover:translate-x-1 transition-transform inline-block">FAQ</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-rose-100 hover:text-white transition-colors flex items-center">
                  <span className="hover:translate-x-1 transition-transform inline-block">About</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-6">
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

            <div>
              <h4 className="font-medium mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-rose-700/50 hover:bg-rose-600 p-2 rounded-full transition-colors">
                  <Twitter size={20} className="text-white" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="bg-rose-700/50 hover:bg-rose-600 p-2 rounded-full transition-colors">
                  <Instagram size={20} className="text-white" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="#" className="bg-rose-700/50 hover:bg-rose-600 p-2 rounded-full transition-colors">
                  <Linkedin size={20} className="text-white" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="/contact" className="bg-rose-700/50 hover:bg-rose-600 p-2 rounded-full transition-colors">
                  <Mail size={20} className="text-white" />
                  <span className="sr-only">Contact</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-rose-700/50 text-center">
          <p className="text-rose-200">© {new Date().getFullYear()} Personality Insight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
