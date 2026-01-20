import { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { signOut } from 'firebase/auth';
import auth from '../Firebase/firebase.config';
import { Menu, X, Sun, Moon, LogOut, ChevronDown, Heart, Users, Info } from 'lucide-react';

const Navbar = () => {
  const {user} = useContext(AuthContext)
  const [isChecked, setIsChecked] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="container-base">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img src='../logo.png' className='h-10 w-10 group-hover:scale-110 transition-transform' alt="Hemio Logo" />
            <span className="text-2xl font-bold text-red-600">Hemio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({isActive}) => 
                `font-medium transition-colors ${isActive ? 'text-red-600' : 'text-gray-700 hover:text-red-600'}`
              }
            >
              Home
            </NavLink>

            {/* About Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 font-medium text-gray-700 hover:text-red-600 transition-colors"
              >
                <span>About</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link 
                    to="/about" 
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Info className="w-4 h-4" />
                    <span>About Us</span>
                  </Link>
                  <Link 
                    to="/how-it-works" 
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Heart className="w-4 h-4" />
                    <span>How It Works</span>
                  </Link>
                  <Link 
                    to="/blood-types" 
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Users className="w-4 h-4" />
                    <span>Blood Types</span>
                  </Link>
                </div>
              )}
            </div>

            <NavLink 
              to="/public-requests" 
              className={({isActive}) => 
                `font-medium transition-colors ${isActive ? 'text-red-600' : 'text-gray-700 hover:text-red-600'}`
              }
            >
              Donation Requests
            </NavLink>

            <NavLink 
              to="/search-requests" 
              className={({isActive}) => 
                `font-medium transition-colors ${isActive ? 'text-red-600' : 'text-gray-700 hover:text-red-600'}`
              }
            >
              Search
            </NavLink>

            <button 
              onClick={() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
              }}
              className="font-medium transition-colors text-gray-700 hover:text-red-600"
            >
              Contact
            </button>
            
            {user && (
              <NavLink 
                to="/dashboard/main" 
                className={({isActive}) => 
                  `font-medium transition-colors ${isActive ? 'text-red-600' : 'text-gray-700 hover:text-red-600'}`
                }
              >
                Dashboard
              </NavLink>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={handleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle theme"
            >
              {isChecked ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-gray-600" />}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <img 
                    src={user.photoURL || '/default-avatar.png'} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-secondary max-w-24 truncate">
                    {user.displayName || 'User'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-muted transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-section rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <Link 
                      to="/dashboard/my-profile" 
                      className="flex items-center space-x-2 px-4 py-2 text-secondary hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <span>My Profile</span>
                    </Link>
                    <Link 
                      to="/dashboard/my-requests" 
                      className="flex items-center space-x-2 px-4 py-2 text-secondary hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <span>My Requests</span>
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={() => {
                        handleSignOut()
                        setIsProfileDropdownOpen(false)
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="btn-outline px-4 py-2 text-sm">
                  Login
                </Link>
                <Link to="/register" className="btn-primary px-4 py-2 text-sm">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-section">
            <div className="px-6 py-4 space-y-4">
              <NavLink 
                to="/" 
                className={({isActive}) => 
                  `block font-medium transition-colors ${isActive ? 'text-red-600' : 'text-secondary'}`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>

              <button
                onClick={() => {
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
                className="block font-medium transition-colors text-gray-700 hover:text-red-600 text-left w-full"
              >
                Contact
              </button>
              
              {user && (
                <>
                  <NavLink 
                    to="/public-requests" 
                    className={({isActive}) => 
                      `block font-medium transition-colors ${isActive ? 'text-red-600' : 'text-secondary'}`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Donation Requests
                  </NavLink>
                  <NavLink 
                    to="/search-requests" 
                    className={({isActive}) => 
                      `block font-medium transition-colors ${isActive ? 'text-red-600' : 'text-secondary'}`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Search
                  </NavLink>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                      setIsMobileMenuOpen(false);
                    }}
                    className="block font-medium transition-colors text-gray-700 hover:text-red-600 text-left w-full"
                  >
                    Contact
                  </button>
                  <NavLink 
                    to="/dashboard/main" 
                    className={({isActive}) => 
                      `block font-medium transition-colors ${isActive ? 'text-red-600' : 'text-secondary'}`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                </>
              )}

              {/* Mobile Theme Toggle */}
              <button
                onClick={handleTheme}
                className="flex items-center space-x-2 w-full text-left text-secondary hover:text-red-600"
              >
                {isChecked ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                <span>Toggle Theme</span>
              </button>

              {/* Mobile Auth Actions */}
              {user ? (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <img 
                      src={user.photoURL || '/default-avatar.png'} 
                      alt="Profile" 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-primary">{user.displayName || 'User'}</p>
                      <p className="text-sm text-secondary">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  <Link 
                    to="/login" 
                    className="block btn-outline text-center py-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block btn-primary text-center py-3"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;