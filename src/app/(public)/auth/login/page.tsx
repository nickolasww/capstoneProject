import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-24">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/auth/register" className="text-blue-600 hover:underline">
              Don't have an account? Register
            </Link>
          </div>
          <div className="mt-2 text-center">
            <Link to="/" className="text-gray-600 hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
