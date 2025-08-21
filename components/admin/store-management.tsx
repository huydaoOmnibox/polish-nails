"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/button';

import { StoreSettings, StoreHours } from '@/types';
import { supabaseStoreClient } from '@/lib/data/supabaseStoreClient';

const defaultStoreHours: StoreHours = {
  monday: { open: '09:00', close: '18:00', isOpen: true },
  tuesday: { open: '09:00', close: '18:00', isOpen: true },
  wednesday: { open: '09:00', close: '18:00', isOpen: true },
  thursday: { open: '09:00', close: '18:00', isOpen: true },
  friday: { open: '09:00', close: '18:00', isOpen: true },
  saturday: { open: '10:00', close: '16:00', isOpen: true },
  sunday: { open: '10:00', close: '16:00', isOpen: false },
};

const defaultStoreSettings: StoreSettings = {
  storeName: 'Polish Nail Salon',
  storeAddress: '123 Main Street, City, State 12345',
  storePhone: '+1 (555) 123-4567',
  storeEmail: 'info@polishnail.com',
  openingHours: defaultStoreHours,
  timeSlotDuration: 30, // 30 minutes
  maxBookingsPerSlot: 3, // maximum bookings per time slot
  maxAdvanceBooking: 1095, // 3 years (3 * 365 days)
};

const daysOfWeek = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
];

export default function StoreManagement() {
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(defaultStoreSettings);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load store settings from database
  useEffect(() => {
    const loadStoreSettings = async () => {
      try {
        const config = await supabaseStoreClient.getStoreConfig();

        setStoreSettings(config);
      } catch (error) {
        console.error('Failed to load store settings:', error);
        // Keep default settings if loading fails
      }
    };

    loadStoreSettings();
  }, []);

  const handleHoursChange = (day: keyof StoreHours, field: 'open' | 'close' | 'isOpen', value: string | boolean) => {
    setStoreSettings(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day],
          [field]: value,
        },
      },
    }));
  };

  const handleGeneralSettingsChange = (field: keyof StoreSettings, value: string | number) => {
    if (field === 'openingHours') return;
    
    setStoreSettings(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save to database
      await supabaseStoreClient.updateStoreConfig(storeSettings);
      
      setIsEditing(false);
      console.log('Store settings saved:', storeSettings);
    } catch (error) {
      console.error('Failed to save store settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setStoreSettings(defaultStoreSettings);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Store Management</h2>
          <div className="flex space-x-3">
            {!isEditing ? (
              <Button
                color="primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Settings
              </Button>
            ) : (
              <>
                <Button
                  color="primary"
                  disabled={isSaving}
                  isLoading={isSaving}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
                <Button
                  disabled={isSaving}
                  variant="bordered"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
        <p className="text-gray-600">Configure your store settings, opening hours, and booking preferences.</p>
      </div>

      {/* General Store Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">General Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Store Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={!isEditing}
              type="text"
              value={storeSettings.storeName}
              onChange={(e) => handleGeneralSettingsChange('storeName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={!isEditing}
              type="tel"
              value={storeSettings.storePhone}
              onChange={(e) => handleGeneralSettingsChange('storePhone', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={!isEditing}
              type="email"
              value={storeSettings.storeEmail}
              onChange={(e) => handleGeneralSettingsChange('storeEmail', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={!isEditing}
              type="text"
              value={storeSettings.storeAddress}
              onChange={(e) => handleGeneralSettingsChange('storeAddress', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Opening Hours */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Opening Hours</h3>
        <div className="space-y-4">
          {daysOfWeek.map(({ key, label }) => {
            const dayKey = key as keyof StoreHours;
            const dayHours = storeSettings.openingHours[dayKey];
            
            return (
              <div key={key} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-24">
                  <label className="flex items-center space-x-2">
                    <input
                      checked={dayHours.isOpen}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
                      disabled={!isEditing}
                      type="checkbox"
                      onChange={(e) => handleHoursChange(dayKey, 'isOpen', e.target.checked)}
                    />
                    <span className="text-sm font-medium text-gray-900">{label}</span>
                  </label>
                </div>
                
                {dayHours.isOpen && (
                  <>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Open</label>
                      <input
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        disabled={!isEditing}
                        type="time"
                        value={dayHours.open}
                        onChange={(e) => handleHoursChange(dayKey, 'open', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Close</label>
                      <input
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                        disabled={!isEditing}
                        type="time"
                        value={dayHours.close}
                        onChange={(e) => handleHoursChange(dayKey, 'close', e.target.value)}
                      />
                    </div>
                  </>
                )}
                
                {!dayHours.isOpen && (
                  <div className="text-sm text-gray-500 italic">
                    Closed
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Booking Preferences */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Slot Duration (minutes)
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={!isEditing}
              value={storeSettings.timeSlotDuration}
              onChange={(e) => handleGeneralSettingsChange('timeSlotDuration', parseInt(e.target.value))}
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>1 hour</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              This determines the available time slots for bookings
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Bookings Per Time Slot
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={!isEditing}
              max="10"
              min="1"
              type="number"
              value={storeSettings.maxBookingsPerSlot}
              onChange={(e) => handleGeneralSettingsChange('maxBookingsPerSlot', parseInt(e.target.value))}
            />
            <p className="text-xs text-gray-500 mt-1">
              Maximum number of bookings allowed per time slot
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Advance Booking (days, up to 3 years)
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={!isEditing}
              max="1095"
              min="1"
              type="number"
              value={storeSettings.maxAdvanceBooking}
              onChange={(e) => handleGeneralSettingsChange('maxAdvanceBooking', parseInt(e.target.value))}
            />
            <p className="text-xs text-gray-500 mt-1">
              How far in advance customers can book appointments (max 3 years)
            </p>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings Preview</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                <strong>Store Name:</strong> {storeSettings.storeName}
              </div>
              <div>
                <strong>Phone:</strong> {storeSettings.storePhone}
              </div>
              <div>
                <strong>Email:</strong> {storeSettings.storeEmail}
              </div>
              <div>
                <strong>Address:</strong> {storeSettings.storeAddress}
              </div>
            <div>
              <strong>Time Slots:</strong> {storeSettings.timeSlotDuration} minutes
            </div>
            <div>
              <strong>Max Bookings Per Slot:</strong> {storeSettings.maxBookingsPerSlot}
            </div>
            <div>
              <strong>Max Advance:</strong> {storeSettings.maxAdvanceBooking} days
            </div>
          </div>
          <div className="mt-4">
            <strong>Opening Hours:</strong>
            <div className="mt-2 space-y-1">
              {daysOfWeek.map(({ key, label }) => {
                const dayKey = key as keyof StoreHours;
                const dayHours = storeSettings.openingHours[dayKey];

                return (
                  <div key={key} className="text-sm">
                    {label}: {dayHours.isOpen ? `${dayHours.open} - ${dayHours.close}` : 'Closed'}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
