import type { Service, Booking, BookingFormData, ApiResponse } from '../types/booking';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Generic API call function with error handling
async function apiCall<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}

// Get all available services
export async function getServices(): Promise<Service[]> {
  return apiCall<Service[]>('/api/services');
}

// Get a specific service by ID
export async function getService(id: number): Promise<Service> {
  return apiCall<Service>(`/api/services/${id}`);
}

// Create a new booking
export async function createBooking(bookingData: BookingFormData): Promise<ApiResponse<Booking>> {
  return apiCall<ApiResponse<Booking>>('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  });
}

// Get all bookings (for admin use)
export async function getBookings(): Promise<Booking[]> {
  return apiCall<Booking[]>('/api/bookings');
}

// Update booking status
export async function updateBookingStatus(id: number, status: Booking['status']): Promise<ApiResponse<Booking>> {
  return apiCall<ApiResponse<Booking>>(`/api/bookings/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

// Delete a booking
export async function deleteBooking(id: number): Promise<{ message: string }> {
  return apiCall<{ message: string }>(`/api/bookings/${id}`, {
    method: 'DELETE',
  });
}

// Utility function to get available time slots
export function getAvailableTimeSlots(): string[] {
  return [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ];
}

// Utility function to format date for display
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Utility function to format time for display
export function formatTime(time: string): string {
  return new Date(`2000-01-01T${time}:00`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}
