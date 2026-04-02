import { Link, NavLink, useNavigate } from 'react-router';
import { FaUser, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { FiSun, FiMoon } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/authSlice';
import { useEffect, useState } from 'react';
import { setSearchQuery } from '../Redux/searchSlice';
import { toggleTheme } from '../Redux/ThemeSlice';
import Swal from 'sweetalert2';
import { clearCart } from '../Redux/cartSlice';
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const searchQuery = useSelector((state) => state.search.query);
  const cartCount = useSelector((state) => state.cart.products).length;
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.theme);
  const themeState = theme?.state || 'light'; // Safe access with fallback
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = user !== null && user !== undefined && user.email;

  const getUserDisplayName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return '';
  };

  const handleLogout = async () => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure you want to logout?',
      text: 'You will need to sign in again to access your account.',
      icon: 'question',
      iconColor: '#f59e0b',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      background: themeState === 'dark' ? '#1e293b' : '#ffffff',
      color: themeState === 'dark' ? '#f1f5f9' : '#1e293b',
      customClass: {
        popup: 'rounded-xl',
        confirmButton: 'px-5 py-2 rounded-lg font-medium',
        cancelButton: 'px-5 py-2 rounded-lg font-medium',
      }
    });

    if (result.isConfirmed) {
      // 2. نمسح السلة من Redux
      dispatch(clearCart());  // ← دي الجديدة
      
      // 3. نعمل logout
      dispatch(logout());
      

        
      
      // Optional: Show success message
      Swal.fire({
        title: 'Logged Out!',
        text: 'You have been successfully logged out.',
        icon: 'success',
        confirmButtonColor: '#3b82f6',
        timer: 2000,
        showConfirmButton: false,
        background: themeState === 'dark' ? '#1e293b' : '#ffffff',
        color: themeState === 'dark' ? '#f1f5f9' : '#1e293b',
      });
    }
  };

  // Apply theme class to html element
  useEffect(() => {
    if (themeState === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeState]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-lg dark:bg-slate-900/80' 
          : 'bg-white/95 shadow-sm dark:bg-slate-900/95'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
                <span className="text-white font-black text-lg md:text-xl">★</span>
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tight">
                <span className="text-gray-900 dark:text-white">NOVA</span>
                <span className="bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">.</span>
              </span>
            </NavLink>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-200 relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/shop" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-200 relative group">
                Shop
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <a href="#collection" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-200 relative group">
                Collections
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-200 relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
  
            {/* Right Icons & Search */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Cart Button */}
              <NavLink to="/cart" className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {cartCount}
                  </div>
                )}
              </NavLink>
              
              {/* Theme Toggle Button */}
              <button  
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 relative"
                onClick={() => dispatch(toggleTheme())}
              >
                {themeState === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>

              {/* Search Section - Desktop */}
              <div className="hidden md:flex relative items-center">
                <button 
                  onClick={() => setSearchOpen(!searchOpen)}
                  className={`p-2 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 relative z-10 ${
                    searchOpen ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  searchOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
                }`}>
                  <form className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                      placeholder="Search products..."
                      className="w-full px-4 py-2 pl-4 pr-10 text-sm bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 dark:text-white"
                      autoFocus={searchOpen}
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => dispatch(setSearchQuery(''))}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </form>
                </div>
              </div>
              
              {/* Search Section - Mobile */}
              <div className="flex md:hidden relative items-center">
                <button 
                  onClick={() => setSearchOpen(!searchOpen)}
                  className={`p-2 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 relative z-10 ${
                    searchOpen ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                
                <div className={`absolute top-full right-0 mt-2 transition-all duration-300 ease-in-out ${
                  searchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                  <form className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                      placeholder="Search products..."
                      className="w-64 px-4 py-2 pl-4 pr-10 text-sm bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg shadow-lg focus:outline-none focus:border-blue-500 dark:text-white"
                      autoFocus={searchOpen}
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => dispatch(setSearchQuery(''))}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </form>
                </div>
              </div>
              
              {/* User Section */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                      <FaUser className="w-4 h-4" />
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200">
                      {getUserDisplayName()}
                    </span>
                    <svg className={`hidden sm:block w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {userMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)}></div>
                      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden z-50">
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {getUserDisplayName()}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                            {user?.email}
                          </p>
                        </div>
                        <div className="py-2">
                          <NavLink
                            to="/profile"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <FaUserCircle className="w-4 h-4" />
                            My Profile
                          </NavLink>
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                          >
                            <FaSignOutAlt className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <NavLink 
                  to="/signup" 
                  className="hidden sm:block px-4 md:px-6 py-2 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-full font-semibold text-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Sign Up
                </NavLink>
              )}
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100 dark:border-slate-700 animate-slide-down">
              <div className="flex flex-col space-y-3">
                <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
                <a href="#shop" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition" onClick={() => setMobileMenuOpen(false)}>
                  Shop
                </a>
                <a href="#collection" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition" onClick={() => setMobileMenuOpen(false)}>
                  Collections
                </a>
                <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition" onClick={() => setMobileMenuOpen(false)}>
                  About
                </Link>
                {!isAuthenticated ? (
                  <div className="pt-2">
                    <NavLink 
                      to="/signup" 
                      className="block w-full px-4 py-2.5 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </NavLink>
                    <NavLink 
                      to="/login" 
                      className="block w-full px-4 py-2.5 mt-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-center hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </NavLink>
                  </div>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                  >
                    Sign Out
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;