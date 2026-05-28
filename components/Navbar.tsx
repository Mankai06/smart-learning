'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function Navbar() {

  const [user, setUser] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }

  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/become-a-tutor', label: 'Become a Tutor' },
  ]

  return (

    <nav className="bg-[#0F4C5C] text-white sticky top-0 z-50 shadow-lg">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            href="/"
            className="font-bold text-2xl"
          >
            <span className="text-orange-400">
              Smart
            </span>{' '}
            Learning
          </Link>

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center gap-8">

            {navLinks.map((link) => (

              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium hover:text-orange-400 transition ${
                  pathname === link.href
                    ? 'text-orange-400'
                    : 'text-gray-200'
                }`}
              >
                {link.label}
              </Link>

            ))}

          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">

            {!user ? (

              <>
                <Link
                  href="/auth/login"
                  className="text-sm hover:text-orange-400"
                >
                  Login
                </Link>

                <Link
                  href="/auth/signup"
                  className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Sign Up
                </Link>
              </>

            ) : (

              <div className="relative">

                {/* Hamburger Menu Button */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="text-3xl text-white hover:text-orange-400"
                >
                  ☰
                </button>

                {/* Dropdown Menu */}
                {
                  menuOpen && (

                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-200">

                      <Link
                        href="/student/dashboard"
                        className="block px-6 py-4 text-black hover:bg-gray-100"
                      >
                        🎓 My Learning
                      </Link>

                      <Link
                        href="/my-bookings"
                        className="block px-6 py-4 text-black hover:bg-gray-100"
                      >
                        📅 My Bookings
                      </Link>

                      <Link
                        href="/course-player"
                        className="block px-6 py-4 text-black hover:bg-gray-100"
                      >
                        🎬 Course Player
                      </Link>

                      <Link
                        href="/reviews"
                        className="block px-6 py-4 text-black hover:bg-gray-100"
                      >
                        ⭐ Reviews
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-6 py-4 text-red-500 hover:bg-gray-100"
                      >
                        🚪 Logout
                      </button>

                    </div>

                  )
                }

              </div>

            )}

          </div>

        </div>

      </div>

    </nav>

  )
}