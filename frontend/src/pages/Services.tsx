import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Leaf, Sparkles, Waves, Sun, Flower } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import type { Service } from '../types/booking';
import { getServices } from '../services/bookingService';
import './Services.css';

const Services: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const handleBookTreatment = (serviceId: number) => {
    navigate(`/booking?service=${serviceId}`);
  };
  
  // Load services from API
  useEffect(() => {
    const loadServices = async () => {
      try {
        const fetchedServices = await getServices();
        setServices(fetchedServices);
      } catch (error) {
        console.error('Failed to load services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);
  
  // Icon mapping for services
  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'massage': return Heart;
      case 'aromatherapy': return Leaf;
      case 'facial': return Sparkles;
      case 'body-treatment': return Sun;
      case 'couples': return Flower;
      default: return Waves;
    }
  };
  

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="services">
      {/* Header Section */}
      <section className="services-header section">
        <div className="container">
          <motion.div
            className="services-header__content"
            {...fadeInUp}
          >
            <h1>Our Treatments</h1>
            <p className="services-header__subtitle">
              Discover our collection of mindful treatments, each designed to restore balance 
              and promote deep relaxation through authentic Scandinavian wellness practices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid section-sm">
        <div className="container">
          {isLoading ? (
            <div className="services-loading">
              <motion.div
                className="services-loading-spinner"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <p>Loading our treatments...</p>
            </div>
          ) : (
            <div className="services-grid__container">
              {services.map((service, index) => {
                const ServiceIcon = getServiceIcon(service.category);
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card variant="default" hover className="service-detail-card">
                      <div className="service-detail">
                        <div className="service-detail__header">
                          <div className="service-detail__icon">
                            <ServiceIcon size={28} />
                          </div>
                          <div className="service-detail__title-group">
                            <h3 className="service-detail__title">{service.title}</h3>
                            <div className="service-detail__meta">
                              <span className="service-detail__duration">{service.duration}</span>
                              <span className="service-detail__price">From ${service.price}</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="service-detail__description">{service.description}</p>
                        
                        <div className="service-detail__benefits">
                          <h4 className="service-detail__benefits-title">Benefits</h4>
                          <ul className="service-detail__benefits-list">
                            {service.benefits.map((benefit, idx) => (
                              <li key={idx}>{benefit}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="service-detail__actions">
                          <Button 
                            variant="primary" 
                            size="sm"
                            onClick={() => handleBookTreatment(service.id)}
                          >
                            Book Treatment
                          </Button>
                          <Button variant="ghost" size="sm">
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta section" style={{ backgroundColor: 'var(--color-beige-light)' }}>
        <div className="container">
          <motion.div
            className="services-cta__content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2>Ready to Begin Your Journey?</h2>
            <p>
              Book your appointment today and experience the tranquility of authentic 
              Scandinavian wellness. Our dedicated team is here to guide you toward 
              complete relaxation and renewal.
            </p>
            <div className="services-cta__actions">
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => navigate('/booking')}
              >
                Book Your Treatment
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/contact')}
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
