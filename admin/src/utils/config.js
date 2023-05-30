import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://nile-booking.onrender.com/api",
});