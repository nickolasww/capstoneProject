import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { postLogin, getMe } from '@/api/auth/api';
import { SessionToken } from '@/libs/cookies';
import type { TPermissionWithGroup } from '@/api/auth/type';
import { queryClient } from '@/libs/react-query/react-query-clients';
import { useQuery } from '@/app/_hooks/request/use-query';

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
  refetchUser: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Query keys for session management
export const SESSION_QUERY_KEYS = {
  USER: ['session', 'user'] as const,
};

// SECURITY: Only store user_id in localStorage, not PII (email, name)
// Full user data is kept in React Query cache only
const SESSION_KEY = 'bas_session_id';

// ============================================================================
// HELPER FUNCTIONS - Extract & Transform Logic
// ============================================================================

/**
 * Extract tokens from API response
 * Works with normalized response from axios interceptor
 * Handles: { data: { user, token } }, { user, token }, nested token objects
 */
const extractTokensFromResponse = (response: any) => {
  // Response is already normalized by axios interceptor
  // Check data field first (normalized location), then fallback to root
  const source = response.data || response;
  const apiUser = source.user || source.users;
  
  let tokenSource = null;
  
  // Priority 1: Token inside user object
  if (apiUser?.token) {
    tokenSource = apiUser;
  }
  // Priority 2: Token at data level  
  else if (source.token) {
    tokenSource = source;
  }
  
  if (!tokenSource) {
    throw new Error('No token found in response');
  }
  
  // Handle both string and object token formats
  if (typeof tokenSource.token === 'string') {
    return {
      access_token: tokenSource.token,
      refresh_token: tokenSource.refresh_token || '',
      access_token_expires_in: tokenSource.access_token_expires_in || '',
      refresh_token_expires_in: tokenSource.refresh_token_expires_in || '',
    };
  }
  
  // Token is an object
  return {
    access_token: tokenSource.token.access_token,
    refresh_token: tokenSource.token.refresh_token,
    access_token_expires_in: tokenSource.token.access_token_expires_in || '',
    refresh_token_expires_in: tokenSource.token.refresh_token_expires_in || '',
  };
};

/**
 * Extract user data from API response
 * Works with normalized response from axios interceptor
 */
const extractUserFromResponse = (response: any) => {
  // Response is already normalized by axios interceptor
  // Try normalized data field first, then fallback to root level fields
  const source = response.data || response;
  return source.user || source.users || source;
};

/**
 * Transform API user response to User object
 */
const transformApiUserToUser = (apiUser: any): User | null => {
  if (!apiUser) return null;
  
  return {
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
};

/**
 * Check if user data is complete (has all required fields)
 */
const isUserDataComplete = (user: User | null): boolean => {
  return !!(user?.id && user?.email && user?.name && user?.roles);
};

// Custom hook for fetching user session using React Query
function useUserSessionQuery() {
  return useQuery<User | null>({
    queryKey: SESSION_QUERY_KEYS.USER,
    queryFn: async () => {
      const token = SessionToken.get()?.access_token;
      
      if (!token) {
        return null;
      }
      
      try {
        const response = await getMe();
        // Based on previous structure, user might be in 'users' or 'data'
        const apiUser = extractUserFromResponse(response);
        
        const userData = transformApiUserToUser(apiUser);
        
        if (userData) {
          // SECURITY: Only store user_id, not PII (email, name)
          localStorage.setItem(SESSION_KEY, userData.id);
        }
        
        return userData;
      } catch (error) {
        console.error('Session verification failed:', error);
        // If token is invalid, clear session
        localStorage.removeItem(SESSION_KEY);
        SessionToken.remove();
        return null;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading, refetch } = useUserSessionQuery();

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

  // Token refresh is handled automatically by axios 401 interceptor
  // No need for manual scheduling - backend will return 401 when token expires
  // Axios interceptor will catch 401, call /auth/refresh-token, and retry request

  const login = async (email: string, password: string) => {
    try {
      // Step 1: Login and get response
      const loginResponse = await postLogin({ email, password });

      // Step 2: Extract and store tokens
      const tokens = extractTokensFromResponse(loginResponse);
      SessionToken.set(tokens);

      // Step 3: Extract user data from login response
      const loginUserData = extractUserFromResponse(loginResponse);
      let userData = transformApiUserToUser(loginUserData);

      // Step 4: If user data incomplete, fetch from /me endpoint
      // This optimizes by only calling getMe() when necessary
      if (!isUserDataComplete(userData)) {
        console.log('User data incomplete from login, fetching from /me endpoint');
        const profileResponse = await getMe();
        const profileUserData = extractUserFromResponse(profileResponse);
        userData = transformApiUserToUser({
          ...profileUserData,
          id: profileUserData.id || loginUserData.id,
          email: profileUserData.email || loginUserData.email,
          fullname: profileUserData.fullname || loginUserData.fullname || loginUserData.username,
        });
      }

      // Step 5: Validate and store user data
      if (!userData) {
        throw new Error('No user data available');
      }

      // SECURITY: Only store user_id, not PII (email, name)
      localStorage.setItem(SESSION_KEY, userData.id);
      
      // Update React Query cache with user data
      queryClient.setQueryData(SESSION_QUERY_KEYS.USER, userData);
      
      return { success: true, user: userData };
    } catch (err: any) {
      // Clear any partial data on error
      SessionToken.remove();
      localStorage.removeItem(SESSION_KEY);
      
      return { 
        success: false, 
        error: err?.response?.data?.message || err?.message || 'Email atau password salah' 
      };
    }
  };

  const logout = () => {
    // Clear user_id from localStorage
    localStorage.removeItem(SESSION_KEY);
    SessionToken.remove();
    
    // Explicitly set user to null to trigger immediate re-render
    queryClient.setQueryData(SESSION_QUERY_KEYS.USER, null);
    
    // Clear React Query cache to remove all cached data
    queryClient.clear();
    
    // Clear all cookies and storage to ensure complete logout
    localStorage.clear();
    sessionStorage.clear();
  };

  // Direct boolean check instead of useMemo
  const isAuthenticated = !!user;

  return (
    <SessionContext.Provider
      value={{
        user: user ?? null,
        isAuthenticated,
        login,
        logout,
        isLoading,
        refetchUser: () => refetch(),
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
