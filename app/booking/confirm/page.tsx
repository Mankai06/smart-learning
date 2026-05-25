'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function ConfirmPage() {
  const params = useSearchParams()
  const router = useRouter()

  const course = params.get('course')

  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    if (!date || !time || !phone || !email) {
      alert('Fill all fields')
      return
    }

    setLoading(true)

    // ✅ get logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      alert('User not logged in ❌')
      setLoading(false)
      return
    }

    // ✅ insert booking
    const { error } = await supabase.from('bookings').insert([
      {
        student_id: user.id,
        course,
        date,
        time,
        phone,
        email,
        status: 'pending',
      },
    ])

    if (error) {
      console.log(error)
      alert('Insert failed ❌')
    } else {
      alert('Booking successful ✅')
      router.push('/my-bookings')
    }

    setLoading(false)
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Confirm Booking</h1>

      <p><b>Course:</b> {course}</p>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="block border p-2 mt-3"
      />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="block border p-2 mt-3"
      />

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="block border p-2 mt-3"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block border p-2 mt-3"
      />

      <button
        onClick={handleConfirm}
        disabled={loading}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Saving...' : 'Confirm Booking'}
      </button>
    </div>
  )
}