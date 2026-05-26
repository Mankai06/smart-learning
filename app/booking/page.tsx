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
      alert('Please fill all fields!')
      return
    }
    router.push(
      `/booking/confirm?course=${course}&date=${date}&time=${time}&phone=${phone}&email=${email}`
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-teal-800 mb-2">Book a Session</h1>
        <p className="text-gray-500 mb-6">Course: <span className="font-semibold text-orange-500">{course}</span></p>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">Select Date</label>
            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-orange-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">Select Time</label>
            <input
              type="time"
              onChange={(e) => setTime(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-orange-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">Phone Number</label>
            <input
              type="tel"
              placeholder="Your phone number"
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-orange-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 block">Email Address</label>
            <input
              type="email"
              placeholder="Your email address"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-orange-400 focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleBooking}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl mt-6 transition-all">
          Confirm Booking →
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