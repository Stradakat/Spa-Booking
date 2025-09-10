import type { BookingFormData, BookingFormErrors } from '../types/booking';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (flexible format)
const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;

// Validate individual fields
export const validateField = (name: keyof BookingFormData, value: string): string | undefined => {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Name is required';
      if (value.trim().length < 2) return 'Name must be at least 2 characters';
      return undefined;

    case 'email':
      if (!value.trim()) return 'Email is required';
      if (!EMAIL_REGEX.test(value)) return 'Please enter a valid email address';
      return undefined;

    case 'phone':
      // Phone is optional, but if provided, should be valid
      if (value && !PHONE_REGEX.test(value.replace(/[\s\-\(\)]/g, ''))) {
        return 'Please enter a valid phone number';
      }
      return undefined;

    case 'service':
      if (!value) return 'Please select a treatment service';
      return undefined;

    case 'date':
      if (!value) return 'Please select a date';
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) return 'Please select a date in the future';
      return undefined;

    case 'time':
      if (!value) return 'Please select a time';
      return undefined;

    case 'notes':
      // Notes are optional, no validation needed
      return undefined;

    default:
      return undefined;
  }
};

// Validate entire form
export const validateBookingForm = (formData: BookingFormData): BookingFormErrors => {
  const errors: BookingFormErrors = {};

  // Validate each field
  (Object.keys(formData) as Array<keyof BookingFormData>).forEach((fieldName) => {
    const error = validateField(fieldName, formData[fieldName]);
    if (error) {
      (errors as Record<string, string>)[fieldName as string] = error;
    }
  });

  return errors;
};

// Check if form has any errors
export const hasFormErrors = (errors: BookingFormErrors): boolean => {
  return Object.values(errors).some(error => error !== undefined);
};

// Format date for input field (YYYY-MM-DD)
export const formatDateForInput = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Get minimum date for booking (today)
export const getMinBookingDate = (): string => {
  return formatDateForInput(new Date());
};

// Get maximum date for booking (3 months from now)
export const getMaxBookingDate = (): string => {
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  return formatDateForInput(maxDate);
};

// Sanitize and format phone number
export const formatPhoneNumber = (phone: string): string => {
  return phone.replace(/[\s\-\(\)]/g, '');
};
