import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface StoreHours {
  monday: { open: string; close: string; isOpen: boolean };
  tuesday: { open: string; close: string; isOpen: boolean };
  wednesday: { open: string; close: string; isOpen: boolean };
  thursday: { open: string; close: string; isOpen: boolean };
  friday: { open: string; close: string; isOpen: boolean };
  saturday: { open: string; close: string; isOpen: boolean };
  sunday: { open: string; close: string; isOpen: boolean };
}

export interface StoreSettings {
  storeName: string;
  storeAddress: string;
  storePhone: string;
  storeEmail: string;
  openingHours: StoreHours;
  timeSlotDuration: number; // in minutes
  maxBookingsPerSlot: number; // maximum bookings per time slot
  maxAdvanceBooking: number; // in days
}

export interface BookingFormValues {
  bookingDate: string;
  bookingTime: string;
  fullName: string;
  email?: string;
  phone: string;
  notes: string;
  company: string; // honeypot field
}

export interface BookingSubmissionData {
  bookingDate: string;
  bookingTime: string;
  fullName: string;
  email?: string;
  phone: string;
  notes: string;
}

export interface Booking {
  id: string;
  bookingDate: string;
  bookingTime: string;
  fullName: string;
  email?: string;
  phone: string;
  notes: string;
  company: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'done';
  createdAt: string;
  updatedAt: string;
}

export interface DatabaseBooking {
  id: string;
  booking_date: string;
  booking_time: string;
  full_name: string;
  email?: string;
  phone: string;
  notes: string;
  company: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'done';
  created_at: string;
  updated_at: string;
}

export interface BookingFilters {
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: Booking['status'];
}

export interface BookingListResponse {
  data: Booking[];
  total: number;
}
