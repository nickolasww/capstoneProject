import { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "../localstorage/index";
import { env } from "../env";

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

// ============================================================================
// AXIOS CONFIGURATION
// ============================================================================

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

// ============================================================================
// REQUEST INTERCEPTOR
// ============================================================================

/**
 * Request interceptor to add access token to all requests
 * Reads token from localStorage and adds to Authorization header
 * IMPORTANT: Skip Authorization header for refresh-token endpoint
 */
export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  // Skip adding Authorization header for refresh token endpoint
  // Backend doesn't require (and might reject) Authorization header for this endpoint
  if (config.url?.includes('/auth/refresh-token')) {
    console.log('[Axios Interceptor] Skipping Authorization header for refresh-token endpoint');
    return config;
  }
  
  // Get access token from localStorage
  const token = getAccessToken();
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
};

// ============================================================================
// RESPONSE INTERCEPTOR
// ============================================================================

/**
 * Response interceptor for response normalization and error handling
 * Token refresh is handled by React Query error handlers, not here
 */
export const responseInterceptor = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFulfilled: (response: AxiosResponse<any, any>) => {
    // Normalize response structure for consistency across the app
    return normalizeApiResponse(response);
  },
  onRejected: async (error: unknown) => {
    // Type guard for axios error
    const axiosError = error as {
      config?: InternalAxiosRequestConfig;
      response?: {
        status?: number;
        data?: {
          message?: string;
          errors?: Array<{ path: string; messages: string[] }>;
        };
      };
    };

    // IMPORTANT: Don't modify error structure!
    // React Query error handlers need access to response.status
    // to trigger refresh token flow on 401/500 errors
    
    // Log error for debugging (optional)
    if (axiosError.response?.data?.message) {
      console.error('[Axios Error]', axiosError.response.status, axiosError.response.data.message);
    }

    // Return original error with full structure intact
    // This ensures React Query error handler can access response.status
    return Promise.reject(error);
  },
};
