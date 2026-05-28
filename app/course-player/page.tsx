"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function CoursePlayer() {
  const [courses, setCourses] = useState<any[]>([])

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from("enrollments")
      .select(`
        *,
        courses (*)
      `)

    if (error) {
      console.log(error)
      return
    }

    const finalCourses = data.map((item: any) => ({
      ...item.courses,
      progress: item.progress
    }))

    setCourses(finalCourses)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-5xl font-bold mb-10">
        Course Player 🎬
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-3xl font-bold text-orange-500 mb-4">
              {course.title}
            </h2>

            <p className="text-gray-600 mb-4">
              {course.description}
            </p>

            <p className="mb-2">
              ⏳ Duration: {course.duration}
            </p>

            <p className="mb-6">
              👨‍🏫 Instructor: {course.instructor}
            </p>

            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{
                  width: `${course.progress}%`
                }}
              ></div>
            </div>

            <p className="mt-3 font-bold">
              Progress: {course.progress}%
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}