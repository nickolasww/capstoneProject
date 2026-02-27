import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSession, type UserRole } from '../providers/session';

interface GuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export default function Guard({
  children,
  requireAuth = false,
  allowedRoles,
  redirectTo = '/',
}: GuardProps) {
  const { user, isAuthenticated, isLoading } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;

    // If authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      navigate(redirectTo, { 
        replace: true,
        state: { from: location.pathname } 
      });
      return;
    }

    // If specific roles are required
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      // Redirect based on role
      if (user.role === 'client') {
        navigate('/', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
      return;
    }
  }, [isAuthenticated, user, isLoading, requireAuth, allowedRoles, navigate, location, redirectTo]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated, don't render children
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // If roles are specified and user doesn't have permission, don't render children
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
