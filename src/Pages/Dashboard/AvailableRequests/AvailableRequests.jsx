import { useEffect, useState, useContext } from 'react'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import { AuthContext } from '../../../Provider/AuthProvider'
import { Search, Calendar, Clock, MapPin, Hospital, User, Mail, Heart } from 'lucide-react'
import Swal from 'sweetalert2'
import LoadingSpinner from '../../../Components/LoadingSpinner'

const AvailableRequests = () => {
    const [availableRequests, setAvailableRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBloodGroup, setFilterBloodGroup] = useState('');

    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)

    useEffect(() => {
        fetchAvailableRequests()
    }, [])

    useEffect(() => {
        filterRequests()
    }, [availableRequests, searchTerm, filterBloodGroup])

    const fetchAvailableRequests = async () => {
        try {
            setLoading(true)
            // Fetch only in-progress requests that are not created by current user
            const res = await axiosSecure.get(`/available-requests?status=inprogress&exclude_email=${user?.email}`)
            setAvailableRequests(res.data || [])
        } catch (error) {
            console.error('Error fetching available requests:', error)
        } finally {
            setLoading(false)
        }
    }

    const filterRequests = () => {
        let filtered = availableRequests

        if (searchTerm) {
            filtered = filtered.filter(request => 
                request.recipient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.hospital_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.recipient_district?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (filterBloodGroup) {
            filtered = filtered.filter(request => request.blood_group === filterBloodGroup)
        }

        setFilteredRequests(filtered)
    }

    const handleRespond = async (requestId, recipientName) => {
        const result = await Swal.fire({
            title: 'Respond to Blood Request?',
            html: `
                <div class="text-left">
                    <p class="mb-4">You are about to respond to <strong>${recipientName}'s</strong> blood donation request.</p>
                    <p class="text-sm text-gray-600">By clicking "Yes, I'll Donate", you confirm that:</p>
                    <ul class="text-sm text-gray-600 mt-2 list-disc list-inside">
                        <li>You are available to donate blood</li>
                        <li>You will contact the requester to coordinate</li>
                        <li>This request will be marked as completed</li>
                    </ul>
                </div>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '❤️ Yes, I\'ll Donate',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#dc2626',
        })

        if (result.isConfirmed) {
            try {
                // Update request status to completed and assign current user as donor
                await axiosSecure.patch(`/respond-to-request/${requestId}`, {
                    donation_status: 'completed',
                    donor_name: user?.displayName || 'Anonymous Donor',
                    donor_email: user?.email,
                    completed_at: new Date().toISOString()
                })
                
                await fetchAvailableRequests() // Refresh the list
                
                Swal.fire({
                    title: 'Thank You! ❤️',
                    text: 'You have successfully responded to this blood donation request. The requester will be notified.',
                    icon: 'success',
                    confirmButtonText: 'Great!'
                })
            } catch (error) {
                console.error('Error responding to request:', error)
                Swal.fire('Error', 'Failed to respond to request. Please try again.', 'error')
            }
        }
    }

    const getUrgencyLevel = (requestDate) => {
        const today = new Date()
        const reqDate = new Date(requestDate)
        const diffTime = reqDate - today
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        
        if (diffDays <= 1) return { level: 'urgent', color: 'text-red-600', text: 'URGENT', bgColor: 'bg-red-100' }
        if (diffDays <= 3) return { level: 'high', color: 'text-orange-600', text: 'HIGH PRIORITY', bgColor: 'bg-orange-100' }
        return { level: 'normal', color: 'text-green-600', text: 'NORMAL', bgColor: 'bg-green-100' }
    }

    if (loading) {
        return (
            <LoadingSpinner 
                message="Loading available requests..."
                subMessage="Please wait while we fetch requests you can respond to."
                fullScreen={false}
            />
        )
    }

    return (
        <div className="space-y-6">
            <title>Available Requests</title>
            
            {/* Header */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-2">
                    ❤️ Available Blood Requests
                </h1>
                <p className="text-gray-600">
                    Help save lives by responding to blood donation requests in your area
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card-elevated p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">{availableRequests.length}</div>
                    <div className="text-sm text-gray-600">Available Requests</div>
                </div>
                <div className="card-elevated p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">
                        {availableRequests.filter(r => getUrgencyLevel(r.request_date).level === 'urgent').length}
                    </div>
                    <div className="text-sm text-gray-600">Urgent</div>
                </div>
                <div className="card-elevated p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                        {new Set(availableRequests.map(r => r.blood_group)).size}
                    </div>
                    <div className="text-sm text-gray-600">Blood Types Needed</div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="card-elevated p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by patient, hospital, location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="form-input pl-10"
                        />
                    </div>
                    
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
                        Showing {filteredRequests.length} available requests
                    </div>
                </div>
            </div>

            {/* Available Requests Grid */}
            {filteredRequests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRequests.map((request) => {
                        const urgency = getUrgencyLevel(request.request_date)
                        return (
                            <div key={request._id} className="card-elevated p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-red-500">
                                {/* Urgency Badge */}
                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold mb-4 ${urgency.bgColor} ${urgency.color}`}>
                                    {urgency.text}
                                </div>

                                {/* Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="blood-group-display w-16 h-16 text-2xl">
                                        {request.blood_group}
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
                                            🔄 In Progress
                                        </span>
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
                                        {request.request_date ? new Date(request.request_date).toLocaleDateString() : 
                                         request.createdAt ? new Date(request.createdAt).toLocaleDateString() : 
                                         'Date not available'}
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Clock className="w-4 h-4" />
                                        {request.request_time || 'Time not available'}
                                    </div>
                                </div>

                                {/* Request Message */}
                                {request.request_message && (
                                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                                        <p className="text-sm text-gray-700">
                                            <strong>Message:</strong> {request.request_message}
                                        </p>
                                    </div>
                                )}

                                {/* Requester Contact */}
                                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                                    <div className="flex items-center gap-2 text-sm text-blue-700">
                                        <User className="w-4 h-4" />
                                        <span className="font-medium">Contact:</span>
                                    </div>
                                    <p className="text-sm text-blue-600">{request.requester_name}</p>
                                    <div className="flex items-center gap-2 text-xs text-blue-500">
                                        <Mail className="w-3 h-3" />
                                        {request.requester_email}
                                    </div>
                                </div>

                                {/* Respond Button */}
                                <button
                                    onClick={() => handleRespond(request._id, request.recipient_name)}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                                >
                                    <Heart className="w-5 h-5" />
                                    I Can Donate Blood
                                </button>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="card-elevated p-12 text-center">
                    <div className="text-6xl mb-4">🩸</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">No Available Requests</h3>
                    <p className="text-gray-600">
                        There are currently no blood donation requests available for response.
                    </p>
                </div>
            )}
        </div>
    )
}

export default AvailableRequests