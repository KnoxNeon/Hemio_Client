import { useEffect, useState } from 'react';
import axios from 'axios';
import useAxios from '../../Hooks/useAxios';
import { Link } from 'react-router';
import { Search } from 'lucide-react';
import LoadingSpinner from '../../Components/LoadingSpinner';

const SearchRequest = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedUpazila, setSelectedUpazila] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const axiosInstance = useAxios();

  useEffect(() => {
    axios.get('/upazila.json').then((res) => setUpazilas(res.data.upazilas || []));
    axios.get('/district.json').then((res) => setDistricts(res.data.districts || []));
  }, []);

  const filteredUpazilas = selectedDistrict
    ? upazilas.filter((u) => {
        const districtObj = districts.find((d) => d.name === selectedDistrict);
        return districtObj && u.district_id === districtObj.id;
      })
    : [];

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setHasSearched(true);

    try {
      const res = await axiosInstance.get('/search-requests', {
        params: {
          bloodGroup: selectedBloodGroup,
          district: selectedDistrict || undefined,
          upazila: selectedUpazila || undefined,
        },
      });

      setSearchResults(res.data || []);
    } catch (err) {
      console.error('Search error:', err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <title>Search Requests</title>
      <div className="max-w-7xl mx-auto">
        
        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-16">
          <h2 className="text-4xl font-bold text-center text-red-700 mb-10">
            Search for Blood Requests
          </h2>

          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Blood Group <span className="text-red-600">*</span>
              </label>
              <select
                value={selectedBloodGroup}
                onChange={(e) => setSelectedBloodGroup(e.target.value)}
                required
                className="w-full px-5 py-4 bg-sky-900 text-white rounded-xl focus:outline-none focus:ring-4 focus:ring-red-300 transition"
              >
                <option value="">Select Blood Group</option>
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                District
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setSelectedUpazila('');
                }}
                className="w-full px-5 py-4 bg-sky-900 text-white rounded-xl focus:outline-none focus:ring-4 focus:ring-red-300 transition"
              >
                <option value="">All Districts</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Upazila
              </label>
              <select
                value={selectedUpazila}
                onChange={(e) => setSelectedUpazila(e.target.value)}
                disabled={!selectedDistrict}
                className="w-full px-5 py-4 bg-sky-900 text-white rounded-xl focus:outline-none focus:ring-4 focus:ring-red-300 disabled:opacity-60 transition"
              >
                <option value="">
                  {selectedDistrict ? 'All Upazilas' : 'Select District First'}
                </option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading || !selectedBloodGroup}
                className="w-full flex items-center justify-center gap-4 py-4 bg-red-600 text-white font-bold text-xl rounded-xl hover:bg-red-700 disabled:opacity-60 transform hover:scale-105 transition shadow-xl"
              >
                <Search />{loading ? ' Searching...' : 'Search Requests'}
              </button>
            </div>
          </form>
        </div>

        <div>
          {loading ? (
            <LoadingSpinner 
              message="Searching for matching requests..."
              subMessage="Please wait while we find blood requests in your area."
              fullScreen={false}
            />
          ) : hasSearched && searchResults.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-3xl text-gray-700 mb-4">No matching requests found</p>
              <p className="text-xl text-gray-600">
                Try adjusting your search criteria or check back later.
              </p>
            </div>
          ) : (
            <>
              <p className="text-2xl font-semibold text-gray-800 mb-8 text-center">
                Found {searchResults.length} request{searchResults.length !== 1 ? 's' : ''}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {searchResults.map((req) => (
                  <div
                    key={req._id}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 border-t-8 border-red-600"
                  >
                    <div className="bg-linear-to-r from-red-600 to-red-700 text-white text-center py-6">
                      <div className="text-5xl font-extrabold">{req.blood_group}</div>
                      <p className="text-sm uppercase tracking-wider mt-2 opacity-90">
                        Needed Urgently
                      </p>
                    </div>

                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        {req.recipient_name}
                      </h3>

                      <div className="space-y-3 text-gray-700">
                        <p>
                          <strong>Hospital:</strong> {req.hospital_name || 'Not specified'}
                        </p>
                        <p>
                          <strong>Location:</strong> {req.recipient_district}, {req.recipient_upazila}
                        </p>
                        <p>
                          <strong>Date:</strong> {req.request_date ? new Date(req.request_date).toLocaleDateString() : 
                                                           req.createdAt ? new Date(req.createdAt).toLocaleDateString() : 
                                                           'Date not available'}
                        </p>
                        <p>
                          <strong>Time:</strong> {req.request_time}
                        </p>
                        {req.patient_problem && (
                          <p className="italic text-gray-600 mt-4 border-l-4 border-red-400 pl-4">
                            "{req.patient_problem}"
                          </p>
                        )}
                      </div>

                      <div className="mt-6 text-center">
                        <span
                          className={`inline-block px-6 py-2 rounded-full font-bold text-sm uppercase ${
                            req.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {req.status || 'Pending'}
                        </span>
                      </div>

                      <div className="mt-8">
                        <Link
                          to="/register"
                          className="block w-full text-center py-4 bg-sky-900 text-white font-bold rounded-xl hover:bg-red-700 transition"
                        >
                          I Can Donate → Register Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchRequest;