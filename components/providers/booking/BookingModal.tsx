"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button as NextuiButton } from '@nextui-org/button';
import { motion, AnimatePresence } from 'framer-motion';
import { supabaseBookingClient } from '@/lib/data/supabaseBookingClient';
import { supabaseStoreClient } from '@/lib/data/supabaseStoreClient';
import { BookingFormValues, Booking, BookingSubmissionData } from '@/types';
import { cn } from '@/utils/utils';
import { useStoreSettings } from '@/hooks/useStoreSettings';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: Partial<BookingFormValues>;
}

interface FormErrors {
  [key: string]: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialValues,
}) => {
  const [formData, setFormData] = useState<BookingFormValues>({
    bookingDate: new Date().toISOString().split('T')[0], // Default to today
    bookingTime: '',
    fullName: '',
    email: '',
    phone: '',
    notes: '',
    company: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);
  const { generateTimeSlots, isDateBookable, storeSettings } = useStoreSettings();
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  // Set initial values when modal opens
  useEffect(() => {
    if (isOpen && initialValues) {
      setFormData(prev => ({ ...prev, ...initialValues }));
    }
    if (isOpen) {
      // Load available time slots for the selected date (or today as default)
      const selectedDate = formData.bookingDate || new Date().toISOString().split('T')[0];
      const loadTimeSlots = async () => {
        try {
          const timeSlots = await supabaseStoreClient.getAvailableTimeSlots(selectedDate);
          setAvailableTimeSlots(timeSlots);
        } catch (error) {
          console.error('Failed to load time slots:', error);
          // Fallback to local generation if database fails
          const fallbackSlots = generateTimeSlots(selectedDate);
          setAvailableTimeSlots(fallbackSlots);
        }
      };
      loadTimeSlots();
    }
  }, [isOpen, initialValues, generateTimeSlots, formData.bookingDate]);

  // Update time slots when date changes
  useEffect(() => {
    if (formData.bookingDate) {
      const loadAvailableTimeSlots = async () => {
        try {
          const newTimeSlots = await supabaseStoreClient.getAvailableTimeSlots(formData.bookingDate);
          setAvailableTimeSlots(newTimeSlots);
          
          // Only clear time if the current selected time is not available in new slots
          if (formData.bookingTime && !newTimeSlots.includes(formData.bookingTime)) {
            setFormData(prev => ({ ...prev, bookingTime: '' }));
          }
        } catch (error) {
          console.error('Failed to load available time slots:', error);
          // Fallback to local generation if database fails
          const fallbackSlots = generateTimeSlots(formData.bookingDate);
          setAvailableTimeSlots(fallbackSlots);
        }
      };
      
      loadAvailableTimeSlots();
    }
  }, [formData.bookingDate, generateTimeSlots, formData.bookingTime]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        bookingDate: new Date().toISOString().split('T')[0], // Default to today
        bookingTime: '',
        fullName: '',
        email: '',
        phone: '',
        notes: '',
        company: '',
      });
      setErrors({});
      setIsSubmitting(false);
      setIsSuccess(false);
      setCreatedBooking(null);
    }
  }, [isOpen]);

  // Focus trap and ESC key handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const today = new Date().toISOString().split('T')[0];

    if (!formData.bookingDate) {
      newErrors.bookingDate = 'Booking date is required';
    } else if (formData.bookingDate < today) {
      newErrors.bookingDate = 'Booking date must be today or later';
    } else if (!isDateBookable(formData.bookingDate)) {
      newErrors.bookingDate = 'Booking date is too far in advance';
    }

    if (!formData.bookingTime) {
      newErrors.bookingTime = 'Booking time is required';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 10) {
      newErrors.phone = 'Phone number must be at least 10 characters';
    }

    if (formData.notes.length > 500) {
      newErrors.notes = 'Notes must be 500 characters or less';
    }

    // Honeypot validation
    if (formData.company) {
      newErrors.company = 'Invalid submission';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const { company, ...submitData } = formData; // Remove honeypot field
      const booking = await supabaseBookingClient.createBooking(submitData);
      setCreatedBooking(booking);
      setIsSuccess(true);
    } catch (error) {
      console.error('Booking creation failed:', error);
      setErrors({ submit: 'Failed to create booking. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof BookingFormValues, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
      >
        <motion.div
          ref={modalRef}
          className="relative w-full max-w-lg rounded-2xl bg-gray-800 p-8 shadow-2xl border border-gray-700"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-gray-300 hover:text-white hover:bg-gray-700 rounded-full p-1 transition-all duration-200"
            aria-label="Close modal"
          >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {!isSuccess ? (
            <>
                              <div className="text-center mb-6">
                  <div className="mx-auto mb-2 flex items-center justify-center">
                    <img src="/logo.webp" alt="Logo" className="h-36 w-36 object-contain" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-[#d4af37] via-[#f1c40f] via-[#ffd700] via-[#f1c40f] to-[#d4af37] bg-clip-text text-transparent drop-shadow-lg shadow-[#d4af37]/30">
                    Book Your Appointment
                  </h2>
                  <p className="mt-2 text-[#E8DD95] font-medium">Book now to upgrade your look</p>
                </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field */}
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />



                {/* Date and Time Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Booking Date */}
                  <div className="bg-gray-700 rounded-xl p-4 border border-gray-600 shadow-sm">
                    <label htmlFor="bookingDate" className="block text-sm font-semibold text-gray-100 mb-2">
                      Booking Date *
                    </label>
                    <input
                      type="date"
                      id="bookingDate"
                      value={formData.bookingDate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('bookingDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      max={new Date(Date.now() + storeSettings.maxAdvanceBooking * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      className={cn(
                        "w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8DD95] focus:border-[#E8DD95] transition-all duration-200 bg-gray-600 text-white placeholder-gray-300 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert",
                        errors.bookingDate && "border-red-400 focus:ring-red-500 focus:border-red-400"
                      )}
                    />
                    {errors.bookingDate && (
                      <p className="mt-2 text-sm text-red-500 font-medium">{errors.bookingDate}</p>
                    )}
                  </div>

                  {/* Booking Time */}
                  <div className="bg-gray-700 rounded-xl p-4 border border-gray-600 shadow-sm">
                    <label htmlFor="bookingTime" className="block text-sm font-semibold text-gray-100 mb-2">
                      Booking Time *
                    </label>
                    {availableTimeSlots.length > 0 ? (
                      <select
                        id="bookingTime"
                        value={formData.bookingTime}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange('bookingTime', e.target.value)}
                        className={cn(
                          "w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8DD95] focus:border-[#E8DD95] transition-all duration-200 bg-gray-600 text-white placeholder-gray-300",
                          errors.bookingTime && "border-red-400 focus:ring-red-500 focus:border-red-400"
                        )}
                      >
                        <option value="">Select a time</option>
                        {availableTimeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="w-full px-4 py-3 border border-gray-600 rounded-xl bg-gray-600 text-gray-300 font-medium">
                        No available time slots for this date
                      </div>
                    )}
                    {errors.bookingTime && (
                      <p className="mt-2 text-sm text-red-500 font-medium">{errors.bookingTime}</p>
                    )}
                  </div>
                </div>

                {/* Full Name - Full Row */}
                <div className="bg-gray-700 rounded-xl p-4 border border-gray-600 shadow-sm">
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-100 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    className={cn(
                      "w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8DD95] focus:border-[#E8DD95] transition-all duration-200 bg-gray-600 text-white placeholder-gray-300",
                      errors.fullName && "border-red-400 focus:border-red-400"
                    )}
                  />
                  {errors.fullName && (
                    <p className="mt-2 text-sm text-red-500 font-medium">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="bg-gray-700 rounded-xl p-4 border border-gray-600 shadow-sm">
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-100 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                      className={cn(
                        "w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8DD95] focus:border-[#E8DD95] transition-all duration-200 bg-gray-600 text-white placeholder-gray-300",
                        errors.phone && "border-red-400 focus:border-red-400"
                      )}
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-500 font-medium">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="bg-gray-700 rounded-xl p-4 border border-gray-600 shadow-sm">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-100 mb-2">
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email for booking code"
                      className={cn(
                        "w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8DD95] focus:border-[#E8DD95] transition-all duration-200 bg-gray-600 text-white placeholder-gray-300",
                        errors.email && "border-red-400 focus:border-red-400"
                      )}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-500 font-medium">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-gray-700 rounded-xl p-4 border border-gray-600 shadow-sm">
                  <label htmlFor="notes" className="block text-sm font-semibold text-gray-100 mb-2">
                    Notes (optional)
                  </label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('notes', e.target.value)}
                    placeholder="Any special requests or additional information..."
                    maxLength={500}
                    rows={3}
                    className={cn(
                      "w-full px-4 py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8DD95] focus:border-[#E8DD95] transition-all duration-200 bg-gray-600 text-white placeholder-gray-300 resize-none",
                      errors.notes && "border-red-400 focus:border-red-400"
                    )}
                  />
                  <div className="text-xs text-[#E8DD95] text-right mt-2 font-medium">
                    {formData.notes.length}/500
                  </div>
                  {errors.notes && (
                    <p className="mt-2 text-sm text-red-500 font-medium">{errors.notes}</p>
                  )}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="text-sm text-red-500 bg-red-50 p-4 rounded-xl border border-red-200 font-medium">
                    {errors.submit}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-6">
                  <NextuiButton
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-[#d4af37] via-[#f1c40f] via-[#ffd700] via-[#f1c40f] to-[#d4af37] text-center text-sm font-bold uppercase leading-4 text-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'BOOKING...' : 'BOOK NOW'}
                  </NextuiButton>
                </div>
              </form>
            </>
          ) : (
            /* Success View */
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#d4af37] via-[#f1c40f] via-[#ffd700] via-[#f1c40f] to-[#d4af37] shadow-2xl shadow-[#d4af37]/40">
                <svg className="h-10 w-10 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mb-3 text-2xl font-bold bg-gradient-to-r from-[#d4af37] via-[#f1c40f] via-[#ffd700] via-[#f1c40f] to-[#d4af37] bg-clip-text text-transparent drop-shadow-lg shadow-[#d4af37]/30">
                Booking Code Generated! 🎉
              </h3>
              <p className="mb-6 text-[#E8DD95] font-medium">
                Your appointment has been scheduled! Here&apos;s your booking code:
              </p>
              <div className="mb-8 rounded-xl bg-white p-6 text-left text-sm border border-gray-300 shadow-sm">
                <div className="mb-3">
                  <span className="font-semibold text-gray-800">Name:</span> {createdBooking?.fullName}
                </div>
                <div className="mb-3">
                  <span className="font-semibold text-gray-800">Date:</span> {createdBooking?.bookingDate}
                </div>
                <div className="mb-3">
                  <span className="font-semibold text-gray-800">Time:</span> {createdBooking?.bookingTime}
                </div>

                {createdBooking?.email && (
                  <div className="mb-3">
                    <span className="font-semibold text-gray-800">Email:</span> {createdBooking.email}
                  </div>
                )}
                <div>
                  <span className="font-semibold text-gray-800">Booking Code:</span> {createdBooking?.id.slice(-6).toUpperCase()}
                </div>
              </div>
              <NextuiButton
                className="w-full h-12 bg-[#E8DD95] hover:bg-[#E8DD95]/90 text-gray-800 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={onClose}
              >
                Close
              </NextuiButton>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal; 