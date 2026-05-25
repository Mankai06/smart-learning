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
    supabase.auth.getUser().then(({ data }) => setUser(data.user))

    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  // ⭐ ADDED Become a Tutor link here
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
          <Link href="/" className="font-sora font-bold text-xl tracking-tight">
            <span className="text-orange-400">Smart</span> Learning
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-orange-400 ${
                  pathname === link.href ? 'text-orange-400' : 'text-gray-200'
                }`}
              >
                {link.label}
              </Link>
              
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link href="/my-bookings" className="text-sm text-gray-200 hover:text-orange-400">
                  My Bookings
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm text-gray-200 hover:text-orange-400">
                  Login
                </Link>

                <Link
                  href="/auth/signup"
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg"
                >
                  Sign Up
                </Link>
                   <Link href="/reviews">Reviews</Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  )
}