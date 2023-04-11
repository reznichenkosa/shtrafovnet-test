import { Button, Flex } from "@mantine/core";
import { FC } from "react";
import { IconCopy } from "@tabler/icons-react";

interface CopyToClipboardProps {
  text: string;
}

export const CopyToClipboard: FC<CopyToClipboardProps> = ({ text }) => {
  const copyValue = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Button onClick={copyValue} variant="subtle">
      <Flex gap="xs">
        {text}
        <IconCopy size="1.125rem" />
      </Flex>
    </Button>
  );
};
