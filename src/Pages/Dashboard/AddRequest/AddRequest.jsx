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

        const formData = {
          requester_name,
          requester_email,
          recipient_name,
          recipient_district,
          recipient_upazila,
          hospital_name,
          full_address,
          blood_group,
          donation_status:'pending'
        };

        axiosSecure.post('/requests', formData)
        .then(res=>{
        console.log(res)
        if(res.data.acknowledged){
          Swal.fire({
          title: "Request Created Successfully!",
          icon: "success",
          draggable: true
          });
          form.reset()
        } else{
          Swal.fire({
            title: "Something Went Wrong",
            icon: "error",
            draggable: true,
          });
        }
    }).catch(err =>{
      console.log(err)
      Swal.fire({
            title: "Something Went Wrong",
            icon: "error",
            draggable: true,
          });
    })
    }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-red-500">
      <title>Add Request</title>
      <h2 className="text-3xl font-bold text-red-700 mb-8 text-center">
        Add New Blood Donation Request
      </h2>

      <form onSubmit={handleRequest} className="space-y-6">
        {/* Requester Info (Read-only) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requester Name
            </label>
            <input
              name='requester_name'
              type="text"
              readOnly
              value={user?.displayName} // Example logged-in user name
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requester Email
            </label>
            <input
              name='requester_email'
              type="email"
              readOnly
              value={user?.email} // Example logged-in user email
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Recipient Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipient Name <span className="text-red-600">*</span>
          </label>
          <input
            name='recipient_name'
            type="text"
            placeholder="Enter patient/recipient full name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              District <span className="text-red-600">*</span>
            </label>
            <select name='recipient_district' value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
              <option disabled selected value=''>Select Your District</option>
                    {
                      districts.map(d => <option value={d?.name} key={d.id}>{d?.name}</option>)
                    }
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upazila <span className="text-red-600">*</span>
            </label>
            <select name='recipient_upazila' value={upazila} onChange={(e) => setUpazila(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
              <option disabled value=''>Select Your Upazila</option>
                    {
                      upazilas.map(u => <option value={u?.name} key={u.id}>{u?.name}</option>)
                    }
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hospital Name <span className="text-red-600">*</span>
          </label>
          <input
            name='hospital_name'
            type="text"
            placeholder="e.g., Dhaka Medical College Hospital"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Address Line <span className="text-red-600">*</span>
          </label>
          <input
            name='full_address'
            type="text"
            placeholder="e.g., Zahir Raihan Rd, Dhaka"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Blood Group <span className="text-red-600">*</span>
            </label>
            <select name='blood_group' className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
              <option disabled={true}>Choose Blood Group</option>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Donation Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Donation Time <span className="text-red-600">*</span>
            </label>
            <input
              type="time"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Request Message (Why blood is needed) <span className="text-red-600">*</span>
          </label>
          <textarea
            rows="5"
            placeholder="Please explain the patient's condition, urgency, and any other details that might help donors respond quickly..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <button
            type="submit"
            className="px-10 py-4 bg-red-600 text-white font-semibold text-lg rounded-lg hover:bg-red-700 transition shadow-md"
          >
            Submit Request
          </button>
        </div>

      </form>
    </div>
  )
}

export default AddRequest
