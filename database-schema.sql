-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  notes TEXT,
  company TEXT DEFAULT '', -- honeypot field
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'done')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (you can restrict this later)
CREATE POLICY "Allow all operations" ON bookings FOR ALL USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_bookings_updated_at 
    BEFORE UPDATE ON bookings 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 

-- Create store configuration table
CREATE TABLE IF NOT EXISTS store_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  store_name VARCHAR(255) NOT NULL DEFAULT 'Polish Nail Salon',
  store_address TEXT,
  store_phone VARCHAR(50),
  store_email VARCHAR(255),
  opening_hours JSONB NOT NULL DEFAULT '{
    "monday": {"open": "09:00", "close": "18:00", "isOpen": true},
    "tuesday": {"open": "09:00", "close": "18:00", "isOpen": true},
    "wednesday": {"open": "09:00", "close": "18:00", "isOpen": true},
    "thursday": {"open": "09:00", "close": "18:00", "isOpen": true},
    "friday": {"open": "09:00", "close": "18:00", "isOpen": true},
    "saturday": {"open": "09:00", "close": "18:00", "isOpen": true},
    "sunday": {"open": "09:00", "close": "18:00", "isOpen": false}
  }',
  time_slot_duration INTEGER NOT NULL DEFAULT 30, -- in minutes
  max_bookings_per_slot INTEGER NOT NULL DEFAULT 3,
  max_advance_booking INTEGER NOT NULL DEFAULT 1095, -- days
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default store configuration
INSERT INTO store_config (id) 
VALUES (gen_random_uuid())
ON CONFLICT DO NOTHING;

-- Ensure we only have one store configuration record
-- Delete any duplicate records (keep only the first one)
DELETE FROM store_config 
WHERE id NOT IN (
  SELECT id FROM store_config 
  ORDER BY created_at 
  LIMIT 1
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_store_config_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for store_config table
CREATE TRIGGER update_store_config_updated_at
  BEFORE UPDATE ON store_config
  FOR EACH ROW
  EXECUTE FUNCTION update_store_config_updated_at();

-- Enable RLS on store_config
ALTER TABLE store_config ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (for initial setup)
CREATE POLICY "Allow all operations on store_config" ON store_config
  FOR ALL USING (true); 