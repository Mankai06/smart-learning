'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function ConfirmContent() {
  const params = useSearchParams()
  const course = params.get('course')
  const date = params.get('date')
  const time = params.get('time')
  const phone = params.get('phone')
  const email = params.get('email')

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-teal-800 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-500 mb-6">Your session has been booked successfully.</p>

        <div className="bg-gray-50 rounded-xl p-4 text-left space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Course</span>
            <span className="font-semibold text-gray-800 text-sm">{course}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Date</span>
            <span className="font-semibold text-gray-800 text-sm">{date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Time</span>
            <span className="font-semibold text-gray-800 text-sm">{time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Phone</span>
            <span className="font-semibold text-gray-800 text-sm">{phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Email</span>
            <span className="font-semibold text-gray-800 text-sm">{email}</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          We'll contact you shortly to confirm your session details! 😊
        </p>

        <Link href="/" className="block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <ConfirmContent />
    </Suspense>
  )
}