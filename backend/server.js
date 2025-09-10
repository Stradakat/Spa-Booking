const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock data for services
const services = [
  {
    id: 1,
    title: 'Swedish Massage',
    description: 'Deeply relaxing full-body massage using gentle, flowing strokes to release tension and improve circulation.',
    duration: '60-90 min',
    price: 120,
    category: 'massage',
    benefits: ['Reduces muscle tension', 'Improves circulation', 'Promotes deep relaxation'],
  },
  {
    id: 2,
    title: 'Aromatherapy Treatment',
    description: 'Therapeutic treatment combining essential oils with gentle massage techniques for ultimate relaxation.',
    duration: '75 min',
    price: 140,
    category: 'aromatherapy',
    benefits: ['Balances mind and body', 'Reduces stress', 'Enhances mood'],
  },
  {
    id: 3,
    title: 'Nordic Facial',
    description: 'Purifying facial treatment inspired by Scandinavian skincare traditions using natural ingredients.',
    duration: '60 min',
    price: 100,
    category: 'facial',
    benefits: ['Deep cleansing', 'Natural glow', 'Anti-aging benefits'],
  },
  {
    id: 4,
    title: 'Hot Stone Therapy',
    description: 'Heated basalt stones are placed on key points of your body while warm stone massage melts away tension. A deeply grounding and warming experience.',
    duration: '90 min',
    price: 160,
    category: 'massage',
    benefits: ['Deep muscle relaxation', 'Improved circulation', 'Stress relief'],
  },
  {
    id: 5,
    title: 'Body Wrap Treatment',
    description: 'Nourishing body wrap using natural ingredients like seaweed or clay to detoxify, hydrate, and revitalize your skin from head to toe.',
    duration: '75 min',
    price: 130,
    category: 'body-treatment',
    benefits: ['Skin detoxification', 'Deep hydration', 'Improved skin texture'],
  },
  {
    id: 6,
    title: 'Couples Retreat',
    description: 'Share a peaceful spa experience together in our dedicated couples suite. Choose from any of our massage treatments in a serene, private setting.',
    duration: '90 min',
    price: 280,
    category: 'couples',
    benefits: ['Shared relaxation', 'Private suite', 'Bonding experience'],
  },
];

// Mock data for bookings
let bookings = [];

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Serenity Spa API is running' });
});

// Get all services
app.get('/api/services', (req, res) => {
  res.json(services);
});

// Get service by ID
app.get('/api/services/:id', (req, res) => {
  const service = services.find(s => s.id === parseInt(req.params.id));
  if (!service) {
    return res.status(404).json({ error: 'Service not found' });
  }
  res.json(service);
});

// Get all bookings
app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

// Create a new booking
app.post('/api/bookings', (req, res) => {
  const { name, email, phone, service, date, time, notes } = req.body;
  
  // Basic validation
  if (!name || !email || !service || !date || !time) {
    return res.status(400).json({ 
      error: 'Missing required fields: name, email, service, date, time' 
    });
  }

  const booking = {
    id: bookings.length + 1,
    name,
    email,
    phone: phone || '',
    service,
    date,
    time,
    notes: notes || '',
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  bookings.push(booking);
  
  res.status(201).json({
    message: 'Booking created successfully',
    booking: booking
  });
});

// Update booking status
app.patch('/api/bookings/:id', (req, res) => {
  const bookingId = parseInt(req.params.id);
  const { status } = req.body;
  
  const booking = bookings.find(b => b.id === bookingId);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  
  if (status) {
    booking.status = status;
  }
  
  res.json({
    message: 'Booking updated successfully',
    booking: booking
  });
});

// Delete booking
app.delete('/api/bookings/:id', (req, res) => {
  const bookingId = parseInt(req.params.id);
  const bookingIndex = bookings.findIndex(b => b.id === bookingId);
  
  if (bookingIndex === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  
  bookings.splice(bookingIndex, 1);
  
  res.json({ message: 'Booking deleted successfully' });
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ 
      error: 'Missing required fields: name, email, message' 
    });
  }
  
  // In a real app, you would send an email or save to database
  console.log('Contact form submission:', { name, email, message });
  
  res.json({
    message: 'Thank you for your message. We will get back to you soon!',
    status: 'received'
  });
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🧘‍♀️ Serenity Spa API running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
});
