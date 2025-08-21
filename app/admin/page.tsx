"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';

import { supabaseBookingClient } from '@/lib/data/supabaseBookingClient';
import { Booking, BookingFilters } from '@/types';
import { EditBookingModal } from '@/components/admin/EditBookingModal';
import StoreManagement from '@/components/admin/store-management';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('store');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(5);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const router = useRouter();

  // Filters state
  const [filters, setFilters] = useState<BookingFilters>({
    search: '',
    dateFrom: '',
    dateTo: '',
    status: undefined,
  });

  // Applied filters state (separate from input filters)
  const [appliedFilters, setAppliedFilters] = useState<BookingFilters>({
    search: '',
    dateFrom: '',
    dateTo: '',
    status: undefined,
  });

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem('adminAuthenticated');

    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadBookings();
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  const loadBookings = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await supabaseBookingClient.listBookings();

      setBookings(response.data);
      setFilteredBookings(response.data);
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setIsLoading(false);
    }
  }, [itemsPerPage]);

  const applyFilters = useCallback(() => {
    setAppliedFilters({ ...filters });
    setCurrentPage(1); // Reset to first page when applying filters
  }, [filters]);

  const clearFilters = useCallback(() => {
    const clearedFilters = {
      search: '',
      dateFrom: '',
      dateTo: '',
      status: undefined,
    };

    setFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
    setCurrentPage(1);
  }, []);

  // Filter bookings based on applied filters
  useEffect(() => {
    let filtered = [...bookings];

    if (appliedFilters.search) {
      const searchLower = appliedFilters.search.toLowerCase();

      filtered = filtered.filter(
        (booking) =>
          booking.fullName.toLowerCase().includes(searchLower) ||
          (booking.email && booking.email.toLowerCase().includes(searchLower)) ||
          booking.phone.toLowerCase().includes(searchLower) ||
          booking.id.toString().includes(searchLower)
      );
    }

    if (appliedFilters.dateFrom) {
      filtered = filtered.filter(
        (booking) => new Date(booking.bookingDate) >= new Date(appliedFilters.dateFrom!)
      );
    }

    if (appliedFilters.dateTo) {
      filtered = filtered.filter(
        (booking) => new Date(booking.bookingDate) <= new Date(appliedFilters.dateTo!)
      );
    }

    if (appliedFilters.status) {
      filtered = filtered.filter((booking) => booking.status === appliedFilters.status);
    }

    setFilteredBookings(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  }, [bookings, appliedFilters, itemsPerPage]);

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredBookings.slice(startIndex, endIndex);
  };



  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    setEditingBooking(null);
  };

  const handleEditUpdate = () => {
    loadBookings();
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <Button
                color="danger"
                size="sm"
                variant="bordered"
                onClick={() => {
                  localStorage.removeItem('adminAuthenticated');
                  router.push('/admin/login');
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'store'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('store')}
            >
              Store Management
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'bookings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('bookings')}
            >
              Bookings
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'store' && <StoreManagement />}

        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Header with stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Bookings Management</h2>
                <Button
                  color="primary"
                  isLoading={isLoading}
                  onClick={loadBookings}
                >
                  Refresh
                </Button>
              </div>
              <p className="text-gray-600 mb-4">Manage customer appointments and reservations.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">Today&apos;s Bookings</h3>
                  <p className="text-2xl font-bold text-blue-600">0</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-medium text-green-900 mb-2">Confirmed</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {bookings.filter(b => b.status === 'confirmed').length}
                  </p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-medium text-yellow-900 mb-2">Pending</h3>
                  <p className="text-2xl font-bold text-yellow-600">
                    {bookings.filter(b => b.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="search">
                    Search
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    id="search"
                    placeholder="Search by name, email, phone, or booking code..."
                    type="text"
                    value={filters.search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFilters(prev => ({ ...prev, search: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="dateFrom">
                    Date From
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    id="dateFrom"
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFilters(prev => ({ ...prev, dateFrom: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="dateTo">
                    Date To
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    id="dateTo"
                    type="date"
                    value={filters.dateTo}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFilters(prev => ({ ...prev, dateTo: e.target.value }))
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="status">
                    Status
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    id="status"
                    value={filters.status || ''}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setFilters(prev => ({ ...prev, status: e.target.value as "pending" | "confirmed" | "cancelled" | undefined }))
                    }
                  >
                                      <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="done">Done</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  color="primary"
                  onClick={applyFilters}
                >
                  Apply Filters
                </Button>
                <Button
                  variant="bordered"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Bookings ({filteredBookings.length})
                </h3>
              </div>

              {isLoading ? (
                <div className="p-6 text-center">
                  <div className="text-gray-500">Loading bookings...</div>
                </div>
              ) : filteredBookings.length === 0 ? (
                <div className="p-6 text-center">
                  <div className="text-gray-500">No bookings found.</div>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Code
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Time
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {getCurrentPageItems().map((booking) => (
                          <tr key={booking.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {booking.id.slice(-6).toUpperCase()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {booking.fullName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {booking.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(booking.bookingDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {booking.bookingTime || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {booking.phone}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  booking.status === 'confirmed'
                                    ? 'bg-green-100 text-green-800'
                                    : booking.status === 'cancelled'
                                    ? 'bg-red-100 text-red-800'
                                    : booking.status === 'done'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <Button
                                  color="primary"
                                  size="sm"
                                  variant="bordered"
                                  onClick={() => handleEdit(booking)}
                                >
                                  Edit
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                          Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                          {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of{' '}
                          {filteredBookings.length} results
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            disabled={currentPage === 1}
                            size="sm"
                            variant="bordered"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          >
                            Previous
                          </Button>
                          <span className="px-3 py-2 text-sm text-gray-700">
                            Page {currentPage} of {totalPages}
                          </span>
                          <Button
                            disabled={currentPage === totalPages}
                            size="sm"
                            variant="bordered"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Edit Booking Modal */}
      <EditBookingModal
        booking={editingBooking}
        isOpen={editModalOpen}
        onClose={handleEditClose}
        onUpdate={handleEditUpdate}
      />
    </div>
  );
} 