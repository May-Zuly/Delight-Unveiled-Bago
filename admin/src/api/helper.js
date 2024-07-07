import axios from "axios";

const BASE_URL = "http://localhost:1337/api";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  if (config.headers.requireToken) {
    const { token } = JSON.parse(localStorage.getItem("recoil-persist"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
export { BASE_URL };
