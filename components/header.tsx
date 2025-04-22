import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-2">
            PI
          </div>
          <span className="text-xl font-bold text-rose-800">Personality Insight</span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-rose-700 hover:text-rose-900">
            Home
          </Link>
          <Link href="/quiz" className="text-rose-700 hover:text-rose-900">
            Take the Test
          </Link>
          <Link href="/types" className="text-rose-700 hover:text-rose-900">
            Personality Types
          </Link>
          <Link href="/about" className="text-rose-700 hover:text-rose-900">
            About
          </Link>
        </nav>
        <div className="flex space-x-2">
          <Link href="/quiz">
            <Button className="bg-rose-600 hover:bg-rose-700">Start Test</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
