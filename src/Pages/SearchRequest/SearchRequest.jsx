import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useAxios from '../../Hooks/useAxios'

const SearchRequest = () => {
    const [upazilas, setUpazilas] = useState([])
    const [districts, setDistricts] = useState([])
    const [upazila, setUpazila] = useState('')
    const [district, setDistrict] = useState('')
    const axiosInstance = useAxios()

    useEffect(()=>{
      axios.get('../upazila.json')
      .then(res => setUpazilas(res.data.upazilas))
      axios.get('../district.json')
      .then(res => setDistricts(res.data.districts))
    }, [])

    const handleSearch = (e) =>{
        e.preventDefault()
        const bloodGroup = e.target.blood.value
        axiosInstance.get(`/search-requests?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
    }


  return (
    <div>
      <form onSubmit={handleSearch} className="flex w-2xl mx-auto gap-10 space-6">
        <div>
          
          <select
            name="blood"
            defaultValue="Choose Blood Group"
            className=" bg-red-700 border border-red-300 text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-purple-500/20 transition-all"
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

        <div>
         
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className=" bg-red-700 border border-red-300 text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-purple-500/20 transition-all"
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
          
          <select
            value={upazila}
            onChange={(e) => setUpazila(e.target.value)}
            className=" bg-red-700 border border-red-300 text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-purple-500/20 transition-all"
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

        <button
          type="submit"
          className="py-2 px-4 bg-red-300 hover:scale-105 rounded-xl font-bold text-lg text-red-800 shadow-xl transform transition-all hover:scale-[1.02] active:scale-100"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchRequest
