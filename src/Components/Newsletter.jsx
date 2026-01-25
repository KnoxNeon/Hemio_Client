import { useState } from 'react'
import { Mail, Send, CheckCircle, Heart, Bell, Users } from 'lucide-react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail('')
    }, 1500)
  }

  const benefits = [
    {
      icon: Heart,
      title: 'Donation Reminders',
      description: 'Get notified when you\'re eligible to donate again'
    },
    {
      icon: Bell,
      title: 'Urgent Requests',
      description: 'Be the first to know about emergency blood needs'
    },
    {
      icon: Users,
      title: 'Community Updates',
      description: 'Stay connected with our donor community stories'
    }
  ]

  if (isSubscribed) {
    return (
      <section className="section-padding-lg bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container-base px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-8">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Welcome to Our Community! 🎉
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Thank you for subscribing! You'll receive updates about donation opportunities, 
              community stories, and ways to make an even bigger impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsSubscribed(false)}
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Subscribe Another Email
              </button>
              <button className="bg-green-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-800 transition-colors">
                Start Donating Now
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding-lg bg-gradient-to-r from-red-600 to-blue-600">
      <div className="container-base px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
                <Mail className="w-8 h-8 text-red-500" />
              </div>
              
              <h2 className="text-4xl text-gray-900 font-bold mb-6">
                Stay Connected, Save More Lives
              </h2>
              
              <p className="text-xl text-red-100 mb-8 leading-relaxed">
                Join our newsletter to receive donation reminders, urgent blood requests in your area, 
                and inspiring stories from our community of life-savers.
              </p>

              {/* Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-red-500 fill-red-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {benefit.title}
                        </h3>
                        <p className="text-red-100 text-sm">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right Form */}
            <div className="card-elevated p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Join 15,000+ Donors
                </h3>
                <p className="text-secondary">
                  Get updates that help you save more lives
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors pl-12"
                      required
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 bg-white rounded-full animate-bounce"></div>
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Subscribe Now</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-muted text-center">
                  By subscribing, you agree to receive emails about donation opportunities and community updates. 
                  You can unsubscribe at any time.
                </p>
              </form>

              {/* Social Proof */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>15,420 subscribers</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>8,750 lives saved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter