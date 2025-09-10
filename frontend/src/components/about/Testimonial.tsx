import React from 'react';
import { Star, Quote } from 'lucide-react';
import Card from '../common/Card';
import './Testimonial.css';

interface TestimonialProps {
  name: string;
  location: string;
  rating: number;
  text: string;
  treatment: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, location, rating, text, treatment }) => {
  return (
    <Card className="testimonial">
      <div className="testimonial__content">
        <div className="testimonial__quote-icon">
          <Quote size={24} />
        </div>
        
        <div className="testimonial__rating">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              size={16}
              className={index < rating ? 'testimonial__star--filled' : 'testimonial__star'}
            />
          ))}
        </div>
        
        <p className="testimonial__text">"{text}"</p>
        
        <div className="testimonial__footer">
          <div className="testimonial__author">
            <h4 className="testimonial__name">{name}</h4>
            <p className="testimonial__location">{location}</p>
          </div>
          <div className="testimonial__treatment">
            <span className="testimonial__treatment-label">Treatment:</span>
            <span className="testimonial__treatment-name">{treatment}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Testimonial;
