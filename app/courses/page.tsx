'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface Course {
  id: string
  title: string
  description: string
  duration: string
  instructor: string
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  // FETCH COURSES
  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')

    if (error) {
      console.log("ENROLL ERROR:", error)
    } else {
      setCourses(data)
    }

    setLoading(false)
  }

  // ENROLL FUNCTION
  const handleEnroll = async (courseId: string) => {

    // Get logged in user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert('Please login first')
      return
    }

    // Insert enrollment
    const { error } = await supabase
      .from('enrollments')
      .insert([
        {
          student_id: user.id,
          course_id: courseId,
          progress: 0,
        },
      ])

    if (error) {
      console.log(error)
      alert('error.message')
      return
    }

    alert('Enrollment Successful 🚀')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      {/* HEADER */}
      <h1 className="text-5xl font-bold text-teal-800 mb-10">
        Available Courses 🚀
      </h1>

      {/* LOADING */}
      {loading && (
        <p className="text-gray-500 text-lg">Loading courses...</p>
      )}

      {/* COURSE CARDS */}
      <div className="grid md:grid-cols-2 gap-8">

        {courses.map((course) => (

          <div
            key={course.id}
            className="bg-white rounded-3xl shadow-lg p-8 border border-gray-200"
          >

            <h2 className="text-3xl font-bold text-orange-500 mb-4">
              {course.title}
            </h2>

            <p className="text-gray-600 mb-5 text-lg">
              {course.description}
            </p>

            <div className="space-y-2 mb-6">
              <p className="text-gray-700">
                📚 Duration: <span className="font-semibold">{course.duration}</span>
              </p>

              <p className="text-gray-700">
                👨‍🏫 Instructor: <span className="font-semibold">{course.instructor}</span>
              </p>
            </div>

            {/* ENROLL BUTTON */}
            <button
              onClick={() => handleEnroll(course.id)}
              className="w-full bg-teal-700 hover:bg-teal-800 text-white py-4 rounded-2xl font-bold text-lg transition"
            >
              Enroll Now
            </button>

          </div>

        ))}

      </div>
    </div>
  )
}