import { useIsMobileScreen } from "@/utils/responsive";
import { useState } from "react";
import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
import { useSession } from "@/app/_components/providers/session";

const PublicLayout = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobileScreen();
  const pathname = location.pathname;
  const { user, isAuthenticated, logout } = useSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login', { replace: true });
  };

  // Hide navbar and footer on auth pages
  const isAuthPage = pathname.startsWith('/auth');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      {!isAuthPage && (
      <nav className="bg-white sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-22">
            {/* Left side - Logo */}
            <div className="flex items-center gap-5">
              {/* Mobile Menu Button */}
              {isMobile && (
                <button
                  onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
                  className="text-gray-700 hover:text-blue-600 focus:outline-none mr-4"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}

              <Link to="/" className="flex items-center">
                <img
                  src="/vite.svg"
                  alt="BAS Website"
                  className="h-8 w-auto"
                />
              </Link>
              <h1 className="font-bold text-xl">
                PT.BUKIT AURUMN SEJAHTERA
              </h1>
            </div>

            {/* Right Side - Desktop Menu and CTA Button */}
            {!isMobile && (
              <div className="flex items-center space-x-10">
                <Link
                  to="/"
                  className={`${pathname === '/'
                    ? 'text-black'
                    : 'text-black hover:text-gray-500'
                    }`}
                >
                  Home
                </Link>
                <Link
                  to="/aboutpage"
                  className={`${pathname === '/aboutpage'
                      ? 'text-black'
                      : 'text-black hover:text-gray-500'
                    }`}
                >
                  About
                </Link>

                {/* Services Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                    className={`flex items-center space-x-1 ${pathname.startsWith('/services')
                        ? 'text-black'
                        : 'text-black hover:text-gray-500'
                      }`}
                  >
                    <span>Services</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {servicesDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        to="/servicespage/sewapage"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        Sewa Alat Berat
                      </Link>
                      <Link
                        to="/servicespage/konstruksipage"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        Konstruksi
                      </Link>
                      <Link
                        to="/servicespage/pengadaanpage"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        Pengadaan Barang Jasa
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  to="/karirpage"
                  className={`${pathname === '/karirpage'
                      ? 'text-black'
                      : 'text-black hover:text-gray-500'
                    }`}
                >
                  Karir
                </Link>
                {/* <Link
                  to="/beasiswapage"
                  className={`${pathname === '/beasiswapage'
                      ? 'text-black font-bold'
                      : 'text-black hover:text-black hover:font-bold'
                    }`}
                >
                  Beasiswa
                </Link> */}
                
                {/* User Authentication Section */}
                {isAuthenticated && user ? (
                  <div className="flex items-center gap-3">
                    {user.role === 'admin' && (
                      <Link
                        to="/dashboard"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        Dashboard
                      </Link>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {user.name} ({user.role})
                      </span>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/auth/login"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Get Started
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuVisible && isMobile && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuVisible(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${pathname === '/'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  }`}
              >
                Home
              </Link>
              <Link
                to="/aboutpage"
                onClick={() => setMobileMenuVisible(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${pathname === '/aboutpage'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  }`}
              >
                About
              </Link>

              {/* Mobile Services Dropdown */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center justify-between ${pathname.startsWith('/services')
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                    }`}
                >
                  <span>Services</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileServicesOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    <Link
                      to="/servicespage/sewapage"
                      onClick={() => setMobileMenuVisible(false)}
                      className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      Sewa Alat Berat
                    </Link>
                    <Link
                      to="/servicespage/konstruksipage"
                      onClick={() => setMobileMenuVisible(false)}
                      className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      Konstruksi
                    </Link>
                    <Link
                      to="/servicespage/pengadaanpage"
                      onClick={() => setMobileMenuVisible(false)}
                      className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      Pengadaan Barang Jasa
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/karirpage"
                onClick={() => setMobileMenuVisible(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${pathname === '/karirpage'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  }`}
              >
                Karir
              </Link>
              <Link
                to="/auth/login"
                onClick={() => setMobileMenuVisible(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${pathname === '/auth/login'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  }`}
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                onClick={() => setMobileMenuVisible(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${pathname === '/auth/register'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                  }`}
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </nav>
      )}

      {/* Main Content */}
      <main className="">
        <Outlet />
      </main>

      {/* Footer Section */}
      {!isAuthPage && (
      <footer className="bg-green-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="font-bold text-xl mb-4">PT. BUKIT AURUMN SEJAHTERA</h3>
              <p className="text-sm text-gray-200 mb-4">
                Kami adalah perusahaan yang bergerak di bidang konstruksi, pengadaan barang jasa,
                dan penyewaan alat berat dengan komitmen untuk memberikan layanan terbaik.
              </p>
              {/* Social Media Icons */}
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><Link to="/aboutpage" className="hover:text-white">About</Link></li>
                <li><Link to="/karirpage" className="hover:text-white">Karir</Link></li>
                {/* <li><Link to="/beasiswapage" className="hover:text-white">Beasiswa</Link></li> */}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-200">
                <li>Email: info@bukitaurumn.com</li>
                <li>Phone: +62 123 456 789</li>
                <li>Address: Jakarta, Indonesia</li>
                <li>Website: www.bukitaurumn.com</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm text-gray-300">
            <p>&copy; 2025 PT. Bukit Aurumn Sejahtera. All rights reserved.</p>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
};

export default PublicLayout;

