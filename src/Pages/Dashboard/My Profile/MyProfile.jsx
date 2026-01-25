import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import axios from 'axios';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../Components/LoadingSpinner';

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
    phone: '',
    dateOfBirth: '',
    gender: '',
    bio: '',
    availableForDonation: false,
    emergencyContact: false,
    emailNotifications: false,
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
            phone: data?.phone || '',
            dateOfBirth: data?.dateOfBirth || '',
            gender: data?.gender || '',
            bio: data?.bio || '',
            availableForDonation: data?.availableForDonation || false,
            emergencyContact: data?.emergencyContact || false,
            emailNotifications: data?.emailNotifications || false,
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
      phone: profile?.phone || '',
      dateOfBirth: profile?.dateOfBirth || '',
      gender: profile?.gender || '',
      bio: profile?.bio || '',
      availableForDonation: profile?.availableForDonation || false,
      emergencyContact: profile?.emergencyContact || false,
      emailNotifications: profile?.emailNotifications || false,
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
       <LoadingSpinner 
        message="Loading your profile..."
        fullScreen={false}
      />
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <title>My Profile</title>
      
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-2">
          👤 My Profile
        </h1>
        <p className="text-gray-600">
          Manage your personal information and donation preferences
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-primary px-8 py-3"
          >
            ✏️ Edit Profile
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
            >
              💾 Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="px-8 py-3 bg-gray-600 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors"
            >
              ❌ Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Picture Section */}
        <div className="lg:col-span-1">
          <div className="card-elevated p-6 text-center">
            <div className="relative inline-block">
              <img
                src={formData.mainPhotoUrl || 'https://via.placeholder.com/200x200?text=No+Photo'}
                alt="Profile"
                className="w-48 h-48 object-cover rounded-full border-4 border-red-200 shadow-xl mx-auto"
              />
              {isEditing && (
                <div className="absolute bottom-0 right-0 bg-red-600 rounded-full p-2">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <span className="text-white text-sm">📷</span>
                  </label>
                </div>
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-4">
              {formData.name || 'User Name'}
            </h2>
            <p className="text-gray-600">{firebaseUser?.email}</p>
            
            {/* Blood Group Display */}
            {formData.blood_group && (
              <div className="mt-4">
                <div className="blood-group-display w-20 h-20 mx-auto text-2xl">
                  {formData.blood_group}
                </div>
                <p className="text-sm text-gray-600 mt-2">Blood Group</p>
              </div>
            )}

            {/* Profile Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">12</div>
                <div className="text-sm text-gray-600">Donations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">5</div>
                <div className="text-sm text-gray-600">Lives Saved</div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSave} className="card-elevated p-8 space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              📝 Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={`form-input ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  value={firebaseUser?.email || ''}
                  readOnly
                  className="form-input bg-gray-100 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="form-label">
                  Blood Group <span className="text-red-600">*</span>
                </label>
                <select
                  name="blood_group"
                  value={formData.blood_group}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`form-input ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                >
                  <option value="">Select Blood Group</option>
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">
                  District <span className="text-red-600">*</span>
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`form-input ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                >
                  <option value="">Select District</option>
                  {districts.map(d => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">
                  Upazila <span className="text-red-600">*</span>
                </label>
                <select
                  name="upazila"
                  value={formData.upazila}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`form-input ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                >
                  <option value="">Select Upazila</option>
                  {upazilas.map(u => (
                    <option key={u.id} value={u.name}>{u.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={`form-input ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="pt-6 border-t">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth || ''}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={`form-input ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  />
                </div>

                <div>
                  <label className="form-label">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`form-input ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="form-label">
                  Bio / About Me
                </label>
                <textarea
                  name="bio"
                  value={formData.bio || ''}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  rows="4"
                  className={`form-input resize-none ${!isEditing ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  placeholder="Tell us about yourself and your motivation for donating blood..."
                />
              </div>
            </div>

            {/* Donation Preferences */}
            <div className="pt-6 border-t">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">🩸 Donation Preferences</h4>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="availableForDonation"
                    checked={formData.availableForDonation || false}
                    onChange={(e) => setFormData(prev => ({ ...prev, availableForDonation: e.target.checked }))}
                    disabled={!isEditing}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    I am available for blood donation
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="emergencyContact"
                    checked={formData.emergencyContact || false}
                    onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.checked }))}
                    disabled={!isEditing}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Contact me for emergency blood requests
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={formData.emailNotifications || false}
                    onChange={(e) => setFormData(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                    disabled={!isEditing}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Send me email notifications about nearby requests
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Account Information */}
      <div className="card-elevated p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🔒 Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <span className="text-gray-600">Account Created:</span>
            <p className="font-medium">
              {firebaseUser?.metadata?.creationTime ? 
                new Date(firebaseUser.metadata.creationTime).toLocaleDateString() : 
                'Not available'}
            </p>
          </div>
          <div>
            <span className="text-gray-600">Last Sign In:</span>
            <p className="font-medium">
              {firebaseUser?.metadata?.lastSignInTime ? 
                new Date(firebaseUser.metadata.lastSignInTime).toLocaleDateString() : 
                'Not available'}
            </p>
          </div>
          <div>
            <span className="text-gray-600">Account Status:</span>
            <p className="font-medium text-green-600">✅ Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;