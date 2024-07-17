// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://dev.jasingam.site:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
