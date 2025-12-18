import { Link, useLocation, useNavigate } from 'react-router';
import { Mail, Lock, Gamepad2, Dog } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { useContext, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { Bounce, toast } from 'react-toastify';
import auth from '../Firebase/firebase.config';

export default function Login() {
    const { user, setUser, handleGoogleSignin} = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate();
    const [email, setEmail] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault()
        const email = e.target.email.value;
        const pass = e.target.password.value;

        signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential)=>{
            const user = userCredential.user;
            setUser(user)
            navigate(location.state? location.state : '/')
            toast.success("Signed In Successfully!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            });
        }).catch((error) => console.log(error))
    }

    const googleSignin = () =>{
      handleGoogleSignin()
      .then(result =>{
        const user = result.user
        setUser(user)
        navigate(location.state? location.state : '/')
        toast.success("Signed In Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      })
      .catch(err => console.log(err))
      
    }

  return (
    <div className=" bg-gray-50 flex items-center justify-center px-4 py-12">
      <title>Login</title>
    
      
      <div className="relative z-10 max-w-5xl w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          
          <div className="text-center lg:text-left max-w-lg">
            
            <h1 className=" text-4xl md:text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-sky-900 to-sky-500 tracking-tight">
              Welcome Back
              <div className='flex gap-2 justify-center items-center'><span className="block text-transparent bg-clip-text bg-linear-to-r from-sky-900 to-sky-600">
                Friend
              </span><Dog className="w-10 h-10 md:w-16 md:h-16 text-sky-900" /></div>
              
            </h1>
            
            <p className="mt-6 lg:text-xl text-black leading-relaxed">
              Furry Friend today, Family Member Tomorrow!
            </p>
            
          </div>

          
          <div className="w-full max-w-md">
            <div className="bg-sky-800 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700 p-8">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Login to Continue
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="flex items-center gap-3 text-gray-300 mb-2 text-sm font-medium"><Mail className="w-5 h-5" />Email Address</label>
                  <input onChange={(e)=> setEmail(e.target.value)} name='email' type="email" placeholder="friend@domain.com"
                    className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-purple-500/20 transition-all"/>
                </div>

                <div>
                  <label className="flex items-center gap-3 text-gray-300 mb-2 text-sm font-medium"><Lock className="w-5 h-5" />Password</label>
                  <input name='password' type="password" placeholder="••••••••"
                    className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-purple-500/20 transition-all"/>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
                  <button href="#" className="text-sky-500 hover:text-white transition-colors">Forgot password?</button>
                  <Link to="/register" className="text-sky-500 hover:text-white transition-colors">Don't have an account? <span className="font-bold">Register</span></Link>
                </div>

                <button type="submit"
                  className="w-full py-4 mt-6 bg-linear-to-r from-sky-700 to-sky-500 hover:bg-sky-900 rounded-xl font-bold text-lg text-white shadow-xl transform transition-all hover:scale-[1.02] active:scale-100">
                  Login Now
                </button>

               
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}