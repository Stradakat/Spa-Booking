import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BookingForm from '../components/booking/BookingForm';
import BookingSuccess from '../components/booking/BookingSuccess';
import Button from '../components/common/Button';
import type { Service, BookingFormData, BookingState } from '../types/booking';
import { getServices, createBooking } from '../services/bookingService';
import './Booking.css';

const Booking: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  
  // Get pre-selected service ID from URL parameters
  const preSelectedServiceId = searchParams.get('service');
  const [bookingState, setBookingState] = useState<BookingState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
    booking: null,
  });

  // Load services on component mount
  useEffect(() => {
    const loadServices = async () => {
      try {
        const fetchedServices = await getServices();
        setServices(fetchedServices);
      } catch (error) {
        console.error('Failed to load services:', error);
        setBookingState(prev => ({
          ...prev,
          error: 'Failed to load available services. Please refresh the page.',
        }));
      } finally {
        setIsLoadingServices(false);
      }
    };

    loadServices();
  }, []);

  // Handle form submission
  const handleBookingSubmit = async (formData: BookingFormData) => {
    setBookingState({
      isSubmitting: true,
      isSuccess: false,
      error: null,
      booking: null,
    });

    try {
      const response = await createBooking(formData);
      
      if (response.booking) {
        setBookingState({
          isSubmitting: false,
          isSuccess: true,
          error: null,
          booking: response.booking,
        });
      } else {
        throw new Error(response.message || 'Booking failed');
      }
    } catch (error) {
      console.error('Booking submission failed:', error);
      setBookingState({
        isSubmitting: false,
        isSuccess: false,
        error: error instanceof Error ? error.message : 'Failed to submit booking. Please try again.',
        booking: null,
      });
    }
  };

  // Handle booking another treatment
  const handleBookAnother = () => {
    setBookingState({
      isSubmitting: false,
      isSuccess: false,
      error: null,
      booking: null,
    });
  };

  // Loading state
  if (isLoadingServices) {
    return (
      <div className="booking-page">
        <div className="container section">
          <div className="booking-page__header">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1>Book Your Treatment</h1>
              <p className="booking-page__subtitle">
                Experience the ultimate in relaxation and wellness
              </p>
            </motion.div>
          </div>
          
          <div className="booking-page__loading">
            <motion.div
              className="booking-page__loading-spinner"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <p>Loading available treatments...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="container section">
        <div className="booking-page__header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>Book Your Treatment</h1>
            <p className="booking-page__subtitle">
              Experience the ultimate in relaxation and wellness
            </p>
          </motion.div>
        </div>

        <div className="booking-page__content">
          {bookingState.isSuccess && bookingState.booking ? (
            <BookingSuccess
              booking={bookingState.booking}
              onBookAnother={handleBookAnother}
            />
          ) : (
            <>
              {/* Available Services Preview */}
              <motion.div
                className="booking-page__services"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h2 className="booking-page__services-title">Our Treatments</h2>
                <p className="booking-page__services-description">
                  Explore our collection of mindful treatments designed to restore balance and promote deep relaxation.
                </p>
                <div className="booking-page__services-cta">
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => navigate('/services')}
                  >
                    See All Services
                  </Button>
                </div>
              </motion.div>

              {/* Booking Form */}
              <motion.div
                className="booking-page__form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="booking-page__form-title">Reserve Your Appointment</h2>
                <BookingForm
                  services={services}
                  onSubmit={handleBookingSubmit}
                  bookingState={bookingState}
                  preSelectedServiceId={preSelectedServiceId}
                />
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
