import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-rose-800 text-white py-8 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Personality Insight</h3>
            <p className="text-rose-200 text-sm">
              Discover your personality type and gain valuable insights about yourself through our scientifically
              designed assessment.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-rose-200 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="text-rose-200 hover:text-white">
                  Take the Test
                </Link>
              </li>
              <li>
                <Link href="/types" className="text-rose-200 hover:text-white">
                  Personality Types
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-rose-200 hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/careers" className="text-rose-200 hover:text-white">
                  Career Matching
                </Link>
              </li>
              <li>
                <Link href="/visualization" className="text-rose-200 hover:text-white">
                  Type Visualization
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-rose-200 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-rose-200 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-rose-200 text-sm mb-2">Have questions or feedback?</p>
            <Link href="/contact" className="text-white underline hover:text-rose-200">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="border-t border-rose-700 mt-8 pt-6 text-center text-sm text-rose-300">
          <p>&copy; {new Date().getFullYear()} Personality Insight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
