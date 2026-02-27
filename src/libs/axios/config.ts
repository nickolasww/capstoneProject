import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { SessionToken } from "../cookies/index";
import { env } from "../env";
import { SessionUser } from "../localstorage/index";

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

// Request interceptor to add auth token
export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = SessionToken.get()?.access_token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Response interceptor for token refresh and error formatting
export const responseInterceptor = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFulfilled: (response: AxiosResponse<any, any>) => response,
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
      originalRequest._retry = true;

      try {
        const refreshToken = SessionToken.get()?.refresh_token;
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Call refresh token endpoint
        const { data } = await axios.post(`${env.VITE_API_BASE_URL}/auth/refresh-token`, {
          refresh_token: refreshToken,
        });

        // Update stored tokens
        SessionToken.set({
          access_token: data.data.token.access_token,
          refresh_token: data.data.token.refresh_token,
        });

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${data.data.token.access_token}`;
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
      }
    }

    // Format error response for better handling
    if (axiosError.response?.data) {
      return Promise.reject(axiosError.response.data);
    }

    return Promise.reject(error);
  },
};
