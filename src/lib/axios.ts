import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  // baseURL: "https://geekssprint-backend.onrender.com/api/v1",

  withCredentials: true, // Send and recieve cookies
});