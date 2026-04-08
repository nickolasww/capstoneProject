import { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSession } from "@/app/_components/providers/session";
import LogoBas from "@/assets/logo PT BAS.png";
import { UserOutlined } from "@ant-design/icons";


interface NavbarProps {
  hasBackground: boolean;
}

const Navbar = ({ hasBackground: propHasBackground }: NavbarProps) => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const hasBackground =
    propHasBackground || pathname.startsWith("/karirpage/Joblist/");
  const isDarkText =
    hasBackground ||
    pathname === "/karirpage" ||
    pathname.startsWith("/servicespage/pengadaanpage") ||
    pathname.startsWith("/servicespage/sewapage") ||
    pathname.startsWith("/aboutpage/visimisi");
  const { user, isAuthenticated, logout } = useSession();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        hasBackground
          ? "bg-white shadow-md"
          : "bg-white shadow-md lg:bg-transparent"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-22">
          {/* Left side - Logo */}
          <div className="flex items-center gap-5">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
              className="lg:hidden focus:outline-none text-black"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <Link to="/" className="flex items-center">
              <img
                src={LogoBas}
                alt="BAS Website"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <h1
              className={`font-bold text-xl transition-colors ${
                isDarkText
                  ? "text-black"
                  : "text-gray-900 lg:text-white lg:drop-shadow-lg"
              }`}
            >
              PT.BUKIT AURUMN SEJAHTERA
            </h1>
          </div>

          {/* Right Side - Desktop Menu and CTA Button */}
          <div className="hidden lg:flex items-center space-x-10">
            <Link
              to="/"
              className={`transition-colors ${
                pathname === "/"
                  ? isDarkText
                    ? "text-black font-semibold"
                    : "text-white font-semibold"
                  : isDarkText
                    ? "text-black hover:text-gray-500"
                    : "text-white hover:text-gray-200 drop-shadow-md"
              }`}
            >
              Home
            </Link>
            <Link
              to="/aboutpage"
              className={`transition-colors ${
                pathname === "/aboutpage"
                  ? isDarkText
                    ? "text-black font-semibold"
                    : "text-white font-semibold"
                  : isDarkText
                    ? "text-black hover:text-gray-500"
                    : "text-white hover:text-gray-200 drop-shadow-md"
              }`}
            >
              About
            </Link>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`flex items-center space-x-1 transition-colors ${
                  pathname.startsWith("/services")
                    ? isDarkText
                      ? "text-black font-semibold"
                      : "text-white font-semibold"
                    : isDarkText
                      ? "text-black hover:text-gray-500"
                      : "text-white hover:text-gray-200 drop-shadow-md"
                }`}
              >
                <span>Services</span>
                <svg
                  className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    to="/servicespage/sewapage"
                    onClick={() => setServicesDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    Sewa Alat Berat
                  </Link>
                  <Link
                    to="/servicespage/konstruksipage"
                    onClick={() => setServicesDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    Konstruksi
                  </Link>
                  <Link
                    to="/servicespage/pengadaanpage"
                    onClick={() => setServicesDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    Pengadaan Barang Jasa
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/karirpage"
              className={`transition-colors ${
                pathname === "/karirpage"
                  ? isDarkText
                    ? "text-black font-semibold"
                    : "text-white font-semibold"
                  : isDarkText
                    ? "text-black hover:text-gray-500"
                    : "text-white hover:text-gray-200 drop-shadow-md"
              }`}
            >
              Karir
            </Link>

            {/* User Authentication Section */}
            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center px-3 py-2 bg-green-600 rounded-lg transition-colors"
                >
                  {/* Avatar circle dengan inisial */}
                  <div className="text-white">
                    <UserOutlined /> {user.name}
                  </div>
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">

                    {/* Menu items */}
                    <div className="py-1">
                      {/* <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      > */}
                        {/* Icon profile */}
                        {/* <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <circle
                            cx="8"
                            cy="5"
                            r="3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M2 13c0-3 2-5 6-5s6 2 6 5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        Profile
                      </Link> */}

                      {user.role === "admin" && (
                        <Link
                          to="/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <rect
                              x="2"
                              y="2"
                              width="5"
                              height="5"
                              rx="1"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                            <rect
                              x="9"
                              y="2"
                              width="5"
                              height="5"
                              rx="1"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                            <rect
                              x="2"
                              y="9"
                              width="5"
                              height="5"
                              rx="1"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                            <rect
                              x="9"
                              y="9"
                              width="5"
                              height="5"
                              rx="1"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                          </svg>
                          Dashboard
                        </Link>
                      )}
                    </div>

                    {/* Logout */}
                    <div className=" border-gray-100 py-1">
                      <button
                        onClick={() => {
                          handleLogout();
                          setDropdownOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M10 11l3-3-3-3M13 8H6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuVisible && (
        <div className="lg:hidden bg-white shadow-md">
          <div className="px-4 pt-4 pb-4 space-y-2">
            {/* Home */}
            <Link
              to="/"
              onClick={() => setMobileMenuVisible(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                pathname === "/"
                  ? "text-green-600 font-semibold"
                  : "text-gray-900 hover:text-green-600"
              }`}
            >
              Home
            </Link>

            {/* About */}
            <Link
              to="/aboutpage"
              onClick={() => setMobileMenuVisible(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                pathname === "/aboutpage"
                  ? "text-green-600 font-semibold"
                  : "text-gray-900 hover:text-green-600"
              }`}
            >
              About
            </Link>

            {/* Services */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className={`w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center justify-between transition-colors ${
                  pathname.startsWith("/services")
                    ? "text-green-600 font-semibold"
                    : "text-gray-900 hover:text-green-600"
                }`}
              >
                <span>Services</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    mobileServicesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {mobileServicesOpen && (
                <div className="ml-3 mt-2 space-y-1 rounded-lg p-2">
                  <Link
                    to="/servicespage/sewapage"
                    onClick={() => setMobileMenuVisible(false)}
                    className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    Sewa Alat Berat
                  </Link>
                  <Link
                    to="/servicespage/konstruksipage"
                    onClick={() => setMobileMenuVisible(false)}
                    className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    Konstruksi
                  </Link>
                  <Link
                    to="/servicespage/pengadaanpage"
                    onClick={() => setMobileMenuVisible(false)}
                    className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    Pengadaan Barang Jasa
                  </Link>
                </div>
              )}
            </div>

            {/* Karir */}
            <Link
              to="/karirpage"
              onClick={() => setMobileMenuVisible(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                pathname === "/karirpage"
                  ? "text-green-600 font-semibold"
                  : "text-gray-900 hover:text-green-600"
              }`}
            >
              Karir
            </Link>

            {/* Auth Section */}
            <div className="pt-4 border-t border-gray-200">
              {isAuthenticated && user ? (
                <div className="space-y-3">
                  {user.role === "admin" && (
                    <Link
                      to="/dashboard"
                      className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Dashboard
                    </Link>
                  )}

                  <div className="text-sm text-gray-600">
                    {user.name} ({user.role})
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth/login"
                  className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
