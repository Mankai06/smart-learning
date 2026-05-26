'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, Suspense } from 'react'

function BookingForm() {
  const params = useSearchParams()
  const router = useRouter()
  const course = params.get('course')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const handleBooking = () => {
    if (!date || !time || !phone || !email) {
      alert('Fill all fields')
      return
    }
    router.push(
      `/booking/confirm?course=${course}&date=${date}&time=${time}&phone=${phone}&email=${email}`
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-6 bg-white shadow rounded w-96">
        <h1 className="text-xl font-bold mb-4">Booking Page</h1>
        <p>Course: {course}</p>
        <input type="date" onChange={(e) => setDate(e.target.value)} className="w-full border p-2 mt-2"/>
        <input type="time" onChange={(e) => setTime(e.target.value)} className="w-full border p-2 mt-2"/>
        <input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} className="w-full border p-2 mt-2"/>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 mt-2"/>
        <button onClick={handleBooking} className="bg-orange-500 text-white w-full p-2 mt-3">
          Confirm
        </button>
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <BookingForm />
    </Suspense>
  )
}