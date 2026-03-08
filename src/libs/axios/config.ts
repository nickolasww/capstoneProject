import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { SessionToken, type TokenData } from "../cookies/index";
import { env } from "../env";
import { SessionUser } from "../localstorage/index";

// ============================================================================
// RESPONSE NORMALIZATION
// ============================================================================

/**
 * Normalize API response to consistent structure
 * Handles various backend response formats:
 * - { data: { user, token } }
 * - { users: {...} } or { user: {...} }
 * - Direct response without wrapper
 * - { message, data, ... }
 * 
 * @param response - Axios response object
 * @returns Normalized response with standardized structure
 */
function normalizeApiResponse(response: AxiosResponse): AxiosResponse {
  // Preserve original response
  const originalData = response.data;
  
  // If response is already normalized or empty, return as-is
  if (!originalData || typeof originalData !== 'object') {
    return response;
  }

  // Create normalized response structure
  const normalized: any = {
    ...originalData,
    // Add standard fields if they exist
    _meta: {
      status: response.status,
      statusText: response.statusText,
      // Preserve original structure for debugging (only in development)
      _original: import.meta.env.DEV ? originalData : undefined,
    }
  };

  // Normalize data location - prioritize explicit 'data' field but keep alternatives accessible
  if (!normalized.data) {
    // Check for common alternative field names
    if (originalData.users) {
      normalized.data = originalData.users;
    } else if (originalData.user) {
      normalized.data = originalData.user;
    } else if (originalData.items) {
      normalized.data = originalData.items;
    } else if (originalData.results) {
      normalized.data = originalData.results;
    }
  }

  // Preserve all original fields at root level for backward compatibility
  // This ensures existing code doesn't break
  response.data = normalized;
  
  return response;
}

// Track if a refresh is in progress to prevent multiple simultaneous refresh requests
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
}

export const axiosConfig: AxiosRequestConfig = {
  baseURL: env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => {
    const queryString = Object.entries(params)
      .filter(([, value]) => {
        // Filter out undefined, empty strings, and empty arrays
        if (value === undefined || value === "") return false;
        if (Array.isArray(value) && value.length === 0) return false;
        return true;
      })
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map((val) => `${key}=${encodeURIComponent(val)}`).join("&");
        }
        return `${key}=${encodeURIComponent(value)}`;
      })
      .join("&");
    return queryString;
  },
};

// Request interceptor to add auth token and proactively refresh if needed
export const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
  // Skip token refresh for the refresh endpoint itself
  if (config.url?.includes('/auth/refresh-token')) {
    return config;
  }

  // Check if token is expiring soon and refresh proactively
  if (SessionToken.isAccessTokenExpiringSoon() && !isRefreshing) {
    const refreshToken = SessionToken.get()?.refresh_token;
    
    if (refreshToken && !SessionToken.isRefreshTokenExpired()) {
      isRefreshing = true;
      
      try {
        const { data } = await axios.post(`${env.VITE_API_BASE_URL}/auth/refresh-token`, {
          refresh_token: refreshToken,
        });

        const newTokenData: TokenData = {
          access_token: data.data.token.access_token,
          refresh_token: data.data.token.refresh_token,
          access_token_expires_in: data.data.token.access_token_expires_in,
          refresh_token_expires_in: data.data.token.refresh_token_expires_in,
        };

        SessionToken.set(newTokenData);
        onRefreshed(data.data.token.access_token);
      } catch (error) {
        console.error('Proactive token refresh failed:', error);
      } finally {
        isRefreshing = false;
      }
    }
  }

  const token = SessionToken.get()?.access_token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Response interceptor for response normalization, token refresh, and error handling
export const responseInterceptor = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFulfilled: (response: AxiosResponse<any, any>) => {
    // Normalize response structure for consistency across the app
    return normalizeApiResponse(response);
  },
  onRejected: async (error: unknown) => {
    // Type guard for axios error
    const axiosError = error as {
      config?: InternalAxiosRequestConfig & { _retry?: boolean };
      response?: {
        status?: number;
        data?: {
          message?: string;
          errors?: Array<{ path: string; messages: string[] }>;
        };
      };
    };

    const originalRequest = axiosError.config;

    // If error is 401 and we haven't retried yet
    if (axiosError.response?.status === 401 && originalRequest && !originalRequest._retry) {
      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(axios(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = SessionToken.get()?.refresh_token;
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Check if refresh token is expired
        if (SessionToken.isRefreshTokenExpired()) {
          throw new Error("Refresh token expired");
        }

        // Call refresh token endpoint
        const { data } = await axios.post(`${env.VITE_API_BASE_URL}/auth/refresh-token`, {
          refresh_token: refreshToken,
        });

        const newTokenData: TokenData = {
          access_token: data.data.token.access_token,
          refresh_token: data.data.token.refresh_token,
          access_token_expires_in: data.data.token.access_token_expires_in,
          refresh_token_expires_in: data.data.token.refresh_token_expires_in,
        };

        // Update stored tokens with expiry information
        SessionToken.set(newTokenData);

        // Notify all queued requests of the new token
        onRefreshed(data.data.token.access_token);

        // Retry original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.data.token.access_token}`;
        }
        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear tokens and trigger logout event
        SessionToken.remove();
        SessionUser.remove();

        // Dispatch custom event for logout
        window.dispatchEvent(new CustomEvent('auth:logout', { 
          detail: { message: 'Sesi Anda telah berakhir. Silakan login kembali untuk melanjutkan.' }
        }));

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Format error response for better handling
    if (axiosError.response?.data) {
      return Promise.reject(axiosError.response.data);
    }

    return Promise.reject(error);
  },
};
