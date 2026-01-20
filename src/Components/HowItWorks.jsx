import { UserPlus, Search, Heart, CheckCircle } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Register',
      description: 'Sign up as a donor or someone in need of blood. Complete your profile with basic information.',
      details: ['Create your account', 'Verify your email', 'Complete health screening', 'Set your availability'],
      color: 'text-blue-600',
      bgColor: 'bg-blue-500',
      lightBg: 'bg-blue-50'
    },
    {
      icon: Search,
      title: 'Search & Match',
      description: 'Find compatible donors in your area or browse blood requests that match your blood type.',
      details: ['Search by blood type', 'Filter by location', 'View donor profiles', 'Check availability'],
      color: 'text-green-600',
      bgColor: 'bg-green-500',
      lightBg: 'bg-green-50'
    },
    {
      icon: Heart,
      title: 'Connect & Donate',
      description: 'Connect with matched donors or recipients and coordinate the donation process safely.',
      details: ['Contact matched users', 'Schedule donation', 'Visit certified center', 'Complete donation'],
      color: 'text-red-600',
      bgColor: 'bg-red-500',
      lightBg: 'bg-red-50'
    },
    {
      icon: CheckCircle,
      title: 'Save Lives',
      description: 'Your donation helps save lives. Track your impact and continue making a difference.',
      details: ['Receive confirmation', 'Track your impact', 'Get health benefits', 'Join our community'],
      color: 'text-purple-600',
      bgColor: 'bg-purple-500',
      lightBg: 'bg-purple-50'
    }
  ]

  return (
    <section className="py-20 bg-white relative">
      <div className="container-base px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It <span className='text-red-600'>Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our simple 4-step process makes blood donation easy, safe, and impactful
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-green-200 via-red-200 to-purple-200 rounded-full hidden lg:block"></div>

          <div className="space-y-16">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              const isEven = index % 2 === 0
              
              return (
                <div key={index} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white rounded-full border-4 border-gray-200 flex items-center justify-center z-10 hidden lg:flex">
                    <div className={`w-10 h-10 ${step.bgColor} rounded-full flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}>
                    {/* Empty space for timeline */}
                    <div className="flex-1 hidden lg:block"></div>
                    
                    {/* Content Card */}
                    <div className={`flex-1 ${isEven ? 'lg:pr-16' : 'lg:pl-16'}`}>
                      <div className={`${step.lightBg} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative`}>
                        {/* Mobile Icon */}
                        <div className="lg:hidden flex items-center space-x-4 mb-6">
                          <div className={`w-12 h-12 ${step.bgColor} rounded-full flex items-center justify-center`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-sm font-bold text-gray-400">
                            STEP {index + 1}
                          </div>
                        </div>

                        {/* Step Number for Desktop */}
                        <div className="hidden lg:block absolute -top-4 left-8">
                          <span className={`inline-block px-4 py-2 ${step.bgColor} text-white text-sm font-bold rounded-full`}>
                            STEP {index + 1}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {step.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {step.description}
                        </p>

                        {/* Arrow pointing to timeline */}
                        {isEven ? (
                          <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                            <div className="w-0 h-0 border-l-8 border-l-gray-200 border-t-8 border-t-transparent border-b-8 border-b-transparent"></div>
                          </div>
                        ) : (
                          <div className="hidden lg:block absolute top-1/2 -left-4 transform -translate-y-1/2">
                            <div className="w-0 h-0 border-r-8 border-r-gray-200 border-t-8 border-t-transparent border-b-8 border-b-transparent"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-2xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Make a <span className='text-red-600'>Difference?</span> 
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our community of life-savers today. Whether you're donating blood or seeking help, 
              every action counts towards saving lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-3 text-lg">
                🩸 Start Donating
              </button>
              <button className="btn-outline px-8 py-3 text-lg">
                📋 Request Blood
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks