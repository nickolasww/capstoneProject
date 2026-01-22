import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OAuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle OAuth callback logic here
    // For now, redirect to dashboard after 2 seconds
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-lg">Processing authentication...</p>
      </div>
    </div>
  );
}
