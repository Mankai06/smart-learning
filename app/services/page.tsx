'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ServicesPage() {

  const [tab, setTab] = useState<'school' | 'skills'>('school')
  const router = useRouter()

  const schoolServices = [
    { name: 'Mathematics Tuition 📘', price: 2000 },
    { name: 'Science Tuition 🧪', price: 2000 },
    { name: 'English & Grammar 📖', price: 1800 },
    { name: 'Social Science 🌍', price: 1800 },
    { name: 'Computer 💻', price: 2200 },
    { name: 'Physics ⚡', price: 2200 },
  ]

  const skillServices = [
    { title: 'AI & ChatGPT Course 🧠', price: 899 },
    { title: 'Web Development 💻', price: 1099 },
    { title: 'Data Science 📊', price: 1299 },
    { title: 'Python 🐍', price: 799 },
    { title: 'Cyber Security 🔐', price: 1399 },
    { title: 'IoT 🌐', price: 1199 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">

      <h1 className="text-4xl font-bold text-center mb-10">
        Our Services 🚀
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-10 gap-4">
        <button onClick={() => setTab('school')}
          className={`px-6 py-2 rounded-full ${tab === 'school' ? 'bg-orange-500 text-white' : 'bg-white border'}`}>
          📚 School Tuition
        </button>

        <button onClick={() => setTab('skills')}
          className={`px-6 py-2 rounded-full ${tab === 'skills' ? 'bg-orange-500 text-white' : 'bg-white border'}`}>
          🚀 Skill Courses
        </button>
      </div>

      {/* SCHOOL */}
      {tab === 'school' && (
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {schoolServices.map((course, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">

              <h2 className="text-xl font-bold">{course.name}</h2>
              <p className="text-orange-500 font-bold mt-2">₹{course.price}/month</p>

              <button
                onClick={() => router.push(`/booking?course=${course.name}`)}
                className="mt-5 bg-orange-500 text-white py-2 w-full rounded"
              >
                Enroll Now
              </button>

            </div>
          ))}
        </div>
      )}

      {/* SKILLS */}
      {tab === 'skills' && (
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {skillServices.map((course, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">

              <h2 className="text-xl font-bold">{course.title}</h2>
              <p className="text-orange-500 font-bold mt-2">₹{course.price}</p>

              <button
                onClick={() => router.push(`/booking?course=${course.title}`)}
                className="mt-5 bg-orange-500 text-white py-2 w-full rounded"
              >
                Enroll Now
              </button>

            </div>
          ))}
        </div>
      )}

    </div>
  )
}