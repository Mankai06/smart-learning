-- ============================================
-- SMART LEARNING - SUPABASE DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- PROFILES (extends Supabase auth.users)
-- ============================================
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  phone text,
  role text default 'student' check (role in ('student', 'tutor', 'admin')),
  avatar_url text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ============================================
-- TUTORS
-- ============================================
create table tutors (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade,
  name text not null,
  email text not null,
  phone text,
  bio text,
  subjects text[],              -- ['Math', 'Physics', 'Computer']
  qualification text,           -- 'B.Tech, M.Sc'
  experience_years int default 0,
  hourly_rate numeric default 100,
  profile_image text,
  is_approved boolean default false,
  is_available boolean default true,
  rating numeric default 0,
  total_reviews int default 0,
  created_at timestamp with time zone default timezone('utc', now())
);

-- ============================================
-- SERVICES
-- ============================================
create table services (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  subject text,
  duration_minutes int default 60,
  price numeric default 100,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc', now())
);

-- Insert default services
insert into services (name, description, subject, duration_minutes, price) values
('Math Tutoring Session', 'One-on-one math tutoring covering algebra, geometry, calculus and more', 'Math', 60, 100),
('Physics Session', 'Interactive physics problem solving and concept clarity', 'Physics', 60, 100),
('Computer Science', 'Programming, algorithms, data structures and project help', 'Computer', 60, 100),
('Language Practice', 'English communication skills, grammar and spoken practice', 'English', 60, 100),
('Study Strategy Assessment', 'Personalized study plan and exam strategy session', 'General', 60, 100),
('Interview Preparation', 'Mock interviews, resume review, and placement coaching', 'Career', 90, 150),
('Homework Help Session', 'Get help with daily homework and assignments', 'General', 60, 100),
('Free Demo Class', 'Try a free 30-minute demo session before booking', 'General', 30, 0);

-- ============================================
-- BOOKINGS
-- ============================================
create table bookings (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references profiles(id) on delete cascade,
  tutor_id uuid references tutors(id) on delete set null,
  service_id uuid references services(id) on delete cascade,
  student_name text not null,
  student_email text not null,
  student_phone text,
  booking_date date not null,
  booking_time time not null,
  duration_minutes int default 60,
  price numeric default 100,
  status text default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  notes text,
  meeting_link text,            -- Google Meet / Zoom link
  created_at timestamp with time zone default timezone('utc', now())
);

-- ============================================
-- REVIEWS
-- ============================================
create table reviews (
  id uuid default uuid_generate_v4() primary key,
  booking_id uuid references bookings(id) on delete cascade,
  student_id uuid references profiles(id) on delete cascade,
  tutor_id uuid references tutors(id) on delete cascade,
  rating int check (rating between 1 and 5),
  comment text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- ============================================
-- CONTACT MESSAGES
-- ============================================
create table contact_messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  message text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc', now())
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

alter table profiles enable row level security;
alter table tutors enable row level security;
alter table services enable row level security;
alter table bookings enable row level security;
alter table reviews enable row level security;
alter table contact_messages enable row level security;

-- Profiles: users can read/update their own
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Services: anyone can read
create policy "Anyone can view services" on services for select using (true);

-- Tutors: anyone can view approved tutors
create policy "Anyone can view approved tutors" on tutors for select using (is_approved = true);
create policy "Tutors can update own profile" on tutors for update using (auth.uid() = user_id);

-- Bookings: students see their own, admins see all
create policy "Students view own bookings" on bookings for select using (auth.uid() = student_id);
create policy "Students can create bookings" on bookings for insert with check (auth.uid() = student_id);

-- Reviews: anyone can read
create policy "Anyone can read reviews" on reviews for select using (true);
create policy "Students can create reviews" on reviews for insert with check (auth.uid() = student_id);

-- Contact: anyone can insert
create policy "Anyone can send message" on contact_messages for insert with check (true);
