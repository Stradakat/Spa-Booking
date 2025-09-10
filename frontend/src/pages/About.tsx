import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Leaf, Users, Award, MapPin, Clock, Phone, Mail } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import TeamMember from '../components/about/TeamMember';
import Testimonial from '../components/about/Testimonial';
import './About.css';

const About: React.FC = () => {
  const navigate = useNavigate();
  const values = [
    {
      icon: Leaf,
      title: 'Natural Wellness',
      description: 'We believe in the healing power of nature, using only organic, sustainably-sourced products that honor both your body and the environment.',
    },
    {
      icon: Heart,
      title: 'Holistic Care',
      description: 'Our approach addresses mind, body, and spirit, creating a complete wellness experience that nurtures your entire being.',
    },
    {
      icon: Users,
      title: 'Personal Touch',
      description: 'Every guest receives individualized attention, with treatments customized to your unique needs and wellness goals.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in everything we do, from our skilled therapists to our tranquil environment.',
    },
  ];

  const teamMembers = [
    {
      name: 'Anna Lindström',
      role: 'Founder & Head Therapist',
      specialty: 'Swedish Massage, Aromatherapy',
      bio: 'With over 15 years of experience in wellness therapy, Anna founded Serenity Spa to bring authentic Scandinavian healing traditions to our community. She trained in Stockholm and believes deeply in the power of lagom - finding perfect balance.',
      image: '/images/team/anna.jpg'
    },
    {
      name: 'Erik Johansson',
      role: 'Senior Massage Therapist',
      specialty: 'Deep Tissue, Hot Stone Therapy',
      bio: 'Erik brings a gentle strength to his practice, specializing in therapeutic massage techniques. His calm presence and intuitive touch help guests release deep-held tension and find renewed vitality.',
      image: '/images/team/erik.jpg'
    },
    {
      name: 'Maja Petersen',
      role: 'Aesthetician & Wellness Coach',
      specialty: 'Nordic Facials, Skincare Consultation',
      bio: 'Maja combines traditional Nordic skincare wisdom with modern techniques. Her passion for natural beauty and holistic wellness shines through in every treatment she provides.',
      image: '/images/team/maja.jpg'
    },
    {
      name: 'Lars Andersson',
      role: 'Wellness Coordinator',
      specialty: 'Guest Experience, Wellness Planning',
      bio: 'Lars ensures every guest\'s journey is seamless and personalized. His warm hospitality and attention to detail create the perfect atmosphere for relaxation and renewal.',
      image: '/images/team/lars.jpg'
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      location: 'San Francisco, CA',
      rating: 5,
      text: 'The most peaceful and rejuvenating experience I\'ve ever had. The Swedish massage was incredible, and the atmosphere truly transported me to a serene Nordic forest.',
      treatment: 'Swedish Massage'
    },
    {
      name: 'Michael Chen',
      location: 'Portland, OR',
      rating: 5,
      text: 'Anna and her team have created something truly special. The attention to detail, from the organic products to the minimalist design, shows their commitment to authentic wellness.',
      treatment: 'Aromatherapy Treatment'
    },
    {
      name: 'Emma Thompson',
      location: 'Seattle, WA',
      rating: 5,
      text: 'I come here monthly for the Nordic Facial and it\'s transformed my skin. Maja\'s knowledge of natural skincare is incredible, and the results speak for themselves.',
      treatment: 'Nordic Facial'
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero__content">
            <motion.div
              className="about-hero__text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="about-hero__title">Our Story</h1>
              <p className="about-hero__subtitle">
                Born from a deep love for Scandinavian wellness traditions, Serenity Spa 
                is a sanctuary where ancient healing meets modern comfort.
              </p>
            </motion.div>
            <motion.div
              className="about-hero__image"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="about-hero__image-placeholder">
                <Leaf size={100} className="about-hero__image-icon" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story section">
        <div className="container">
          <div className="about-story__content">
            <motion.div
              className="about-story__text"
              {...fadeInUp}
            >
              <h2>The Birth of Serenity</h2>
              <p>
                Our journey began with a simple yet profound realization: in our fast-paced world, 
                we desperately need spaces that honor the ancient art of rest and restoration. 
                Inspired by the Scandinavian concept of <em>lagom</em> – finding perfect balance – 
                we created Serenity Spa as a haven where you can reconnect with your inner peace.
              </p>
              <p>
                Founded in 2018 by Anna Lindström, a certified wellness therapist who trained in 
                Stockholm's most renowned spas, Serenity Spa brings authentic Nordic healing 
                traditions to our local community. Every element of our spa, from the minimalist 
                design to the carefully selected organic products, reflects our commitment to 
                creating an environment where true wellness can flourish.
              </p>
              <p>
                We believe that wellness is not a luxury – it's a necessity. Our mission is to 
                make authentic, transformative spa experiences accessible to everyone who seeks 
                balance, healing, and renewal in their lives.
              </p>
            </motion.div>
            <motion.div
              className="about-story__stats"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="about-story__stat">
                <span className="about-story__stat-number">2,500+</span>
                <span className="about-story__stat-label">Happy Guests</span>
              </div>
              <div className="about-story__stat">
                <span className="about-story__stat-number">6</span>
                <span className="about-story__stat-label">Years of Service</span>
              </div>
              <div className="about-story__stat">
                <span className="about-story__stat-number">12</span>
                <span className="about-story__stat-label">Treatment Options</span>
              </div>
              <div className="about-story__stat">
                <span className="about-story__stat-number">4.9★</span>
                <span className="about-story__stat-label">Average Rating</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values section" style={{ backgroundColor: 'var(--color-beige-light)' }}>
        <div className="container">
          <motion.div
            className="about-values__header"
            {...fadeInUp}
          >
            <h2>Our Values</h2>
            <p>
              These principles guide everything we do, ensuring every visit to Serenity Spa 
              is a step toward greater wellness and inner peace.
            </p>
          </motion.div>
          
          <div className="about-values__grid">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="about-values__card">
                  <div className="about-values__card-icon">
                    <value.icon size={32} />
                  </div>
                  <h3 className="about-values__card-title">{value.title}</h3>
                  <p className="about-values__card-description">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team section">
        <div className="container">
          <motion.div
            className="about-team__header"
            {...fadeInUp}
          >
            <h2>Meet Our Team</h2>
            <p>
              Our skilled therapists and wellness professionals are passionate about helping 
              you achieve balance, relaxation, and renewal.
            </p>
          </motion.div>

          <div className="about-team__grid">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <TeamMember {...member} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="about-facilities section" style={{ backgroundColor: 'var(--color-off-white)' }}>
        <div className="container">
          <motion.div
            className="about-facilities__header"
            {...fadeInUp}
          >
            <h2>Our Sanctuary</h2>
            <p>
              Every corner of Serenity Spa has been thoughtfully designed to promote 
              tranquility and support your wellness journey.
            </p>
          </motion.div>

          <div className="about-facilities__content">
            <motion.div
              className="about-facilities__text"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="about-facilities__feature">
                <h3>Treatment Rooms</h3>
                <p>
                  Six private treatment rooms, each featuring natural materials, soft lighting, 
                  and carefully controlled temperature for ultimate comfort.
                </p>
              </div>
              <div className="about-facilities__feature">
                <h3>Relaxation Lounge</h3>
                <p>
                  A peaceful space for meditation and quiet reflection, with comfortable seating 
                  and views of our tranquil garden.
                </p>
              </div>
              <div className="about-facilities__feature">
                <h3>Organic Product Line</h3>
                <p>
                  Carefully curated selection of certified organic oils, lotions, and skincare 
                  products sourced from sustainable Scandinavian suppliers.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="about-facilities__amenities"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3>Amenities</h3>
              <ul className="about-facilities__amenities-list">
                <li>Complimentary herbal tea and infused water</li>
                <li>Heated treatment tables</li>
                <li>Private changing areas with robes and slippers</li>
                <li>Aromatherapy diffusers in every room</li>
                <li>Sound healing music curated by wellness experts</li>
                <li>Post-treatment relaxation area</li>
                <li>Retail boutique with organic wellness products</li>
                <li>Free parking for all guests</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="about-testimonials section">
        <div className="container">
          <motion.div
            className="about-testimonials__header"
            {...fadeInUp}
          >
            <h2>What Our Guests Say</h2>
            <p>
              The words of our guests inspire us every day to continue providing 
              exceptional wellness experiences.
            </p>
          </motion.div>

          <div className="about-testimonials__grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Testimonial {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="about-contact section" style={{ backgroundColor: 'var(--color-beige-light)' }}>
        <div className="container">
          <motion.div
            className="about-contact__content"
            {...fadeInUp}
          >
            <h2>Visit Us</h2>
            <p>
              We're located in the heart of the city, easily accessible and surrounded by 
              the natural beauty that inspires our wellness philosophy.
            </p>
            
            <div className="about-contact__details">
              <div className="about-contact__info">
                <div className="about-contact__info-item">
                  <MapPin size={20} />
                  <div>
                    <strong>Address</strong>
                    <p>123 Wellness Way<br />Serenity Heights, CA 90210</p>
                  </div>
                </div>
                <div className="about-contact__info-item">
                  <Phone size={20} />
                  <div>
                    <strong>Phone</strong>
                    <p>(555) 123-CALM</p>
                  </div>
                </div>
                <div className="about-contact__info-item">
                  <Mail size={20} />
                  <div>
                    <strong>Email</strong>
                    <p>hello@serenityspa.com</p>
                  </div>
                </div>
                <div className="about-contact__info-item">
                  <Clock size={20} />
                  <div>
                    <strong>Hours</strong>
                    <p>Monday - Friday: 9am - 8pm<br />
                       Saturday - Sunday: 10am - 6pm</p>
                  </div>
                </div>
              </div>
              <div className="about-contact__cta">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate('/booking')}
                >
                  Book Your Visit
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/contact')}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
