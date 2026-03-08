import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { postLogin, getMe } from '@/api/auth/api';
import { SessionToken } from '@/libs/cookies';
import type { TPermissionWithGroup } from '@/api/auth/type';
import { queryClient } from '@/libs/react-query/react-query-clients';

export type UserRole = 'super_admin' | 'admin' | 'client';

export interface Permission {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Role {
  id: string;
  name: string;
  slug: string;
  permissions: TPermissionWithGroup[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  roles?: Role[];
}

interface SessionContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

// SECURITY: Only store user_id in localStorage, not PII (email, name)
// Full user data is kept in React state only
const SESSION_KEY = 'bas_session_id';

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Prevent browser cache for authenticated pages
  useEffect(() => {
    // Force page reload when navigating back/forward after logout
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        // Page was loaded from cache
        window.location.reload();
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    
    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  // Check for existing session on mount
  useEffect(() => {
    const verifySession = async () => {
      const token = SessionToken.get()?.access_token;
      
      if (token) {
        try {
          const response = await getMe();
          // Based on previous structure, user might be in 'users' or 'data'
          const apiUser = response.users || response.data?.user || response.user || response;
          
          if (apiUser) {
            const userData: User = {
              id: apiUser.id,
              email: apiUser.email || '',
              name: apiUser.fullname || apiUser.username || '',
              role: (
                apiUser.roles?.[0]?.slug || 
                (typeof apiUser.role === 'string' ? apiUser.role : apiUser.role?.slug) || 
                'client'
              ) as UserRole,
              roles: apiUser.roles || [],
            };
            setUser(userData);
            // SECURITY: Only store user_id, not PII (email, name)
            localStorage.setItem(SESSION_KEY, userData.id);
          } else {
            throw new Error("No user data in /me response");
          }
        } catch (error) {
          console.error('Session verification failed:', error);
          // If token is invalid, clear session
          setUser(null);
          localStorage.removeItem(SESSION_KEY);
          SessionToken.remove();
        }
      }
      setIsLoading(false);
    };

    verifySession();
  }, []);

  // Token refresh is handled automatically by axios 401 interceptor
  // No need for manual scheduling - backend will return 401 when token expires
  // Axios interceptor will catch 401, call /auth/refresh-token, and retry request

  const login = async (email: string, password: string) => {
    try {
      const response = await postLogin({ email, password });

      // Handle various response structures:
      // 1. { data: { user, token } }
      // 2. { user, token, refresh_token }
      // 3. { users: { ..., token, refresh_token } }
      const authData = (response as any).data || response;
      
      // Try to find user data in 'users' (plural) or 'user' (singular)
      const apiUser = authData.users || authData.user;
      
      // Extract tokens: priority 1: inside apiUser, priority 2: at root of authData
      let accessToken = '';
      let refreshToken = '';

      if (apiUser && apiUser.token) {
        accessToken = apiUser.token;
        refreshToken = apiUser.refresh_token || '';
      } else {
        accessToken = typeof authData.token === 'object' ? authData.token.access_token : authData.token;
        refreshToken = typeof authData.token === 'object' ? authData.token.refresh_token : (authData.refresh_token || authData.token);
      }

      SessionToken.set({
        access_token: accessToken,
        refresh_token: refreshToken || ''
      });

      const profileResponse = await getMe();
      const profileUser = profileResponse.users || profileResponse.data?.user || profileResponse.user || profileResponse;
      
      const finalUserData: User = {
        id: profileUser.id || apiUser.id,
        email: profileUser.email || apiUser.email || '',
        name: profileUser.fullname || apiUser.fullname || apiUser.username || '',
        role: (
          profileUser.roles?.[0]?.slug || 
          (typeof profileUser.role === 'string' ? profileUser.role : profileUser.role?.slug) || 
          'client'
        ) as UserRole,
        roles: profileUser.roles || [],
      };

      setUser(finalUserData);
      // SECURITY: Only store user_id, not PII (email, name)
      localStorage.setItem(SESSION_KEY, finalUserData.id);

      return { success: true, user: finalUserData };
    } catch (err: any) {
      return { 
        success: false, 
        error: err?.message || 'Email atau password salah' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    // Clear user_id from localStorage
    localStorage.removeItem(SESSION_KEY);
    SessionToken.remove();
    
    // Clear React Query cache to remove all cached data
    queryClient.clear();
    
    // Clear all cookies and storage to ensure complete logout
    localStorage.clear();
    sessionStorage.clear();
  };

  // Memoize isAuthenticated to prevent unnecessary recalculations on every render
  const isAuthenticated = useMemo(() => !!user, [user]);

  return (
    <SessionContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}

/**
 * Component to handle automatic logout from axios interceptor
 * Must be placed inside Router context to use useNavigate
 */
export function SessionAuthListener() {
  const navigate = useNavigate();
  const { logout } = useSession();

  useEffect(() => {
    const handleAuthLogout = (event: Event) => {
      const customEvent = event as CustomEvent<{ message?: string }>;
      
      // Call logout to clear state
      logout();
      
      // Show notification
      notification.warning({
        title: 'Sesi Berakhir',
        description: customEvent.detail?.message || 'Sesi Anda telah berakhir. Silakan login kembali.',
        placement: 'topRight',
        duration: 4,
      });
      
      // Navigate to homepage after a short delay
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 500);
    };

    window.addEventListener('auth:logout', handleAuthLogout);
    
    return () => {
      window.removeEventListener('auth:logout', handleAuthLogout);
    };
  }, [navigate, logout]);

  return null;
}
