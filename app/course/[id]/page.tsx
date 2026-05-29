'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function CoursePage() {
  const { id } = useParams()

  const [course, setCourse] = useState<any>(null)
  const [lessons, setLessons] = useState<any[]>([])
  const [selectedVideo, setSelectedVideo] = useState('')

  useEffect(() => {
    loadCourse()
    loadLessons()
  }, [])

  async function loadCourse() {
    const { data } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single()

    setCourse(data)
  }

  async function loadLessons() {
    const { data } = await supabase
      .from('lessons')
      .select('*')
      .eq('course_id', id)
      .order('lesson_order')

    if (data) {
      setLessons(data)

      if (data.length > 0) {
        setSelectedVideo(data[0].video_url)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        {course?.title}
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="md:col-span-2">

          {selectedVideo && (
            <iframe
              width="100%"
              height="500"
              src={selectedVideo}
              title="Lesson Video"
              allowFullScreen
              className="rounded-xl"
            />
          )}

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-4">
            Lessons
          </h2>

          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => setSelectedVideo(lesson.video_url)}
              className="block w-full text-left p-4 border rounded-lg mb-3 hover:bg-orange-50"
            >
              {lesson.lesson_order}. {lesson.title}
            </button>
          ))}

        </div>

      </div>

    </div>
  )
}