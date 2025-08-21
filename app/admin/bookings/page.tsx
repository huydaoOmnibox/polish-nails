"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';

import { supabaseBookingClient } from '@/lib/data/supabaseBookingClient';
import { Booking, BookingFilters } from '@/types';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
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

  const handleStatusUpdate = async (id: string, newStatus: "pending" | "confirmed" | "cancelled") => {
    try {
      await supabaseBookingClient.updateBookingStatus(id, newStatus);
      // Reload only the bookings list
      loadBookings();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await supabaseBookingClient.deleteBooking(id);
        // Reload only the bookings list
        loadBookings();
      } catch (error) {
        console.error('Failed to delete booking:', error);
      }
    }
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
            <div className="flex items-center space-x-4">
              <button
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                onClick={() => router.push('/admin')}
              >
                ← Back to Admin
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Bookings Management</h1>
            </div>
            <Button
              color="primary"
              isLoading={isLoading}
              onClick={loadBookings}
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
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
                value={filters.status}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setFilters(prev => ({ ...prev, status: e.target.value as "pending" | "confirmed" | "cancelled" | undefined }))
                }
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
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
                        Created
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
                                 : 'bg-yellow-100 text-yellow-800'
                             }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            {booking.status === 'pending' && (
                              <Button
                                color="success"
                                size="sm"
                                onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                              >
                                Confirm
                              </Button>
                            )}
                            
                            {booking.status !== 'cancelled' && (
                              <Button
                                color="warning"
                                size="sm"
                                onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                              >
                                Cancel
                              </Button>
                            )}
                            <Button
                              color="danger"
                              size="sm"
                              onClick={() => handleDelete(booking.id)}
                            >
                              Delete
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
    </div>
  );
} 