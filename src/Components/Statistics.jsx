import { useEffect, useState } from 'react'
import { Heart, Users, MapPin, Award } from 'lucide-react'

const Statistics = () => {
  const [stats, setStats] = useState({
    totalDonors: 0,
    livesImpacted: 0,
    citiesCovered: 0,
    successfulDonations: 0
  })

  useEffect(() => {
    // Animate numbers on component mount
    const animateNumbers = () => {
      const targets = {
        totalDonors: 15420,
        livesImpacted: 8750,
        citiesCovered: 64,
        successfulDonations: 12300
      }

      const duration = 2000 // 2 seconds
      const steps = 60
      const stepDuration = duration / steps

      let currentStep = 0
      const interval = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setStats({
          totalDonors: Math.floor(targets.totalDonors * progress),
          livesImpacted: Math.floor(targets.livesImpacted * progress),
          citiesCovered: Math.floor(targets.citiesCovered * progress),
          successfulDonations: Math.floor(targets.successfulDonations * progress)
        })

        if (currentStep >= steps) {
          clearInterval(interval)
          setStats(targets)
        }
      }, stepDuration)
    }

    const timer = setTimeout(animateNumbers, 500)
    return () => clearTimeout(timer)
  }, [])

  const statisticsData = [
    {
      icon: Users,
      number: stats.totalDonors.toLocaleString(),
      label: 'Registered Donors',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Heart,
      number: stats.livesImpacted.toLocaleString(),
      label: 'Lives Impacted',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: MapPin,
      number: stats.citiesCovered,
      label: 'Cities Covered',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Award,
      number: stats.successfulDonations.toLocaleString(),
      label: 'Successful Donations',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  return (
    <section id="statistics" className="py-16 bg-gradient-to-br from-red-50 to-blue-50">
      <div className="container-base px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Making a <span className='text-red-500'>Difference Together</span> 
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every donation counts. See the impact we've made together in saving lives across the country.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statisticsData.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.bgColor} rounded-full mb-6`}>
                  <IconComponent className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900 block">
                    {stat.number}
                  </span>
                  <span className="text-lg font-medium text-gray-600">
                    {stat.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Join thousands of heroes who are saving lives every day
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-3 text-lg">
              🩸 Become a Donor
            </button>
            <button className="btn-outline px-8 py-3 text-lg">
              📋 Request Blood
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Statistics