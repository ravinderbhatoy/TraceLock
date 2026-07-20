import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const SKIP_REFRESH_URLS = [
  "/users/me/",
  "/token/refresh/",
  "/token/",
  "/users/logout/",
];

let isRefreshing = false;
let refreshQueue = [];

const processRefreshQueue = (error) => {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  refreshQueue = [];
};
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const url = originalRequest?.url || "";
    if (SKIP_REFRESH_URLS.some((path) => url.includes(path))) {
      return Promise.reject(error);
    }
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      }).then(() => axiosClient(originalRequest));
    }
    originalRequest._retry = true;
    isRefreshing = true;
    try {
      // Refresh token is httponly — browser sends the cookie automatically
      await axiosClient.post("/token/refresh/");
      processRefreshQueue(null);
      return axiosClient(originalRequest);
    } catch (refreshError) {
      processRefreshQueue(refreshError);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
export default axiosClient;
