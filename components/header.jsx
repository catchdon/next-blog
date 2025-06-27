import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from 'next/router'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const menuRef = useRef()
  const [searchInput, setSearchInput] = useState('')
  const router = useRouter()

  const categories = [
    { name: "PC 게임", href: "/pc-games" },
    { name: "모바일 게임", href: "/mobile-games" },
    { name: "콘솔 게임", href: "/console-games" },
  ]

  useEffect(() => {
    // 초기 화면 크기 체크
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768) // md 이하만 모바일로 간주
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!isMobile) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setShowHeader(false)
      } else {
        setShowHeader(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, isMobile])


  useEffect(() => {
  if (!isMenuOpen) return

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false)
    }
  }

  document.addEventListener("mousedown", handleClickOutside)
  return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen])


  return (
    <header
        className={`z-50 w-full transition-transform duration-300 bg-white shadow-sm border-b border-gray-100
          ${isMobile 
            ? `fixed top-0 ${showHeader ? "translate-y-0" : "-translate-y-full"}` 
            : "sticky top-0"
          }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/gameprofessor-logo.png"
              alt="게임교수 로고"
              width={40}
              height={40}
              priority
            />
            <span className="text-2xl font-bold text-gray-900">게임교수</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              홈
            </Link>
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {category.name}
              </Link>
            ))}
            <Link href="/news" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              뉴스
            </Link>

            <form onSubmit={(e) => {
              e.preventDefault()
              if (searchInput.trim()) {
                router.push(`/search?q=${encodeURIComponent(searchInput)}`)
                setIsMenuOpen(false) // 모바일 대비
                setSearchInput('')
              }
            }} className="hidden md:flex items-center space-x-2 ml-4">
              <input
                type="text"
                placeholder="검색"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="px-2 py-1 border rounded-md text-sm w-36"
              />
              <button type="submit" className="text-sm text-white bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-700">
                검색
              </button>
            </form>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div ref={menuRef} className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1">
                홈
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1"
                >
                  {category.name}
                </Link>
              ))}
              <Link href="/news" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1">
                뉴스
              </Link>

              <form
                onSubmit={(e) => {
                e.preventDefault()
                if (searchInput.trim()) {
                  router.push(`/search?q=${encodeURIComponent(searchInput)}`)
                  setIsMenuOpen(false)
                  setSearchInput('')
                }
                }}
                className="flex space-x-2 px-2 pt-2"
                >
                <input
                type="text"
                placeholder="검색"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1 px-2 py-1 border rounded-md text-sm"
                />
                <button type="submit" className="text-sm text-white bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-700">
                검색
                </button>
                </form>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}