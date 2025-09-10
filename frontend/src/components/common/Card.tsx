import React from 'react';
import { motion } from 'framer-motion';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'bordered';
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  hover = false,
  onClick,
}) => {
  const baseClasses = 'card';
  const variantClass = `card--${variant}`;
  const hoverClass = hover ? 'card--hoverable' : '';
  const clickableClass = onClick ? 'card--clickable' : '';

  const classes = [baseClasses, variantClass, hoverClass, clickableClass, className]
    .filter(Boolean)
    .join(' ');

  const cardContent = (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );

  if (hover || onClick) {
    return (
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={onClick ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export default Card;
