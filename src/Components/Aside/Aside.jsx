
import { useContext, useState } from 'react';
import {
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineHeart,
  HiOutlineUserAdd,
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineMenu,
  HiOutlineX,
} from 'react-icons/hi';
import { BsFillDropletFill } from "react-icons/bs";
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';
import auth from '../../Firebase/firebase.config';
import { signOut } from 'firebase/auth';

const Aside = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth);
  };

  const { role, user } = useContext(AuthContext);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    {
      to: '/dashboard/main',
      icon: <HiOutlineHome size={20} />,
      label: 'Dashboard Home',
      roles: ['donor', 'admin', 'volunteer']
    },
    {
      to: '/dashboard/my-profile',
      icon: <HiOutlineUser size={20} />,
      label: 'My Profile',
      roles: ['donor', 'admin', 'volunteer']
    },
    {
      to: '/dashboard/add-request',
      icon: <HiOutlineHeart size={20} />,
      label: 'Add Request',
      roles: ['donor']
    },
    {
      to: '/dashboard/available-requests',
      icon: <BsFillDropletFill size={20} />,
      label: 'Available Requests',
      roles: ['donor']
    },
    {
      to: '/dashboard/my-requests',
      icon: <HiOutlineUserAdd size={20} />,
      label: 'My Requests',
      roles: ['donor']
    },
    {
      to: '/dashboard/all-users',
      icon: <HiOutlineUserGroup size={20} />,
      label: 'All Users',
      roles: ['admin']
    },
    {
      to: '/dashboard/all-requests',
      icon: <BsFillDropletFill size={20} />,
      label: 'All Requests',
      roles: ['admin', 'volunteer']
    }
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(role));

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-colors"
      >
        {isMobileMenuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:fixed inset-y-0 left-0 z-40
        bg-gradient-to-b from-red-600 to-red-800 text-white 
        w-64 h-screen flex flex-col shadow-xl overflow-y-auto
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Header */}
        <div className="p-6 border-b border-red-500/30">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <img src='../../logo.png' className='w-8 h-8' alt="Logo" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Dashboard</h2>
              <p className="text-red-200 text-sm capitalize">{role} Panel</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-red-500/30">
          <div className="flex items-center space-x-3">
            <img 
              src={user?.photoURL || '/default-avatar.png'} 
              alt="Profile" 
              className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.displayName || 'User'}
              </p>
              <p className="text-xs text-red-200 truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {filteredMenuItems.map((item, index) => (
              <li key={index}>
                <NavLink 
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({isActive}) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive 
                        ? "bg-white text-red-600 shadow-lg" 
                        : "hover:bg-red-500/30 hover:translate-x-1"
                    }`
                  }
                >
                  <span className={`transition-transform group-hover:scale-110`}>
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Quick Stats */}
        <div className="p-4 border-t border-red-500/30">
          <div className="bg-red-500/20 rounded-xl p-4 backdrop-blur-sm">
            <h4 className="text-sm font-semibold text-red-200 mb-2">Quick Stats</h4>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div>
                <div className="text-lg font-bold text-white">12</div>
                <div className="text-xs text-red-200">Donations</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">5</div>
                <div className="text-xs text-red-200">Lives Saved</div>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-red-500/30">
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-red-800 hover:bg-red-900 rounded-xl transition-all duration-200 group"
          >
            <HiOutlineLogout size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Aside;