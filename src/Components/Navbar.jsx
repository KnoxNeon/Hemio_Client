import { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { signOut } from 'firebase/auth';
import auth from '../Firebase/firebase.config';

const Navbar = () => {
  const {user} = useContext(AuthContext)
  const [isChecked, setIsChecked] = useState(true)

  useEffect(()=>{
    const initialTheme = localStorage.getItem('isChecked')
    const value = JSON.parse(initialTheme)
    setIsChecked(value)
    document.querySelector('html').setAttribute('data-theme', value? 'light':'dark')
  },[])

  const handleTheme = () =>{
    const savedTheme = !isChecked
    setIsChecked(savedTheme)
    document.querySelector('html').setAttribute('data-theme', savedTheme? 'light':'dark')
    localStorage.setItem('isChecked', JSON.stringify(savedTheme))
  }

  const handleSignOut = () =>{
    signOut(auth)
  }
  return (
    <div>
      <div className="navbar z-10 bg-gray-400 text-white font-normal border-t border-white/10 w-full text-grey shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                {" "}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />{" "}
              </svg>
              {user && (
              <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-sky-400 rounded-box z-1 mt-3 w-52 p-2 shadow">
                
              <li>
                {" "}
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/services">Pets & Supplies</Link>
              </li>
              <li>
                <Link to="/add-services">Add Listings</Link>
              </li>
              <li>
                <Link to="/my-services">Donate</Link>
              </li>
              <li>
                <Link to="/my-orders">My Orders</Link>
              </li>
              </ul>)}

              {!user && (
              <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-sky-400 rounded-box z-1 mt-3 w-52 p-2 shadow">
                
              <li>
                {" "}
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/services">Donate</Link>
              </li>
          
              </ul>
            
          )}

            </div>
          </div>
          <NavLink className="flex lg:pl-4 md:gap-4">
            <div className='flex items-center'>
              <img className="h-16 w-16 hover:scale-120" src="../logo.png" alt=""/>
               <p className='text-2xl'><span className='text-black'>H</span>emio</p>
            </div>
          </NavLink>
        </div>
        <div className="navbar-center hidden text-black font-bold lg:flex">
          {user && (
            <ul className="menu menu-horizontal px-1 ">
              <li>
                <Link to="/services">Donation Requests</Link>
              </li>
              <li>
                <Link to="/services">Fundings</Link>
              </li>
              <li>
                <Link to="/dashboard/main">Dashboard</Link>
              </li>
            </ul>
          )}

          {!user && (
            <ul className="menu menu-horizontal px-1">
              
              <li>
                <Link to="/services">Donation Requests</Link>
              </li>
            </ul>
          )}
        </div>

        <div className="navbar-end ">
          {user && (
            <div className="flex gap-2">
              <Link to="/profile">
                <img
                  className="w-10 h-10 rounded-4xl border-2 border-black hover:scale-110"
                  src={user.photoURL}
                  alt=""
                />
              </Link>
              <button
                onClick={handleSignOut}
                className="btn border-0 shadow rounded-3xl gap-1 hover:scale-110 text-white  bg-black hover: scale-105">
                {" "}
                Logout
              </button>
            </div>
          )}

          {!user && (
            <div className="space-x-2">

              <Link
                to="/login"
                className="btn border-0 rounded-3xl shadow hover:scale-110 text-white bg-black hover: scale-105"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn border-0 rounded-3xl shadow  hover:scale-110 text-white bg-black hover: scale-105"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar
