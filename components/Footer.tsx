// components/Footer.tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0F4C5C] text-white pt-12 pb-6">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div>
            <h3 className="font-sora font-bold text-xl mb-3">
              <span className="text-orange-400">Smart</span> Learning
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Affordable, personalized one-on-one tutoring for students at all levels.
            </p>
            <p className="text-gray-400 text-sm mt-3">📍 Tamil Nadu, India</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-400 hover:text-orange-400 text-sm">Home</Link>
              <Link href="/services" className="block text-gray-400 hover:text-orange-400 text-sm">Services</Link>
              <Link href="/about" className="block text-gray-400 hover:text-orange-400 text-sm">About Us</Link>
              <Link href="/contact" className="block text-gray-400 hover:text-orange-400 text-sm">Contact</Link>

              {/* ⭐ Tutor Page Added */}
              <Link href="/become-a-tutor" className="block text-gray-400 hover:text-orange-400 text-sm">
                Become a Tutor
              </Link>
               <Link href="/reviews">Reviews</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Services</h4>
            <div className="space-y-2">
              <Link href="/services" className="block text-gray-400 hover:text-orange-400 text-sm">Math Tutoring</Link>
              <Link href="/services" className="block text-gray-400 hover:text-orange-400 text-sm">Physics</Link>
              <Link href="/services" className="block text-gray-400 hover:text-orange-400 text-sm">Computer Science</Link>
              <Link href="/services" className="block text-gray-400 hover:text-orange-400 text-sm">Interview Prep</Link>
              <Link href="/services" className="block text-gray-400 hover:text-orange-400 text-sm">Free Demo</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Contact</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>📞 <a href="tel:+919342530010" className="hover:text-orange-400">+91 9342530010</a></p>
              <p>📧 <a href="mailto:devamankaishree@gmail.com" className="hover:text-orange-400">devamankaishree@gmail.com</a></p>

              <p className="mt-4">
                <a
                  href="https://wa.me/919342530010"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white text-xs px-4 py-2 rounded-lg inline-block"
                >
                  💬 WhatsApp Us
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2026 Smart Learning. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/become-a-tutor" className="hover:text-orange-400">Become a Tutor</Link>
            <Link href="/admin/login" className="hover:text-orange-400">Admin</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}