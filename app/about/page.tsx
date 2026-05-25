// app/about/page.tsx
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0F4C5C] text-white py-16 text-center">
        <h1 className="font-sora text-4xl font-bold mb-3">About Smart Learning</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">Our story, mission, and the students we support</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="card mb-8">
          <h2 className="font-sora text-2xl font-bold text-teal-800 mb-4">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            <span className="text-orange-500 font-semibold">Smart Learning</span> is an online tutoring platform created to help students who struggle to find personal academic guidance outside school. Many students hesitate to ask doubts in classrooms and tuition centers due to fear, shyness, or lack of individual attention.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our platform connects students directly with tutors for one-to-one interactive sessions in subjects like Mathematics, Physics, Computer Science, Communication Skills, and Interview Preparation.
          </p>
        </div>

        <div className="border-l-4 border-orange-500 bg-orange-50 rounded-xl p-6 mb-8">
          <h3 className="font-sora font-bold text-lg text-teal-800 mb-2">Our Mission</h3>
          <p className="text-gray-700 leading-relaxed">
            To provide affordable, comfortable and personalized learning where students can learn freely, ask doubts confidently and improve skills without pressure.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          {[
            { icon: '🏫', title: 'School Students', desc: 'Struggling with concepts in Math, Science, or English? We help make it simple.' },
            { icon: '🎓', title: 'College Students', desc: 'Project help, exam prep, coding sessions and more for college coursework.' },
            { icon: '💼', title: 'Job Seekers', desc: 'Interview prep, resume building, communication skills for placement success.' },
          ].map(s => (
            <div key={s.title} className="card text-center">
              <span className="text-4xl mb-3 block">{s.icon}</span>
              <h3 className="font-sora font-bold text-teal-800 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="card bg-[#0F4C5C] text-white text-center">
          <h3 className="font-sora text-2xl font-bold mb-3">Our Demo Class is FREE 🎉</h3>
          <p className="text-gray-300 mb-6">Try before you commit. No payment required for your first session.</p>
          <Link href="/services" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl inline-block transition-all">
            Book Free Demo →
          </Link>
        </div>
      </div>
    </div>
  )
}
