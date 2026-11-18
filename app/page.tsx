'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-6xl font-bold text-green-800 mb-4">Pendo Mtaani</h1>
        <p className="text-2xl text-gray-700 mb-2">Karibu! Connect with Kenyans near you.</p>
        <p className="text-lg text-gray-600 mb-8">
          Location-based matchmaking by county, distance, age, interests, tribe, religion & more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/login" className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-700 transition">
            Get Started / Login
          </Link>
          <Link href="/discover" className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-50 transition">
            Discover Nearby
          </Link>
        </div>
        {user && <p className="text-green-700 mb-8">Welcome back, {user.email}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="font-bold text-xl mb-2">📍 GPS Matching</h3>
            <p className="text-gray-600">Find people within your preferred distance using real-time location.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="font-bold text-xl mb-2">🇰🇪 Kenya Localized</h3>
            <p className="text-gray-600">Filter by county (Nairobi, Mombasa, Kisumu, Kiambu...), tribe, interests, lifestyle.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="font-bold text-xl mb-2">💬 Safe Connections</h3>
            <p className="text-gray-600">Profiles, photos, swipe matching, chat, reports & M-Pesa premium ready.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
