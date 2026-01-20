import { useEffect, useState } from 'react'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import { Link } from 'react-router'
import { Calendar, Clock, MapPin, Hospital, Droplet, Eye, Edit, Trash2 } from 'lucide-react'
import Swal from 'sweetalert2'
import LoadingSpinner from '../../../Components/LoadingSpinner'

const MyRequests = () => {
    const [totalRequest, setTotalRequest] = useState(0)
    const [myRequests, setMyRequests] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(9)
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)

    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        fetchRequests()
    }, [currentPage, itemsPerPage])

    const fetchRequests = async () => {
        try {
            setLoading(true)
            const res = await axiosSecure.get(`/my-request?page=${currentPage-1}&size=${itemsPerPage}`)
            setMyRequests(res.data.request || [])
            setTotalRequest(res.data.totalRequest || 0)
        } catch (error) {
            console.error('Error fetching requests:', error)
        } finally {
            setLoading(false)
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
                await axiosSecure.delete(`/requests/${id}`)
                await fetchRequests()
                Swal.fire('Deleted!', 'Request has been deleted.', 'success')
            } catch (error) {
                Swal.fire('Error', 'Failed to delete request', 'error')
            }
        }
    }

    const numberOfPages = Math.ceil(totalRequest / itemsPerPage)
    const pages = numberOfPages > 0 ? [...Array(numberOfPages).keys()].map(e => e + 1) : [1]

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
            pending: { class: 'badge-pending', text: 'Pending', icon: '⏳' },
            inprogress: { class: 'bg-blue-100 text-blue-800', text: 'In Progress', icon: '🔄' },
            completed: { class: 'badge-active', text: 'Completed', icon: '✅' },
            done: { class: 'badge-active', text: 'Completed', icon: '✅' },
            canceled: { class: 'bg-red-100 text-red-800', text: 'Canceled', icon: '❌' }
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
                message="Loading your requests..."
                subMessage="Please wait while we fetch your blood donation requests."
                fullScreen={false}
            />
        )
    }

    return (
        <div className="space-y-6">
            <title>My Requests</title>
            
            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-2">
                    📋 My Blood Requests
                </h1>
                <p className="text-gray-600">
                    Track and manage all your blood donation requests
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="card-elevated p-4 text-center">
                    <div className="text-2xl font-bold text-gray-800">{totalRequest}</div>
                    <div className="text-sm text-gray-600">Total Requests</div>
                </div>
                <div className="card-elevated p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-600">{myRequests.filter(r => (r.status || r.donation_status) === 'pending').length}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                </div>
                <div className="card-elevated p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{myRequests.filter(r => (r.status || r.donation_status) === 'inprogress').length}</div>
                    <div className="text-sm text-gray-600">In Progress</div>
                </div>
                <div className="card-elevated p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{myRequests.filter(r => (r.status || r.donation_status) === 'completed').length}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="card-elevated p-4">
                <div className="flex justify-between items-center">
                    <div className="text-lg font-semibold text-gray-800">
                        Your Requests ({totalRequest})
                    </div>
                    <Link
                        to="/dashboard/add-request"
                        className="btn-primary px-6 py-2"
                    >
                        🩸 Create New Request
                    </Link>
                </div>
            </div>

            {/* Requests Grid */}
            {myRequests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myRequests.map((request, index) => (
                        <div key={request._id} className="card-elevated p-6 hover:shadow-xl transition-all duration-300">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="blood-group-display w-16 h-16 text-2xl">
                                    {request.blood_group}
                                </div>
                                {getStatusBadge(request.status, request.donation_status)}
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
                                    {request.request_date ? new Date(request.request_date).toLocaleDateString() : 
                                     request.createdAt ? new Date(request.createdAt).toLocaleDateString() : 
                                     'Date not available'}
                                </div>
                                
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    {request.request_time || 'Time not available'}
                                </div>
                            </div>

                            {/* Donor Info */}
                            {((request.status || request.donation_status) === 'inprogress') && request.donor_name && (
                                <div className="bg-green-50 p-3 rounded-lg mb-4">
                                    <p className="text-sm font-medium text-green-800">
                                        ✅ Donor Assigned:
                                    </p>
                                    <p className="text-sm text-green-700">{request.donor_name}</p>
                                    <p className="text-xs text-green-600">{request.donor_email}</p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-2 pt-4 border-t">
                                <Link
                                    to={`/request-details/${request._id}`}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm font-medium transition-colors"
                                >
                                    <Eye className="w-4 h-4" />
                                    View
                                </Link>
                                
                                <Link
                                    to={`/dashboard/edit-request/${request._id}`}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </Link>
                                
                                <button
                                    onClick={() => handleDelete(request._id)}
                                    className="flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="card-elevated p-12 text-center">
                    <div className="text-6xl mb-4">🩸</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">No Requests Yet</h3>
                    <p className="text-gray-600 mb-6">
                        You haven't created any blood donation requests yet.
                    </p>
                    <Link
                        to="/dashboard/add-request"
                        className="btn-primary px-8 py-3 text-lg"
                    >
                        Create Your First Request
                    </Link>
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

export default MyRequests
