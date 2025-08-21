"use client";

import React from 'react';
import { Button as NextuiButton } from '@nextui-org/button';

import { useBooking } from '@/components/providers/booking/BookingProvider';
import { BookingFormValues } from '@/types';
import { cn } from '@/utils/utils';

interface BookingButtonProps {
  label?: string;
  variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'ghost';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  prefill?: Partial<BookingFormValues>;
  children?: React.ReactNode;
}

export const BookingButton: React.FC<BookingButtonProps> = ({
  label = "Book now",
  variant = "solid",
  color = "primary",
  size = "md",
  className,
  prefill,
  children,
}) => {
  const { openBookingModal } = useBooking();

  const handleClick = () => {
    openBookingModal(prefill);
  };

  return (
    <NextuiButton
      className={cn("cursor-pointer", className)}
      color={color}
      size={size}
      variant={variant}
      onClick={handleClick}
    >
      {children || label}
    </NextuiButton>
  );
}; 