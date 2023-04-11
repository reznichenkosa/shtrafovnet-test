import { CustomerFormData } from "@/entities/customer";
import { Button, Flex, Switch, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { FC } from "react";

interface BankAccountsFormProps {
  form: UseFormReturnType<CustomerFormData, (values: CustomerFormData) => CustomerFormData>;
}

export const BankAccountsForm: FC<BankAccountsFormProps> = ({ form }) => {
  const addBankAccount = () => {
    form.insertListItem("org.bank_accounts", { key: randomId(), value: "" });
  };

  const removeBankAccount = (index: number) => () => {
    const newValues = form.values.org.bank_accounts.filter((_, indexEl) => indexEl !== index);

    form.setFieldValue(
      "org.bank_accounts",
      newValues.map((item, indexEl) => {
        if (form.values.org.bank_accounts[index].is_default && indexEl === 0) {
          return {
            ...item,
            is_default: true,
          };
        }
        return item;
      })
    );
  };

  const changeIsDefaultHandler = (index: number) => () => {
    form.setFieldValue(
      "org.bank_accounts",
      form.values.org.bank_accounts.map((item, indexItem) => ({
        ...item,
        is_default: indexItem === index,
      }))
    );
  };

  return (
    <Flex direction="column" gap="xl">
      {form.values.org.bank_accounts.map((item, index) => (
        <Flex key={item.key} justify="space-between">
          <Flex direction="column" gap="xs">
            <TextInput
              label="Название счета"
              withAsterisk
              {...form.getInputProps(`org.bank_accounts.${index}.name`)}
            />
            <TextInput
              label="Номер счета"
              withAsterisk
              {...form.getInputProps(`org.bank_accounts.${index}.account_number`)}
            />
            <TextInput
              label="БИК счета"
              withAsterisk
              {...form.getInputProps(`org.bank_accounts.${index}.bik`)}
            />
            <TextInput
              label="Корр. номер счета"
              withAsterisk
              {...form.getInputProps(`org.bank_accounts.${index}.corr_account_number`)}
            />
            <Switch
              label="Дефолтный счет"
              disabled={item.is_default}
              {...form.getInputProps(`org.bank_accounts.${index}.is_default`, { type: "checkbox" })}
              onChange={changeIsDefaultHandler(index)}
            />
          </Flex>
          {index !== 0 && (
            <Button onClick={removeBankAccount(index)} color="red">
              <IconTrash size="1.25rem" />
            </Button>
          )}
        </Flex>
      ))}
      <Button onClick={addBankAccount}>Добавить еще счет</Button>
    </Flex>
  );
};
