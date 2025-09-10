export interface Service {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: number;
  category: string;
  benefits: string[];
}

export interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

export interface BookingFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  date?: string;
  time?: string;
  general?: string;
}

export interface ApiResponse<T> {
  message?: string;
  booking?: T;
  status?: string;
  error?: string;
}

export interface BookingState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  booking: Booking | null;
}
