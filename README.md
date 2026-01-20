# Hemio – Blood Donation Platform

**Hemio** is a modern, responsive blood donation platform built with React, connecting donors with those in need. Save lives, one drop at a time.

Live URL: https://hemio-knox.surge.sh  

## 🩸 Key Features

- **Smart Blood Requests**: Browse and create blood donation requests by blood type, district, and upazila
- **Donor Management**: Complete donor registration and profile management system
- **Role-Based Access**: Secure role-based system for donors, volunteers, and administrators
- **Real-time Updates**: Live blood request updates and notifications
- **Mobile Responsive**: Perfect experience across mobile, tablet, and desktop devices
- **Secure Authentication**: Firebase-powered authentication with JWT tokens
- **Protected Routes**: Secure access control for authenticated users
- **Modern UI/UX**: Clean, intuitive interface with smooth animations

## 🎨 Design System Improvements

### Enhanced Components
- **Banner**: Hero section with animated typewriter, stats, and improved CTAs
- **Featured Benefits**: Card-based layout with gradient headers and hover effects
- **Request Cards**: Better information hierarchy with status badges and action buttons
- **Navigation**: Mobile-responsive navbar with user profile integration
- **Footer**: Organized sections with emergency contact information
- **Dashboard**: Mobile-friendly sidebar with user info and quick stats

### Consistent Spacing & Layout
- Implemented comprehensive spacing scale (4px to 128px)
- Standardized component padding and margins
- Improved grid layouts for better responsiveness
- Enhanced visual hierarchy throughout the application

### Color Palette
- **Primary Red**: `#dc2626` - Blood donation theme
- **Secondary Blue**: `#0369a1` - Trust and reliability  
- **Neutral Grays**: Professional and accessible design
- **Status Colors**: Semantic colors for different states

## 🛠️ Tech Stack & Packages

### Core Framework
- `react` + `react-dom` - Modern React 19 framework
- `react-router` - Client-side routing with protected routes
- `vite` - Fast build tool and development server

### Styling & UI
- `tailwindcss` - Utility-first CSS framework
- `daisyui` - Component library for consistent UI
- `motion` - Smooth animations and transitions
- `lucide-react` + `react-icons` - Beautiful, consistent icons

### Backend & Database
- `firebase` - Authentication and real-time database
- `axios` - HTTP client for API requests
- `mongodb` - Data storage and management
- `express` - Custom API endpoints

### Additional Features
- `react-toastify` - User notifications
- `typewriter-effect` - Animated text effects
- `sweetalert2` - Beautiful alert dialogs
- `stripe` - Payment processing integration

### Deployment
- `surge` - Frontend deployment
- `vercel` - Backend API deployment

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd donateblood
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create .env.local file with your Firebase configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
# ... other Firebase config
```

4. Start the development server
```bash
npm run dev
```

## 📱 Responsive Design

The application features a mobile-first design approach with breakpoints:
- **Mobile**: < 768px - Optimized touch interface
- **Tablet**: 768px - 1024px - Balanced layout
- **Desktop**: > 1024px - Full feature experience

## 🎯 Recent UI/UX Improvements

### 1. **Enhanced Visual Hierarchy**
- Consistent typography scale with proper heading levels
- Improved color contrast for better accessibility
- Strategic use of whitespace for better content flow

### 2. **Better Mobile Experience**
- Collapsible navigation with smooth animations
- Touch-friendly button sizes and spacing
- Optimized forms for mobile input

### 3. **Improved Loading States**
- Skeleton loading for better perceived performance
- Animated loading indicators
- Proper error and empty states

### 4. **Enhanced Interactivity**
- Hover effects and micro-animations
- Smooth transitions between states
- Visual feedback for user actions

## 🔧 Configuration

### Design System
- Custom CSS variables for consistent theming
- Reusable component classes
- Standardized spacing and color utilities
- Animation keyframes and transitions

### Theme Support
- Light and dark theme options
- System preference detection
- Smooth theme transitions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email help@hemio.com or create an issue in the repository.

---

**Made with ❤️ for humanity** - Every drop counts, every donor matters.