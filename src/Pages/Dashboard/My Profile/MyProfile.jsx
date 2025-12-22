import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Provider/AuthProvider'
import axios from 'axios'
import Swal from 'sweetalert2'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'

const MyProfile = () => {
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


  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-red-500">
      <title>My Profile</title>
      <h2 className="text-3xl font-bold text-red-700 mb-8 text-center">
        My Profile
      </h2>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:row-span-3 flex justify-center md:justify-start">
            <img
              src={user?.photoURL}
              alt="Profile"
              className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-4 border-gray-200 shadow-lg"
            />
          </div>

          {/* Name field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              name="requester_name"
              type="text"
              readOnly
              value={user?.displayName || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Email field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              name="requester_email"
              type="email"
              readOnly
              value={user?.email || ""}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blood Group
            </label>
            <select
              name="blood_group"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option disabled={true}>Choose Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              District
            </label>
            <select
              name="recipient_district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option disabled selected value="">
                Select Your District
              </option>
              {districts.map((d) => (
                <option value={d?.name} key={d.id}>
                  {d?.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upazila
            </label>
            <select
              name="recipient_upazila"
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option disabled value="">
                Select Your Upazila
              </option>
              {upazilas.map((u) => (
                <option value={u?.name} key={u.id}>
                  {u?.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
        </div>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <button
            type="submit"
            className="px-10 py-4 bg-red-600 text-white font-semibold text-lg rounded-lg hover:bg-red-700 transition shadow-md"
          >
            Edit Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default MyProfile
