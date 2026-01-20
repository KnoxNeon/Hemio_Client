import { useContext, useEffect, useState } from 'react'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import { AuthContext } from '../../../Provider/AuthProvider'
import { Search, Filter, UserCheck, UserX, Shield, Heart, Users } from 'lucide-react'
import Swal from 'sweetalert2'
import LoadingSpinner from '../../../Components/LoadingSpinner'

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filterRole, setFilterRole] = useState('')
    const [filterStatus, setFilterStatus] = useState('')
    const [loading, setLoading] = useState(true)
    
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await axiosSecure.get('/users')
      setUsers(res.data)
      setFilteredUsers(res.data)
    } catch (error) {
      console.error('Error fetching users:', error)
      Swal.fire('Error', 'Failed to fetch users', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [axiosSecure])

  // Filter users based on search and filters
  useEffect(() => {
    let filtered = users

    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterRole) {
      filtered = filtered.filter(user => user.role === filterRole)
    }

    if (filterStatus) {
      filtered = filtered.filter(user => user.status === filterStatus)
    }

    setFilteredUsers(filtered)
  }, [users, searchTerm, filterRole, filterStatus])

  const handleStatus = async (email, status) => {
    try {
      const result = await Swal.fire({
        title: `${status === 'active' ? 'Activate' : 'Block'} User?`,
        text: `Are you sure you want to ${status === 'active' ? 'activate' : 'block'} this user?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: status === 'active' ? '#10b981' : '#ef4444',
        confirmButtonText: `Yes, ${status === 'active' ? 'Activate' : 'Block'}`,
      })

      if (result.isConfirmed) {
        await axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
        await fetchUsers()
        Swal.fire('Success!', `User ${status === 'active' ? 'activated' : 'blocked'} successfully`, 'success')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      Swal.fire('Error', 'Failed to update user status', 'error')
    }
  }

  const handleRole = async (email, newRole) => {
    try {
      const result = await Swal.fire({
        title: 'Change User Role?',
        text: `Change user role to ${newRole}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3b82f6',
        confirmButtonText: 'Yes, Change Role',
      })

      if (result.isConfirmed) {
        await axiosSecure.patch(`/update/user/status?email=${email}&role=${newRole}`)
        await fetchUsers()
        Swal.fire('Success!', `User role changed to ${newRole}`, 'success')
      }
    } catch (error) {
      console.error('Error updating role:', error)
      Swal.fire('Error', 'Failed to update user role', 'error')
    }
  }

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4 text-purple-600" />
      case 'volunteer': return <Users className="w-4 h-4 text-green-600" />
      case 'donor': return <Heart className="w-4 h-4 text-red-600" />
      default: return <Users className="w-4 h-4 text-gray-600" />
    }
  }

  const getRoleBadge = (role) => {
    const colors = {
      admin: 'bg-purple-100 text-purple-800',
      volunteer: 'bg-green-100 text-green-800',
      donor: 'bg-red-100 text-red-800'
    }
    return colors[role] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <LoadingSpinner 
        message="Loading all users..."
        subMessage="Please wait while we fetch user data."
        fullScreen={false}
      />
    )
  }

  return (
    <div className="space-y-6">
      <title>All Users</title>
      
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-2">
          👥 User Management
        </h1>
        <p className="text-gray-600">
          Manage all users, their roles, and account status
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card-elevated p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{users.length}</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>
        <div className="card-elevated p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{users.filter(u => u.role === 'donor').length}</div>
          <div className="text-sm text-gray-600">Donors</div>
        </div>
        <div className="card-elevated p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{users.filter(u => u.role === 'volunteer').length}</div>
          <div className="text-sm text-gray-600">Volunteers</div>
        </div>
        <div className="card-elevated p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{users.filter(u => u.role === 'admin').length}</div>
          <div className="text-sm text-gray-600">Admins</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card-elevated p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10"
            />
          </div>
          
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="form-input"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="volunteer">Volunteer</option>
            <option value="donor">Donor</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="form-input"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card-elevated overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Blood Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user, index) => (
                <tr key={user.email} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        src={user?.mainPhotoUrl || '/default-avatar.png'} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200" 
                        alt={user?.name} 
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user?.name || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{user?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      {user?.blood || 'Not Set'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getRoleBadge(user?.role)}`}>
                      {getRoleIcon(user?.role)}
                      {user?.role || 'donor'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      user?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user?.status === 'active' ? (
                        <><UserCheck className="w-4 h-4 mr-1" /> Active</>
                      ) : (
                        <><UserX className="w-4 h-4 mr-1" /> Blocked</>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {user?.status === "active" ? (
                      <button
                        onClick={() => handleStatus(user?.email, "blocked")}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatus(user?.email, "active")}
                        className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Activate
                      </button>
                    )}
                  
                    <select 
                      defaultValue={user?.role || 'donor'} 
                      onChange={(e) => handleRole(user?.email, e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="admin">Admin</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="donor">Donor</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No users found matching your criteria</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllUsers
