
import { useContext } from 'react';
import {
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineHeart,
  HiOutlineUserAdd,
  HiOutlineLogout,
  HiOutlineUser,
} from 'react-icons/hi';
import { BsFillDropletFill } from "react-icons/bs";
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';
import auth from '../../Firebase/firebase.config';
import { signOut } from 'firebase/auth';

const Aside = () => {

  const handleSignOut = () =>{
    signOut(auth)
  }

  const {role} = useContext(AuthContext)
  return (
    <aside className="bg-red-700 text-white w-64 h-screen flex flex-col">
      {/* Logo/Header */}
      <div className="flex items-center space-x-4 p-6 border-b border-red-600">
        <div className="bg-white text-red-500 rounded-full w-12 h-12 flex items-center justify-center font-bold text-2xl">
          DB
        </div>
        <span className="text-xl text-black font-semibold">DashBoard</span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          <li>
            <NavLink to='/dashboard/main'
              className={({isActive}) =>
                `flex items-center space-x-4 px-4 py-3 rounded-lg transition ${isActive? "bg-white text-red-500":"hover:bg-red-600"}  }`}>
              <HiOutlineHome size={24} /> <span className="text-lg">DashBoard Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/my-profile'
              className={({isActive}) =>
                `flex items-center space-x-4 px-4 py-3 rounded-lg transition  ${isActive? "bg-white text-red-500":"hover:bg-red-600"}  }`}>
              <HiOutlineUser size={24} /> <span className="text-lg">My Profile</span>
            </NavLink>
          </li>

          {
            role == 'donor' && (
              <li>
            <NavLink to='/dashboard/add-request'
              className={({isActive}) =>
                `flex items-center space-x-4 px-4 py-3 rounded-lg transition ${isActive? "bg-white text-red-500":"hover:bg-red-600"}  }`}>
              <HiOutlineHeart size={24} /> <span className="text-lg">Add Request</span>
            </NavLink>
          </li>
            )
          }

          {
            role == 'admin' && (
              <li>
            <NavLink to='/dashboard/all-users'
              className={({isActive}) =>
                `flex items-center space-x-4 px-4 py-3 rounded-lg transition  ${isActive? "bg-white text-red-500":"hover:bg-red-600"}  }`}>
              <HiOutlineUserGroup size={24} /> <span className="text-lg">All Users</span>
            </NavLink>
          </li>
            )
          }
          {
            (role == 'admin' || role == 'volunteer') && (
              <li>
            <NavLink to='/dashboard/all-requests'
              className={({isActive}) =>
                `flex items-center space-x-4 px-4 py-3 rounded-lg transition  ${isActive? "bg-white text-red-500":"hover:bg-red-600"}  }`}>
              <BsFillDropletFill  size={24} /> <span className="text-lg">All Requests</span>
            </NavLink>
          </li>
            )
          }
          {
            role == 'donor' && (
            <li>
            <NavLink to='/dashboard/my-requests'
              className={({isActive}) =>
                `flex items-center space-x-4 px-4 py-3 rounded-lg transition ${isActive? "bg-white text-red-500":"hover:bg-red-600"}  }`}>
              <HiOutlineUserAdd size={24} /> <span className="text-lg">My Requests</span>
            </NavLink>
          </li>
            )
          }
          
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-red-600">
        <button onClick={handleSignOut}
          className="flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-red-600 transition"
        >
          <HiOutlineLogout size={24} />
          <span className="text-lg">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Aside