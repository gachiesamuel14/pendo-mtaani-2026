-- Enable PostGIS for location queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  age INTEGER,
  bio TEXT,
  gender TEXT,
  interested_in TEXT[],
  county TEXT,
  tribe TEXT,
  religion TEXT,
  interests TEXT[],
  avatar_url TEXT,
  location GEOGRAPHY(POINT, 4326),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Nearby users function (distance in meters)
CREATE OR REPLACE FUNCTION nearby_users(lat FLOAT, lng FLOAT, radius_meters INT DEFAULT 50000)
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  age INTEGER,
  bio TEXT,
  avatar_url TEXT,
  distance_meters FLOAT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.full_name,
    p.age,
    p.bio,
    p.avatar_url,
    ST_Distance(p.location, ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography) AS distance_meters
  FROM profiles p
  WHERE ST_DWithin(p.location, ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography, radius_meters)
    AND p.id != auth.uid()
  ORDER BY distance_meters;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS policies (basic)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
