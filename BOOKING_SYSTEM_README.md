# Booking System Documentation

This document describes the new booking system implemented in the Polish Nail application.

## Overview

The booking system provides a global, reusable way to collect customer appointments with a modal interface and admin management panel.

## Features

- **Global Booking Modal**: Accessible from anywhere in the app
- **Form Validation**: Client-side validation with inline error messages
- **Responsive Design**: Works on all device sizes
- **Accessibility**: Focus trap, ESC key support, ARIA labels
- **Admin Panel**: View, filter, and manage all bookings
- **Mock Data Store**: Ready for easy API integration

## Components

### 1. BookingProvider (`components/providers/booking/BookingProvider.tsx`)

The main context provider that manages the modal state and renders the modal portal.

**Usage**: Already integrated in `app/providers.tsx`

### 2. BookingButton (`components/booking/BookingButton.tsx`)

A reusable button component that triggers the booking modal.

**Props:**
- `label`: Button text (default: "Book now")
- `variant`: Button style variant
- `color`: Button color
- `size`: Button size
- `className`: Custom CSS classes
- `prefill`: Pre-fill form fields
- `children`: Custom button content

**Example:**
```tsx
import { BookingButton } from '@/components/booking';

// Basic usage
<BookingButton />

// Custom styling
<BookingButton 
  label="Schedule Appointment"
  variant="bordered"
  color="primary"
  size="lg"
/>

// Pre-fill form
<BookingButton 
  prefill={{ 
    fullName: "John Doe",
    email: "john@example.com"
  }}
/>
```

### 3. BookingModal (`components/providers/booking/BookingModal.tsx`)

The modal component containing the booking form.

**Features:**
- Required fields: booking date, full name, email, phone, party size
- Optional field: notes (max 500 characters)
- Date validation (no past dates)
- Honeypot spam protection
- Success confirmation view
- Responsive design with Tailwind CSS

## Data Layer

### Mock Client (`lib/data/bookingClient.ts`)

Currently uses in-memory storage with mock data. Ready for API integration.

**Methods:**
- `createBooking(form)`: Create new booking
- `listBookings(filters)`: List bookings with filtering
- `updateStatus(id, status)`: Update booking status
- `softDelete(id)`: Delete booking

**TODO**: Replace with real API calls

## Admin Panel

### Route: `/admin/bookings`

**Features:**
- View all bookings in a table format
- Filter by search term, date range, and status
- Pagination support
- Actions: confirm, cancel, delete bookings
- Responsive design

**Columns:**
- ID, Name, Email, Date, Party Size, Status, Created Date, Actions

## Integration Examples

### 1. Add to Navbar
```tsx
import { BookingButton } from '@/components/booking';

<NavbarItem>
  <BookingButton
    label="Book Now"
    size="sm"
    variant="bordered"
    className="text-white border-white hover:bg-white hover:text-gray-900"
  />
</NavbarItem>
```

### 2. Add to Homepage Banner
```tsx
import { BookingButton } from '@/components/booking';

<BookingButton 
  label="BOOK NOW" 
  size="lg"
  className="custom-styling"
/>
```

### 3. Add to Service Cards
```tsx
import { BookingButton } from '@/components/booking';

<BookingButton 
  label="Book This Service"
  prefill={{ 
    notes: "Interested in Acrylic Nails"
  }}
/>
```

## Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| bookingDate | date | Yes | Must be today or later |
| fullName | text | Yes | Min 2 characters |
| email | email | Yes | Valid email format |
| phone | tel | Yes | Min 10 characters |
| partySize | select | Yes | 1-20 people |
| notes | textarea | No | Max 500 characters |
| company | hidden | No | Honeypot field |

## Styling

The system uses:
- **Tailwind CSS** for styling
- **NextUI** components where available
- **Framer Motion** for animations
- **Responsive design** principles

## Future Enhancements

1. **API Integration**: Replace mock client with real backend
2. **Email Notifications**: Send confirmation emails
3. **Calendar Integration**: Sync with external calendars
4. **Payment Processing**: Add payment collection
5. **Recurring Bookings**: Support for regular appointments
6. **SMS Notifications**: Text message reminders

## Troubleshooting

### Modal not opening
- Ensure `BookingProvider` is wrapped around your app
- Check browser console for errors
- Verify the button is using the correct import

### Form validation errors
- Check that all required fields are filled
- Ensure date is not in the past
- Verify email format is correct

### Admin panel not loading
- Check that the route `/admin/bookings` is accessible
- Verify mock data is properly seeded
- Check browser console for errors

## Development Notes

- All components are TypeScript-based
- Uses React hooks for state management
- Follows Next.js 14+ app router patterns
- Implements proper accessibility features
- Ready for production deployment 