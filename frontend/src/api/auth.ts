import type { FormValues } from "@/types/auth";
import axios from "axios";
import { tokenUtils } from "@/lib/auth";

const BASE_URL = "http://localhost:3000/auth";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenUtils.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      tokenUtils.removeToken();
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export const registerUser = async ({ email, password }: FormValues) => {
  const response = await axiosInstance.post("/register", { email, password });
  return response.data;
};

export const loginUser = async ({ email, password }: FormValues) => {
  const response = await axiosInstance.post("/login", { email, password });
  return response.data;
};

export const logoutUser = async () => {
  try {
    await axiosInstance.post("/logout");
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    tokenUtils.removeToken();
  }
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/me");
  return response.data;
};

export const refreshToken = async () => {
  const response = await axiosInstance.post("/refresh");
  const { token } = response.data;
  tokenUtils.setToken(token);
  return response.data;
};

export const verifyToken = async () => {
  const response = await axiosInstance.get("/verify");
  return response.data;
};
