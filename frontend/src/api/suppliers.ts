import type { Suppliers } from "@/types/suppliers";
import { tokenUtils } from "@/lib/auth";
import axios from "axios";

const BASE_URL = "http://localhost:3000/suppliers";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const getSuppliers = async () => {
  const response = await axiosInstance.get("/", {
    headers: tokenUtils.getAuthHeaders(),
  });
  return response.data;
};

export const createSupplier = async (data: Suppliers) => {
  const response = await axiosInstance.post("/", data, {
    headers: tokenUtils.getAuthHeaders(),
  });
  return response.data;
};
