import { useState, useEffect } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Blood Donor',
      location: 'Dhaka, Bangladesh',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'Hemio made it so easy for me to find people who needed my blood type. I\'ve donated 8 times through this platform and each experience has been smooth and rewarding. Knowing that I\'ve helped save lives gives me immense satisfaction.',
      bloodType: 'O-',
      donationCount: 8
    },
    {
      id: 2,
      name: 'Ahmed Rahman',
      role: 'Recipient Family',
      location: 'Chittagong, Bangladesh',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'When my father needed an emergency blood transfusion, Hemio connected us with donors within hours. The platform\'s quick response and the generosity of donors literally saved his life. We are forever grateful to this amazing community.',
      bloodType: 'A+',
      emergency: true
    },
    {
      id: 3,
      name: 'Dr. Maria Garcia',
      role: 'Hospital Coordinator',
      location: 'Sylhet Medical College',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'As a hospital coordinator, I\'ve seen how Hemio has revolutionized blood donation in our region. The platform connects us with verified donors quickly, and the quality of service is exceptional. It\'s become an essential tool for our hospital.',
      bloodType: 'B+',
      professional: true
    },
    {
      id: 4,
      name: 'John Smith',
      role: 'Regular Donor',
      location: 'Rajshahi, Bangladesh',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'I\'ve been donating blood for over 10 years, but Hemio has made the process more meaningful. I can see the direct impact of my donations and connect with recipients. The community aspect makes every donation feel special.',
      bloodType: 'AB+',
      donationCount: 15
    },
    {
      id: 5,
      name: 'Fatima Khan',
      role: 'Mother & Donor',
      location: 'Khulna, Bangladesh',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'After receiving blood during my pregnancy complications, I decided to become a donor myself. Hemio\'s supportive community and easy-to-use platform encouraged me to give back. I\'ve now helped 5 families through my donations.',
      bloodType: 'O+',
      donationCount: 5
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentData = testimonials[currentTestimonial]

  return (
    <section className="section-padding-lg bg-section-accent">
      <div className="container-base px-6">
        <div className="text-center mb-16">
          <h2 className="text-heading-2 mb-4">
            Stories from Our Community
          </h2>
          <p className="text-body-lg max-w-3xl mx-auto">
            Real stories from donors, recipients, and healthcare professionals who have experienced 
            the life-saving impact of our blood donation community.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="card-elevated p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
            
            {/* Quote Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <Quote className="w-8 h-8 text-red-600" />
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="text-center relative z-10">
              <div className="flex justify-center mb-4">
                {[...Array(currentData.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              <blockquote className="text-xl text-secondary leading-relaxed mb-8 italic">
                "{currentData.text}"
              </blockquote>

              <div className="flex items-center justify-center space-x-4">
                <img 
                  src={currentData.image} 
                  alt={currentData.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="text-left">
                  <h4 className="text-xl font-bold text-primary">
                    {currentData.name}
                  </h4>
                  <p className="text-secondary">
                    {currentData.role}
                  </p>
                  <p className="text-sm text-muted">
                    {currentData.location}
                  </p>
                </div>
                <div className="text-center">
                  <div className="blood-group-display w-12 h-12 text-lg mb-2">
                    {currentData.bloodType}
                  </div>
                  {currentData.donationCount && (
                    <p className="text-xs text-muted">
                      {currentData.donationCount} donations
                    </p>
                  )}
                  {currentData.emergency && (
                    <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                      Emergency Case
                    </span>
                  )}
                  {currentData.professional && (
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Healthcare Professional
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-muted" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-muted" />
            </button>
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentTestimonial ? 'bg-red-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center card-base p-8">
            <div className="text-4xl font-bold text-red-600 mb-2">4.9/5</div>
            <div className="text-secondary">Average Rating</div>
            <div className="flex justify-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          
          <div className="text-center card-base p-8">
            <div className="text-4xl font-bold text-blue-600 mb-2">2,500+</div>
            <div className="text-secondary">Happy Donors</div>
          </div>
          
          <div className="text-center card-base p-8">
            <div className="text-4xl font-bold text-green-600 mb-2">8,750</div>
            <div className="text-secondary">Lives Impacted</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials