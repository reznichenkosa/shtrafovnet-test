import { Customer } from "@/entities/customer";
import { FC } from "react";

interface CreateCustomerModalProps {
  isOpen: boolean;
  addCustomer: (newCustomer: Customer) => void;
}

export const CreateCustomerModal: FC<CreateCustomerModalProps> = ({ isOpen, addCustomer }) => {
  return <div>CreateCustomerModal</div>;
};
