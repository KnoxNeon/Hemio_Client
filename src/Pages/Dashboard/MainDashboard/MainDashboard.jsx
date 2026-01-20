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
    if (role === 'admin' || role === 'volunteer') {
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
          setRecentRequests(Array.isArray(res.data) ? res.data : []);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [firebaseUser, role, roleLoading, axiosSecure]);

  console.log(recentRequests)

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
        // Use the regular endpoint for donors updating their own requests
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
    <div className="space-y-8">
      <title>Dashboard Home</title>
      
      {/* Welcome Header */}
      <div className="card-elevated p-8 text-center bg-gradient-to-r from-red-50 to-sky-50">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Welcome back, <span className='text-red-600'>{firebaseUser?.displayName || 'Hero'}!</span>
        </h1>
        <p className="text-gray-600 text-lg">
          {role === 'admin' ? 'Manage the blood donation system' : 
           role === 'volunteer' ? 'Help coordinate blood donations' : 
           'Your donations save lives every day'}
        </p>
      </div>

      {/* Admin/Volunteer Stats Dashboard */}
      {(role === 'admin' || role === 'volunteer') && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">System Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Users */}
            <div className="card-elevated p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:scale-105 transition-transform">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-bold">{stats.totalUsers || 0}</h3>
                  <p className="text-blue-100 font-medium">Total Users</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Users size={32} />
                </div>
              </div>
            </div>

            {/* Total Funding */}
            <div className="card-elevated p-6 bg-gradient-to-br from-green-500 to-green-600 text-white hover:scale-105 transition-transform">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-bold">${(stats.totalFunding || 0).toFixed(2)}</h3>
                  <p className="text-green-100 font-medium">Total Funding</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <DollarSign size={32} />
                </div>
              </div>
            </div>

            {/* Total Requests */}
            <div className="card-elevated p-6 bg-gradient-to-br from-red-500 to-red-600 text-white hover:scale-105 transition-transform">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-bold">{stats.totalRequests || 0}</h3>
                  <p className="text-red-100 font-medium">Blood Requests</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Droplet size={32} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="card-elevated p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {role === 'donor' && (
            <>
              <Link to="/dashboard/add-request" className="btn-primary text-center py-4 rounded-xl">
                🩸 Create Request
              </Link>
              <Link to="/dashboard/available-requests" className="btn-secondary text-center py-4 rounded-xl">
                ❤️ Available Requests
              </Link>
              <Link to="/dashboard/my-requests" className="btn-outline text-center py-4 rounded-xl">
                📋 My Requests
              </Link>
            </>
          )}
          {(role === 'admin' || role === 'volunteer') && (
            <>
              <Link to="/dashboard/all-requests" className="btn-primary text-center py-4 rounded-xl">
                📋 All Requests
              </Link>
              <Link to="/dashboard/all-requests?filter=pending" className="bg-yellow-600 text-white text-center py-4 rounded-xl hover:bg-yellow-700 transition-colors">
                ⚡ Pending Approvals
              </Link>
              {role === 'admin' && (
                <Link to="/dashboard/all-users" className="btn-secondary text-center py-4 rounded-xl">
                  👥 Manage Users
                </Link>
              )}
            </>
          )}
          <Link to="/dashboard/my-profile" className="btn-outline text-center py-4 rounded-xl">
            👤 My Profile
          </Link>
          <Link to="/search-requests" className="bg-gray-600 text-white text-center py-4 rounded-xl hover:bg-gray-700 transition-colors">
            🔍 Find Requests
          </Link>
        </div>
      </div>

      {/* Recent Requests Section */}
      {recentRequests.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Your Recent Blood Requests
            </h2>
            <Link
              to="/dashboard/my-requests"
              className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentRequests.slice(0, 6).map((req) => (
              <div
                key={req._id}
                className="card-elevated p-6 hover:shadow-xl transition-all duration-300"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="blood-group-display w-16 h-16 text-2xl">
                    {req.blood_group}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      req.status === 'pending'
                        ? 'badge-pending'
                        : req.status === 'inprogress'
                        ? 'bg-blue-100 text-blue-800'
                        : req.status === 'done'
                        ? 'badge-active'
                        : req.status === 'canceled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {req.status || 'Pending'}
                  </span>
                </div>

                {/* Patient Info */}
                <div className="space-y-2 mb-4">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {req.recipient_name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    📍 {req.recipient_district}, {req.recipient_upazila}
                  </p>
                  <p className="text-sm text-gray-600">
                    🏥 {req.hospital_name}
                  </p>
                  <p className="text-sm text-gray-700">
                    📅 {req.request_date ? new Date(req.request_date).toLocaleDateString() : 
                         req.createdAt ? new Date(req.createdAt).toLocaleDateString() : 
                         'Date not available'} at {req.request_time || 'Time not available'}
                  </p>
                </div>

                {/* Donor Info */}
                {req.status === 'inprogress' && req.donor_name && (
                  <div className="bg-green-50 p-3 rounded-lg mb-4">
                    <p className="text-sm font-medium text-green-800">
                      ✅ Donor Assigned:
                    </p>
                    <p className="text-sm text-green-700">{req.donor_name}</p>
                    <p className="text-xs text-green-600">{req.donor_email}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/dashboard/edit-request/${req._id}`}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(req._id)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-colors"
                  >
                    Delete
                  </button>

                  <Link
                    to={`/request-details/${req._id}`}
                    className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 text-sm font-medium transition-colors"
                  >
                    Details
                  </Link>

                  {/* Status Change Buttons */}
                  {req.status === 'inprogress' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(req._id, 'done')}
                        className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium transition-colors"
                      >
                        ✅ Complete
                      </button>
                      <button
                        onClick={() => handleStatusChange(req._id, 'canceled')}
                        className="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-medium transition-colors"
                      >
                        ❌ Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State for Donors */}
      {role === 'donor' && recentRequests.length === 0 && (
        <div className="card-elevated p-12 text-center">
          <div className="text-6xl mb-4">🩸</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Blood Requests Yet</h3>
          <p className="text-gray-600 mb-6">
            Create your first blood donation request to help save lives in your community.
          </p>
          <Link
            to="/dashboard/add-request"
            className="btn-primary px-8 py-3 text-lg"
          >
            Create Your First Request
          </Link>
        </div>
      )}
      
    </div>
  );
};

export default MainDashboard;