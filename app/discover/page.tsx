'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';

export default function Discover() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearby, setNearby] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ lat: latitude, lng: longitude });
        const { data, error } = await supabase.rpc('nearby_users', {
          lat: latitude,
          lng: longitude,
          radius_meters: 50000,
        });
        if (error) console.error(error);
        setNearby(data || []);
        setLoading(false);
      },
      () => {
        alert('Please allow location access to find nearby people.');
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-6">Discover Nearby</h1>
        <button
          onClick={getLocation}
          disabled={loading}
          className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 disabled:opacity-50 mb-6"
        >
          {loading ? 'Finding people...' : 'Find People Near Me'}
        </button>
        {location && (
          <p className="mb-6 text-gray-600">
            Your location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </p>
        )}
        <div className="grid gap-4">
          {nearby.map((person) => (
            <div key={person.id} className="bg-white p-6 rounded-xl shadow flex gap-4 items-center">
              <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center text-2xl">
                {person.full_name?.[0] || '?'}
              </div>
              <div>
                <h3 className="text-xl font-bold">{person.full_name || 'Anonymous'}, {person.age || '?'}</h3>
                <p className="text-gray-600">{person.bio || 'No bio yet'}</p>
                <p className="text-sm text-green-600 mt-1">
                  {person.distance_meters ? `${Math.round(person.distance_meters / 1000)} km away` : 'Nearby'}
                </p>
              </div>
            </div>
          ))}
          {nearby.length === 0 && location && !loading && (
            <p className="text-gray-500 text-center py-8">No nearby profiles yet. Create yours or try a larger radius!</p>
          )}
        </div>
      </div>
    </div>
  );
}
