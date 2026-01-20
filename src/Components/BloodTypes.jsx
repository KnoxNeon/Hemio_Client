import { useState, useEffect } from 'react'
import { Droplet, Users, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const BloodTypes = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const itemsPerPage = 4
  
  const bloodTypes = [
    {
      type: 'O-',
      name: 'O Negative',
      description: 'Universal donor - can donate to all blood types',
      canDonateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
      canReceiveFrom: ['O-'],
      rarity: 'Rare',
      percentage: '6.6%',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100'
    },
    {
      type: 'O+',
      name: 'O Positive',
      description: 'Most common blood type',
      canDonateTo: ['O+', 'A+', 'B+', 'AB+'],
      canReceiveFrom: ['O-', 'O+'],
      rarity: 'Common',
      percentage: '37.4%',
      color: 'text-orange-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100'
    },
    {
      type: 'A-',
      name: 'A Negative',
      description: 'Can donate to A and AB types',
      canDonateTo: ['A-', 'A+', 'AB-', 'AB+'],
      canReceiveFrom: ['O-', 'A-'],
      rarity: 'Uncommon',
      percentage: '6.3%',
      color: 'text-blue-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100'
    },
    {
      type: 'A+',
      name: 'A Positive',
      description: 'Second most common blood type',
      canDonateTo: ['A+', 'AB+'],
      canReceiveFrom: ['O-', 'O+', 'A-', 'A+'],
      rarity: 'Common',
      percentage: '35.7%',
      color: 'text-green-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100'
    },
    {
      type: 'B-',
      name: 'B Negative',
      description: 'Can donate to B and AB types',
      canDonateTo: ['B-', 'B+', 'AB-', 'AB+'],
      canReceiveFrom: ['O-', 'B-'],
      rarity: 'Rare',
      percentage: '1.5%',
      color: 'text-purple-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100'
    },
    {
      type: 'B+',
      name: 'B Positive',
      description: 'Can donate to B+ and AB+',
      canDonateTo: ['B+', 'AB+'],
      canReceiveFrom: ['O-', 'O+', 'B-', 'B+'],
      rarity: 'Uncommon',
      percentage: '8.5%',
      color: 'text-indigo-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100'
    },
    {
      type: 'AB-',
      name: 'AB Negative',
      description: 'Universal plasma donor',
      canDonateTo: ['AB-', 'AB+'],
      canReceiveFrom: ['O-', 'A-', 'B-', 'AB-'],
      rarity: 'Very Rare',
      percentage: '0.6%',
      color: 'text-pink-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100'
    },
    {
      type: 'AB+',
      name: 'AB Positive',
      description: 'Universal recipient - can receive from all types',
      canDonateTo: ['AB+'],
      canReceiveFrom: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
      rarity: 'Uncommon',
      percentage: '3.4%',
      color: 'text-teal-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100'
    }
  ]

  const totalPages = Math.ceil(bloodTypes.length / itemsPerPage)

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, totalPages])

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
    setIsAutoPlaying(false)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
    setIsAutoPlaying(false)
  }

  const goToPage = (page) => {
    setCurrentPage(page)
    setIsAutoPlaying(false)
  }

  const getCurrentPageItems = () => {
    const startIndex = currentPage * itemsPerPage
    return bloodTypes.slice(startIndex, startIndex + itemsPerPage)
  }

  const getRarityBadge = (rarity) => {
    const rarityColors = {
      'Common': 'bg-blue-100 text-blue-800',
      'Uncommon': 'bg-green-100 text-green-800',
      'Rare': 'bg-purple-100 text-purple-800',
      'Very Rare': 'bg-red-100 text-red-800'
      
    }
    return rarityColors[rarity] || 'bg-gray-100 text-gray-800'
  }

  return (
    <section className="section-padding-lg bg-section">
      <div className="container-base px-6">
        <div className="text-center mb-16">
          <h2 className="text-heading-2 mb-4">
            Blood Type <span className='text-red-600'>Compatibility</span> 
          </h2>
          <p className="text-body-lg max-w-3xl mx-auto">
            Understanding blood type compatibility is crucial for safe blood transfusions. 
            Learn about different blood types and their donation compatibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevPage}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 z-10 w-10 h-10 bg-section rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
          >
            <ChevronLeft className="w-5 h-5 text-muted group-hover:text-red-600" />
          </button>
          
          <button
            onClick={nextPage}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 z-10 w-10 h-10 bg-section rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
          >
            <ChevronRight className="w-5 h-5 text-muted group-hover:text-red-600" />
          </button>

          {/* Blood Type Cards */}
          {getCurrentPageItems().map((bloodType, index) => (
            <div 
              key={`${currentPage}-${index}`}
              className={`bg-red-50 rounded-xl p-6 border-2 ${bloodType.borderColor} hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-fade-in`}
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
              }}
            >
              <div className="text-center mb-4">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${bloodType.bgColor} rounded-full mb-3 transform transition-transform duration-300 hover:scale-110`}>
                  <Droplet className={`w-8 h-8 ${bloodType.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-1">
                  {bloodType.type}
                </h3>
                <p className="text-sm text-secondary mb-2">
                  {bloodType.name}
                </p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getRarityBadge(bloodType.rarity)}`}>
                  {bloodType.rarity} ({bloodType.percentage})
                </span>
              </div>

              <p className="text-sm text-secondary mb-4 text-center">
                {bloodType.description}
              </p>

              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-semibold text-secondary mb-2 flex items-center">
                    <ArrowRight className="w-3 h-3 mr-1" />
                    Can Donate To:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {bloodType.canDonateTo.map((type, typeIndex) => (
                      <span key={typeIndex} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded transition-transform hover:scale-105">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-secondary mb-2 flex items-center">
                    <ArrowRight className="w-3 h-3 mr-1 rotate-180" />
                    Can Receive From:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {bloodType.canReceiveFrom.map((type, typeIndex) => (
                      <span key={typeIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded transition-transform hover:scale-105">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center space-x-3 mb-16">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`relative transition-all duration-300 ${
                index === currentPage 
                  ? 'w-8 h-3' 
                  : 'w-3 h-3 hover:w-4'
              }`}
            >
              <div
                className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? 'bg-red-600 scale-125 shadow-lg'
                    : 'bg-red-300 hover:bg-red-400 hover:scale-110'
                }`}
              />
              {index === currentPage && (
                <div className="absolute inset-0 rounded-full bg-red-600 animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Important Notes */}
        <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center transform transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Droplet className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-3">
                Universal Donor
              </h3>
              <p className="text-secondary">
                <strong className="text-red-600">O-</strong> blood type can donate to anyone, making O- donors incredibly valuable 
                in emergency situations when there's no time for blood typing.
              </p>
            </div>
            
            <div className="text-center transform transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-3">
                Universal Recipient
              </h3>
              <p className="text-secondary">
                <strong className="text-red-600">AB+</strong> blood type can receive blood from any blood type, 
                but can only donate to other AB+ recipients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BloodTypes