"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function StudentDashboard() {

  const [enrollments, setEnrollments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEnrollments()
  }, [])

  const fetchEnrollments = async () => {

    setLoading(true)

    const { data: enrollData, error } = await supabase
      .from("enrollments")
      .select("*")

    if (error) {
      console.log(error)
      setLoading(false)
      return
    }

    const finalData = []

    for (const item of enrollData || []) {

      const { data: course } = await supabase
        .from("courses")
        .select("*")
        .eq("id", item.course_id)
        .single()

      finalData.push({
        ...item,
        course_id: course,
      })
    }

    setEnrollments(finalData)

    setLoading(false)
  }

  // MARK COMPLETE
  const markComplete = async (id: string) => {

    const { error } = await supabase
      .from("enrollments")
      .update({
        progress: 100,
      })
      .eq("id", id)

    if (error) {

      console.log(error)

    } else {

      fetchEnrollments()

    }

  }

  // LOGOUT
  const handleLogout = async () => {

    await supabase.auth.signOut()

    window.location.href = "/auth/login"

  }

  const completedCourses = enrollments.filter(
    (item) => item.progress === 100
  ).length

  const inProgressCourses = enrollments.filter(
    (item) =>
      item.progress > 0 &&
      item.progress < 100
  ).length

  return (

    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="bg-teal-900 text-white p-6 flex justify-between items-center">

        <h1 className="text-5xl font-bold">
          🎓 Student Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-2xl text-xl font-bold"
        >
          Logout
        </button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h2 className="text-2xl text-gray-600">
            Enrolled Courses
          </h2>

          <p className="text-6xl font-bold text-orange-500 mt-4">
            {enrollments.length}
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h2 className="text-2xl text-gray-600">
            Completed
          </h2>

          <p className="text-6xl font-bold text-green-500 mt-4">
            {completedCourses}
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <h2 className="text-2xl text-gray-600">
            In Progress
          </h2>

          <p className="text-6xl font-bold text-teal-600 mt-4">
            {inProgressCourses}
          </p>

        </div>

      </div>

      {/* COURSES */}
      <div className="px-10 pb-10">

        <h2 className="text-5xl font-bold mb-8">
          My Courses 🚀
        </h2>

        {loading ? (

          <p className="text-2xl">
            Loading dashboard...
          </p>

        ) : enrollments.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg p-20 text-center">

            <h3 className="text-5xl font-bold text-gray-700">
              No Courses Yet 😲
            </h3>

            <Link href="/courses">

              <button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl text-2xl font-bold">

                Browse Courses

              </button>

            </Link>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {enrollments.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-lg p-8"
              >

                <h3 className="text-4xl font-bold text-orange-600">
                  {item.course_id?.title}
                </h3>

                <p className="text-gray-600 mt-4 text-xl">
                  {item.course_id?.description}
                </p>

                <p className="mt-4 text-lg">
                  ⏳ Duration: {item.course_id?.duration}
                </p>

                <p className="mt-2 text-lg">
                  👨‍🏫 Instructor: {item.course_id?.instructor}
                </p>

                {/* PROGRESS BAR */}
                <div className="mt-6">

                  <div className="w-full bg-gray-200 rounded-full h-5">

                    <div
                      className="bg-teal-600 h-5 rounded-full"
                      style={{
                        width: `${item.progress}%`,
                      }}
                    ></div>

                  </div>

                  <p className="mt-3 text-lg font-bold">
                    Progress: {item.progress}%
                  </p>

                </div>

                {/* CONTINUE LEARNING */}
                <Link href="/course-player">

                  <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl text-xl font-bold">

                    Continue Learning 🎥

                  </button>

                </Link>

                {/* MARK COMPLETE */}
                <button
                  onClick={() => markComplete(item.id)}
                  className="mt-4 w-full bg-teal-700 hover:bg-teal-800 text-white py-4 rounded-2xl text-xl font-bold"
                >
                  Mark Complete ✅
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  )
}