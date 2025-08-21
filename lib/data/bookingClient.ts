import { Booking, BookingFormValues, BookingSubmissionData, BookingFilters, BookingListResponse } from '@/types';

// Mock data store - TODO: replace with real API
let bookings: Booking[] = [
  {
    id: '1',
    bookingDate: '2024-12-25',
    bookingTime: '14:00',
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    notes: 'Christmas nail appointment',
    company: '',
    status: 'confirmed',
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-01T10:00:00Z',
  },
  {
    id: '2',
    bookingDate: '2024-12-26',
    bookingTime: '15:30',
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1234567891',
    notes: 'Family nail care',
    company: '',
    status: 'pending',
    createdAt: '2024-12-02T11:00:00Z',
    updatedAt: '2024-12-02T11:00:00Z',
  },
  {
    id: '3',
    bookingDate: '2024-12-27',
    bookingTime: '16:00',
    fullName: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '+1234567892',
    notes: 'Solo nail care',
    company: '',
    status: 'cancelled',
    createdAt: '2024-12-03T12:00:00Z',
    updatedAt: '2024-12-03T12:00:00Z',
  },
  {
    id: '4',
    bookingDate: '2024-12-28',
    bookingTime: '17:30',
    fullName: 'Alice Brown',
    email: 'alice@example.com',
    phone: '+1234567893',
    notes: 'Birthday nail celebration',
    company: '',
    status: 'done',
    createdAt: '2024-12-04T09:00:00Z',
    updatedAt: '2024-12-04T09:00Z',
  },
];

export const bookingClient = {
  async createBooking(form: BookingSubmissionData): Promise<Booking> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newBooking: Booking = {
      id: Date.now().toString(),
      ...form,
      email: form.email || '', // Ensure email is always a string
      company: '', // Add empty company field for honeypot
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    bookings.push(newBooking);
    return newBooking;
  },

  async listBookings(filters?: BookingFilters): Promise<BookingListResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredBookings = [...bookings];
    
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filteredBookings = filteredBookings.filter(booking =>
        booking.fullName.toLowerCase().includes(search) ||
        (booking.email && booking.email.toLowerCase().includes(search))
      );
    }
    
    if (filters?.status) {
      filteredBookings = filteredBookings.filter(booking => booking.status === filters.status);
    }
    
    if (filters?.dateFrom) {
      filteredBookings = filteredBookings.filter(booking => booking.bookingDate >= filters.dateFrom!);
    }
    
    if (filters?.dateTo) {
      filteredBookings = filteredBookings.filter(booking => booking.bookingDate <= filters.dateTo!);
    }
    
    return {
      data: filteredBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
      total: filteredBookings.length,
    };
  },

  async updateStatus(id: string, status: Booking['status']): Promise<Booking> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const booking = bookings.find(b => b.id === id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    
    booking.status = status;
    booking.updatedAt = new Date().toISOString();
    
    return booking;
  },

  async softDelete(id: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      bookings.splice(index, 1);
    }
  },
}; 