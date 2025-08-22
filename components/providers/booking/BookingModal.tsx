"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button as NextuiButton } from '@nextui-org/button';
import { motion, AnimatePresence } from 'framer-motion';

import { supabaseBookingClient } from '@/lib/data/supabaseBookingClient';
import { supabaseStoreClient } from '@/lib/data/supabaseStoreClient';
import { BookingFormValues, Booking } from '@/types';
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
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-1 sm:p-2 md:p-4"
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        onClick={handleBackdropClick}
      >
        <motion.div
          ref={modalRef}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-full max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl rounded-2xl bg-gray-800 p-3 sm:p-4 md:p-6 lg:p-8 shadow-2xl border border-gray-700 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
          exit={{ scale: 0.95, opacity: 0 }}
          initial={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Close button */}
          <button
            aria-label="Close modal"
            className="absolute right-2 top-2 sm:right-3 sm:top-3 md:right-4 md:top-4 lg:right-6 lg:top-6 text-gray-300 hover:text-white hover:bg-gray-700 rounded-full p-1.5 sm:p-2 transition-all duration-200 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={onClose}
          >
            <svg className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </button>

          {!isSuccess ? (
            <>
              <div className="text-center mb-3 sm:mb-4 md:mb-6">
                <div className="mx-auto mb-2 flex items-center justify-center">
                  <img 
                    alt="Logo" 
                    className="h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28 lg:h-36 lg:w-36 object-contain" 
                    src="/logo.webp" 
                  />
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#d4af37] via-[#f1c40f] via-[#ffd700] via-[#f1c40f] to-[#d4af37] bg-clip-text text-transparent drop-shadow-lg shadow-[#d4af37]/30 leading-tight">
                  Book Your Appointment
                </h2>
                <p className="mt-2 text-xs sm:text-sm md:text-base text-[#E8DD95] font-medium">Book now to upgrade your look</p>
              </div>
              
              <form className="space-y-2.5 sm:space-y-3 md:space-y-4" onSubmit={handleSubmit}>
                {/* Honeypot field */}
                <input
                  autoComplete="off"
                  className="hidden"
                  name="company"
                  tabIndex={-1}
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                />

                {/* Date and Time Row - Stack on mobile */}
                <div className="space-y-2.5 sm:space-y-3 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
                  {/* Booking Date */}
                  <div className="bg-gray-700 rounded-xl p-2.5 sm:p-3 md:p-4 border border-gray-600 shadow-sm">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-100 mb-1.5 sm:mb-2" htmlFor="bookingDate">
                      Booking Date *
                    </label>
                    <input
                      className={cn(
                        "w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8DD95] focus:border-[#E8DD95] transition-all duration-200 bg-gray-600 text-white placeholder-gray-300 text-sm sm:text-base [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert min-h-[44px]",
                        errors.bookingDate && "border-red-400 focus:ring-red-500 focus:border-red-400"
                      )}
                      id="bookingDate"
                      max={new Date(Date.now() + storeSettings.maxAdvanceBooking * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      min={new Date().toISOString().split('T')[0]}
                      type="date"
                      value={formData.bookingDate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('bookingDate', e.target.value)}
                    />
                    {errors.bookingDate && (
                      <p className="mt-1.5 sm:mt-2 text-xs text-red-500 font-medium">{errors.bookingDate}</p>
                    )}
                  </div>

                  {/* Booking Time */}
                  <div className="bg-gray-700 rounded-xl p-2.5 sm:p-3 md:p-4 border border-gray-600 shadow-sm">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-100 mb-1.5 sm:mb-2" htmlFor="bookingTime">
                      Booking Time *
                    </label>
                    {availableTimeSlots.length > 0 ? (
                      <select
                        className={cn(
                          "w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8DD95] focus:border-[#E8DD95] transition-all duration-200 bg-gray-600 text-white placeholder-gray-300 text-sm sm:text-base min-h-[44px]",
                          errors.bookingTime && "border-red-400 focus:ring-red-500 focus:border-red-400"
                        )}
                        id="bookingTime"
                        value={formData.bookingTime}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange('bookingTime', e.target.value)}
                      >
                        <option value="">Select a time</option>
                        {availableTimeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-600 rounded-xl bg-gray-600 text-gray-300 font-medium text-sm sm:text-base min-h-[44px] flex items-center">
                        No available time slots for this date
                      </div>
                    )}
                    {errors.bookingTime && (
                      <p className="mt-1.5 sm:mt-2 text-xs text-red-500 font-medium">{errors.bookingTime}</p>
                    )}
                  </div>
                </div>

                {/* Full Name - Full Row */}
                <div className="bg-gray-700 rounded-xl p-2.5 sm:p-3 md:p-4 border border-gray-600 shadow-sm">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-100 mb-1.5 sm:mb-2" htmlFor="fullName">
                    Full Name *
                  </label>
                  <input
                    className={cn(
                      "w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8DD95] focus:border-[#E8DD95] transition-all duration-200 bg-gray-600 text-white placeholder-gray-300 text-sm sm:text-base min-h-[44px]",
                      errors.fullName && "border-red-400 focus:border-red-400"
                    )}
                    id="fullName"
                    placeholder="Enter your full name"
                    type="text"
                    value={formData.fullName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('fullName', e.target.value)}
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 sm:mt-2 text-xs text-red-500 font-medium">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone and Email Row - Stack on mobile */}
                <div className="space-y-2.5 sm:space-y-3 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
                  {/* Phone */}
                  <div className="bg-gray-700 rounded-xl p-2.5 sm:p-3 md:p-4 border border-gray-600 shadow-sm">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-100 mb-1.5 sm:mb-2" htmlFor="phone">
                      Phone *
                    </label>
                    <input
                      className={cn(
                        "w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8DD95] focus:border-[#E8DD95] transition-all duration-200 bg-gray-600 text-white placeholder-gray-300 text-sm sm:text-base min-h-[44px]",
                        errors.phone && "border-red-400 focus:border-red-400"
                      )}
                      id="phone"
                      placeholder="Enter your phone number"
                      type="tel"
                      value={formData.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('phone', e.target.value)}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 sm:mt-2 text-xs text-red-500 font-medium">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="bg-gray-700 rounded-xl p-2.5 sm:p-3 md:p-4 border border-gray-600 shadow-sm">
                    <label className="block text-xs sm:text-sm font-semibold text-gray-100 mb-1.5 sm:mb-2" htmlFor="email">
                      Email (optional)
                    </label>
                    <input
                      className={cn(
                        "w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8DD95] focus:border-[#E8DD95] transition-all duration-200 bg-gray-600 text-white placeholder-gray-300 text-sm sm:text-base min-h-[44px]",
                        errors.email && "border-red-400 focus:border-red-400"
                      )}
                      id="email"
                      placeholder="Enter your email for booking code"
                      type="email"
                      value={formData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
                    />
                    {errors.email && (
                      <p className="mt-1.5 sm:mt-2 text-xs text-red-500 font-medium">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-gray-700 rounded-xl p-2.5 sm:p-3 md:p-4 border border-gray-600 shadow-sm">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-100 mb-1.5 sm:mb-2" htmlFor="notes">
                    Notes (optional)
                  </label>
                  <textarea
                    className={cn(
                      "w-full px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8DD95] focus:border-[#E8DD95] transition-all duration-200 bg-gray-600 text-white placeholder-gray-300 resize-none text-sm sm:text-base min-h-[44px]",
                      errors.notes && "border-red-400 focus:border-red-400"
                    )}
                    id="notes"
                    maxLength={500}
                    placeholder="Any special requests or additional information..."
                    rows={3}
                    value={formData.notes}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('notes', e.target.value)}
                  />
                  <div className="text-xs text-[#E8DD95] text-right mt-1.5 sm:mt-2 font-medium">
                    {formData.notes.length}/500
                  </div>
                  {errors.notes && (
                    <p className="mt-1.5 sm:mt-2 text-xs text-red-500 font-medium">{errors.notes}</p>
                  )}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="text-xs text-red-500 bg-red-50 p-2.5 sm:p-3 md:p-4 rounded-xl border border-red-200 font-medium">
                    {errors.submit}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-3 sm:pt-4 md:pt-6">
                  <NextuiButton
                    className="w-full h-11 sm:h-12 bg-gradient-to-r from-[#d4af37] via-[#f1c40f] via-[#ffd700] via-[#f1c40f] to-[#d4af37] text-center text-sm font-bold uppercase leading-4 text-gray-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 min-h-[44px]"
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? 'BOOKING...' : 'BOOK NOW'}
                  </NextuiButton>
                </div>
              </form>
            </>
          ) : (
            /* Success View */
            <div className="text-center">
              <div className="mx-auto mb-3 sm:mb-4 md:mb-6 flex h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#d4af37] via-[#f1c40f] via-[#ffd700] via-[#f1c40f] to-[#d4af37] shadow-2xl shadow-[#d4af37]/40">
                <svg className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
              </div>
              <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-[#d4af37] via-[#f1c40f] via-[#ffd700] via-[#f1c40f] to-[#d4af37] bg-clip-text text-transparent drop-shadow-lg shadow-[#d4af37]/30 leading-tight">
                Booking Code Generated! 🎉
              </h3>
              <p className="mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base text-[#E8DD95] font-medium">
                Your appointment has been scheduled! Here&apos;s your booking code:
              </p>
              <div className="mb-4 sm:mb-6 md:mb-8 rounded-xl bg-white p-3 sm:p-4 md:p-6 text-left text-xs sm:text-sm border border-gray-300 shadow-sm">
                <div className="mb-1.5 sm:mb-2 md:mb-3">
                  <span className="font-semibold text-gray-800">Name:</span> {createdBooking?.fullName}
                </div>
                <div className="mb-1.5 sm:mb-2 md:mb-3">
                  <span className="font-semibold text-gray-800">Date:</span> {createdBooking?.bookingDate}
                </div>
                <div className="mb-1.5 sm:mb-2 md:mb-3">
                  <span className="font-semibold text-gray-800">Time:</span> {createdBooking?.bookingTime}
                </div>

                {createdBooking?.email && (
                  <div className="mb-1.5 sm:mb-2 md:mb-3">
                    <span className="font-semibold text-gray-800">Email:</span> {createdBooking.email}
                  </div>
                )}
                <div>
                  <span className="font-semibold text-gray-800">Booking Code:</span> {createdBooking?.id.slice(-6).toUpperCase()}
                </div>
              </div>
              <NextuiButton
                className="w-full h-11 sm:h-12 bg-[#E8DD95] hover:bg-[#E8DD95]/90 text-gray-800 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 min-h-[44px]"
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