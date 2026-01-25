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
          <h2 className="text-3xl font-bold text-primary mb-4">
            5 Amazing Benefits of 
            <span className="text-red-600"> Blood Donation</span>
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
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
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div> 
      </div>
    </section>
  );
};

export default Featured;