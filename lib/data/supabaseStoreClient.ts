import { supabase } from '@/lib/supabase';
import { StoreSettings, StoreHours } from '@/types';

export interface DatabaseStoreConfig {
  id: string;
  store_name: string;
  store_address: string | null;
  store_phone: string | null;
  store_email: string | null;
  opening_hours: {
    [key: string]: {
      open: string;
      close: string;
      isOpen: boolean;
    };
  };
  time_slot_duration: number;
  max_bookings_per_slot: number;
  max_advance_booking: number;
  created_at: string;
  updated_at: string;
}

export const supabaseStoreClient = {
  // Get store configuration
  async getStoreConfig(): Promise<StoreSettings> {
    try {
      const { data, error } = await supabase
        .from('store_config')
        .select('*')
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching store config:', error);
        throw error;
      }

      if (!data) {
        // Return default configuration if none exists
        return {
          storeName: 'Polish Nail Salon',
          storeAddress: '',
          storePhone: '',
          storeEmail: '',
          openingHours: {
            monday: { open: '09:00', close: '18:00', isOpen: true },
            tuesday: { open: '09:00', close: '18:00', isOpen: true },
            wednesday: { open: '09:00', close: '18:00', isOpen: true },
            thursday: { open: '09:00', close: '18:00', isOpen: true },
            friday: { open: '09:00', close: '18:00', isOpen: true },
            saturday: { open: '09:00', close: '18:00', isOpen: true },
            sunday: { open: '09:00', close: '18:00', isOpen: false }
          },
          timeSlotDuration: 30,
          maxBookingsPerSlot: 3,
          maxAdvanceBooking: 1095
        };
      }

      // Convert database format to app format
      return {
        storeName: data.store_name,
        storeAddress: data.store_address || '',
        storePhone: data.store_phone || '',
        storeEmail: data.store_email || '',
        openingHours: data.opening_hours,
        timeSlotDuration: data.time_slot_duration,
        maxBookingsPerSlot: data.max_bookings_per_slot,
        maxAdvanceBooking: data.max_advance_booking
      };
    } catch (error) {
      console.error('Error in getStoreConfig:', error);
      throw error;
    }
  },

  // Update store configuration
  async updateStoreConfig(config: StoreSettings): Promise<void> {
    try {
      // Always update the existing record instead of creating new ones
      // First, get the existing record ID
      const { data: existingConfig, error: fetchError } = await supabase
        .from('store_config')
        .select('id')
        .limit(1)
        .single();

      if (fetchError) {
        console.error('Error fetching existing config:', fetchError);
        throw fetchError;
      }

      if (existingConfig) {
        // Update the existing record
        const { error } = await supabase
          .from('store_config')
          .update({
            store_name: config.storeName,
            store_address: config.storeAddress,
            store_phone: config.storePhone,
            store_email: config.storeEmail,
            opening_hours: config.openingHours,
            time_slot_duration: config.timeSlotDuration,
            max_bookings_per_slot: config.maxBookingsPerSlot,
            max_advance_booking: config.maxAdvanceBooking
          })
          .eq('id', existingConfig.id);

        if (error) {
          console.error('Error updating store config:', error);
          throw error;
        }
      } else {
        // If no record exists, create the first one
        const { error } = await supabase
          .from('store_config')
          .insert({
            store_name: config.storeName,
            store_address: config.storeAddress,
            store_phone: config.storePhone,
            store_email: config.storeEmail,
            opening_hours: config.openingHours,
            time_slot_duration: config.timeSlotDuration,
            max_bookings_per_slot: config.maxBookingsPerSlot,
            max_advance_booking: config.maxAdvanceBooking
          });

        if (error) {
          console.error('Error creating store config:', error);
          throw error;
        }
      }
    } catch (error) {
      console.error('Error in updateStoreConfig:', error);
      throw error;
    }
  },

  // Get available time slots for a specific date
  async getAvailableTimeSlots(date: string): Promise<string[]> {
    try {
      // Get store configuration
      const storeConfig = await this.getStoreConfig();
      
      // Get day of week
      const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof StoreHours;
      const dayConfig = storeConfig.openingHours[dayOfWeek];
      
      if (!dayConfig || !dayConfig.isOpen) {
        return [];
      }

      // Get existing bookings for this date
      const { data: existingBookings, error } = await supabase
        .from('bookings')
        .select('booking_time, company')
        .eq('booking_date', date)
        .eq('status', 'confirmed');

      if (error) {
        console.error('Error fetching existing bookings:', error);
        throw error;
      }

      // Count bookings per time slot
      const bookingsPerSlot: { [key: string]: number } = {};

      existingBookings?.forEach(booking => {
        if (booking.company === '') { // Only count real bookings, not honeypot
          bookingsPerSlot[booking.booking_time] = (bookingsPerSlot[booking.booking_time] || 0) + 1;
        }
      });

      // Generate all possible time slots
      const timeSlots: string[] = [];
      const [openHour, openMinute] = dayConfig.open.split(':').map(Number);
      const [closeHour, closeMinute] = dayConfig.close.split(':').map(Number);
      
      let currentHour = openHour;
      let currentMinute = openMinute;
      
      while (
        currentHour < closeHour || 
        (currentHour === closeHour && currentMinute <= closeMinute)
      ) {
        const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
        
        // Check if this time slot has available capacity
        const currentBookings = bookingsPerSlot[timeString] || 0;

        if (currentBookings < storeConfig.maxBookingsPerSlot) {
          timeSlots.push(timeString);
        }
        
        // Move to next time slot
        currentMinute += storeConfig.timeSlotDuration;
        if (currentMinute >= 60) {
          currentHour += Math.floor(currentMinute / 60);
          currentMinute = currentMinute % 60;
        }
      }

      return timeSlots;
    } catch (error) {
      console.error('Error in getAvailableTimeSlots:', error);
      throw error;
    }
  }
}; 