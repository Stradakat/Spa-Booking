import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import Card from './Card';
import type { Service } from '../../types/booking';
import './ServiceCarousel.css';

interface ServiceCarouselProps {
  services: Service[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  itemsPerView?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

const ServiceCarousel: React.FC<ServiceCarouselProps> = ({
  services,
  autoPlay = true,
  autoPlayInterval = 5000,
  showControls = true,
  showIndicators = true,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 }
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [itemsVisible, setItemsVisible] = useState(itemsPerView.desktop);
  const [isDragging, setIsDragging] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startX = useRef(0);
  const currentX = useRef(0);

  // Calculate total pages based on items per view
  const totalPages = Math.ceil(services.length / itemsVisible);
  const maxIndex = totalPages - 1;

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsVisible(itemsPerView.mobile);
      } else if (width < 1024) {
        setItemsVisible(itemsPerView.tablet);
      } else {
        setItemsVisible(itemsPerView.desktop);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView]);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && totalPages > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, autoPlayInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, totalPages, maxIndex, autoPlayInterval]);

  // Navigation functions
  const goToSlide = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clampedIndex);
  }, [maxIndex]);

  const nextSlide = useCallback(() => {
    if (currentIndex >= maxIndex) {
      setCurrentIndex(0); // Loop back to first slide
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, maxIndex]);

  const prevSlide = useCallback(() => {
    if (currentIndex <= 0) {
      setCurrentIndex(maxIndex); // Loop to last slide
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex, maxIndex]);

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Touch/mouse event handlers
  const handleInteractionStart = (clientX: number) => {
    setIsDragging(true);
    startX.current = clientX;
    setIsPlaying(false);
  };

  const handleInteractionMove = (clientX: number) => {
    if (!isDragging) return;
    currentX.current = clientX;
  };

  const handleInteractionEnd = () => {
    if (!isDragging) return;
    
    const diff = startX.current - currentX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setIsDragging(false);
    if (autoPlay) {
      setIsPlaying(true);
    }
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleInteractionStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleInteractionMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleInteractionEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleInteractionStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleInteractionMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleInteractionEnd();
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        prevSlide();
        break;
      case 'ArrowRight':
        e.preventDefault();
        nextSlide();
        break;
      case ' ':
        e.preventDefault();
        toggleAutoPlay();
        break;
    }
  };

  // Get visible services for current slide
  const getVisibleServices = () => {
    const startIndex = currentIndex * itemsVisible;
    return services.slice(startIndex, startIndex + itemsVisible);
  };

  return (
    <div 
      className="service-carousel"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Services carousel"
    >
      {/* Carousel Container */}
      <div 
        className="service-carousel__container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="service-carousel__track">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="service-carousel__slides"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {getVisibleServices().map((service, index) => (
                <motion.div
                  key={service.id}
                  className="service-carousel__slide"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="service-carousel__card">
                    <div className="service-carousel__card-content">
                      <div className="service-carousel__card-header">
                        <h3 className="service-carousel__card-title">{service.title}</h3>
                        <div className="service-carousel__card-price">${service.price}</div>
                      </div>
                      <p className="service-carousel__card-description">
                        {service.description}
                      </p>
                      <div className="service-carousel__card-meta">
                        <span className="service-carousel__card-duration">
                          {service.duration}
                        </span>
                        <span className="service-carousel__card-category">
                          {service.category}
                        </span>
                      </div>
                      <ul className="service-carousel__card-benefits">
                        {service.benefits.slice(0, 2).map((benefit, idx) => (
                          <li key={idx}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      {showControls && totalPages > 1 && (
        <div className="service-carousel__controls">
          <button
            className="service-carousel__nav service-carousel__nav--prev"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            className="service-carousel__nav service-carousel__nav--next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          <button
            className="service-carousel__play-pause"
            onClick={toggleAutoPlay}
            aria-label={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
        </div>
      )}

      {/* Indicators */}
      {showIndicators && totalPages > 1 && (
        <div className="service-carousel__indicators" role="tablist">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`service-carousel__indicator ${
                index === currentIndex ? 'service-carousel__indicator--active' : ''
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              role="tab"
              aria-selected={index === currentIndex}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {isPlaying && totalPages > 1 && (
        <div className="service-carousel__progress">
          <motion.div
            className="service-carousel__progress-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            key={`${currentIndex}-${isPlaying}`}
            transition={{ duration: autoPlayInterval / 1000, ease: 'linear' }}
          />
        </div>
      )}
    </div>
  );
};

export default ServiceCarousel;
