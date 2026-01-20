import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Provider/AuthProvider'
import axios from 'axios'
import Swal from 'sweetalert2'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'

const AddRequest = () => {
    const {user} = useContext(AuthContext)
    const [upazilas, setUpazilas] = useState([])
    const [districts, setDistricts] = useState([])
    const [upazila, setUpazila] = useState('')
    const [district, setDistrict] = useState('')
    const axiosSecure = useAxiosSecure()

    useEffect(()=>{
      axios.get('../upazila.json')
      .then(res => setUpazilas(res.data.upazilas))
      axios.get('../district.json')
      .then(res => setDistricts(res.data.districts))
    }, [])

    const handleRequest = (e) =>{
        e.preventDefault()
        const form = e.target

        const requester_name = form.requester_name.value
        const requester_email = form.requester_email.value
        const recipient_name = form.recipient_name.value
        const recipient_district = district
        const recipient_upazila = upazila
        const hospital_name = form.hospital_name.value
        const full_address = form.full_address.value
        const blood_group = form.blood_group.value
        const request_date = form.request_date.value
        const request_time = form.request_time.value
        const request_message = form.request_message.value

        // Validation
        if (!recipient_name || !district || !upazila || !hospital_name || !full_address || !blood_group || !request_date || !request_time || !request_message) {
          Swal.fire({
            title: "Missing Information",
            text: "Please fill in all required fields",
            icon: "warning",
            draggable: true
          });
          return;
        }

        const formData = {
          requester_name,
          requester_email,
          recipient_name,
          recipient_district,
          recipient_upazila,
          hospital_name,
          full_address,
          blood_group,
          request_date,
          request_time,
          request_message,
          status: 'pending', // Initial status is always pending
          created_at: new Date().toISOString()
        };

        axiosSecure.post('/requests', formData)
        .then(res=>{
        console.log(res)
        if(res.data.acknowledged){
          Swal.fire({
          title: "Request Created Successfully!",
          text: "Your blood donation request has been submitted and will be visible to donors.",
          icon: "success",
          draggable: true
          });
          form.reset()
          setDistrict('')
          setUpazila('')
        } else{
          Swal.fire({
            title: "Something Went Wrong",
            text: "Please try again later",
            icon: "error",
            draggable: true,
          });
        }
    }).catch(err =>{
      console.log(err)
      Swal.fire({
            title: "Something Went Wrong",
            text: "Please check your connection and try again",
            icon: "error",
            draggable: true,
          });
    })
    }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <title>Add Request</title>
      
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          🩸 Create Blood Donation Request
        </h1>
        <p className="text-gray-600 text-lg">
          Help save a life by creating a blood donation request. Fill in all the details carefully.
        </p>
      </div>

      <div className="card-elevated p-8">
        <form onSubmit={handleRequest} className="space-y-6">
          {/* Requester Info (Read-only) */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              👤 Requester Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">
                  Requester Name
                </label>
                <input
                  name='requester_name'
                  type="text"
                  readOnly
                  value={user?.displayName || ''} 
                  className="form-input bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="form-label">
                  Requester Email
                </label>
                <input
                  name='requester_email'
                  type="email"
                  readOnly
                  value={user?.email || ''} 
                  className="form-input bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Patient/Recipient Details */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              🏥 Patient Information
            </h3>
            
            <div>
              <label className="form-label">
                Patient/Recipient Name <span className="text-red-600">*</span>
              </label>
              <input
                name='recipient_name'
                type="text"
                placeholder="Enter patient's full name"
                className="form-input"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">
                  District <span className="text-red-600">*</span>
                </label>
                <select 
                  name='recipient_district' 
                  value={district} 
                  onChange={(e) => setDistrict(e.target.value)} 
                  className="form-input"
                  required
                >
                  <option value=''>Select District</option>
                  {districts.map(d => <option value={d?.name} key={d.id}>{d?.name}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">
                  Upazila <span className="text-red-600">*</span>
                </label>
                <select 
                  name='recipient_upazila' 
                  value={upazila} 
                  onChange={(e) => setUpazila(e.target.value)} 
                  className="form-input"
                  required
                >
                  <option value=''>Select Upazila</option>
                  {upazilas.map(u => <option value={u?.name} key={u.id}>{u?.name}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="form-label">
                Hospital Name <span className="text-red-600">*</span>
              </label>
              <input
                name='hospital_name'
                type="text"
                placeholder="e.g., Dhaka Medical College Hospital"
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">
                Full Address <span className="text-red-600">*</span>
              </label>
              <input
                name='full_address'
                type="text"
                placeholder="Complete address with landmarks"
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Blood & Schedule Details */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              🩸 Blood & Schedule Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="form-label">
                  Required Blood Group <span className="text-red-600">*</span>
                </label>
                <select name='blood_group' className="form-input" required>
                  <option value=''>Choose Blood Group</option>
                  <option value='A+'>A+</option>
                  <option value='A-'>A-</option>
                  <option value='B+'>B+</option>
                  <option value='B-'>B-</option>
                  <option value='O+'>O+</option>
                  <option value='O-'>O-</option>
                  <option value='AB+'>AB+</option>
                  <option value='AB-'>AB-</option>
                </select>
              </div>
              <div>
                <label className="form-label">
                  Needed By Date <span className="text-red-600">*</span>
                </label>
                <input
                  name='request_date'
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="form-label">
                  Preferred Time <span className="text-red-600">*</span>
                </label>
                <input
                  name='request_time'
                  type="time"
                  className="form-input"
                  required
                />
              </div>
            </div>
          </div>

          {/* Request Message */}
          <div>
            <label className="form-label">
              Request Message <span className="text-red-600">*</span>
            </label>
            <textarea
              name='request_message'
              rows="5"
              placeholder="Please explain the patient's condition, urgency, and any other details that might help donors respond quickly..."
              className="form-input resize-none"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="submit"
              className="btn-primary px-12 py-4 text-lg font-semibold"
            >
              🩸 Submit Blood Request
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddRequest
