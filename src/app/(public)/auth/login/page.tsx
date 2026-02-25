import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import imgLogo from "@/assets/logo PT BAS.png";
import { useSession } from "@/app/_components/providers/session";
import { notification } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useSession();
  const [api, contextHolder] = notification.useNotification();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        api.success({
          message: "Login Berhasil",
          description: "Selamat datang kembali!",
          placement: "topRight",
        });

        const user = result.user;

        setTimeout(() => {
          if (user?.role === "admin" || user?.role === "super_admin") {
            navigate("/dashboard", { replace: true });
          } else {
            const from = (location.state as any)?.from || "/";
            navigate(from, { replace: true });
          }
        }, 1000);
      } else {
        const errorMsg = result.error || "Login gagal";
        setError(errorMsg);
        api.error({
          message: "Login Gagal",
          description: errorMsg,
          placement: "topRight",
        });
      }
    } catch (err) {
      const errorMsg = "Terjadi kesalahan saat login";
      setError(errorMsg);
      api.error({
        message: "Error",
        description: errorMsg,
        placement: "topRight",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#56a439] to-[#213e16] flex items-center justify-center px-4 py-8">
      {contextHolder}
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
              Don't have an account?{" "}
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

            {/* Username/Email Field */}
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
                placeholder="Enter your email"
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full h-12 bg-white border border-gray-300 rounded-lg px-4 pr-12 font-['Poppins'] text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-[#4d9232] focus:ring-2 focus:ring-[#4d9232]/20 transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeInvisibleOutlined className="text-xl" />
                  ) : (
                    <EyeOutlined className="text-xl" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
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
              {isLoading ? "Loading..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
