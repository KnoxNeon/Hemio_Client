import { Link, useLocation, useNavigate } from 'react-router';
import { Mail, Lock, Eye, EyeOff, Shield, Heart, Users } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Bounce, toast } from 'react-toastify';
import auth from '../Firebase/firebase.config';
import LoadingSpinner from '../Components/LoadingSpinner';
import axios from 'axios';

export default function Login() {
    const { user, setUser, handleGoogleSignin} = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Check if demo login data was passed from Register page
    useEffect(() => {
        if (location.state?.demoLogin) {
            const { email: demoEmail, password: demoPassword } = location.state.demoLogin
            setEmail(demoEmail)
            setPassword(demoPassword)
            setShowPassword(true) // Show password so user can see it's pre-filled
        }
    }, [location.state])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const email = e.target.email.value;
        const pass = e.target.password.value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, pass)
            const user = userCredential.user;
            setUser(user)
            navigate(location.state? location.state : '/')
            toast.success("Welcome back! Successfully signed in.", {
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
        } catch (error) {
            toast.error("Invalid email or password. Please try again.", {
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

    const quickLogin = async (email, password, role) => {
        setIsLoading(true)
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            setUser(user)
            navigate(location.state? location.state : '/')
            toast.success(`Welcome back! Signed in as ${role}.`, {
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
        } catch (error) {
            toast.error(`Failed to sign in as ${role}. Please try again.`, {
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

    const googleSignin = async () => {
        setIsLoading(true)
        try {
            const result = await handleGoogleSignin()
            const user = result.user
            setUser(user)
            
            // Check if user exists in backend, if not create them
            try {
                await axios.post('https://donatebloodserver.vercel.app/users', {
                    name: user.displayName || 'Google User',
                    email: user.email,
                    blood_group: 'A+', // Default, user can update later
                    district: 'Not specified',
                    upazila: 'Not specified',
                    role: 'donor',
                    status: 'active'
                })
            } catch (backendError) {
                // User might already exist, that's okay
                console.log('User might already exist in backend:', backendError.response?.data?.message)
            }
            
            navigate(location.state? location.state : '/')
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
        } catch (err) {
            toast.error("Google sign-in failed. Please try again.", {
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
      <title>Login - Hemio</title>
      
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Welcome Message */}
          <div className="text-center lg:text-left space-y-6 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Welcome Back to
                <span className="text-red-600 block">Hemio</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Continue your journey of saving lives. Every login brings you closer to making a difference.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-600">500+</div>
                <div className="text-sm text-gray-600">Lives Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-600">200+</div>
                <div className="text-sm text-gray-600">Active Donors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-red-600">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto animate-slide-up">
            <div className="card-elevated p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Sign In
                </h2>
                <p className="text-gray-600">
                  Enter your credentials to access your account
                </p>
                {location.state?.demoLogin && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <span className="font-semibold">Demo {location.state.demoLogin.role} Account</span> - Credentials pre-filled for testing
                    </p>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="form-label flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    Email Address
                  </label>
                  <input 
                    onChange={(e)=> setEmail(e.target.value)} 
                    value={email}
                    name='email' 
                    type="email" 
                    placeholder="Enter your email"
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="form-label flex items-center gap-2">
                    <Lock className="w-4 h-4 text-gray-500" />
                    Password
                  </label>
                  <div className="relative">
                    <input 
                      onChange={(e)=> setPassword(e.target.value)}
                      value={password}
                      name='password' 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter your password"
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
                </div>

                <div className="flex items-center justify-between text-sm">
                  <Link to="/forgot-password" className="text-red-600 hover:text-red-700 font-medium">
                    Forgot password?
                  </Link>
                  <Link to="/register" className="text-sky-600 hover:text-sky-700 font-medium">
                    Create account
                  </Link>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 bg-white rounded-full animate-bounce"></div>
                      Signing In...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={googleSignin}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FcGoogle className="w-5 h-5" />
                  Sign in with Google
                </button>
              </form>

              {/* Quick Demo Login Section - Under the form */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    🚀 Quick Demo Login
                  </h3>
                  <p className="text-xs text-gray-500">
                    Try different user roles instantly
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => quickLogin('iftey10@gmail.com', '123456Aa', 'Admin')}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-1 px-3 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium"
                  >
                    <Shield className="w-3 h-3" />
                    Admin
                  </button>
                  <button
                    onClick={() => quickLogin('iftey100@gmail.com', '123456Aa', 'Donor')}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-1 px-3 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium"
                  >
                    <Heart className="w-3 h-3" />
                    Donor
                  </button>
                  <button
                    onClick={() => quickLogin('iftey11@gmail.com', '123456Aa', 'Volunteer')}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-1 px-3 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium"
                  >
                    <Users className="w-3 h-3" />
                    Volunteer
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-3 text-center">
                  Demo accounts for testing different user experiences
                </p>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-red-600 hover:text-red-700 font-semibold">
                    Register now
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