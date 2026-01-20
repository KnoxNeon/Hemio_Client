import { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router';
import { MapPin, Clock, Phone, User } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const RequestCard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://donatebloodserver.vercel.app/public-requests')
      .then((res) => {
        setRequests(res.data.requests || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading requests:', err);
        setRequests([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <LoadingSpinner 
        message="Loading urgent blood requests..."
        subMessage="Please wait while we fetch the latest needs."
      />
    );
  }

  return (
    <div className="min-h-screen bg-section-alt">
      <title>Public Requests</title>
      
      {/* Hero Section */}
      <section className="gradient-secondary text-white section-padding">
        <div className="container-base text-center">
          <h1 className="text-heading-1 mb-6 animate-fade-in">
            🚨 Urgent Blood Requests
          </h1>
          <p className="text-body-lg max-w-4xl mx-auto mb-8 animate-slide-up">
            These patients need blood <span className="font-bold text-red-300">right now</span>. 
            If you're eligible and nearby, your donation can save a life today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/register"
              className="btn-primary text-lg px-8 py-4 rounded-full bg-red-600 hover:bg-red-700"
            >
              🩸 Become a Donor → Join Now
            </Link>
            <Link
              to="/search-requests"
              className="btn-outline border-white text-white hover:bg-white hover:text-sky-900 text-lg px-8 py-4 rounded-full"
            >
              🔍 Search by Location
            </Link>
          </div>
          
          <div className="bg-white/10 rounded-2xl p-6 max-w-md mx-auto backdrop-blur-sm">
            <p className="text-lg">
              Currently showing <span className="font-bold text-red-300 text-2xl">{requests.length}</span> active request{requests.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </section>

      {/* Requests Section */}
      <section className="section-padding">
        <div className="container-base">
          {requests.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <div className="text-8xl mb-6">🩸</div>
              <h2 className="text-heading-3 text-primary mb-4">
                No Urgent Requests Right Now
              </h2>
              <p className="text-body-lg text-secondary max-w-2xl mx-auto mb-8">
                Thanks to amazing donors like you, all current blood needs are met! 
                Please register to be ready for future requests.
              </p>
              <Link to="/register" className="btn-primary">
                Register as Donor
              </Link>
            </div>
          ) : (
            <div className="grid-cards">
              {requests.map((req, index) => (
                <div
                  key={req._id}
                  className="card-elevated group hover:scale-105 transition-all duration-300 border-t-4 border-red-600"
                >
                  {/* Blood Group Header */}
                  <div className="gradient-primary text-white text-center py-6 relative">
                    <div className="absolute top-2 right-2">
                      <span className="badge-urgent">URGENT</span>
                    </div>
                    <div className="blood-group-display mx-auto mb-2">
                      {req.blood_group}
                    </div>
                    <p className="text-red-100 font-medium">Blood Type Needed</p>
                  </div>

                  {/* Patient Info */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-muted" />
                      <div>
                        <p className="font-semibold text-primary">{req.recipient_name}</p>
                        <p className="text-sm text-secondary">Patient</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-muted" />
                      <div>
                        <p className="font-medium text-primary">{req.hospital_name}</p>
                        <p className="text-sm text-secondary">{req.upazila}, {req.district}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-muted" />
                      <div>
                        <p className="font-medium text-primary">
                          {req.donation_date ? new Date(req.donation_date).toLocaleDateString() : 
                           req.request_date ? new Date(req.request_date).toLocaleDateString() :
                           req.createdAt ? new Date(req.createdAt).toLocaleDateString() : 
                           'Date not available'}
                        </p>
                        <p className="text-sm text-secondary">
                          {req.donation_time}
                        </p>
                      </div>
                    </div>

                    {req.message && (
                      <div className="bg-section-alt rounded-lg p-4 border-l-4 border-red-600">
                        <p className="text-sm text-secondary italic">"{req.message}"</p>
                      </div>
                    )}
                  </div>

                  {/* Action Footer */}
                  <div className="px-6 pb-6">
                    <div className="flex gap-3">
                      <Link
                        to={`/donate/${req._id}`}
                        className="flex-1 btn-primary text-center py-3"
                      >
                        🩸 Donate Now
                      </Link>
                      <button className="btn-outline px-4 py-3 rounded-xl">
                        <Phone className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-red-50 section-padding">
        <div className="container-base text-center">
          <h3 className="text-heading-3 text-primary mb-4">
            Can't Find a Match?
          </h3>
          <p className="text-body text-secondary mb-6 max-w-2xl mx-auto">
            Register as a donor and we'll notify you when someone with your blood type needs help in your area.
          </p>
          <Link to="/register" className="btn-primary">
            Register as Donor
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RequestCard;