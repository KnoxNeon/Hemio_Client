import { Search, Heart, Users, Shield, Clock, MapPin } from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: 'Blood Donation',
      description: 'Register as a donor and help save lives by donating blood to those in need.',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: Search,
      title: 'Find Donors',
      description: 'Search for blood donors in your area based on blood type and location.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Users,
      title: 'Community Network',
      description: 'Join a community of life-savers and connect with donors and recipients.',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Your privacy and safety are our top priorities with secure data handling.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock support for urgent blood requirements and emergencies.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: MapPin,
      title: 'Location-Based',
      description: 'Find donors and blood banks near you with our location-based services.',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container-base px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Our <span className='text-red-500'>Services</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Comprehensive blood donation services designed to connect donors with those in need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            
            return (
              <div 
                key={index}
                className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-red-200 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 ${service.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-6 h-6 ${service.color}`} />
                </div>
                
                <h3 className="text-xl text-red-500 font-semibold  mb-3">
                  {service.title}
                </h3>
                
                <p className=" leading-relaxed">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services