import { useEffect, useState, useContext } from 'react'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import { AuthContext } from '../../../Provider/AuthProvider'
import { Search, Calendar, Clock, MapPin, Hospital, User, Mail } from 'lucide-react'
import Swal from 'sweetalert2'
import { getRequestDate, getRequestTime } from '../../../utils/dateUtils'
import LoadingSpinner from '../../../Components/LoadingSpinner'

const AllRequests = () => {
    const [allRequests, setAllRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [totalRequests, setTotalRequests] = useState(0);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        inprogress: 0,
        completed: 0,
        rejected: 0
    });
    const [itemsPerPage] = useState(12)
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterBloodGroup, setFilterBloodGroup] = useState('');

    const axiosSecure = useAxiosSecure()
    const { role, user } = useContext(AuthContext)

    useEffect(() => {
        fetchRequests()
        fetchStats() // Fetch stats separately
    }, [currentPage, itemsPerPage])

    const fetchStats = async () => {
        try {
            // Fetch all requests without pagination to get accurate stats
            // We'll use a large page size to get all data
            const res = await axiosSecure.get('/all-requests?page=0&size=1000')
            if (res.data && res.data.requests) {
                const allRequestsData = res.data.requests
                
                // Calculate stats from all data
                const pending = allRequestsData.filter(r => (r.status || r.donation_status) === 'pending').length
                const inprogress = allRequestsData.filter(r => (r.status || r.donation_status) === 'inprogress').length
                const completed = allRequestsData.filter(r => (r.status || r.donation_status) === 'completed').length
                const rejected = allRequestsData.filter(r => (r.status || r.donation_status) === 'rejected').length
                
                setStats({
                    total: res.data.totalRequests || allRequestsData.length,
                    pending,
                    inprogress,
                    completed,
                    rejected
                })
            }
        } catch (error) {
            console.error('Error fetching stats:', error)
            // Fallback: calculate stats from current page data
            calculateStatsFromCurrentData()
        }
    }

    const calculateStatsFromCurrentData = () => {
        // This is a fallback method using current page data
        const pending = allRequests.filter(r => (r.status || r.donation_status) === 'pending').length
        const inprogress = allRequests.filter(r => (r.status || r.donation_status) === 'inprogress').length
        const completed = allRequests.filter(r => (r.status || r.donation_status) === 'completed').length
        const rejected = allRequests.filter(r => (r.status || r.donation_status) === 'rejected').length
        
        setStats({
            total: totalRequests,
            pending,
            inprogress,
            completed,
            rejected
        })
    }

    useEffect(() => {
        filterRequests()
    }, [allRequests, searchTerm, filterStatus, filterBloodGroup])

    const fetchRequests = async () => {
        try {
            setLoading(true)
            const res = await axiosSecure.get(`/all-requests?page=${currentPage-1}&size=${itemsPerPage}`)
            const requests = res.data.requests || []
            
            // Sort requests: pending first, then by creation date
            const sortedRequests = requests.sort((a, b) => {
                const statusA = a.status || a.donation_status || 'pending'
                const statusB = b.status || b.donation_status || 'pending'
                if (statusA === 'pending' && statusB !== 'pending') return -1
                if (statusA !== 'pending' && statusB === 'pending') return 1
                return new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt)
            })
            
            setAllRequests(sortedRequests)
            setTotalRequests(res.data.totalRequests || 0)
        } catch (error) {
            console.error('Error fetching requests:', error)
        } finally {
            setLoading(false)
        }
    }

    const filterRequests = () => {
        let filtered = allRequests

        if (searchTerm) {
            filtered = filtered.filter(request => 
                request.recipient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.hospital_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.recipient_district?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.requester_name?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (filterStatus) {
            filtered = filtered.filter(request => {
                const currentStatus = request.status || request.donation_status || 'pending'
                return currentStatus === filterStatus
            })
        }

        if (filterBloodGroup) {
            filtered = filtered.filter(request => request.blood_group === filterBloodGroup)
        }

        setFilteredRequests(filtered)
    }

    const handleStatusChange = async (id, newStatus) => {
        // Only allow pending -> inprogress for admin/volunteer
        if (newStatus === 'inprogress') {
            const result = await Swal.fire({
                title: 'Approve Blood Request?',
                html: `
                    <div class="text-left">
                        <p class="mb-4">This will approve the blood donation request and make it available for donors to respond to.</p>
                        <div class="bg-green-50 p-4 rounded-lg">
                            <p class="text-sm text-green-800"><strong>What happens next:</strong></p>
                            <ul class="text-sm text-green-700 mt-2 list-disc list-inside">
                                <li>Request status changes to "In Progress"</li>
                                <li>Donors can see and respond to this request</li>
                                <li>Requester will be notified of approval</li>
                            </ul>
                        </div>
                    </div>
                `,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: '✅ Approve Request',
                confirmButtonColor: '#059669',
                cancelButtonText: 'Cancel'
            });
            
            if (!result.isConfirmed) return;
        } else {
            // For other status changes, show confirmation
            const result = await Swal.fire({
                title: 'Change Status?',
                text: `Mark this request as "${newStatus}"?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes, Change',
            });
            
            if (!result.isConfirmed) return;
        }

        try {
            console.log('=== APPROVE REQUEST DEBUG ===')
            console.log('Request ID:', id)
            console.log('New Status:', newStatus)
            console.log('User Email:', user?.email)
            console.log('User Role:', role)
            
            // Try different endpoint approaches
            let response;
            try {
                // First try the admin endpoint
                console.log('Trying admin endpoint...')
                response = await axiosSecure.patch(`/admin/requests/${id}/status`, { 
                    donation_status: newStatus,
                    updated_by: user?.email,
                    updated_at: new Date().toISOString()
                })
                console.log('Admin endpoint response:', response.data)
            } catch (adminError) {
                console.log('Admin endpoint failed:', adminError.response?.data)
                // If admin endpoint fails, try the regular endpoint
                console.log('Trying regular endpoint...')
                response = await axiosSecure.patch(`/requests/${id}/status`, { 
                    donation_status: newStatus,
                    updated_by: user?.email,
                    updated_at: new Date().toISOString()
                })
                console.log('Regular endpoint response:', response.data)
            }
            
            // Check if the update was successful
            if (response.data) {
                console.log('Database update result:', response.data)
                
                // Check for different response formats
                if (response.data.result) {
                    console.log('Matched count:', response.data.result.matchedCount)
                    console.log('Modified count:', response.data.result.modifiedCount)
                    
                    if (response.data.result.matchedCount === 0) {
                        console.warn('WARNING: No documents were matched! This request may belong to another user.')
                        Swal.fire('Error', 'Cannot update this request. You may not have permission to modify requests created by other users.', 'error')
                        return
                    }
                    
                    if (response.data.result.modifiedCount === 0) {
                        console.warn('WARNING: No documents were modified!')
                        Swal.fire('Warning', 'Request was found but not updated. It may already have this status.', 'warning')
                        return
                    }
                } else {
                    // Direct response format
                    console.log('Matched count:', response.data.matchedCount)
                    console.log('Modified count:', response.data.modifiedCount)
                    
                    if (response.data.matchedCount === 0) {
                        console.warn('WARNING: No documents were matched! This request may belong to another user.')
                        Swal.fire('Error', 'Cannot update this request. The admin endpoint is not available. Please contact the developer to deploy the updated backend.', 'error')
                        return
                    }
                    
                    if (response.data.modifiedCount === 0) {
                        console.warn('WARNING: No documents were modified!')
                        Swal.fire('Warning', 'Request was found but not updated. It may already have this status.', 'warning')
                        return
                    }
                }
            }
            
            // Immediately update the local state to reflect the change
            setAllRequests(prevRequests => 
                prevRequests.map(request => 
                    request._id === id 
                        ? { ...request, status: newStatus, donation_status: newStatus }
                        : request
                )
            )
            
            // Also update filtered requests if they exist
            setFilteredRequests(prevRequests => 
                prevRequests.map(request => 
                    request._id === id 
                        ? { ...request, status: newStatus, donation_status: newStatus }
                        : request
                )
            )
            
            // Update stats immediately
            setStats(prevStats => {
                const newStats = { ...prevStats }
                
                // Find the old status of the request being updated
                const oldRequest = allRequests.find(r => r._id === id)
                const oldStatus = oldRequest?.status || oldRequest?.donation_status || 'pending'
                
                // Decrease count for old status
                if (newStats[oldStatus] > 0) {
                    newStats[oldStatus]--
                }
                
                // Increase count for new status
                newStats[newStatus] = (newStats[newStatus] || 0) + 1
                
                return newStats
            })
            
            // Then fetch fresh data from server to ensure consistency
            console.log('Fetching fresh data...')
            await fetchRequests()
            await fetchStats() // Also refresh stats from server
            
            if (newStatus === 'inprogress') {
                Swal.fire({
                    title: 'Request Approved! ✅',
                    text: 'The blood donation request is now available for donors to respond to.',
                    icon: 'success',
                    confirmButtonText: 'Great!'
                })
            } else {
                Swal.fire('Updated!', `Status changed to ${newStatus}`, 'success')
            }
        } catch (error) {
            console.error('Error updating status:', error)
            console.error('Error response:', error.response?.data)
            
            let errorMessage = 'Failed to update status. Please try again.'
            
            if (error.response?.data?.error) {
                errorMessage = error.response.data.error
            } else if (error.message) {
                errorMessage = error.message
            }
            
            if (error.response?.status === 403) {
                Swal.fire('Error', `Permission denied: ${errorMessage}`, 'error')
            } else if (error.response?.status === 404) {
                Swal.fire('Error', 'Endpoint not found. The backend may need to be updated.', 'error')
            } else if (error.response?.status === 401) {
                Swal.fire('Error', 'Authentication failed. Please login again.', 'error')
            } else {
                Swal.fire('Error', errorMessage, 'error')
            }
        }
    }

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Delete Request?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Yes, Delete',
        })

        if (result.isConfirmed) {
            try {
                // Use admin endpoint for deletion
                await axiosSecure.delete(`/admin/requests/${id}`)
                await fetchRequests()
                Swal.fire('Deleted!', 'Request has been deleted.', 'success')
            } catch (error) {
                console.error('Error deleting request:', error)
                if (error.response?.status === 403) {
                    Swal.fire('Error', 'You do not have permission to delete requests.', 'error')
                } else {
                    Swal.fire('Error', 'Failed to delete request', 'error')
                }
            }
        }
    }

    const numberOfPages = Math.ceil(totalRequests / itemsPerPage)
    const pages = totalRequests > 0 ? [...Array(numberOfPages).keys()].map(e => e + 1) : [1]

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1)
        }
    }

    const getStatusBadge = (status, donation_status) => {
        // Use either status or donation_status field
        const currentStatus = status || donation_status || 'pending'
        
        const statusConfig = {
            pending: { class: 'badge-pending', text: 'Pending Approval', icon: '⏳' },
            inprogress: { class: 'bg-blue-100 text-blue-800', text: 'Available for Donors', icon: '🔄' },
            completed: { class: 'badge-active', text: 'Completed', icon: '✅' },
            rejected: { class: 'bg-red-100 text-red-800', text: 'Rejected', icon: '❌' },
            canceled: { class: 'bg-gray-100 text-gray-800', text: 'Canceled', icon: '⭕' }
        }
        const config = statusConfig[currentStatus] || statusConfig.pending
        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${config.class}`}>
                {config.icon} {config.text}
            </span>
        )
    }

    if (loading) {
        return (
            <LoadingSpinner 
                message="Loading all blood requests..."
                subMessage="Please wait while we fetch the request data."
                fullScreen={false}
            />
        )
    }

    return (
        <div className="space-y-6">
            <title>All Requests</title>
            
            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-2">
                    🩸 All Blood Requests
                </h1>
                <p className="text-gray-600">
                    {role === 'admin' ? 'Manage all blood donation requests' : 'Help coordinate blood donations'}
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="card-elevated p-4 text-center">
                    <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
                    <div className="text-sm text-gray-600">Total Requests</div>
                </div>
                <div className="card-elevated p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                </div>
                <div className="card-elevated p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.inprogress}</div>
                    <div className="text-sm text-gray-600">In Progress</div>
                </div>
                <div className="card-elevated p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="card-elevated p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
                    <div className="text-sm text-gray-600">Rejected</div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="card-elevated p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search requests..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="form-input pl-10"
                        />
                    </div>
                    
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="form-input"
                    >
                        <option value="">All Status</option>
                        <option value="pending">⏳ Pending</option>
                        <option value="inprogress">🔄 In Progress</option>
                        <option value="completed">✅ Completed</option>
                        <option value="rejected">❌ Rejected</option>
                    </select>

                    <select
                        value={filterBloodGroup}
                        onChange={(e) => setFilterBloodGroup(e.target.value)}
                        className="form-input"
                    >
                        <option value="">All Blood Groups</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>

                    <div className="text-sm text-gray-600 flex items-center">
                        Showing {filteredRequests.length} of {totalRequests} requests
                    </div>
                </div>
            </div>

            {/* Requests Grid */}
            {filteredRequests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRequests.map((request) => {
                        return (
                            <div key={request._id} className="card-elevated p-6 hover:shadow-xl transition-all duration-300">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="blood-group-display w-16 h-16 text-2xl">
                                        {request.blood_group}
                                    </div>
                                    <div className="text-right">
                                        {getStatusBadge(request.status, request.donation_status)}
                                    </div>
                                </div>

                                {/* Patient Info */}
                                <div className="space-y-2 mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {request.recipient_name}
                                    </h3>
                                    
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Hospital className="w-4 h-4" />
                                        {request.hospital_name}
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin className="w-4 h-4" />
                                        {request.recipient_district}, {request.recipient_upazila}
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="w-4 h-4" />
                                        {getRequestDate(request)}
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Clock className="w-4 h-4" />
                                        {getRequestTime(request)}
                                    </div>
                                </div>

                                {/* Requester Info */}
                                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <User className="w-4 h-4" />
                                        <span className="font-medium">Requested by:</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{request.requester_name}</p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Mail className="w-3 h-3" />
                                        {request.requester_email}
                                    </div>
                                </div>

                                {/* Donor Info */}
                                {(request.status === 'inprogress' || request.donation_status === 'inprogress') && request.donor_name && (
                                    <div className="bg-green-50 p-3 rounded-lg mb-4">
                                        <p className="text-sm font-medium text-green-800">
                                            ✅ Donor Assigned:
                                        </p>
                                        <p className="text-sm text-green-700">{request.donor_name}</p>
                                        <p className="text-xs text-green-600">{request.donor_email}</p>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex pt-4 gap-2 border-t">
                                    {/* Status Change Buttons */}
                                    <div className="flex">
                                        {(request.status === 'pending' || request.donation_status === 'pending') && (
                                            <button
                                                onClick={() => handleStatusChange(request._id, 'inprogress')}
                                                className="flex-1 px-4 py-3 bg-green-500 text-gray-50 rounded-lg hover:from-green-700 hover:to-green-800 text-sm font-bold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                                            >
                                                APPROVE REQUEST
                                            </button>
                                        )}
                                        
                                        {(request.status === 'inprogress' || request.donation_status === 'inprogress') && (
                                            <div className="flex-1 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium text-center border border-blue-200">
                                                🔄 Available for Donors
                                            </div>
                                        )}
                                        
                                        {(request.status === 'completed' || request.donation_status === 'completed') && (
                                            <div className="flex-1 px-3 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium text-center border border-green-200">
                                                ✅ Completed by Donor
                                            </div>
                                        )}
                                    </div>

                                    {/* Admin Actions */}
                                    {role === 'admin' && (
                                        <button
                                            onClick={() => handleDelete(request._id)}
                                            className="flex-1 px-4 py-3 bg-red-500 text-gray-50 rounded-lg hover:from-green-700 hover:to-green-800 text-sm font-bold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                                        >
                                             Delete Request
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="card-elevated p-12 text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">No Requests Found</h3>
                    <p className="text-gray-600">
                        No blood donation requests match your current filters.
                    </p>
                </div>
            )}

            {/* Pagination */}
            {numberOfPages > 1 && (
                <div className="flex justify-center items-center gap-4 pt-6">
                    <button 
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>
                    
                    <div className="flex gap-2">
                        {pages.map(page => (
                            <button
                                key={page}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    page === currentPage 
                                        ? 'bg-red-600 text-white' 
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    
                    <button 
                        onClick={handleNext}
                        disabled={currentPage === numberOfPages}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}

export default AllRequests
