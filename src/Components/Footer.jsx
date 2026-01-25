import React from 'react';
import { Link } from 'react-router';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="gradient-secondary text-white">
      {/* Main Footer Content */}
      <div className="container-base section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img src='../logo.png' className='h-12 w-12' alt="Hemio Logo" />
              <h3 className="text-2xl font-bold">Hemio</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Connecting donors with those in need. Together, we save lives — one drop at a time.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-3 bg-red-600 rounded-full hover:bg-red-500 transition-colors group">
                <Facebook size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-3 bg-red-600 rounded-full hover:bg-red-500 transition-colors group">
                <Twitter size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-3 bg-red-600 rounded-full hover:bg-red-500 transition-colors group">
                <Instagram size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-3 bg-red-600 rounded-full hover:bg-red-500 transition-colors group">
                <Youtube size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-red-300">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/public-requests" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2">
                  <span>Blood Requests</span>
                </Link>
              </li>
              <li>
                <Link to="/search-requests" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2">
                  <span>Search Donors</span>
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2">
                  <span>Become a Donor</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/main" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2">
                  <span>Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-red-300">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-gray-300 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-red-300">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Dhaka, Bangladesh</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-gray-300">+880 1234-567890</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-gray-300">help@hemio.com</p>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="mt-6 p-4 bg-gray-900 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                <p className="text-sm font-semibold text-gray-200">Emergency</p>
              </div>
              <p className="text-sm text-gray-300">24/7 Blood Emergency</p>
              <h1 className="text-3xl font-bold text-red-500">+880 911-BLOOD</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-base px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <p>&copy; 2026 Hemio. All rights reserved.</p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>System Status: Online</span>
              </div>
              <Link to="/donate" className="text-red-300 hover:text-white transition-colors font-medium">
                🩸 Donate Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;