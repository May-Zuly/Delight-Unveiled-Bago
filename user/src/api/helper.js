import axios from "axios";

const BASE_URL = "http://localhost:1337/api";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  if (config.headers.requireToken) {
    const userData = JSON.parse(localStorage.getItem("loginUser"));
    if (userData.jwt) {
      config.headers.Authorization = `Bearer ${userData.jwt}`;
    }
  }
  return config;
});

export default api;
export { BASE_URL };
