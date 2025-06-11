import axios from "axios";

// Create an instance of axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

// Set Token along with requests
api.interceptors.request.use(
  (config) => {
    // Add auth tokens
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default api;
