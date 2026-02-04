import { Outlet } from 'react-router-dom';
import Guard from '@/app/_components/guard';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/app/_components/providers/session';

export default function ProtectedLayout() {
  return (
    <Guard requireAuth={true} allowedRoles={['admin']}>
      <div className="min-h-screen bg-gray-50">
        {/* Header/Navbar for protected area */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
              </div>
              <LogoutButton />
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
      </div>
    </Guard>
  );
}

function LogoutButton() {
  const { logout, user } = useSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login', { replace: true });
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600">
        {user?.name} ({user?.role})
      </span>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
