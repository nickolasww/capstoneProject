import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { postLogin, getMe } from '@/api/auth/api';
import { SessionToken } from '@/libs/cookies';

export type UserRole = 'super_admin' | 'admin' | 'client';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface SessionContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const SESSION_KEY = 'bas_session';

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
            };
            setUser(userData);
            localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
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
      };

      setUser(finalUserData);
      localStorage.setItem(SESSION_KEY, JSON.stringify(finalUserData));

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
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <SessionContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
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
