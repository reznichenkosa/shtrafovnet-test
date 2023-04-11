import { apiInstance } from "@/shared/api/api-instance";
import { Customer, CustomerCreateDto } from "../types/customer";

export const addCustomerService = async (newCustomer: CustomerCreateDto) => {
  const response = await apiInstance.post<Customer>("customers", { body: newCustomer });
  if (!response.data) {
    throw new Error("Customer create is failed!");
  }
  return response.data;
};
