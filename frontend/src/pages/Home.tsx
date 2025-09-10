import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import ServiceCarousel from '../components/common/ServiceCarousel';
import type { Service } from '../types/booking';
import { getServices } from '../services/bookingService';
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);

  // Load services on component mount
  useEffect(() => {
    const loadServices = async () => {
      try {
        const fetchedServices = await getServices();
        setServices(fetchedServices);
      } catch (error) {
        console.error('Failed to load services:', error);
      } finally {
        setIsLoadingServices(false);
      }
    };

    loadServices();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero__content">
            <motion.div
              className="hero__text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="hero__title">
                Find Your
                <span className="hero__title-accent"> Serenity</span>
              </h1>
              <p className="hero__subtitle">
                Experience the tranquility of Scandinavian wellness traditions. 
                Our mindful treatments and peaceful environment offer a sanctuary 
                for your body and soul.
              </p>
              <div className="hero__actions">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate('/booking')}
                >
                  Book Your Treatment
                  <ArrowRight size={20} />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/services')}
                >
                  Explore Services
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="hero__image"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="hero__image-placeholder">
                <Leaf size={80} className="hero__image-icon" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-preview section">
        <div className="container">
          <motion.div
            className="services-preview__header"
            {...fadeInUp}
          >
            <h2>Signature Treatments</h2>
            <p className="services-preview__subtitle">
              Carefully curated treatments designed to restore balance and promote deep relaxation
            </p>
          </motion.div>

          {!isLoadingServices && services.length > 0 ? (
            <ServiceCarousel 
              services={services.slice(0, 3)} // Show first 3 services as preview
              autoPlay={true}
              autoPlayInterval={7000}
              showControls={true}
              showIndicators={true}
              itemsPerView={{
                mobile: 1,
                tablet: 2,
                desktop: 3
              }}
            />
          ) : (
            <div className="services-preview__loading">
              <p>Loading our signature treatments...</p>
            </div>
          )}

          <motion.div
            className="services-preview__cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate('/services')}
            >
              View All Treatments
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-preview section" style={{ backgroundColor: 'var(--color-beige-light)' }}>
        <div className="container">
          <div className="about-preview__content">
            <motion.div
              className="about-preview__text"
              {...fadeInUp}
            >
              <h2>The Scandinavian Way</h2>
              <p>
                Rooted in the Nordic philosophy of lagom—finding perfect balance—our spa 
                embraces simplicity, natural beauty, and mindful wellness. Every treatment 
                is designed to honor your body's natural healing abilities.
              </p>
              <p>
                From our minimalist treatment rooms to our carefully selected organic products, 
                we create an environment where you can truly disconnect and restore.
              </p>
              <Button 
                variant="outline" 
                onClick={() => navigate('/about')}
              >
                Learn More About Us
              </Button>
            </motion.div>
            <motion.div
              className="about-preview__image"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="about-preview__image-placeholder">
                <Heart size={60} className="about-preview__image-icon" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
