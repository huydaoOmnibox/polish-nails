# Store Configuration System Setup Guide

This guide explains how to set up and use the new store configuration system that integrates with Supabase.

## 🗄️ Database Setup

### 1. Create the Store Configuration Table

Run the following SQL in your Supabase SQL Editor:

```sql
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
```

## ⚙️ Features Implemented

### 1. Store Configuration Management
- **Opening Hours**: Configure business hours for each day of the week
- **Time Slot Duration**: Set how long each booking slot should be (15, 30, 45, or 60 minutes)
- **Maximum Bookings Per Slot**: Control how many customers can book the same time slot
- **Maximum Advance Booking**: Set how far in advance customers can book (up to 3 years)

### 2. Dynamic Time Slot Generation
- **Automatic Calculation**: Time slots are automatically generated based on opening hours and duration
- **Capacity Management**: Time slots are removed when they reach maximum booking capacity
- **Real-time Updates**: Available time slots update automatically as bookings are made

### 3. Database Integration
- **Supabase Storage**: All configuration is stored in the database
- **Real-time Sync**: Changes in admin panel immediately affect the booking system
- **Fallback System**: If database fails, falls back to local configuration

## 🔧 How It Works

### Time Slot Generation Algorithm
1. **Get Store Hours**: Retrieve opening/closing times for the selected date
2. **Calculate Slots**: Generate time slots by incrementing by the configured duration
3. **Check Capacity**: Count existing confirmed bookings for each time slot
4. **Filter Available**: Only show time slots that haven't reached maximum capacity
5. **Update UI**: Dynamically update the booking form with available slots

### Example Time Slot Generation
- **Opening Time**: 09:00
- **Closing Time**: 18:00
- **Duration**: 30 minutes
- **Max Bookings**: 3 per slot

**Generated Slots**: 09:00, 09:30, 10:00, 10:30, 11:00, 11:30, 12:00, 12:30, 13:00, 13:30, 14:00, 14:30, 15:00, 15:30, 16:00, 16:30, 17:00, 17:30, 18:00

**If 09:00 has 3 bookings**: 09:00 slot is removed from available options

## 📱 Admin Panel Usage

### 1. Access Store Management
- Go to `/admin` page
- Click on the "Store" tab
- Configure your business settings

### 2. Configure Opening Hours
- Set which days your business is open
- Set opening and closing times for each day
- Enable/disable specific days

### 3. Set Booking Preferences
- **Time Slot Duration**: Choose between 15, 30, 45, or 60 minutes
- **Max Bookings Per Slot**: Set how many customers can book the same time
- **Max Advance Booking**: Set how far in advance customers can book

### 4. Save Configuration
- Click "Edit" to make changes
- Click "Save" to update the database
- Changes take effect immediately

## 🎯 Booking System Integration

### 1. Automatic Time Slot Filtering
- When a customer selects a date, only available time slots are shown
- Time slots that are fully booked are automatically hidden
- Real-time updates as bookings are made

### 2. Capacity Management
- Each time slot can only have the configured maximum number of bookings
- Once a slot is full, it's removed from the booking options
- Admins can see how many slots are available in real-time

### 3. Fallback System
- If the database is unavailable, the system falls back to local configuration
- Ensures the booking system continues to work even during database issues

## 🚀 Benefits

### For Business Owners
- **Flexible Scheduling**: Easy to adjust business hours and booking preferences
- **Capacity Control**: Prevent overbooking of popular time slots
- **Real-time Management**: See and manage availability instantly
- **Professional Appearance**: Automated time slot management looks professional

### For Customers
- **Accurate Availability**: Only see time slots that are actually available
- **No Double Booking**: Impossible to book a time that's already full
- **Real-time Updates**: See current availability without refreshing
- **Better Experience**: Clear, organized time slot options

## 🔍 Troubleshooting

### Common Issues

1. **Time Slots Not Loading**
   - Check if the `store_config` table exists in Supabase
   - Verify your environment variables are set correctly
   - Check browser console for error messages

2. **Configuration Not Saving**
   - Ensure you have proper permissions in Supabase
   - Check if RLS policies are configured correctly
   - Verify the database connection

3. **Time Slots Not Updating**
   - Check if the `getAvailableTimeSlots` function is working
   - Verify that bookings are being saved with correct status
   - Check if the honeypot field (`company`) is working correctly

### Debug Steps

1. **Check Database**: Verify `store_config` table exists and has data
2. **Check Console**: Look for error messages in browser console
3. **Check Network**: Verify API calls to Supabase are successful
4. **Check Permissions**: Ensure your Supabase key has proper access

## 📚 API Reference

### Store Configuration Client

```typescript
// Get current store configuration
const config = await supabaseStoreClient.getStoreConfig();

// Update store configuration
await supabaseStoreClient.updateStoreConfig(newConfig);

// Get available time slots for a specific date
const timeSlots = await supabaseStoreClient.getAvailableTimeSlots('2024-12-25');
```

### Hook Usage

```typescript
import { useStoreSettings } from '@/hooks/useStoreSettings';

const { storeSettings, generateTimeSlots, isDateBookable } = useStoreSettings();
```

## 🎉 Next Steps

After setting up the store configuration system:

1. **Test the Admin Panel**: Configure your business hours and preferences
2. **Test the Booking System**: Make test bookings to verify time slot filtering
3. **Monitor Capacity**: Watch how time slots are automatically managed
4. **Customize Further**: Adjust settings based on your business needs

The system is now fully integrated and will automatically manage your booking availability based on your configuration! 