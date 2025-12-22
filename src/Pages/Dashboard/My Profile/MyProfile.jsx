import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import axios from 'axios';
import Swal from 'sweetalert2';

const MyProfile = () => {
  const { user: firebaseUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    mainPhotoUrl: '',
    blood_group: '',
    district: '',
    upazila: '',
  });

  useEffect(() => {
    axios.get('/district.json').then(res => setDistricts(res.data.districts));
    axios.get('/upazila.json').then(res => setUpazilas(res.data.upazilas));
  }, []);

  useEffect(() => {
    if (firebaseUser?.email) {
      axiosSecure.get(`/users/${firebaseUser.email}`)
        .then(res => {
          const data = res.data;
          setProfile(data);
          setFormData({
            name: data?.name || firebaseUser.displayName || '',
            mainPhotoUrl: data?.mainPhotoUrl || firebaseUser.photoURL || '',
            blood_group: data?.blood_group || '',
            district: data?.district || '',
            upazila: data?.upazila || '',
          });
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [firebaseUser, axiosSecure]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataImg = new FormData();
    formDataImg.append('image', file);

    try {
      const res = await axios.post(
        'https://api.imgbb.com/1/upload?key=c0c2a675182aff9fe924c451f808e65a',
        formDataImg
      );
      const url = res.data.data.display_url;
      setFormData(prev => ({ ...prev, mainPhotoUrl: url }));
      Swal.fire('Success', 'Photo uploaded!', 'success');
    } catch (err) {
      Swal.fire('Error', 'Photo upload failed', 'error');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.patch(`/users/${firebaseUser.email}`, formData);
      setProfile(prev => ({ ...prev, ...formData }));
      setIsEditing(false);
      Swal.fire('Success!', 'Profile updated successfully', 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to update profile', 'error');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profile?.name || firebaseUser.displayName || '',
      mainPhotoUrl: profile?.mainPhotoUrl || firebaseUser.photoURL || '',
      blood_group: profile?.blood_group || '',
      district: profile?.district || '',
      upazila: profile?.upazila || '',
    });
    setIsEditing(false);
  };

  if (loading) {
    return <div className="text-center py-20 text-2xl">Loading profile...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-2xl border border-red-200">
      
      <title>My Profile</title>
      <h2 className="text-4xl font-bold text-red-700 text-center mb-10">
        My Profile
      </h2>

      <div className="flex justify-end mb-6">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        ) : (
          <div className="space-x-4">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        <div className="text-center lg:text-left">
          <img
            src={formData.mainPhotoUrl || 'https://via.placeholder.com/300'}
            alt="Profile"
            className="w-64 md:h-64 object-cover rounded-full border-2 border-black shadow-xl mx-auto lg:mx-0"
          />
          {isEditing && (
            <div className="mt-6">
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Change Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              />
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-red-300 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={firebaseUser?.email || ''}
              readOnly
              className="w-full px-5 py-4 border border-gray-300 rounded-xl bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Blood Group
            </label>
            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-red-300 disabled:bg-gray-100"
            >
              <option value="">Select Blood Group</option>
              {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              District
            </label>
            <select
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-red-300 disabled:bg-gray-100"
            >
              <option value="">Select District</option>
              {districts.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Upazila
            </label>
            <select
              name="upazila"
              value={formData.upazila}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-red-300 disabled:bg-gray-100"
            >
              <option value="">Select Upazila</option>
              {upazilas.map(u => (
                <option key={u.id} value={u.name}>{u.name}</option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;