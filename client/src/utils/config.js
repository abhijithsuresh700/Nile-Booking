import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:8880/api",
  baseURL: "https://nile-booking.onrender.com/api"
});