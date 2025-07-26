import type { Suppliers } from "@/types/suppliers";
import { tokenUtils } from "@/lib/auth";
import axios from "axios";

const BASE_URL = "http://localhost:3000/suppliers";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const getSuppliers = async (startIndex: number, rowsPerPage: number) => {
  const response = await axiosInstance.get(
    `/?page=${startIndex}&limit=${rowsPerPage}`,
    {
      headers: tokenUtils.getAuthHeaders(),
    }
  );
  return response.data;
};

export const createSupplier = async (data: Suppliers) => {
  const response = await axiosInstance.post("/", data, {
    headers: tokenUtils.getAuthHeaders(),
  });
  return response.data;
};

export const updateSupplier = async (id: string, data: Suppliers) => {
  const response = await axiosInstance.put(`/${id}`, data, {
    headers: tokenUtils.getAuthHeaders(),
  });
  return response.data;
};
