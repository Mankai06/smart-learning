"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AddCoursePage() {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState("")
  const [instructor, setInstructor] = useState("")

  const addCourse = async () => {

    const { error } = await supabase
      .from("courses")
      .insert([
        {
          title,
          description,
          duration,
          instructor,
        },
      ])

    if (error) {

      alert("Error adding course")

      console.log(error)

    } else {

      alert("Course Added Successfully 🚀")

      setTitle("")
      setDescription("")
      setDuration("")
      setInstructor("")

    }

  }

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-10">

        <h1 className="text-5xl font-bold text-teal-800 mb-10">
          Add New Course 🚀
        </h1>

        <div className="space-y-6">

          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-4 rounded-2xl text-xl"
          />

          <textarea
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-4 rounded-2xl text-xl h-40"
          />

          <input
            type="text"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border p-4 rounded-2xl text-xl"
          />

          <input
            type="text"
            placeholder="Instructor"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            className="w-full border p-4 rounded-2xl text-xl"
          />

          <button
            onClick={addCourse}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl text-2xl font-bold"
          >
            Add Course
          </button>

        </div>

      </div>

    </div>

  )

}