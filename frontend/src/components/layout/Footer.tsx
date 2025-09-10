import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          {/* Brand Section */}
          <div className="footer__section">
            <h3 className="footer__brand">Serenity Spa</h3>
            <p className="footer__description">
              A tranquil escape inspired by Scandinavian wellness traditions. 
              Experience serenity through our mindful treatments and peaceful environment.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer__section">
            <h4 className="footer__heading">Quick Links</h4>
            <ul className="footer__links">
              <li><Link to="/services" className="footer__link">Our Services</Link></li>
              <li><Link to="/about" className="footer__link">About Us</Link></li>
              <li><Link to="/contact" className="footer__link">Contact</Link></li>
              <li><Link to="/booking" className="footer__link">Book Treatment</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer__section">
            <h4 className="footer__heading">Treatments</h4>
            <ul className="footer__links">
              <li><span className="footer__link">Swedish Massage</span></li>
              <li><span className="footer__link">Aromatherapy</span></li>
              <li><span className="footer__link">Facial Treatments</span></li>
              <li><span className="footer__link">Body Wraps</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer__section">
            <h4 className="footer__heading">Contact</h4>
            <div className="footer__contact">
              <div className="footer__contact-item">
                <MapPin size={16} />
                <span>123 Wellness Street, Serenity City</span>
              </div>
              <div className="footer__contact-item">
                <Phone size={16} />
                <span>(555) 123-4567</span>
              </div>
              <div className="footer__contact-item">
                <Mail size={16} />
                <span>hello@serenityspa.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer__bottom">
          <div className="footer__bottom-content">
            <p className="footer__copyright">
              © {currentYear} Serenity Spa. All rights reserved.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="footer__social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
