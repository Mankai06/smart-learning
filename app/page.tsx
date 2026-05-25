// app/page.tsx
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

const subjects = [
  { icon: '📐', name: 'Mathematics', color: 'bg-blue-50 text-blue-700' },
  { icon: '⚡', name: 'Physics', color: 'bg-yellow-50 text-yellow-700' },
  { icon: '💻', name: 'Computer Science', color: 'bg-purple-50 text-purple-700' },
  { icon: '🗣️', name: 'Communication', color: 'bg-green-50 text-green-700' },
  { icon: '📚', name: 'Study Skills', color: 'bg-red-50 text-red-700' },
  { icon: '🎯', name: 'Interview Prep', color: 'bg-orange-50 text-orange-700' },
]

const features = [
  { icon: '🎓', title: 'Expert Tutors', desc: 'Learn from qualified tutors with real teaching experience' },
  { icon: '📅', title: 'Flexible Booking', desc: 'Book sessions at your convenience, anytime that suits you' },
  { icon: '💬', title: 'Ask Freely', desc: 'No judgment zone — ask any doubt, as many times as you need' },
  { icon: '💰', title: 'Affordable', desc: 'Just ₹100/hr. Demo class is completely FREE to try first' },
]

const testimonials = [
  { name: 'Priya S.', grade: 'Class 12', text: 'My Math score went from 60 to 92 in 2 months. The tutor was so patient!', stars: 5 },
  { name: 'Rahul K.', grade: 'B.Tech Student', text: 'Finally someone who explains concepts clearly. Loved the Computer Science sessions.', stars: 5 },
  { name: 'Ananya M.', grade: 'Job Seeker', text: 'The interview prep session was a game changer. Got placed in 3 weeks!', stars: 5 },
]

export default function HomePage() {
  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-[#0F4C5C] text-white overflow-hidden min-h-[92vh] flex items-center">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-teal-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-orange-500 bg-opacity-20 text-orange-300 text-sm font-semibold px-4 py-1 rounded-full mb-6 border border-orange-500 border-opacity-30">
              🎓 Online Tutoring Platform
            </span>
            <h1 className="font-sora text-5xl md:text-6xl font-bold leading-tight mb-6">
              Learn Smarter,<br />
              <span className="text-orange-400">Ask Freely</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              One-on-one personalized tutoring in Math, Physics, Computer Science and more.
              No fear. No judgment. Just learning at your own pace.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/auth/signup" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1">
                Start Free Demo →
              </Link>
              <Link href="/about" className="border-2 border-white/30 hover:border-white text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200">
                About Us
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-400">✅ Demo class is FREE &nbsp;|&nbsp; ✅ No commitment &nbsp;|&nbsp; ✅ From ₹100/hr</p>
          </div>

          <div className="hidden md:grid grid-cols-2 gap-4">
            {subjects.map((s) => (
              <div key={s.name} className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-5 hover:bg-white/15 transition-all">
                <span className="text-3xl">{s.icon}</span>
                <p className="mt-2 font-semibold text-white">{s.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Get started in 3 simple steps</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Choose a Service', desc: 'Pick the subject or session type you need help with' },
              { step: '02', title: 'Book a Slot', desc: 'Select your preferred date and time for the session' },
              { step: '03', title: 'Start Learning', desc: 'Join the session via Google Meet and start learning!' },
            ].map((item) => (
              <div key={item.step} className="relative card text-left">
                <span className="font-sora text-6xl font-bold text-orange-100 absolute top-4 right-6">{item.step}</span>
                <div className="relative">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold mb-4 text-sm">{item.step}</div>
                  <h3 className="font-sora font-bold text-xl text-teal-800 mb-2">{item.title}</h3>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Smart Learning?</h2>
            <p className="section-subtitle">We're different from regular tuition centers</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card text-center hover:-translate-y-1">
                <span className="text-4xl mb-4 block">{f.icon}</span>
                <h3 className="font-sora font-bold text-lg text-teal-800 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SUBJECTS ===== */}
      <section className="py-20 bg-[#0F4C5C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-sora text-3xl font-bold text-white mb-2">Subjects We Offer</h2>
            <p className="text-gray-300">Expert guidance across key academic and career subjects</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {subjects.map((s) => (
              <div key={s.name} className="bg-white/10 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/20 transition-all cursor-pointer">
                <span className="text-3xl block mb-2">{s.icon}</span>
                <p className="text-white text-sm font-medium">{s.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all inline-block">
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">What Students Say</h2>
            <p className="section-subtitle">Real results from real students</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="card">
                <div className="flex gap-1 mb-4">
                  {'⭐'.repeat(t.stars)}
                </div>
                <p className="text-gray-600 italic mb-4">"{t.text}"</p>
                <div>
                  <p className="font-bold text-teal-800">{t.name}</p>
                  <p className="text-gray-400 text-sm">{t.grade}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-16 bg-orange-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-sora text-3xl font-bold text-white mb-4">Ready to Start Learning?</h2>
          <p className="text-orange-100 mb-8 text-lg">Join hundreds of students who improved their scores with Smart Learning</p>
          <Link href="/auth/signup" className="bg-white text-orange-600 font-bold px-10 py-4 rounded-xl hover:bg-orange-50 transition-all inline-block shadow-lg">
            Book Your Free Demo Class →
          </Link>
        </div>
      </section>
    </div>
  )
}
