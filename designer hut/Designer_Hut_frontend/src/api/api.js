// src/api/api.js
import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL; // set in .env

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);
