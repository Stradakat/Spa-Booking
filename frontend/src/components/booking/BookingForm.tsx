import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import type { Service, BookingFormData, BookingFormErrors, BookingState } from '../../types/booking';
import { 
  validateField, 
  validateBookingForm, 
  hasFormErrors, 
  getMinBookingDate, 
  getMaxBookingDate,
  formatPhoneNumber 
} from '../../utils/validation';
import { getAvailableTimeSlots } from '../../services/bookingService';
import './BookingForm.css';

interface BookingFormProps {
  services: Service[];
  onSubmit: (formData: BookingFormData) => Promise<void>;
  bookingState: BookingState;
  preSelectedServiceId?: string | null;
}

const BookingForm: React.FC<BookingFormProps> = ({ services, onSubmit, bookingState, preSelectedServiceId }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: '',
  });

  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<keyof BookingFormData>>(new Set());

  const timeSlots = getAvailableTimeSlots();
  const minDate = getMinBookingDate();
  const maxDate = getMaxBookingDate();

  // Find selected service details
  const selectedService = services.find(s => s.id.toString() === formData.service);

  // Handle input changes with validation
  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear any general errors when user starts typing
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: undefined }));
    }
  };

  // Handle input blur for validation
  const handleInputBlur = (field: keyof BookingFormData) => {
    setTouchedFields(prev => new Set(prev).add(field));
    const error = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allFields = Object.keys(formData) as (keyof BookingFormData)[];
    setTouchedFields(new Set(allFields));
    
    // Validate form
    const formErrors = validateBookingForm(formData);
    setErrors(formErrors);
    
    // Submit if no errors
    if (!hasFormErrors(formErrors)) {
      const sanitizedData = {
        ...formData,
        phone: formatPhoneNumber(formData.phone),
      };
      await onSubmit(sanitizedData);
    }
  };

  // Set pre-selected service when services are loaded
  useEffect(() => {
    if (preSelectedServiceId && services.length > 0) {
      // Check if the service exists in the services array
      const serviceExists = services.some(service => service.id.toString() === preSelectedServiceId);
      if (serviceExists) {
        setFormData(prev => ({ ...prev, service: preSelectedServiceId }));
      }
    }
  }, [preSelectedServiceId, services]);

  // Reset form after successful submission
  useEffect(() => {
    if (bookingState.isSuccess) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        notes: '',
      });
      setErrors({});
      setTouchedFields(new Set());
    }
  }, [bookingState.isSuccess]);

  return (
    <motion.div 
      className="booking-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="booking-form__form">
        <div className="booking-form__section">
          <h3 className="booking-form__section-title">Personal Information</h3>
          
          <div className="booking-form__row">
            <div className="booking-form__field">
              <label htmlFor="name" className="booking-form__label">
                Full Name <span className="booking-form__required">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                onBlur={() => handleInputBlur('name')}
                className={`booking-form__input ${errors.name && touchedFields.has('name') ? 'booking-form__input--error' : ''}`}
                placeholder="Enter your full name"
                disabled={bookingState.isSubmitting}
              />
              {errors.name && touchedFields.has('name') && (
                <span className="booking-form__error">{errors.name}</span>
              )}
            </div>
          </div>

          <div className="booking-form__row">
            <div className="booking-form__field">
              <label htmlFor="email" className="booking-form__label">
                Email Address <span className="booking-form__required">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => handleInputBlur('email')}
                className={`booking-form__input ${errors.email && touchedFields.has('email') ? 'booking-form__input--error' : ''}`}
                placeholder="Enter your email address"
                disabled={bookingState.isSubmitting}
              />
              {errors.email && touchedFields.has('email') && (
                <span className="booking-form__error">{errors.email}</span>
              )}
            </div>

            <div className="booking-form__field">
              <label htmlFor="phone" className="booking-form__label">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                onBlur={() => handleInputBlur('phone')}
                className={`booking-form__input ${errors.phone && touchedFields.has('phone') ? 'booking-form__input--error' : ''}`}
                placeholder="Enter your phone number"
                disabled={bookingState.isSubmitting}
              />
              {errors.phone && touchedFields.has('phone') && (
                <span className="booking-form__error">{errors.phone}</span>
              )}
            </div>
          </div>
        </div>

        <div className="booking-form__section">
          <h3 className="booking-form__section-title">Treatment Details</h3>
          
          <div className="booking-form__row">
            <div className="booking-form__field">
              <label htmlFor="service" className="booking-form__label">
                Select Treatment <span className="booking-form__required">*</span>
              </label>
              <select
                id="service"
                value={formData.service}
                onChange={(e) => handleInputChange('service', e.target.value)}
                onBlur={() => handleInputBlur('service')}
                className={`booking-form__select ${errors.service && touchedFields.has('service') ? 'booking-form__input--error' : ''}`}
                disabled={bookingState.isSubmitting}
              >
                <option value="">Choose a treatment...</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id.toString()}>
                    {service.title} - ${service.price} ({service.duration})
                  </option>
                ))}
              </select>
              {errors.service && touchedFields.has('service') && (
                <span className="booking-form__error">{errors.service}</span>
              )}
            </div>
          </div>

          {selectedService && (
            <motion.div 
              className="booking-form__service-details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <h4>{selectedService.title}</h4>
              <p>{selectedService.description}</p>
              <ul>
                {selectedService.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </motion.div>
          )}

          <div className="booking-form__row">
            <div className="booking-form__field">
              <label htmlFor="date" className="booking-form__label">
                Preferred Date <span className="booking-form__required">*</span>
              </label>
              <input
                type="date"
                id="date"
                value={formData.date}
                min={minDate}
                max={maxDate}
                onChange={(e) => handleInputChange('date', e.target.value)}
                onBlur={() => handleInputBlur('date')}
                className={`booking-form__input ${errors.date && touchedFields.has('date') ? 'booking-form__input--error' : ''}`}
                disabled={bookingState.isSubmitting}
              />
              {errors.date && touchedFields.has('date') && (
                <span className="booking-form__error">{errors.date}</span>
              )}
            </div>

            <div className="booking-form__field">
              <label htmlFor="time" className="booking-form__label">
                Preferred Time <span className="booking-form__required">*</span>
              </label>
              <select
                id="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                onBlur={() => handleInputBlur('time')}
                className={`booking-form__select ${errors.time && touchedFields.has('time') ? 'booking-form__input--error' : ''}`}
                disabled={bookingState.isSubmitting}
              >
                <option value="">Choose a time...</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>
                    {new Date(`2000-01-01T${time}:00`).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </option>
                ))}
              </select>
              {errors.time && touchedFields.has('time') && (
                <span className="booking-form__error">{errors.time}</span>
              )}
            </div>
          </div>
        </div>

        <div className="booking-form__section">
          <div className="booking-form__field">
            <label htmlFor="notes" className="booking-form__label">
              Additional Notes
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="booking-form__textarea"
              placeholder="Any specific requests or information we should know..."
              rows={4}
              disabled={bookingState.isSubmitting}
            />
          </div>
        </div>

        {errors.general && (
          <div className="booking-form__error booking-form__error--general">
            {errors.general}
          </div>
        )}

        {bookingState.error && (
          <div className="booking-form__error booking-form__error--general">
            {bookingState.error}
          </div>
        )}

        <div className="booking-form__actions">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={bookingState.isSubmitting}
          >
            {bookingState.isSubmitting ? 'Booking...' : 'Book Treatment'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default BookingForm;
