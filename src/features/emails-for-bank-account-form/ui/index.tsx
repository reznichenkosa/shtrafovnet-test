import { CustomerCreateDto } from "@/entities/customer";
import { Button, Flex, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { FC } from "react";

interface EmailsForBankAccountFormProps {
  form: UseFormReturnType<CustomerCreateDto, (values: CustomerCreateDto) => CustomerCreateDto>;
}

export const EmailsForBankAccountForm: FC<EmailsForBankAccountFormProps> = ({ form }) => {
  const addEmail = () => {
    form.insertListItem("invoice_emails", { key: randomId(), value: "" });
  };

  const removeEmail = (index: number) => () => {
    form.removeListItem("invoice_emails", index);
  };

  return (
    <Flex direction="column" gap="xs">
      {form.values.invoice_emails.map((item, index) => (
        <Flex key={item.key} align="center" justify="space-between">
          <TextInput
            label="Email"
            withAsterisk
            {...form.getInputProps(`invoice_emails.${index}.value`)}
          />
          {index !== 0 && (
            <Button onClick={removeEmail(index)} color="red">
              <IconTrash size="1.25rem" />
            </Button>
          )}
        </Flex>
      ))}
      <Button onClick={addEmail}>Добавить еще email</Button>
    </Flex>
  );
};
