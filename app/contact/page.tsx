'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function ContactPage() {

  

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)

    const { error } = await supabase
      .from('contact_messages')
      .insert({
        name: form.name,
        email: form.email,
        message: form.message
      })

    if (!error) {
      setSent(true)
      setForm({ name: '', email: '', message: '' })
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-[#0F4C5C] text-white py-16 text-center">
        <h1 className="font-sora text-4xl font-bold mb-3">Contact Us</h1>
        <p className="text-gray-300">We'll respond within 24 hours</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">

        {/* Contact Info */}
        <div className="card bg-[#0F4C5C] text-white h-fit">
          <h2 className="font-sora text-2xl font-bold mb-6">Get in Touch</h2>

          <div className="space-y-5">

            <div className="flex items-start gap-4">
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-gray-300 text-sm">Tamil Nadu, India</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-2xl">📞</span>
              <div>
                <p className="font-semibold">Phone</p>
                <a href="tel:+919342530010" className="text-orange-400 hover:underline text-sm">
                  +91 9342530010
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-2xl">📧</span>
              <div>
                <p className="font-semibold">Email</p>
                <a href="mailto:devamankaishree@gmail.com" className="text-orange-400 hover:underline text-sm">
                  devamankaishree@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-2xl">💬</span>
              <div>
                <p className="font-semibold">WhatsApp</p>
                <a
                  href="https://wa.me/919342530010"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:underline text-sm"
                >
                  Message us on WhatsApp
                </a>
              </div>
            </div>

          </div>

          <p className="text-gray-400 text-sm mt-8">
            If you have doubts about subjects, booking issues, or want personal mentoring, contact us anytime.
          </p>
        </div>

        {/* Form */}
        <div className="card">

          {sent ? (
            <div className="text-center py-12">
              <span className="text-5xl">✅</span>
              <h3 className="font-sora font-bold text-xl text-teal-800 mt-4">
                Message Sent!
              </h3>
              <p className="text-gray-500 mt-2">
                We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <>
              <h2 className="font-sora text-2xl font-bold text-teal-800 mb-6">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="input-field resize-none h-32"
                    placeholder="Write your message..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full text-center disabled:opacity-70"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>

              </form>
            </>
          )}

        </div>

      </div>
    </div>
  )
}