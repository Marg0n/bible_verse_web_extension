import axios from "axios";
import { baseUrl } from "../helper/BaseUrl";
import { refreshAccessToken } from "./refreshToken";

const api = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, //? sends/receives the httpOnly refresh_token cookie
});

//! ─── REQUEST INTERCEPTOR ───────────────────────────────────────────
//* Attach the access token to every outgoing request
api.interceptors.request.use((config) => {
  // const token = sessionStorage.getItem("access_token"); //? consistent key
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  // return config;
  return chrome.storage.session.get("access_token").then(({ access_token }) => {
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  });
});

//! ─── RESPONSE INTERCEPTOR ──────────────────────────────────────────
//* On 401 → refresh token → retry the original request
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (token) resolve(token);
    else reject(error);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    //? Skip if not 401 or already retried (prevents infinite loop)
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    //? If a refresh is already in progress, queue this request
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const newToken = await refreshAccessToken();
      if (!newToken) throw new Error("Refresh failed");

      processQueue(null, newToken);
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest); //? retry with the new token
    } catch (refreshError) {
      processQueue(refreshError, null);
      //? Refresh token is dead → force logout
      // sessionStorage.removeItem("access_token");
      // sessionStorage.removeItem("user");
      await chrome.storage.session.remove(["access_token", "user"]);
      //? Dispatch a custom event so Popup can react
      window.dispatchEvent(new Event("auth:logout"));
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
