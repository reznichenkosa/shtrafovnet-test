import { CustomerFormData } from "@/entities/customer";
import { Flex, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FC } from "react";

interface OrganizationDetailsFormProps {
  form: UseFormReturnType<CustomerFormData, (values: CustomerFormData) => CustomerFormData>;
}

export const OrganizationDetailsForm: FC<OrganizationDetailsFormProps> = ({ form }) => {
  return (
    <Flex direction="column">
      <TextInput label="Название организации" withAsterisk {...form.getInputProps("org.name")} />
      <TextInput label="ИНН организации" withAsterisk {...form.getInputProps("org.inn")} />
      <TextInput label="КПП организации" withAsterisk {...form.getInputProps("org.kpp")} />
      <TextInput label="ОГРН организации" withAsterisk {...form.getInputProps("org.ogrn")} />
      <TextInput label="Юридический адрес" withAsterisk {...form.getInputProps("org.addr")} />
    </Flex>
  );
};
