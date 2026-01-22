import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Welcome to BAS Website</h1>
        <p className="mb-8 text-gray-600">Your application is now running!</p>
        <div className="flex gap-4 justify-center">
          <Link 
            to="/auth/login" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link 
            to="/auth/register" 
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Register
          </Link>
          <Link 
            to="/dashboard" 
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
