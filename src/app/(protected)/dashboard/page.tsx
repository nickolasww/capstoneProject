import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '@/app/_components/providers/session';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { logout } = useSession();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">1,234</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Active Sessions</h3>
            <p className="text-3xl font-bold text-green-600">567</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-purple-600">$12,345</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              to="/examples" 
              className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center"
            >
              View Examples
            </Link>
            <Link 
              to="/examples/create" 
              className="px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-center"
            >
              Create New
            </Link>
            <button 
              onClick={handleLogout}
              className="px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-center"
            >
              Logout
            </button>
            <Link 
              to="/" 
              className="px-6 py-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
