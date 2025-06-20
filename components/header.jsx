import Link from "next/link"
import { useState } from "react"
import { Menu, X, Gamepad2 } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const categories = [
    { name: "PC Games", href: "/pc-games" },
    { name: "Mobile Games", href: "/mobile-games" },
    { name: "Console Games", href: "/console-games" },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Gamepad2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">GameHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                {category.name}
              </Link>
            ))}
            <Link
              href="/reviews"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Reviews
            </Link>
            <Link
              href="/news"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              News
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1">
                Home
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1">
                  {category.name}
                </Link>
              ))}
              <Link
                href="/reviews"
                className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1">
                Reviews
              </Link>
              <Link
                href="/news"
                className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1">
                News
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
