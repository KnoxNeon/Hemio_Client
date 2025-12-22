import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router';

const RequestCard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get('donatebloodserver.vercel.app/public-requests')
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
      <div className="text-center py-20 bg-gray-50 min-h-screen">
        <div className="text-3xl font-bold text-red-600">Loading urgent blood requests...</div>
        <p className="text-gray-600 mt-4">Please wait while we fetch the latest needs.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
        <title>Public Requests</title>
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-red-700 mb-6">
            Urgent Blood Requests
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            These patients need blood <span className="font-bold text-red-600">right now</span>. 
            If you're eligible and nearby, your donation can save a life today.
          </p>
          <div className="mt-8">
            <Link
              to="/register"
              className="inline-block px-10 py-5 bg-sky-900 text-white text-xl font-bold rounded-full hover:bg-red-700 transform hover:scale-105 transition shadow-xl"
            >
              Become a Donor → Join Now
            </Link>
          </div>
          <p className="text-lg text-gray-600 mt-8">
            Currently showing <span className="font-bold text-red-600">{requests.length}</span> active request{requests.length !== 1 ? 's' : ''}
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🩸</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              No Urgent Requests Right Now
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Thanks to amazing donors like you, all current blood needs are met! 
              Please register to be ready for future requests.
            </p>
          </div>
        ) : (
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 border-t-8 border-red-600"
              >
                
                <div className="bg-linear-to-r from-red-600 to-red-700 text-white text-center py-6">
                  <div className="text-5xl font-extrabold">{req.blood_group}</div>
                  <p className="text-sm uppercase tracking-wider mt-2 opacity-90">
                    Needed Urgently
                  </p>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {req.recipient_name}
                  </h3>

                  <div className="space-y-4 text-gray-700">
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold">Hospital:</span>
                      <span>{req.hospital_name || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold">Location:</span>
                      <span>{req.recipient_district}, {req.recipient_upazila}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold">Date Needed:</span>
                      <span>{new Date(req.request_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold">Time:</span>
                      <span>{req.request_time}</span>
                    </div>
                    {req.patient_problem && (
                      <p className="italic text-gray-600 border-l-4 border-red-300 pl-4 py-2 bg-red-50 rounded">
                        "{req.patient_problem}"
                      </p>
                    )}
                  </div>

                  
                  <div className="mt-6 text-center">
                    <span
                      className={`inline-block px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide ${
                        req.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : req.status === 'inprogress'
                          ? 'bg-blue-100 text-blue-800'
                          : req.status === 'done'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {req.status || 'Pending'}
                    </span>
                  </div>

                  
                  <div className="mt-8">
                    <Link
                      to="/register"
                      className="block w-full text-center py-4 bg-sky-900 text-white font-bold text-lg rounded-xl hover:bg-red-700 transition shadow-lg"
                    >
                      I Can Help → Register to Donate
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestCard;