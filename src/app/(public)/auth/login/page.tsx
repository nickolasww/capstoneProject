import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Spin, ConfigProvider } from "antd";
import imgLogo from "@/assets/logo PT BAS.png";
import { createZodSync } from "@/utils/zod-sync";
import { LoginFormSchema, TLoginFormData } from "./schema";
import { usePostLogin } from "./_hooks/use-post-login";

const rule = createZodSync(LoginFormSchema);

export default function Login() {
  const navigate = useNavigate();
  const { mutate: loginMutate, isPending, error } = usePostLogin();

  const onFinish = (values: TLoginFormData) => {
    loginMutate(values);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#4d9232",
        },
        components: {
          Input: {
            colorBorder: "#d9d9d9",
            activeBorderColor: "#4d9232",
            hoverBorderColor: "#4d9232",
            activeShadow: "0 0 0 2px rgba(77, 146, 50, 0.1)",
          },
        },
      }}
    >
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
            <Form
              layout="vertical"
              onFinish={onFinish}
              className="w-full flex flex-col gap-0"
              requiredMark={false}
            >
              {/* Error Message */}
              {error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  <p className="font-['Poppins'] text-sm">
                    {String((error as any)?.message || "Terjadi kesalahan saat login")}
                  </p>
                </div>
              ) : null}

              {/* Email Field */}
              <Form.Item
                label={
                  <span className="font-['Poppins'] text-sm font-medium text-black">
                    Email
                  </span>
                }
                name="email"
                rules={[rule]}
              >
                <Input
                  placeholder="Enter your email"
                  className="w-full h-12 bg-white border border-gray-300 rounded-lg px-4 font-['Poppins'] text-sm text-black placeholder:text-gray-400 transition-all shadow-none"
                />
              </Form.Item>

              {/* Password Field */}
              <Form.Item
                label={
                  <span className="font-['Poppins'] text-sm font-medium text-black">
                    Password
                  </span>
                }
                name="password"
                rules={[rule]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  className="w-full h-12 bg-white border border-gray-300 rounded-lg px-4 font-['Poppins'] text-sm text-black placeholder:text-gray-400 transition-all shadow-none"
                />
              </Form.Item>

              {/* Forgot Password Link */}
              <div className="flex justify-end mb-6">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="font-['Poppins'] text-xs text-[#4d9232] leading-[1.4] hover:underline focus:outline-none"
                >
                  Forgot your password?
                </button>
              </div>

              {/* Login Button */}
              <Form.Item>
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 bg-[#4d9232] rounded-lg font-['Poppins'] text-base font-medium text-white leading-[1.4] hover:bg-[#3d7527] focus:outline-none focus:ring-2 focus:ring-[#4d9232] focus:ring-offset-2 transition-all active:scale-[0.98] shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? <Spin /> : "Log In"}
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
