import { useCallback, useEffect, useState } from "react";
import { Customer, CustomerCreateDto } from "../types/customer";
import { getCustomersService } from "../services/get-customers";
import { addCustomerService } from "../services/add-customer";

export const useCustomers = () => {
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const addCustomer = useCallback((newCustomer: CustomerCreateDto) => {
    return addCustomerService(newCustomer).then((response) =>
      setCustomers((prevValue) => [...prevValue, response])
    );
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getCustomersService()
      .then((response) => setCustomers(response.customers))
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
        }
        setError("Something went wrong!");
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { error, isLoading, customers, addCustomer };
};
