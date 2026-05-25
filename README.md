# 🎓 Smart Learning — Next.js + Supabase

A full-stack online tutoring platform built with **Next.js 14** and **Supabase**.

---

## 📁 Pages & Features

| Page | Route | Description |
|------|-------|-------------|
| 🏠 Home | `/` | Hero, how it works, subjects, testimonials, CTA |
| 📚 Services | `/services` | Filterable service cards with booking |
| 📖 About | `/about` | Mission, who we help, free demo CTA |
| 📞 Contact | `/contact` | Contact info + message form (saves to DB) |
| 🔐 Login | `/auth/login` | Student login with Supabase Auth |
| ✍️ Signup | `/auth/signup` | Student registration |
| 📅 Booking | `/booking/[serviceId]` | 3-step booking: date → details → confirm |
| ✅ Confirm | `/booking/confirm` | Booking success page |
| 📋 My Bookings | `/my-bookings` | View, filter, and cancel bookings |
| 👨‍🏫 Tutor Register | `/tutor/register` | Apply to become a tutor |
| 🔑 Admin Login | `/admin/login` | Admin area login |
| 📊 Admin Dashboard | `/admin/dashboard` | Manage bookings, approve tutors, read messages |

---

## 🚀 Quick Setup

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com) → Create new project
2. Copy your **Project URL** and **Anon Key** from Settings → API

### Step 2: Set Up Database
1. In Supabase → SQL Editor → paste contents of `supabase-schema.sql` → Run

### Step 3: Set Up Next.js Project
```bash
# Create Next.js app
npx create-next-app@latest smart-learning --typescript --tailwind --app

cd smart-learning

# Install Supabase
npm install @supabase/supabase-js

# Install fonts (already in package.json via next/font)
```

### Step 4: Copy Project Files
Copy all files from this project into your Next.js folder:
- `app/` folder → all pages
- `components/` → Navbar.tsx, Footer.tsx
- `lib/supabase.ts`
- `tailwind.config.ts`
- `app/globals.css`

### Step 5: Configure Environment
```bash
# Create .env.local file
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Step 6: Run the App
```bash
npm run dev
```

Visit `http://localhost:3000` 🎉

---

## 🔑 Admin Access

Default credentials (change in production!):
- Username: `admin`
- Password: `admin2024`

Go to `/admin/login` to access the admin dashboard.

---

## 🗄️ Database Tables

| Table | Purpose |
|-------|---------|
| `profiles` | Student/tutor/admin accounts |
| `services` | Tutoring services offered |
| `tutors` | Tutor profiles and info |
| `bookings` | All session bookings |
| `reviews` | Student reviews for tutors |
| `contact_messages` | Contact form submissions |

---

## 💡 Extra Features to Add Later

1. **Payment Gateway** — Integrate Razorpay for ₹100 payments
2. **Email Notifications** — Use Supabase Edge Functions + Resend
3. **Google Meet Integration** — Auto-generate meeting links
4. **Student Dashboard** — Progress tracking, session history
5. **Tutor Profiles** — Public pages for each tutor
6. **Blog/Resources** — Study tips and articles
7. **Push Notifications** — Session reminders
8. **Rating System** — Review tutors after sessions

---

## 📱 WhatsApp Integration

Add this floating WhatsApp button to your layout for instant contact:

```tsx
<a href="https://wa.me/919342530010" target="_blank"
  className="fixed bottom-6 right-6 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-50 hover:bg-green-600 transition-all">
  <span className="text-2xl">💬</span>
</a>
```

---

## 🎨 Design System

- **Primary**: Teal `#0F4C5C` (navbar, headers)
- **Accent**: Orange `#F97316` (CTAs, prices)
- **Fonts**: Sora (headings) + Nunito (body)
- **Components**: `.btn-primary`, `.btn-outline`, `.card`, `.input-field`

---

Built with ❤️ for Smart Learning, Tamil Nadu
