'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function BecomeTutorPage() {

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    subjects: '',
    bio: ''
  })

  const [resumeFile, setResumeFile] = useState<File | null>(null)

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    const subjectsArray = form.subjects.split(',').map(s => s.trim())

    // 🔥 UPLOAD RESUME
    let resumeUrl = ''

    if (resumeFile) {
      const fileName = `${Date.now()}_${resumeFile.name}`

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, resumeFile)

      if (uploadError) {
        alert('Resume upload failed ❌')
        setLoading(false)
        return
      }

      const { data } = supabase
        .storage
        .from('resumes')
        .getPublicUrl(fileName)

      resumeUrl = data.publicUrl
    }

    // 🔥 INSERT DATA
    const { error } = await supabase
      .from('tutors')
      .insert({
        name: form.name,
        email: form.email,
        phone: form.phone,
        qualification: form.qualification,
        experience_years: Number(form.experience),
        subjects: subjectsArray,
        bio: form.bio,
        status: 'pending',       // ✅ NEW SYSTEM
        resume_url: resumeUrl    // ✅ SAVE FILE LINK
      })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    setSuccess(true)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <h1 className="text-2xl font-bold text-green-600">Application Submitted!</h1>
          <p className="mt-4">We will review your profile and contact you soon.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Become a Tutor
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input required placeholder="Full Name"
            className="border p-3 rounded w-full"
            onChange={e=>setForm({...form,name:e.target.value})} />

          <input required type="email" placeholder="Email"
            className="border p-3 rounded w-full"
            onChange={e=>setForm({...form,email:e.target.value})} />

          <input required placeholder="Phone Number"
            className="border p-3 rounded w-full"
            onChange={e=>setForm({...form,phone:e.target.value})} />

          <input required placeholder="Qualification (ex: B.Tech, M.Sc)"
            className="border p-3 rounded w-full"
            onChange={e=>setForm({...form,qualification:e.target.value})} />

          <input required type="number" placeholder="Years of Experience"
            className="border p-3 rounded w-full"
            onChange={e=>setForm({...form,experience:e.target.value})} />

          <input required placeholder="Subjects (comma separated: Math, Physics, Computer)"
            className="border p-3 rounded w-full"
            onChange={e=>setForm({...form,subjects:e.target.value})} />

          <textarea required placeholder="Short Bio"
            className="border p-3 rounded w-full"
            onChange={e=>setForm({...form,bio:e.target.value})} />

          {/* 🔥 NEW RESUME UPLOAD */}
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
            className="border p-3 rounded w-full"
          />

          <button
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded font-semibold">
            {loading ? 'Submitting...' : 'Apply as Tutor'}
          </button>

        </form>

      </div>
    </div>
  )
}