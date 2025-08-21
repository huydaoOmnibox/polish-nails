import { useState, useEffect, useCallback } from 'react';
import { StoreSettings } from '@/types';
import { supabaseStoreClient } from '@/lib/data/supabaseStoreClient';

const defaultStoreSettings: StoreSettings = {
  storeName: 'Polish Nail Salon',
  storeAddress: '123 Main Street, City, State 12345',
  storePhone: '+1 (555) 123-4567',
  storeEmail: 'info@polishnail.com',
  openingHours: {
    monday: { open: '09:00', close: '18:00', isOpen: true },
    tuesday: { open: '09:00', close: '18:00', isOpen: true },
    wednesday: { open: '09:00', close: '18:00', isOpen: true },
    thursday: { open: '09:00', close: '18:00', isOpen: true },
    friday: { open: '09:00', close: '18:00', isOpen: true },
    saturday: { open: '10:00', close: '16:00', isOpen: true },
    sunday: { open: '10:00', close: '16:00', isOpen: false },
  },
  timeSlotDuration: 30, // 30 minutes
  maxBookingsPerSlot: 3, // maximum bookings per time slot
  maxAdvanceBooking: 1095, // 3 years (3 * 365 days)
};

export function useStoreSettings() {
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(defaultStoreSettings);
  const [isLoading, setIsLoading] = useState(false);

  // Load store settings from database
  useEffect(() => {
    const loadStoreSettings = async () => {
      setIsLoading(true);
      try {
        const config = await supabaseStoreClient.getStoreConfig();
        setStoreSettings(config);
      } catch (error) {
        console.error('Failed to load store settings:', error);
        // Keep default settings if loading fails
      } finally {
        setIsLoading(false);
      }
    };

    loadStoreSettings();
  }, []);

  // Generate time slots based on store hours and time slot duration
  const generateTimeSlots = useCallback((date: string): string[] => {
    const dayOfWeek = new Date(date).getDay();
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = dayNames[dayOfWeek] as keyof typeof storeSettings.openingHours;
    const dayHours = storeSettings.openingHours[dayName];

    if (!dayHours.isOpen) {
      return [];
    }

    const slots = [];
    const [openHour, openMinute] = dayHours.open.split(':').map(Number);
    const [closeHour, closeMinute] = dayHours.close.split(':').map(Number);
    
    let currentHour = openHour;
    let currentMinute = openMinute;

    // Generate slots until we reach or exceed the closing time
    while (
      currentHour < closeHour || 
      (currentHour === closeHour && currentMinute <= closeMinute)
    ) {
      const time = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
      slots.push(time);

      // Add time slot duration
      currentMinute += storeSettings.timeSlotDuration;
      if (currentMinute >= 60) {
        currentHour += Math.floor(currentMinute / 60);
        currentMinute = currentMinute % 60;
      }
    }

    return slots;
  }, [storeSettings.openingHours, storeSettings.timeSlotDuration]);

  // Check if a date is bookable (within max advance booking days)
  const isDateBookable = useCallback((date: string): boolean => {
    const today = new Date();
    const bookingDate = new Date(date);
    const diffTime = bookingDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays >= 0 && diffDays <= storeSettings.maxAdvanceBooking;
  }, [storeSettings.maxAdvanceBooking]);

  // Get available dates for booking
  const getAvailableDates = useCallback((): string[] => {
    const dates: string[] = [];
    const today = new Date();
    
    for (let i = 0; i <= storeSettings.maxAdvanceBooking; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      
      // Check if the store is open on this day
      const dayOfWeek = date.getDay();
      const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      const dayName = dayNames[dayOfWeek] as keyof typeof storeSettings.openingHours;
      const dayHours = storeSettings.openingHours[dayName];
      
      if (dayHours.isOpen) {
        dates.push(dateString);
      }
    }
    
    return dates;
  }, [storeSettings.maxAdvanceBooking, storeSettings.openingHours]);

  return {
    storeSettings,
    setStoreSettings,
    isLoading,
    generateTimeSlots,
    isDateBookable,
    getAvailableDates,
  };
} 