// src/api/api.js
import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL; 

export const api = axios.create({
 baseURL: "http://localhost:3000",
  withCredentials: true,
});


