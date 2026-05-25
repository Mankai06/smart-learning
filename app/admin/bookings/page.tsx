'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type Booking = {
  id: string
  student_name: string
  student_email: string
  status: string
  services?: {
    name: string
  }
}

export default function AdminBookingsPage() {

  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  // ✅ FETCH BOOKINGS
  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        services (
          name
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.log(error)
      setLoading(false)
      return
    }

    setBookings(data || [])
    setLoading(false)
  }

  // ✅ UPDATE STATUS + SEND EMAIL
  const updateStatus = async (
    id: string,
    name: string,
    email: string,
    service: string,
    newStatus: string
  ) => {

    // update DB
    await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', id)

    // 📧 CALL EMAIL API
    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        service,
        status: newStatus
      })
    })

    alert(`Booking ${newStatus} + Email Sent ✅`)

    fetchBookings()
  }

  if (loading) return <div className="p-10">Loading bookings...</div>

  return (
    <div className="min-h-screen bg-gray-50 p-10">

      <h1 className="text-3xl font-bold mb-8">Student Bookings</h1>

      <div className="space-y-5">
        {bookings.map(b => (

          <div key={b.id} className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-bold text-orange-600">
              {b.student_name}
            </h2>

            <p><b>Email:</b> {b.student_email}</p>

            <p><b>Service:</b> {b.services?.name || 'No Service'}</p>

            <p className={
              b.status === 'confirmed'
                ? 'text-green-600 font-bold mt-2'
                : b.status === 'rejected'
                ? 'text-red-600 font-bold mt-2'
                : 'text-yellow-600 font-bold mt-2'
            }>
              Status: {b.status.toUpperCase()}
            </p>

            {b.status === 'pending' && (
              <div className="mt-4 flex gap-3">

                <button
                  onClick={() =>
                    updateStatus(
                      b.id,
                      b.student_name,
                      b.student_email,
                      b.services?.name || '',
                      'confirmed'
                    )
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Confirm
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      b.id,
                      b.student_name,
                      b.student_email,
                      b.services?.name || '',
                      'rejected'
                    )
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>

              </div>
            )}

          </div>

        ))}
      </div>
    </div>
  )
}