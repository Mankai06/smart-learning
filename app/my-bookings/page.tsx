'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      console.log("No user found")
      setLoading(false)
      return
    }

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('student_id', user.id)   // 🔥 IMPORTANT FILTER

    if (error) {
      console.log(error)
    } else {
      setBookings(data)
    }

    setLoading(false)
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found ❌</p>
      ) : (
        bookings.map((b) => (
          <div key={b.id} className="border p-4 mb-4 rounded">
            <p><b>Course:</b> {b.course}</p>
            <p><b>Date:</b> {b.date}</p>
            <p><b>Time:</b> {b.time}</p>
            <p><b>Phone:</b> {b.phone}</p>
            <p><b>Email:</b> {b.email}</p>
            <p><b>Status:</b> {b.status}</p>
          </div>
        ))
      )}
    </div>
  )
}