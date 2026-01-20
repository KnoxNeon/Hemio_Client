import { Heart, Users, Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

const CallToAction = () => {
  const urgentStats = [
    {
      icon: Clock,
      number: '3',
      label: 'seconds',
      description: 'Someone needs blood every 3 seconds'
    },
    {
      icon: Heart,
      number: '1',
      label: 'donation',
      description: 'Can save up to 3 lives'
    },
    {
      icon: Users,
      number: '37%',
      label: 'eligible',
      description: 'Of population can donate blood'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-red-100 via-pink-50 to-blue-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-200 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-200 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-200 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-red-200 rounded-full"></div>
      </div>

      <div className="container-base px-6 relative z-10">
        {/* Urgent Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {urgentStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="text-center text-gray-800">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-200 bg-opacity-80 rounded-full mb-4">
                  <IconComponent className="w-8 h-8 text-red-700" />
                </div>
                <div className="mb-2">
                  <span className="text-5xl font-bold block text-gray-900">{stat.number}</span>
                  <span className="text-xl font-medium text-red-600">{stat.label}</span>
                </div>
                <p className="text-gray-700">{stat.description}</p>
              </div>
            )
          })}
        </div>

        {/* Main CTA Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Every Drop Counts.
            <br />
            <span className="text-red-600">Every Life Matters.</span>
          </h2>
          
          <p className="text-2xl text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto">
            Right now, someone is fighting for their life and needs your help. 
            Your blood donation could be the difference between life and death.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link 
              to="/register"
              className="group bg-red-600 text-white px-10 py-4 rounded-xl font-bold text-xl hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-3"
            >
              <Heart className="w-6 h-6 group-hover:text-red-100" />
              <span>Become a Life Saver</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/public-requests"
              className="group bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-blue-500 flex items-center justify-center space-x-3"
            >
              <Users className="w-6 h-6" />
              <span>Find Someone to Help</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-8 border border-red-200 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              🚨 Emergency Blood Need?
            </h3>
            <p className="text-gray-700 mb-6 text-lg">
              For urgent blood requirements, contact our 24/7 emergency helpline
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="tel:+8801234567890"
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors flex items-center space-x-2 shadow-md"
              >
                <span>📞 Call Now: +880 123 456 7890</span>
              </a>
              <span className="text-gray-600 text-sm">Available 24/7</span>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-16">
          <p className="text-gray-600 text-lg italic">
            "The gift of blood is the gift of life. There is no greater gift than to give a part of yourself to save another."
          </p>
        </div>
      </div>
    </section>
  )
}

export default CallToAction