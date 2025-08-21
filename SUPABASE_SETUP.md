# Supabase Integration Setup

This guide explains how to set up Supabase for the Polish Nail booking system.

## 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://trcxbgckuzlrnxoswmfy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyY3hiZ2NrdXpscm54b3N3bWZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MDg5NjAsImV4cCI6MjA3MTI4NDk2MH0.3ffV3vEz4xTJ1-DGB0ol6cq2PMWUcC8YZJSkFtzS4F0
```

## 2. Database Setup

### Run the SQL Schema

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `database-schema.sql`
4. Execute the SQL to create the bookings table

### Table Structure

The `bookings` table includes:
- `id`: UUID primary key
- `booking_date`: Date of the appointment
- `booking_time`: Time of the appointment
- `full_name`: Customer's full name
- `email`: Customer's email (optional)
- `phone`: Customer's phone number
- `notes`: Additional notes (optional)
- `company`: Honeypot field for spam protection
- `status`: Booking status (pending, confirmed, cancelled, done)
- `created_at`: Timestamp when booking was created
- `updated_at`: Timestamp when booking was last updated

## 3. Features Implemented

### ✅ Completed
- Supabase client configuration
- Database schema with proper indexing
- Row Level Security (RLS) enabled
- Automatic timestamp updates
- Full CRUD operations for bookings
- Error handling and logging
- Type safety with TypeScript interfaces

### 🔧 Database Operations
- **Create**: Add new bookings
- **Read**: List all bookings with filtering
- **Update**: Modify booking details and status
- **Delete**: Remove bookings permanently

### 🎯 Admin Features
- View all bookings
- Filter by date, status, and search terms
- Update booking status
- Delete bookings
- Edit booking details

## 4. Security Features

- **Row Level Security (RLS)**: Enabled on the bookings table
- **Honeypot Field**: `company` field to catch automated spam
- **Input Validation**: Server-side validation for all fields
- **Error Handling**: Proper error messages without exposing internals

## 5. Performance Optimizations

- **Indexes**: Created on frequently queried fields
- **Pagination**: Built-in support for large datasets
- **Efficient Queries**: Optimized SQL queries with proper joins

## 6. Usage

### Frontend Integration
The system automatically uses Supabase when the environment variables are set. No code changes are needed in the frontend components.

### API Endpoints
All database operations are handled through the `supabaseBookingClient`:
- `createBooking()`: Create new booking
- `listBookings()`: Get all bookings with filters
- `getBooking()`: Get single booking by ID
- `updateBooking()`: Update booking details
- `updateBookingStatus()`: Change booking status
- `deleteBooking()`: Remove booking

## 7. Troubleshooting

### Common Issues
1. **Environment Variables**: Ensure `.env.local` is in project root
2. **Database Connection**: Check Supabase URL and key are correct
3. **Table Permissions**: Verify RLS policies allow the operations you need
4. **CORS Issues**: Supabase handles CORS automatically

### Debug Mode
Enable console logging by checking the browser console for detailed error messages from the Supabase client.

## 8. Next Steps

Consider implementing:
- User authentication and authorization
- Email notifications for booking confirmations
- Calendar integration
- Payment processing
- Advanced reporting and analytics 