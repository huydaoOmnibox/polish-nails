import { supabase } from '@/lib/supabase';
import { Booking, BookingSubmissionData, BookingFilters, BookingListResponse, DatabaseBooking } from '@/types';

// Helper function to convert database format to application format
const convertDatabaseToApp = (dbBooking: DatabaseBooking): Booking => ({
  id: dbBooking.id,
  bookingDate: dbBooking.booking_date,
  bookingTime: dbBooking.booking_time,
  fullName: dbBooking.full_name,
  email: dbBooking.email,
  phone: dbBooking.phone,
  notes: dbBooking.notes,
  company: dbBooking.company,
  status: dbBooking.status,
  createdAt: dbBooking.created_at,
  updatedAt: dbBooking.updated_at,
});

// Helper function to convert application format to database format
const convertAppToDatabase = (booking: BookingSubmissionData): Partial<DatabaseBooking> => ({
  booking_date: booking.bookingDate,
  booking_time: booking.bookingTime,
  full_name: booking.fullName,
  email: booking.email,
  phone: booking.phone,
  notes: booking.notes,
  company: '', // honeypot field
});

export const supabaseBookingClient = {
  async createBooking(form: BookingSubmissionData): Promise<Booking> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert(convertAppToDatabase(form))
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Failed to create booking: ${error.message}`);
      }

      if (!data) {
        throw new Error('No data returned from booking creation');
      }

      return convertDatabaseToApp(data);
    } catch (error) {
      console.error('Booking creation failed:', error);
      throw new Error('Failed to create booking. Please try again.');
    }
  },

  async listBookings(filters?: BookingFilters): Promise<BookingListResponse> {
    try {
      let query = supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply search filter
      if (filters?.search) {
        const search = filters.search.toLowerCase();
        query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
      }

      // Apply status filter
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      // Apply date range filter
      if (filters?.dateFrom) {
        query = query.gte('booking_date', filters.dateFrom);
      }

      if (filters?.dateTo) {
        query = query.lte('booking_date', filters.dateTo);
      }

      const { data, error, count } = await query;

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Failed to fetch bookings: ${error.message}`);
      }

      const bookings = data ? data.map(convertDatabaseToApp) : [];
      
      return {
        data: bookings,
        total: count || 0,
      };
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      throw new Error('Failed to fetch bookings. Please try again.');
    }
  },

  async getBooking(id: string): Promise<Booking | null> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // No rows returned
        }
        console.error('Supabase error:', error);
        throw new Error(`Failed to fetch booking: ${error.message}`);
      }

      return data ? convertDatabaseToApp(data) : null;
    } catch (error) {
      console.error('Failed to fetch booking:', error);
      throw new Error('Failed to fetch booking. Please try again.');
    }
  },

  async updateBooking(id: string, updates: Partial<BookingSubmissionData>): Promise<Booking> {
    try {
      const updateData: Partial<DatabaseBooking> = {};
      
      if (updates.bookingDate) updateData.booking_date = updates.bookingDate;
      if (updates.bookingTime) updateData.booking_time = updates.bookingTime;
      if (updates.fullName) updateData.full_name = updates.fullName;
      if (updates.email !== undefined) updateData.email = updates.email;
      if (updates.phone) updateData.phone = updates.phone;
      if (updates.notes !== undefined) updateData.notes = updates.notes;

      const { data, error } = await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Failed to update booking: ${error.message}`);
      }

      if (!data) {
        throw new Error('No data returned from booking update');
      }

      return convertDatabaseToApp(data);
    } catch (error) {
      console.error('Failed to update booking:', error);
      throw new Error('Failed to update booking. Please try again.');
    }
  },

  async updateBookingStatus(id: string, status: Booking['status']): Promise<Booking> {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Failed to update booking status: ${error.message}`);
      }

      if (!data) {
        throw new Error('No data returned from status update');
      }

      return convertDatabaseToApp(data);
    } catch (error) {
      console.error('Failed to update booking status:', error);
      throw new Error('Failed to update booking status. Please try again.');
    }
  },

  async deleteBooking(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Failed to delete booking: ${error.message}`);
      }
    } catch (error) {
      console.error('Failed to delete booking:', error);
      throw new Error('Failed to delete booking. Please try again.');
    }
  },
}; 