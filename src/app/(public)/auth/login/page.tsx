import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import imgLogo from '@/assets/logo PT BAS.png';
import { useSession } from '@/app/_components/providers/session';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useSession();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        // Redirect to the page they tried to visit or dashboard
        const from = (location.state as any)?.from || '/dashboard';
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Login gagal');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat login');
    } finally {
      setIsLoading(false);
    }
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
                className="w-full object-cover"
              />
            </div>
            <h1 className="font-['Poppins'] font-bold text-sm text-center text-black leading-[1.4]">
              PT. BUKIT AURUMN SEJAHTERA
            </h1>
          </div>

          {/* Login Header */}
          <div className="flex flex-col items-center gap-2 w-full">
            <h2 className="font-['Poppins'] text-2xl font-semibold text-black leading-[1.4] text-center">
              Log In
            </h2>
            <p className="font-['Poppins'] text-sm text-gray-600 leading-[1.4] text-center">
              Don't have an account?{' '}
              <Link
                to="/auth/register"
                className="text-[#4d9232] hover:underline focus:outline-none font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="font-['Poppins'] text-sm">{error}</p>
              </div>
            )}

            {/* Info Box for Demo Credentials */}
            <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg">
              <p className="font-['Poppins'] text-sm font-semibold mb-2">Demo Credentials:</p>
              <p className="font-['Poppins'] text-xs">
                <strong>Admin:</strong> admin@bas.com / admin123
              </p>
              <p className="font-['Poppins'] text-xs">
                <strong>Client:</strong> client@bas.com / client123
              </p>
            </div>

            {/* Username/Email Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-['Poppins'] text-sm font-medium text-black leading-[1.4]"
              >
                Username/Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full h-12 bg-white border border-gray-300 rounded-lg px-4 font-['Poppins'] text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-[#4d9232] focus:ring-2 focus:ring-[#4d9232]/20 transition-all"
                placeholder="Enter your username or email"
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
                className="w-full h-12 bg-white border border-gray-300 rounded-lg px-4 font-['Poppins'] text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-[#4d9232] focus:ring-2 focus:ring-[#4d9232]/20 transition-all"
                placeholder="Enter your password"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="font-['Poppins'] text-xs text-[#4d9232] leading-[1.4] hover:underline focus:outline-none"
              >
                Forgot your password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#4d9232] rounded-lg font-['Poppins'] text-base font-medium text-white leading-[1.4] hover:bg-[#3d7527] focus:outline-none focus:ring-2 focus:ring-[#4d9232] focus:ring-offset-2 transition-all active:scale-[0.98] shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

