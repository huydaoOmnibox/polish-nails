"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@nextui-org/button';

import { supabaseBookingClient } from '@/lib/data/supabaseBookingClient';
import { Booking } from '@/types';

interface EditBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onUpdate: () => void;
}

export function EditBookingModal({ isOpen, onClose, booking, onUpdate }: EditBookingModalProps) {
  const [formData, setFormData] = useState<Partial<Booking>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (booking) {
      setFormData({
        fullName: booking.fullName,
        email: booking.email,
        phone: booking.phone,
        notes: booking.notes,
        status: booking.status,
        bookingDate: booking.bookingDate,
        bookingTime: booking.bookingTime,
      });
      setErrors({});
    }
  }, [booking]);

  const handleInputChange = (field: keyof Booking, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    }



    if (!formData.bookingDate) {
      newErrors.bookingDate = 'Booking date is required';
    } else if (new Date(formData.bookingDate) < new Date()) {
      newErrors.bookingDate = 'Booking date cannot be in the past';
    }

    if (!formData.bookingTime) {
      newErrors.bookingTime = 'Booking time is required';
    }

    if (formData.notes && formData.notes.length > 500) {
      newErrors.notes = 'Notes cannot exceed 500 characters';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !booking) return;

    setIsSubmitting(true);
    try {
      // Update the booking with new data
      await supabaseBookingClient.updateBookingStatus(booking.id, formData.status as any);
      // You might want to add more update methods to bookingClient for other fields
      
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Failed to update booking:', error);
      setErrors({ submit: 'Failed to update booking. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !booking) return null;

  return (
    <AnimatePresence>
      <motion.div
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        onClick={handleBackdropClick}
      >
        <motion.div
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl"
          exit={{ scale: 0.95, opacity: 0 }}
          initial={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Close button */}
          <button
            aria-label="Close modal"
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </button>

          <h2 className="mb-6 text-2xl font-bold text-gray-900">Edit Booking #{booking.id}</h2>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">
                Full Name *
              </label>
              <input
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                id="fullName"
                type="text"
                value={formData.fullName || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('fullName', e.target.value)}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Email (optional)
              </label>
              <input
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">
                Phone *
              </label>
              <input
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                id="phone"
                type="tel"
                value={formData.phone || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('phone', e.target.value)}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Booking Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="bookingDate">
                  Booking Date *
                </label>
                <input
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.bookingDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  id="bookingDate"
                  type="date"
                  value={formData.bookingDate || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('bookingDate', e.target.value)}
                />
                {errors.bookingDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.bookingDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="bookingTime">
                  Booking Time *
                </label>
                <input
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.bookingTime ? 'border-red-500' : 'border-gray-300'
                  }`}
                  id="bookingTime"
                  type="time"
                  value={formData.bookingTime || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('bookingTime', e.target.value)}
                />
                {errors.bookingTime && (
                  <p className="mt-1 text-sm text-red-600">{errors.bookingTime}</p>
                )}
              </div>
            </div>



            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="status">
                Status *
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="status"
                value={formData.status || ''}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange('status', e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="done">Done</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="notes">
                Notes (optional)
              </label>
              <textarea
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.notes ? 'border-red-500' : 'border-gray-300'
                }`}
                id="notes"
                maxLength={500}
                placeholder="Any special requests or additional information..."
                rows={3}
                value={formData.notes || ''}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('notes', e.target.value)}
              />
              <div className="text-xs text-gray-500 text-right mt-1">
                {(formData.notes?.length || 0)}/500
              </div>
              {errors.notes && (
                <p className="mt-1 text-sm text-red-600">{errors.notes}</p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1"
                type="button"
                variant="bordered"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                color="primary"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                type="submit"
              >
                {isSubmitting ? 'Updating...' : 'Update Booking'}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 