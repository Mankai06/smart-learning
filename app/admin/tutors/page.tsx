'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import emailjs from '@emailjs/browser'

type Tutor = {
  id: string
  name: string
  email: string
  phone: string
  qualification: string
  experience_years: number
  subjects: string[]
  bio: string
  status: string
  resume_url: string | null
}

export default function AdminTutorsPage() {

  const router = useRouter()

  const [tutors, setTutors] = useState<Tutor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAdminAndLoad()
  }, [])

  const checkAdminAndLoad = async () => {

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/auth/login')
      return
    }

    if (user.email !== 'devamankaishree@gmail.com') {
      alert('You are not admin')
      router.push('/')
      return
    }

    const { data, error } = await supabase
      .from('tutors')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    setTutors(data || [])
    setLoading(false)
  }

  // 🔥 STATUS UPDATE FUNCTION
  const updateTutorStatus = async (
    id: string,
    name: string,
    email: string,
    newStatus: string
  ) => {

    const { error } = await supabase
      .from('tutors')
      .update({ status: newStatus })
      .eq('id', id)

    if (!error) {

      let templateId = ''

      // ✅ SELECT TEMPLATE BASED ON STATUS
      if (newStatus === 'received') {
        templateId = 'template_c2b27r6'
      } else if (newStatus === 'rejected') {
        templateId = 'template_0mfnk1f'
      }

      try {
        await emailjs.send(
          'service_h4oyczb',      // your service ID
          templateId,
          {
            name: name,
            to_email: email
          },
          '239LbGwXe605ESzUD'     // your public key
        )

        alert(`Tutor ${newStatus} & Email Sent ✅`)

      } catch (err) {
        console.error(err)
        alert(`${newStatus} but email failed ❌`)
      }

      checkAdminAndLoad()
    }
  }

  if (loading) return <div className="p-10 text-xl">Loading tutor applications...</div>

  return (
    <div className="min-h-screen p-10 bg-gray-50">

      <h1 className="text-3xl font-bold mb-8">Tutor Applications</h1>

      {tutors.length === 0 && (
        <p>No tutor applications.</p>
      )}

      <div className="space-y-5">
        {tutors.map(tutor => (
          <div key={tutor.id} className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold text-orange-600">{tutor.name}</h2>
            <p><b>Email:</b> {tutor.email}</p>
            <p><b>Phone:</b> {tutor.phone}</p>
            <p><b>Qualification:</b> {tutor.qualification}</p>
            <p><b>Experience:</b> {tutor.experience_years} years</p>
            <p><b>Subjects:</b> {tutor.subjects?.join(', ')}</p>
            <p><b>Bio:</b> {tutor.bio}</p>

            {/* STATUS */}
            <p className="mt-2 font-semibold text-blue-600">
              Status: {tutor.status}
            </p>
            <p>
  <b>Resume:</b>{' '}
  {tutor.resume_url ? (
    <a href={tutor.resume_url} target="_blank" className="text-blue-600 underline">
      View Resume 📄
    </a>
  ) : 'No Resume'}
</p>

            {/* BUTTONS */}
            <div className="mt-4 flex gap-3">

              <button
                onClick={() => updateTutorStatus(tutor.id, tutor.name, tutor.email, 'received')}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Mark as Received 📩
              </button>

              <button
                onClick={() => updateTutorStatus(tutor.id, tutor.name, tutor.email, 'rejected')}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Reject ❌
              </button>

            </div>

          </div>
        ))}
      </div>
    </div>
  )
}