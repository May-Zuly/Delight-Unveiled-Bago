import axios from "axios";

const BASE_URL = "http://localhost:1337/api";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  if (config.headers.requireToken) {
    const {jwt } = JSON.parse(localStorage.getItem("user"));
    
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
  }
  return config;
});

export default api;
export { BASE_URL };
