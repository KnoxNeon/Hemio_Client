import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ChevronDown, Play, Heart, Users, Award } from 'lucide-react';

function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const slides = [
    {
      title: "Save a Life Today",
      subtitle: "Donate Blood!",
      description: "Your one donation can save up to three lives. Join our community of heroes and help those in need.",
      image: "../banner.png",
      stats: { lives: "8,750+", donors: "15,420+", support: "24/7" }
    },
    {
      title: "Be Someone's Hero",
      subtitle: "Every Drop Counts!",
      description: "Join thousands of donors who are making a difference every day. Your blood donation is a gift of life.",
      image: "../banner2.jpg",
      stats: { lives: "3 Lives", donors: "1 Donation", support: "Instant" }
    },
    {
      title: "Emergency Response",
      subtitle: "When Seconds Matter!",
      description: "Our 24/7 emergency response system connects urgent blood needs with available donors instantly.",
      image: "../banner3.jpg",
      stats: { lives: "< 3 Min", donors: "Response", support: "Always" }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const scrollToNext = () => {
    document.getElementById('statistics').scrollIntoView({ behavior: 'smooth' });
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="gradient-hero text-white relative overflow-hidden" style={{ height: '70vh', minHeight: '600px' }}>
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-red-300 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-red-300 rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="container-base h-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full py-12">
          {/* Image Section */}
          <div className="order-2 lg:order-1 flex justify-center relative">
            <div className="relative group">
              <img 
                src={currentSlideData.image}
                alt="Blood donation hero" 
                className="w-full max-w-lg h-auto object-contain drop-shadow-2xl transition-all duration-500 group-hover:scale-105" 
              />
              
              
            </div>
          </div>

          {/* Content Section */}
          <div className="order-1 lg:order-2 text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg leading-tight">
                {currentSlideData.title}
                <br />
                <span className="text-red-400 animate-pulse">{currentSlideData.subtitle}</span>
              </h1>
              
              <p className="text-xl text-gray-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {currentSlideData.description}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link
                to="/register"
                className="group btn-primary text-lg px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center space-x-2"
              >
                <Heart className="w-6 h-6 group-hover:animate-pulse" />
                <span>Join as a Donor</span>
              </Link>
              <Link
                to="/public-requests"
                className="group btn-outline border-white text-white hover:bg-white hover:text-red-600 text-lg px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center space-x-2"
              >
                <Users className="w-6 h-6" />
                <span>Find Requests</span>
              </Link>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center lg:justify-start space-x-2 pt-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-red-400 w-8' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;