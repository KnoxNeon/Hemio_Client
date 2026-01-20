import { Heart, Activity, Stethoscope, Zap, Smile } from 'lucide-react'

const Featured = () => {
    const benefits = [
    {
      title: "Saves Up to 3 Lives",
      description: "One blood donation can help save multiple lives in emergencies, surgeries, and treatments.",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
      number: "01"
    },
    {
      title: "Improves Your Health",
      description: "Regular donation reduces iron levels, lowers heart disease risk, and stimulates new blood cell production.",
      icon: Activity,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      number: "02"
    },
    {
      title: "Free Health Check",
      description: "Donors get a mini health screening (blood pressure, pulse, hemoglobin) before donating — completely free!",
      icon: Stethoscope,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      number: "03"
    },
    {
      title: "Burns Calories",
      description: "Donating blood burns around 650 calories as your body works to replenish the lost blood.",
      icon: Zap,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      number: "04"
    },
    {
      title: "Feels Amazing",
      description: "The joy of knowing you've helped someone in need creates an unmatched sense of fulfillment and happiness.",
      icon: Smile,
      color: "text-green-600",
      bgColor: "bg-green-50",
      number: "05"
    },
  ];

  return (
    <section className="py-16 bg-red-50">
      <div className="container-base px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            5 Amazing Benefits of 
            <span className="text-red-600"> Blood Donation</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Not only do you save lives — you also improve your own health and well-being!
          </p>
        </div>
        
        {/* Benefits List */}
        <div className="max-w-4xl mx-auto space-y-6 mb-12">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            const isEven = index % 2 === 0
            
            return (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-6 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Number & Icon Side */}
                <div className="flex-shrink-0 relative">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center relative">
                    <div className={`w-12 h-12 ${benefit.bgColor} rounded-full flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 ${benefit.color}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {benefit.number}
                    </div>
                  </div>
                </div>
                
                {/* Content Side */}
                <div className={`flex-1 ${isEven ? 'text-left' : 'text-right md:text-right'} text-center md:text-left`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 max-w-3xl mx-auto text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-red-100 mb-6">
              Join thousands of heroes who are already saving lives through blood donation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-white text-red-600 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
                🩸 Become a Donor Today
              </button>
              <button className="px-6 py-3 border border-red-300 text-white rounded-lg font-medium hover:bg-red-600 transition-colors duration-200">
                📍 Find Donation Centers
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;