"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { BookingFormValues } from '@/types';

import BookingModal from './BookingModal';

interface BookingContextType {
  isOpen: boolean;
  openBookingModal: (initial?: Partial<BookingFormValues>) => void;
  closeBookingModal: () => void;
  initialValues?: Partial<BookingFormValues>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }

  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialValues, setInitialValues] = useState<Partial<BookingFormValues> | undefined>();

  const openBookingModal = useCallback((initial?: Partial<BookingFormValues>) => {
    setInitialValues(initial);
    setIsOpen(true);
  }, []);

  const closeBookingModal = useCallback(() => {
    setIsOpen(false);
    setInitialValues(undefined);
  }, []);

  const value: BookingContextType = {
    isOpen,
    openBookingModal,
    closeBookingModal,
    initialValues,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
      {typeof window !== 'undefined' && createPortal(
        <BookingModal
          initialValues={initialValues}
          isOpen={isOpen}
          onClose={closeBookingModal}
        />,
        document.body
      )}
    </BookingContext.Provider>
  );
}; 