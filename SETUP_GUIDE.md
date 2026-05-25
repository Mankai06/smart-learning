# Smart Learning - Next.js + Supabase Setup Guide

## 🚀 Project Structure

```
smart-learning/
├── app/
│   ├── layout.tsx              # Root layout with navbar
│   ├── page.tsx                # Home page
│   ├── about/page.tsx          # About Us
│   ├── services/page.tsx       # Services listing
│   ├── contact/page.tsx        # Contact Us
│   ├── auth/
│   │   ├── login/page.tsx      # Student Login
│   │   └── signup/page.tsx     # Student Signup
│   ├── booking/
│   │   ├── [serviceId]/page.tsx # Book a service
│   │   └── confirm/page.tsx    # Booking confirmation
│   ├── dashboard/
│   │   └── page.tsx            # Student dashboard
│   ├── my-bookings/page.tsx    # My bookings
│   ├── tutor/
│   │   ├── register/page.tsx   # Tutor registration
│   │   └── [id]/page.tsx       # Tutor profile
│   └── admin/
│       ├── login/page.tsx      # Admin login
│       └── dashboard/page.tsx  # Admin dashboard
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ServiceCard.tsx
│   ├── BookingCard.tsx
│   └── TutorCard.tsx
├── lib/
│   ├── supabase.ts             # Supabase client
│   └── types.ts                # TypeScript types
└── middleware.ts               # Auth protection
```
