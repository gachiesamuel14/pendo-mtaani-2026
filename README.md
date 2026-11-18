# Pendo Mtaani - Location-Based Dating for Kenya

A modern location-based online dating platform for people in Kenya.

**GitHub:** https://github.com/gachiesamuel14/pendo-mtaani-2026

## Core Idea
Users create profiles with photos, bio, interests. Share GPS location. Discover and match with nearby Kenyans. Filter by county, distance, age, tribe, religion, lifestyle.

## Tech Stack
- **Frontend**: Next.js (App Router) + TypeScript + Tailwind CSS
- **Backend**: Supabase (Auth, PostgreSQL + PostGIS, Storage, Realtime)
- **Hosting**: Netlify + GitHub continuous deploy
- **Location**: Browser Geolocation + PostGIS distance queries
- **Payments** (future): M-Pesa

## Features in this starter
- Beautiful landing page (Karibu / Pendo Mtaani)
- Email/password signup & login
- Discover page that requests GPS and calls nearby users
- Supabase schema with PostGIS, profiles table, nearby_users RPC, RLS

## Setup

### 1. Supabase
1. Create project at https://supabase.com
2. Enable **PostGIS** extension
3. Run `supabase/schema.sql` in SQL Editor
4. Create Storage bucket `avatars` (public or with policies)
5. Copy Project URL + anon key

### 2. Environment Variables
In Netlify Site settings → Environment variables, and locally `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### 3. Local
```bash
git clone https://github.com/gachiesamuel14/pendo-mtaani-2026.git
cd pendo-mtaani-2026
npm install
cp .env.example .env.local   # create if needed
npm run dev
```

### 4. Deploy to Netlify
Connect the GitHub repo to a new Netlify site. Set env vars. Push to main → auto deploy.

## Roadmap
- Full profile creation + photo upload
- Swipe / Like / Match system
- Real-time chat (Supabase Realtime)
- Advanced filters (county, tribe, interests, religion, mode: student/professional/church)
- Safety & report system
- Premium features + M-Pesa
- Sheng language support

Built for connecting Kenyans — Pendo means love, Mtaani means in the neighborhood.