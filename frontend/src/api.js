import axios from "axios";

const api = axios.create({
  baseURL: "https://wepadel.onrender.com//api",
});

  export default api;