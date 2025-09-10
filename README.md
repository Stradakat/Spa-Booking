# Serenity Spa - Scandinavian Wellness Website

A modern, minimalist fullstack website for a Scandinavian-inspired spa, built with Vite, React, TypeScript, and Express.js.

## 🌿 Design Philosophy

This project embodies the Scandinavian design principles of simplicity, functionality, and natural beauty. The website features:

- **Clean, minimalist aesthetic** with ample white space
- **Neutral color palette** featuring soft whites, warm greys, and sage greens
- **Natural textures and materials** subtly represented throughout
- **Gentle animations** that enhance without distraction
- **Peaceful, organic feel** that promotes serenity and wellness

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd scandinavian-spa
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

### Running the Application

#### Development Mode

**Frontend (Vite dev server):**
```bash
cd frontend
npm run dev
```
The frontend will be available at `http://localhost:5173`

**Backend (Express server):**
```bash
cd backend
npm run dev
```
The API will be available at `http://localhost:5000`

#### Production Mode

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

**Backend:**
```bash
cd backend
npm start
```

## 🏗️ Project Structure

```
scandinavian-spa/
├── frontend/                 # React/Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── common/      # Button, Card, etc.
│   │   │   └── layout/      # Header, Footer
│   │   ├── pages/           # Page components
│   │   ├── styles/          # Global styles and design system
│   │   └── types/           # TypeScript type definitions
│   └── public/              # Static assets
├── backend/                 # Express.js API
│   ├── server.js           # Main server file
│   ├── package.json
│   └── .env                # Environment variables
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary Colors**: Soft whites (#ffffff, #fafafa)
- **Warm Greys**: Various shades from #f8f7f4 to #2a2925
- **Accent Colors**: Sage green (#9caf9c), beige (#f5f1eb), wood tones (#d4c4a8)

### Typography
- **Headings**: Playfair Display (serif)
- **Body Text**: Inter (sans-serif)
- **Weights**: Light (300), Regular (400), Medium (500), Semibold (600)

### Components
- **Button**: Multiple variants (primary, secondary, outline, ghost)
- **Card**: Elevation and hover effects
- **Layout**: Responsive grid system with generous spacing

## 🛠️ Technologies Used

### Frontend
- **Vite** - Fast build tool and dev server
- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

### Backend
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **Nodemon** - Development auto-restart

## 📱 Features

### Frontend Features
- **Responsive design** that works on all devices
- **Smooth animations** with Framer Motion
- **Clean navigation** with mobile-friendly hamburger menu
- **Service showcase** with detailed treatment information
- **Contact forms** ready for integration
- **Accessible design** with proper focus management

### Backend API Endpoints
- `GET /api/health` - Health check
- `GET /api/services` - Get all spa services
- `GET /api/services/:id` - Get specific service
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get all bookings
- `PATCH /api/bookings/:id` - Update booking status
- `DELETE /api/bookings/:id` - Delete booking
- `POST /api/contact` - Handle contact form submissions

## 🔮 Future Enhancements

- **Database integration** (MongoDB/PostgreSQL)
- **User authentication** and user profiles
- **Payment processing** for online bookings
- **Admin dashboard** for managing appointments
- **Email notifications** for booking confirmations
- **Real-time availability** calendar
- **Image gallery** for treatments and facilities
- **Blog section** for wellness content
- **Multi-language support**

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by authentic Scandinavian design principles
- Icons provided by Lucide React
- Fonts from Google Fonts (Inter & Playfair Display)
- Built with modern web technologies and best practices

---

*Experience serenity through authentic Scandinavian wellness. 🌿*
