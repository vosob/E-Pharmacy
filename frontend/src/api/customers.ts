import type { Customers } from "@/types/customers";
import { tokenUtils } from "@/lib/auth";
import axios from "axios";

const BASE_URL = "http://localhost:3000/customers";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const getCustomers = async () => {
  const response = await axiosInstance.get("/", {
    headers: tokenUtils.getAuthHeaders(),
  });
  return response.data as Customers[];
};

export const createCustomer = async (data: Customers) => {
  const response = await axiosInstance.post("/", data, {
    headers: tokenUtils.getAuthHeaders(),
  });
  return response.data;
};
