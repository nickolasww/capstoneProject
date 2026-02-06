import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imgLogo from '@/assets/LoginPage/logo PT BAS.png';


export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    Fullname: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#56a439] to-[#213e16] flex items-center justify-center px-4 py-8">
      {/* Main Card Container */}
      <div className="bg-white rounded-2xl w-full max-w-md px-8 py-10 shadow-2xl">
        <div className="flex flex-col items-center gap-6 w-full">
          {/* Logo Section */}
          <div className="flex flex-col items-center gap-3 mb-2">
            <div className="h-8.25 w-14 relative overflow-hidden shrink-0">
              <img
                src={imgLogo}
                alt="PT Bukit Aurumn Sejahtera Logo"
                className="absolute h-[170.38%] left-0 top-[-20.47%] w-full object-cover"
              />
            </div>
            <h1 className="font-['Poppins'] font-bold text-sm text-center text-black leading-[1.4]">
              PT. BUKIT AURUMN SEJAHTERA
            </h1>
          </div>

          {/* Register Header */}
          <div className="flex flex-col items-center gap-2 w-full">
            <h2 className="font-['Poppins'] text-2xl font-semibold text-black leading-[1.4] text-center">
              Sign Up
            </h2>
            <p className="font-['Poppins'] text-sm text-gray-600 leading-[1.4] text-center">
              Already have an account?{' '}
              <Link
                to="/auth/login"
                className="text-[#4d9232] hover:underline focus:outline-none font-medium"
              >
                Log In
              </Link>
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="font-['Poppins'] text-sm font-medium text-black leading-[1.4]"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full h-12 bg-white border border-gray-300 rounded-lg px-4 font-['Poppins'] text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-[#4d9232] focus:ring-2 focus:ring-[#4d9232]/20 transition-all"
                placeholder="Enter your username"
              />
            </div>
            
            {/* Name Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="font-['Poppins'] text-sm font-medium text-black leading-[1.4]"
              >
                Full Name
              </label>
              <input
                type="text"
                id="Fullname"
                name="Fullname"
                value={formData.Fullname}
                onChange={handleInputChange}
                required
                className="w-full h-12 bg-white border border-gray-300 rounded-lg px-4 font-['Poppins'] text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-[#4d9232] focus:ring-2 focus:ring-[#4d9232]/20 transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-['Poppins'] text-sm font-medium text-black leading-[1.4]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full h-12 bg-white border border-gray-300 rounded-lg px-4 font-['Poppins'] text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-[#4d9232] focus:ring-2 focus:ring-[#4d9232]/20 transition-all"
                placeholder="Enter your email address"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="font-['Poppins'] text-sm font-medium text-black leading-[1.4]"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={8}
                className="w-full h-12 bg-white border border-gray-300 rounded-lg px-4 font-['Poppins'] text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-[#4d9232] focus:ring-2 focus:ring-[#4d9232]/20 transition-all"
                placeholder="Create a password (min. 8 characters)"
              />
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              className="w-full h-12 bg-[#4d9232] rounded-lg font-['Poppins'] text-base font-medium text-white leading-[1.4] hover:bg-[#3d7527] focus:outline-none focus:ring-2 focus:ring-[#4d9232] focus:ring-offset-2 transition-all active:scale-[0.98] shadow-md"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
