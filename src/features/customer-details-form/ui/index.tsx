import { CustomerFormData } from "@/entities/customer";
import { Flex, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FC } from "react";

interface CustomerDetailsFormProps {
  form: UseFormReturnType<CustomerFormData, (values: CustomerFormData) => CustomerFormData>;
}

export const CustomerDetailsForm: FC<CustomerDetailsFormProps> = ({ form }) => {
  return (
    <Flex direction="column">
      <TextInput label="Имя" withAsterisk {...form.getInputProps("name")} />
      <TextInput label="Email" withAsterisk {...form.getInputProps("email")} />
      <TextInput label="Дней отсрочки" withAsterisk {...form.getInputProps("deferral_days")} />
      <TextInput label="Кредитный лимит" withAsterisk {...form.getInputProps("credit_limit")} />
    </Flex>
  );
};
