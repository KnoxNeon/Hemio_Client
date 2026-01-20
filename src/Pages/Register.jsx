import { Link, useLocation, useNavigate } from 'react-router'; 
import { Mail, Lock, User, Upload, MapPin, Droplets, Eye, EyeOff, Shield, Heart, Users } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { Bounce, toast } from 'react-toastify';
import axios from 'axios';
import LoadingSpinner from '../Components/LoadingSpinner';

export default function Register() {
    const { registerWithEmailPassword, setUser, handleGoogleSignin } = useContext(AuthContext);
    const [upazilas, setUpazilas] = useState([])
    const [districts, setDistricts] = useState([])
    const [upazila, setUpazila] = useState('')
    const [district, setDistrict] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
      axios.get('../upazila.json')
      .then(res => setUpazilas(res.data.upazilas))
      axios.get('../district.json')
      .then(res => setDistricts(res.data.districts))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        
        const email = e.target.email.value.trim();
        const pass = e.target.password.value;
        const photoUrl = e.target.photoUrl;
        const file = photoUrl.files[0]
        const name = e.target.name.value.trim();
        const blood = e.target.blood.value.trim();

        // Validation
        const uppercase = /[A-Z]/;
        const lowercase = /[a-z]/;

        if (pass.length < 6) {
            setIsLoading(false)
            return toast.warn("Password must be at least 6 characters!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
        }
        if (!uppercase.test(pass)) {
            setIsLoading(false)
            return toast.warn("Password must have at least one uppercase letter!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            }); 
        }
        if (!lowercase.test(pass)) {
            setIsLoading(false)
            return toast.warn("Password must have at least one lowercase letter!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
        }

        try {
            // Upload image
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=c0c2a675182aff9fe924c451f808e65a`, {image:file},
                 {
                    headers:{
                        'Content-Type' : 'multipart/form-data'
                    }
                })

            const mainPhotoUrl = res.data.data.display_url

            const formData = {
                    email,
                    pass,
                    name,
                    mainPhotoUrl,
                    blood,
                    district,
                    upazila
            }

            // Register user
            const userCredential = await registerWithEmailPassword(email, pass);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: name,
                photoURL: mainPhotoUrl || null
            });

            setUser(user);
            
            // Save to database
            await axios.post('https://donatebloodserver.vercel.app/users', formData)

            toast.success("Account created successfully! Welcome to Hemio.", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });

            const redirectTo = location.state?.from?.pathname || '/';
            navigate(redirectTo, { replace: true });

        } catch (err) {
            console.error("Registration failed:", err);
            toast.error(err.message || "Registration failed. Please try again.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
        } finally {
            setIsLoading(false)
        }
    };

    const googleSignin = async () => {
        setIsLoading(true)
        try {
            const result = await handleGoogleSignin()
            const user = result.user
            setUser(user)
            
            // Register user in backend database
            try {
                await axios.post('https://donatebloodserver.vercel.app/users', {
                    name: user.displayName || 'Google User',
                    email: user.email,
                    blood_group: 'A+', // Default, user can update in profile
                    district: 'Not specified',
                    upazila: 'Not specified',
                    role: 'donor',
                    status: 'active'
                })
                toast.success("Account created successfully! Please update your profile with blood type and location.", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  transition: Bounce,
                });
            } catch (backendError) {
                if (backendError.response?.status === 409) {
                    // User already exists, that's fine for login
                    toast.success("Successfully signed in with Google!", {
                      position: "top-right",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      transition: Bounce,
                    });
                } else {
                    console.error('Backend registration error:', backendError)
                    toast.warning("Signed in successfully, but please complete your profile.", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      transition: Bounce,
                    });
                }
            }
            
            navigate(location.state?.from?.pathname || '/')
        } catch (err) {
            toast.error("Google registration failed. Please try again.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
        } finally {
            setIsLoading(false)
        }
    }
    
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-sky-50 flex items-center justify-center px-4 py-12">
      <title>Register - Hemio</title>
      
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
          {/* Left Side - Motivation Message */}
          <div className="text-center lg:text-left space-y-6 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="text-red-600">Someone</span> Might Be
                <br />
                Needing Blood
                <br />
                <span className="text-red-600">Right Now</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Join our community of heroes. Your registration could be the first step to saving a life.
              </p>
            </div>
            
            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Save Lives</div>
                  <div className="text-sm text-gray-600">Help those in need</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Join Community</div>
                  <div className="text-sm text-gray-600">Connect with donors</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="w-full max-w-lg mx-auto animate-slide-up">
            <div className="card-elevated p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Create Account
                </h2>
                <p className="text-gray-600">
                  Join the blood donation community
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      Email Address
                    </label>
                    <input 
                      name='email'
                      type="email"
                      placeholder="Enter your email"
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      Full Name
                    </label>
                    <input 
                      name='name'
                      type="text"
                      placeholder="Enter full name"
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label flex items-center gap-2">
                    <Upload className="w-4 h-4 text-gray-500" />
                    Profile Photo
                  </label>
                  <input 
                    name='photoUrl'
                    type="file"
                    accept="image/*"
                    className="form-input file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-600 hover:file:bg-red-100"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-gray-500" />
                      Blood Group
                    </label>
                    <select 
                      name='blood' 
                      defaultValue="" 
                      className="form-input"
                      required
                    >
                      <option value="" disabled>Choose Blood Group</option>
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
                    <label className="form-label flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      District
                    </label>
                    <select 
                      value={district} 
                      onChange={(e) => setDistrict(e.target.value)} 
                      className="form-input"
                      required
                    >
                      <option value=''>Select District</option>
                      {districts.map(d => <option value={d?.name} key={d.id}>{d?.name}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    Upazila
                  </label>
                  <select 
                    value={upazila} 
                    onChange={(e) => setUpazila(e.target.value)} 
                    className="form-input"
                    required
                  >
                    <option value=''>Select Upazila</option>
                    {upazilas.map(u => <option value={u?.name} key={u.id}>{u?.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="form-label flex items-center gap-2">
                    <Lock className="w-4 h-4 text-gray-500" />
                    Password
                  </label>
                  <div className="relative">
                    <input 
                      name='password'
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="form-input pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Must be at least 6 characters with uppercase and lowercase letters
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 bg-white rounded-full animate-bounce"></div>
                      Creating Account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or register with</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={googleSignin}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FcGoogle className="w-5 h-5" />
                  Register with Google
                </button>

                {/* Quick Demo Login Section - Under Google Register */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      🚀 Try Demo Login Instead
                    </h3>
                    <p className="text-xs text-gray-500">
                      Skip registration and test different user roles instantly
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Link
                      to="/login"
                      state={{ 
                        demoLogin: { 
                          email: 'iftey10@gmail.com', 
                          password: '123456Aa', 
                          role: 'Admin' 
                        } 
                      }}
                      className="flex items-center justify-center gap-1 px-3 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-xs font-medium"
                    >
                      <Shield className="w-3 h-3" />
                      Admin
                    </Link>
                    <Link
                      to="/login"
                      state={{ 
                        demoLogin: { 
                          email: 'iftey100@gmail.com', 
                          password: '123456Aa', 
                          role: 'Donor' 
                        } 
                      }}
                      className="flex items-center justify-center gap-1 px-3 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs font-medium"
                    >
                      <Heart className="w-3 h-3" />
                      Donor
                    </Link>
                    <Link
                      to="/login"
                      state={{ 
                        demoLogin: { 
                          email: 'iftey11@gmail.com', 
                          password: '123456Aa', 
                          role: 'Volunteer' 
                        } 
                      }}
                      className="flex items-center justify-center gap-1 px-3 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs font-medium"
                    >
                      <Users className="w-3 h-3" />
                      Volunteer
                    </Link>
                  </div>
                  <p className="text-xs text-gray-400 mt-3 text-center">
                    Demo accounts for testing different user experiences
                  </p>
                </div>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-red-600 hover:text-red-700 font-semibold">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}