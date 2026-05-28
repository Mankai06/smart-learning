'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function SignupPage() {

  const router = useRouter()

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))

  }

  const handleSignup = async (e: React.FormEvent) => {

    e.preventDefault()

    setLoading(true)
    setError('')

    // Password Check
    if (form.password !== form.confirmPassword) {

      setError('Passwords do not match')
      setLoading(false)
      return

    }

    // Signup User
    const { data, error } = await supabase.auth.signUp({

      email: form.email,
      password: form.password,

    })

    // Auth Error
    if (error) {

      setError(error.message)
      setLoading(false)
      return

    }

    // Get User
    const user = data.user

    // Insert into profiles table
    if (user) {

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            email: user.email,
            full_name: form.fullName,
            phone: form.phone,
            role: 'student'
          },
        ])

      if (profileError) {

        console.log(profileError)

      }

    }

    setSuccess(true)

    setLoading(false)

  }

  // Success Screen
  if (success) {

    return (

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

        <div className="max-w-md w-full card text-center">

          <span className="text-5xl">🎉</span>

          <h2 className="font-sora text-2xl font-bold text-teal-800 mt-4">
            Account Created!
          </h2>

          <p className="text-gray-500 mt-2">
            Check your email to confirm your account, then login.
          </p>

          <Link
            href="/auth/login"
            className="btn-primary inline-block mt-6"
          >
            Go to Login
          </Link>

        </div>

      </div>

    )

  }

  return (

    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">

      <div className="max-w-md w-full">

        {/* Logo */}
        <div className="text-center mb-8">

          <Link
            href="/"
            className="font-sora text-2xl font-bold text-teal-800"
          >
            <span className="text-orange-500">Smart</span> Learning
          </Link>

          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            Create your account
          </h1>

          <p className="text-gray-500 mt-1">
            Start with a FREE demo class
          </p>

        </div>

        {/* Signup Card */}
        <div className="card">

          <form
            onSubmit={handleSignup}
            className="space-y-4"
          >

            {error && (

              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>

            )}

            {/* Full Name */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>

              <input
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange}
                className="input-field"
                placeholder="Priya Sharma"
                required
              />

            </div>

            {/* Email */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="input-field"
                placeholder="your@email.com"
                required
              />

            </div>

            {/* Phone */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>

              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className="input-field"
                placeholder="+91 98765 43210"
              />

            </div>

            {/* Password */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>

              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="input-field"
                placeholder="Min 6 characters"
                required
                minLength={6}
              />

            </div>

            {/* Confirm Password */}
            <div>

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>

              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="input-field"
                placeholder="••••••••"
                required
              />

            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-center disabled:opacity-70"
            >

              {loading
                ? 'Creating Account...'
                : 'Create Account Free'}

            </button>

          </form>

          {/* Login Link */}
          <p className="text-center text-gray-500 text-sm mt-6">

            Already have an account?{' '}

            <Link
              href="/auth/login"
              className="text-orange-500 font-semibold hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  )

}