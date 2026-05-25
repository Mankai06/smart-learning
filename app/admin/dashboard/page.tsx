'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

type Booking = {
  id: string
  student_name: string
  student_email: string
  booking_date: string
  booking_time: string
  status: string
}

export default function AdminDashboard() {

  
  const router = useRouter()

  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAdmin()
  }, [])

  const checkAdmin = async () => {

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/auth/login')
      return
    }

    // 🔴 your admin email
    if (user.email !== 'devamankaishree@gmail.com') {
      alert('Access denied')
      router.push('/')
      return
    }

    loadBookings()
  }

  const loadBookings = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      alert(error.message)
      return
    }

    setBookings(data || [])
    setLoading(false)
  }

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('bookings').update({ status }).eq('id', id)
    loadBookings()
  }

  if (loading)
    return <div className="p-10 text-xl">Loading bookings...</div>

  return (
    <div className="min-h-screen bg-gray-50 p-10">

      <h1 className="text-3xl font-bold mb-8">Admin Booking Dashboard</h1>

      {bookings.map((b) => (
        <div key={b.id} className="bg-white p-6 rounded-xl shadow mb-5">

          <p><b>Student:</b> {b.student_name}</p>
          <p><b>Email:</b> {b.student_email}</p>
          <p><b>Date:</b> {b.booking_date}</p>
          <p><b>Time:</b> {b.booking_time}</p>

          <p className="mt-2">
            <b>Status:</b> {b.status}
          </p>

          <div className="flex gap-3 mt-4">

            <button
              onClick={() => updateStatus(b.id, 'confirmed')}
              className="bg-green-500 text-white px-4 py-2 rounded">
              Approve
            </button>

            <button
              onClick={() => updateStatus(b.id, 'cancelled')}
              className="bg-red-500 text-white px-4 py-2 rounded">
              Reject
            </button>

          </div>

        </div>
      ))}

    </div>
  )
}