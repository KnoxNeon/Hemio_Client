import { useEffect, useState } from 'react'
import { Calendar, Clock, MapPin, Hospital, Droplet, ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { getRequestDate, getRequestTime } from '../utils/dateUtils'

const RecentRequests = () => {
  const [recentRequests, setRecentRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching recent requests
    const fetchRecentRequests = async () => {
      try {
        // This would be replaced with actual API call
        const mockRequests = [
          {
            _id: '1',
            recipient_name: 'Sarah Johnson',
            blood_group: 'O-',
            hospital_name: 'City General Hospital',
            recipient_district: 'Dhaka',
            recipient_upazila: 'Dhanmondi',
            request_date: new Date().toISOString(),
            request_time: '10:00 AM',
            urgency: 'urgent'
          },
          {
            _id: '2',
            recipient_name: 'Ahmed Rahman',
            blood_group: 'A+',
            hospital_name: 'Square Hospital',
            recipient_district: 'Chittagong',
            recipient_upazila: 'Panchlaish',
            request_date: new Date(Date.now() - 86400000).toISOString(),
            request_time: '2:30 PM',
            urgency: 'high'
          },
          {
            _id: '3',
            recipient_name: 'Maria Garcia',
            blood_group: 'B+',
            hospital_name: 'Apollo Hospital',
            recipient_district: 'Sylhet',
            recipient_upazila: 'Sylhet Sadar',
            request_date: new Date(Date.now() - 172800000).toISOString(),
            request_time: '8:15 AM',
            urgency: 'normal'
          },
          {
            _id: '4',
            recipient_name: 'John Smith',
            blood_group: 'AB-',
            hospital_name: 'United Hospital',
            recipient_district: 'Dhaka',
            recipient_upazila: 'Gulshan',
            request_date: new Date(Date.now() - 259200000).toISOString(),
            request_time: '4:45 PM',
            urgency: 'high'
          }
        ]
        
        setTimeout(() => {
          setRecentRequests(mockRequests)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Error fetching recent requests:', error)
        setLoading(false)
      }
    }

    fetchRecentRequests()
  }, [])

  const getUrgencyBadge = (urgency) => {
    const urgencyColors = {
      'urgent': 'bg-red-100 text-red-800 border-red-200',
      'high': 'bg-orange-100 text-orange-800 border-orange-200',
      'normal': 'bg-green-100 text-green-800 border-green-200'
    }
    const urgencyLabels = {
      'urgent': '🚨 URGENT',
      'high': '⚡ HIGH PRIORITY',
      'normal': '✅ NORMAL'
    }
    return {
      class: urgencyColors[urgency] || 'bg-gray-100 text-gray-800 border-gray-200',
      label: urgencyLabels[urgency] || 'NORMAL'
    }
  }

  if (loading) {
    return (
      <section className="section-padding-lg bg-section-accent">
        <div className="container-base px-6">
          <div className="text-center mb-16">
            <h2 className="text-heading-2 mb-4">
              Recent Blood Requests
            </h2>
            <p className="text-body-lg">
              Loading recent requests...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-base p-6 animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding-lg bg-red-50">
      <div className="container-base px-6">
        <div className="text-center mb-16">
          <h2 className="text-heading-2 mb-4">
            Recent <span className='text-red-500'>Blood Requests</span>
          </h2>
          <p className="text-body-lg max-w-3xl mx-auto text-gray-500">
            Help save lives by responding to these recent blood donation requests. 
            Every donation makes a difference in someone's life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {recentRequests.map((request) => {
            const urgency = getUrgencyBadge(request.urgency)
            return (
              <div 
                key={request._id}
                className="card-elevated p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Urgency Badge */}
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 border ${urgency.class}`}>
                  {urgency.label}
                </div>

                {/* Blood Group Display */}
                <div className="flex justify-between items-center mb-4">
                  <div className="blood-group-display w-16 h-16 text-2xl">
                    {request.blood_group}
                  </div>
        
                </div>

                {/* Patient Info */}
                <div className="space-y-2 mb-4">
                  <h3 className="text-lg font-semibold text-primary">
                    {request.recipient_name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-secondary">
                    <Hospital className="w-4 h-4" />
                    <span className="truncate">{request.hospital_name}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-secondary">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{request.recipient_district}, {request.recipient_upazila}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-secondary">
                    <Calendar className="w-4 h-4" />
                    {getRequestDate(request)}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-secondary">
                    <Clock className="w-4 h-4" />
                    {getRequestTime(request)}
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium">
                  Help Now
                </button>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center card-elevated p-12">
          <h3 className="text-3xl font-bold text-primary mb-4">
            More People <span className='text-red-500'>Need Your Help</span> 
          </h3>
          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            These are just a few of the many people who need blood donations. 
            Browse all requests to find someone you can help today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/public-requests" className="btn-primary px-8 py-3 text-lg inline-flex items-center gap-2">
              View All Requests
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/register" className="btn-outline px-8 py-3 text-lg">
              Become a Donor
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RecentRequests