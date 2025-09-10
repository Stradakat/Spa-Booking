import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Clock, Mail, Phone } from 'lucide-react';
import Button from '../common/Button';
import type { Booking } from '../../types/booking';
import { formatDate, formatTime } from '../../services/bookingService';
import './BookingSuccess.css';

interface BookingSuccessProps {
  booking: Booking;
  onBookAnother: () => void;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({ booking, onBookAnother }) => {
  return (
    <motion.div 
      className="booking-success"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div
        className="booking-success__icon"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4, type: 'spring', stiffness: 300 }}
      >
        <CheckCircle size={64} />
      </motion.div>

      <motion.div
        className="booking-success__content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <h2 className="booking-success__title">Booking Confirmed!</h2>
        <p className="booking-success__message">
          Your treatment has been successfully booked. We've sent a confirmation email 
          with all the details. We look forward to welcoming you to Serenity Spa.
        </p>
      </motion.div>

      <motion.div
        className="booking-success__details"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <h3 className="booking-success__details-title">Booking Details</h3>
        
        <div className="booking-success__grid">
          <div className="booking-success__item">
            <div className="booking-success__item-icon">
              <Calendar size={20} />
            </div>
            <div className="booking-success__item-content">
              <span className="booking-success__item-label">Date</span>
              <span className="booking-success__item-value">{formatDate(booking.date)}</span>
            </div>
          </div>

          <div className="booking-success__item">
            <div className="booking-success__item-icon">
              <Clock size={20} />
            </div>
            <div className="booking-success__item-content">
              <span className="booking-success__item-label">Time</span>
              <span className="booking-success__item-value">{formatTime(booking.time)}</span>
            </div>
          </div>

          <div className="booking-success__item">
            <div className="booking-success__item-icon">
              <Mail size={20} />
            </div>
            <div className="booking-success__item-content">
              <span className="booking-success__item-label">Email</span>
              <span className="booking-success__item-value">{booking.email}</span>
            </div>
          </div>

          {booking.phone && (
            <div className="booking-success__item">
              <div className="booking-success__item-icon">
                <Phone size={20} />
              </div>
              <div className="booking-success__item-content">
                <span className="booking-success__item-label">Phone</span>
                <span className="booking-success__item-value">{booking.phone}</span>
              </div>
            </div>
          )}
        </div>

        <div className="booking-success__service">
          <h4 className="booking-success__service-title">Treatment</h4>
          <p className="booking-success__service-name">{booking.service}</p>
          {booking.notes && (
            <>
              <h5 className="booking-success__notes-title">Additional Notes</h5>
              <p className="booking-success__notes">{booking.notes}</p>
            </>
          )}
        </div>

        <div className="booking-success__reference">
          <span className="booking-success__reference-label">Booking Reference</span>
          <span className="booking-success__reference-number">#{booking.id.toString().padStart(6, '0')}</span>
        </div>
      </motion.div>

      <motion.div
        className="booking-success__actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <Button
          variant="outline"
          size="lg"
          onClick={onBookAnother}
        >
          Book Another Treatment
        </Button>
        
        <div className="booking-success__help">
          <p>Need to make changes?</p>
          <p>Please contact us at <a href="tel:+1234567890">(123) 456-7890</a> or <a href="mailto:hello@serenityspa.com">hello@serenityspa.com</a></p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookingSuccess;
