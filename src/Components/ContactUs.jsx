import { Send, Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent.');
    e.target.reset();
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+880 1234-567890", "Available 24/7"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["help@hemio.com", "Response within 2 hours"],
      color: "from-green-500 to-green-600"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: ["123 Blood Drive Street", "Dhaka, Bangladesh"],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Office Hours",
      details: ["Mon-Fri: 9AM-6PM", "Emergency: 24/7"],
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section className="section-padding-lg bg-section-alt">
      <div className="container-base">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-heading-2 mb-6">
            Connect with <span className="text-red-600">Us</span>
          </h2>
          <p className="text-body-lg max-w-3xl mx-auto">
            Have questions or need help? We're here for you. Reach out anytime — every message matters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Form */}
          <div className="card-elevated animate-slide-up">
            <div className="gradient-secondary p-8">
              <h3 className="text-2xl font-bold text-white mb-2">Send us a Message</h3>
              <p className="text-gray-200">We'll get back to you within 24 hours</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="form-label">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="form-input"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    placeholder="+880 1234-567890"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="form-input"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="form-label">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="form-input"
                >
                  <option value="">Select a topic</option>
                  <option value="donation">Blood Donation</option>
                  <option value="request">Blood Request</option>
                  <option value="technical">Technical Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="form-label">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="form-input resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center space-x-2 py-4"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 animate-slide-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="card-base p-6 text-center group hover:scale-105 transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    {info.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-primary mb-2">{info.title}</h4>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className={`text-secondary ${idx === 0 ? 'font-medium' : 'text-sm'}`}>
                      {detail}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Emergency Contact */}
            <div className="card-base p-8 bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-600">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-red-800">Emergency Blood Request</h4>
                  <p className="text-red-600">Available 24/7</p>
                </div>
              </div>
              <p className="text-secondary mb-4">
                For urgent blood requirements, call our emergency hotline immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:+880911BLOOD" className="btn-primary text-center">
                  📞 Call Emergency: +880 911-BLOOD
                </a>
                <a href="sms:+880911BLOOD" className="btn-outline text-center">
                  💬 Send SMS
                </a>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="card-base p-6 text-center bg-gradient-to-r from-blue-50 to-blue-100">
              <h4 className="text-lg font-semibold text-primary mb-2">
                Looking for Quick Answers?
              </h4>
              <p className="text-secondary mb-4">
                Check our FAQ section for common questions about blood donation.
              </p>
              <a href="/faq" className="btn-secondary">
                📚 View FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;