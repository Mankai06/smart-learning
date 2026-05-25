'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

type Tutor = {
  id: string
  name: string
  email: string
  phone: string
  qualification: string
  experience_years: number
  subjects: string[]
  bio: string
  is_approved: boolean
}

export default function AdminTutors() {

  
  const router = useRouter()

  const [tutors, setTutors] = useState<Tutor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTutors()
  }, [])

  const loadTutors = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/auth/login')
      return
    }

    const { data, error } = await supabase
      .from('tutors')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) setTutors(data)
    setLoading(false)
  }

  const approveTutor = async (id: string) => {
    await supabase
      .from('tutors')
      .update({ is_approved: true })
      .eq('id', id)

    loadTutors()
  }

  const rejectTutor = async (id: string) => {
    await supabase
      .from('tutors')
      .delete()
      .eq('id', id)

    loadTutors()
  }

  if (loading) return <div className="p-10">Loading tutor applications...</div>

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">Tutor Applications</h1>

      <div className="space-y-6">
        {tutors.map(t => (
          <div key={t.id} className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold text-orange-600">{t.name}</h2>

            <p><b>Email:</b> {t.email}</p>
            <p><b>Phone:</b> {t.phone}</p>
            <p><b>Qualification:</b> {t.qualification}</p>
            <p><b>Experience:</b> {t.experience_years} years</p>
            <p><b>Subjects:</b> {t.subjects?.join(', ')}</p>
            <p><b>Bio:</b> {t.bio}</p>

            <div className="flex gap-3 mt-4">

              {!t.is_approved ? (
                <>
                  <button
                    onClick={() => approveTutor(t.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded">
                    Approve
                  </button>

                  <button
                    onClick={() => rejectTutor(t.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded">
                    Reject
                  </button>
                </>
              ) : (
                <span className="text-green-600 font-semibold">
                  Approved Tutor ✅
                </span>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}