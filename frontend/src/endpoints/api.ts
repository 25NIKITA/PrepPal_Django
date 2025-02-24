import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/";
console.log("API Base URL:", BASE_URL);


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // ✅ Ensures cookies are sent
  headers: { "Content-Type": "application/json" }
});

export const login = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post("token/", { username, password });
    console.log("Login response:", response.data); // ✅ Check if tokens are received
    return response.data;
  } catch (error: any) {
    console.error("Login API Error:", error);
    throw error.response?.data?.error || "Login failed";
  }
};
