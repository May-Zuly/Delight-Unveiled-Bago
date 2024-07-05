import axios from "axios";

const BASE_URL = "https://delight.com";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
export { BASE_URL };
