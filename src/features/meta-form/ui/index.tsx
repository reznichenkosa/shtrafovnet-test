import { CustomerCreateDto } from "@/entities/customer";
import { Button, Flex, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { FC } from "react";

interface MetaFormProps {
  form: UseFormReturnType<CustomerCreateDto, (values: CustomerCreateDto) => CustomerCreateDto>;
}

export const MetaForm: FC<MetaFormProps> = ({ form }) => {
  const addMetadata = () => {
    form.insertListItem("metadata", { key: randomId(), value: "", keyValue: "" });
  };

  const removeMetadata = (index: number) => () => {
    form.removeListItem("metadata", index);
  };

  return (
    <Flex direction="column" gap="xs">
      {form.values.metadata.map((item, index) => (
        <Flex key={item.key} align="flex-end" justify="space-between" gap="xs">
          <TextInput
            label="Ключ"
            withAsterisk
            {...form.getInputProps(`metadata.${index}.keyValue`)}
          />
          <TextInput
            label="Значение"
            withAsterisk
            {...form.getInputProps(`metadata.${index}.value`)}
          />
          <Button onClick={removeMetadata(index)} color="red">
            <IconTrash size="1.25rem" />
          </Button>
        </Flex>
      ))}
      <Button onClick={addMetadata}>Добавить еще ключ-значение</Button>
    </Flex>
  );
};
