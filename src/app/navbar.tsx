import { useIsMobileScreen } from "@/utils/responsive";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSession } from "@/app/_components/providers/session";
import LogoBas from "@/assets/logo PT BAS.png";

interface NavbarProps {
  hasBackground: boolean;
}

const Navbar = ({ hasBackground: propHasBackground }: NavbarProps) => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobileScreen();
  const pathname = location.pathname;
  const hasBackground = propHasBackground || pathname.startsWith('/karirpage/Joblist/');
  const isDarkText = hasBackground || pathname === '/karirpage' || pathname.startsWith('/servicespage');
  const { user, isAuthenticated, logout } = useSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        hasBackground ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-22">
          {/* Left side - Logo */}
          <div className="flex items-center gap-5">
            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
                className={`focus:outline-none mr-4 transition-colors ${
                  isDarkText
                    ? 'text-gray-700 hover:text-blue-600' 
                    : 'text-white hover:text-gray-200'
                }`}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}

            <Link to="/" className="flex items-center">
              <img
                src={LogoBas}
                alt="BAS Website"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <h1 className={`font-bold text-xl transition-colors ${
              isDarkText ? 'text-gray-900' : 'text-white drop-shadow-lg'
            }`}>
              PT.BUKIT AURUMN SEJAHTERA
            </h1>
          </div>

          {/* Right Side - Desktop Menu and CTA Button */}
          {!isMobile && (
            <div className="flex items-center space-x-10">
              <Link
                to="/"
                className={`transition-colors ${
                  pathname === '/'
                    ? isDarkText ? 'text-black font-semibold' : 'text-white font-semibold'
                    : isDarkText ? 'text-black hover:text-gray-500' : 'text-white hover:text-gray-200 drop-shadow-md'
                }`}
              >
                Home
              </Link>
              <Link
                to="/aboutpage"
                className={`transition-colors ${
                  pathname === '/aboutpage'
                    ? isDarkText ? 'text-black font-semibold' : 'text-white font-semibold'
                    : isDarkText ? 'text-black hover:text-gray-500' : 'text-white hover:text-gray-200 drop-shadow-md'
                }`}
              >
                About
              </Link>

              {/* Services Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className={`flex items-center space-x-1 transition-colors ${
                    pathname.startsWith('/services')
                      ? isDarkText ? 'text-black font-semibold' : 'text-white font-semibold'
                      : isDarkText ? 'text-black hover:text-gray-500' : 'text-white hover:text-gray-200 drop-shadow-md'
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
                className={`transition-colors ${
                  pathname === '/karirpage'
                    ? isDarkText ? 'text-black font-semibold' : 'text-white font-semibold'
                    : isDarkText ? 'text-black hover:text-gray-500' : 'text-white hover:text-gray-200 drop-shadow-md'
                }`}
              >
                Karir
              </Link>
              
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
        <div className={`md:hidden ${hasBackground ? 'bg-white' : 'bg-black/90'}`}>
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
  );
};

export default Navbar;
