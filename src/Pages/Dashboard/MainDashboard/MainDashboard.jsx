import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link } from 'react-router';
import { Users, DollarSign, Droplet } from 'lucide-react';
import Swal from 'sweetalert2';

const MainDashboard = () => {
  const { user: firebaseUser, role, roleLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [recentRequests, setRecentRequests] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalFunding: 0, totalRequests: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role === 'admin') {
      axiosSecure.get('/admin-stats')
        .then(res => {
          setStats(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      axiosSecure.get('/my-recent-requests')
        .then(res => {
          setRecentRequests(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [firebaseUser, role, roleLoading, axiosSecure]);

  const handleStatusChange = (id, newStatus) => {
    Swal.fire({
      title: 'Confirm Status Change',
      text: `Mark this donation as "${newStatus}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/requests/${id}/status`, { status: newStatus })
          .then(() => {
            setRecentRequests((prev) =>
              prev.map((req) =>
                req._id === id ? { ...req, status: newStatus } : req
              )
            );
            Swal.fire('Updated!', `Status changed to ${newStatus}`, 'success');
          })
          .catch((err) => {
            console.error(err);
            Swal.fire('Error', 'Failed to update status', 'error');
          });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete Request?',
      text: 'This cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/requests/${id}`).then(() => {
          setRecentRequests((prev) => prev.filter((req) => req._id !== id));
          Swal.fire('Deleted!', 'Request removed.', 'success');
        });
      }
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
    
      <h2 className="text-4xl font-bold  text-center mb-12">
        Welcome back, <span className='text-red-700'>{firebaseUser?.displayName || 'Donor'}!</span>
      </h2>

      {role === 'admin' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Total Donors */}
          <div className="bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-xl p-8 flex items-center space-x-6 transform hover:scale-105 transition">
            <div className="p-4 bg-white bg-opacity-20 rounded-full">
              <Users className='text-black fill-zinc-400' size={48} />
            </div>
            <div>
              <h3 className="text-4xl font-bold">{stats.totalUsers}</h3>
              <p className="text-lg mt-2 opacity-90">Total Donors</p>
            </div>
          </div>

          {/* Total Funding */}
          <div className="bg-linear-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-xl p-8 flex items-center space-x-6 transform hover:scale-105 transition">
            <div className="p-4 bg-white bg-opacity-20 rounded-full">
              <DollarSign className='text-black fill-amber-300' size={48} />
            </div>
            <div>
              <h3 className="text-4xl font-bold">${stats.totalFunding.toFixed(2)}</h3>
              <p className="text-lg mt-2 opacity-90">Total Funding</p>
            </div>
          </div>

          {/* Total Requests */}
          <div className="bg-linear-to-br from-yellow-500 to-yellow-600 text-white rounded-2xl shadow-xl p-8 flex items-center space-x-6 transform hover:scale-105 transition">
            <div className="p-4 bg-white bg-opacity-20 rounded-full">
              <Droplet className='text-black fill-red-600' size={48} />
            </div>
            <div>
              <h3 className="text-4xl font-bold">{stats.totalRequests}</h3>
              <p className="text-lg mt-2 opacity-90">Total Requests</p>
            </div>
          </div>
        </div>
      )}

      {recentRequests.length > 0 && (
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-800">
              Your Recent Donation Requests
            </h3>
            <Link
              to="/dashboard/my-requests"
              className="text-blue-600 hover:underline font-medium"
            >
              View All →
            </Link>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentRequests.map((req) => (
              <div
                key={req._id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                
                <div className="flex justify-between items-start mb-4">
                  <span className="text-3xl font-bold text-red-600">
                    {req.blood_group}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      req.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : req.status === 'inprogress'
                        ? 'bg-blue-100 text-blue-800'
                        : req.status === 'done'
                        ? 'bg-green-100 text-green-800'
                        : req.status === 'canceled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {req.status || 'Pending'}
                  </span>
                </div>

                
                <h4 className="text-lg font-semibold text-gray-800">
                  {req.recipient_name}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {req.recipient_district}, {req.recipient_upazila}
                </p>

                
                <p className="text-sm text-gray-700 mt-3">
                  <strong>Date:</strong>{' '}
                  {new Date(req.request_date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Time:</strong> {req.request_time}
                </p>

                
                {req.status === 'inprogress' && req.donor_name && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm font-medium text-gray-800">
                      Donor Assigned:
                    </p>
                    <p className="text-sm text-gray-600">{req.donor_name}</p>
                    <p className="text-sm text-gray-500">{req.donor_email}</p>
                  </div>
                )}

                
                <div className="mt-6 flex flex-wrap gap-2">
                  <Link
                    to={`/dashboard/edit-request/${req._id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(req._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>

                  <Link
                    to={`/request-details/${req._id}`}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 text-sm font-medium"
                  >
                    View Details
                  </Link>

                  
                  {req.status === 'inprogress' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(req._id, 'done')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                      >
                        Done
                      </button>
                      <button
                        onClick={() => handleStatusChange(req._id, 'canceled')}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-medium"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
    </div>
  );
};

export default MainDashboard;