import { apiInstance } from "@/shared/api/api-instance";
import { Customer } from "../types/customer";

export const getCustomersService = async () => {
  const response = await apiInstance.get<{ customers: Customer[] }>("customers");
  if (!response.data) {
    throw new Error("Customer loading is failed!");
  }
  return response.data;
};
