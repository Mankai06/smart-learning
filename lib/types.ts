export type Service = {
  id: string
  name: string
  description: string
  price: number
  category: string
  duration_minutes: number
}


export type Booking = {
  id: string
  service_id: string
  student_name: string
  student_email: string
  booking_date: string
  booking_time: string
  status: string
}

export type Tutor = {
  id: string
  name: string
  email: string
  phone: string
  qualification: string
  experience_years: number
  subjects: string[]
  bio: string
  is_approved: boolean
}