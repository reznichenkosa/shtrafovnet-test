import { Box, Button, Collapse, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowBadgeDown, IconArrowBadgeUp } from "@tabler/icons-react";
import { FC, PropsWithChildren } from "react";

interface CollapsibleProps {
  initOpened?: boolean;
  title: string;
}

export const Collapsible: FC<PropsWithChildren<CollapsibleProps>> = ({
  children,
  title,
  initOpened = true,
}) => {
  const [opened, { toggle }] = useDisclosure(initOpened);

  return (
    <Box>
      <Button fullWidth onClick={toggle} variant="subtle">
        <Text>{title}</Text>
        {opened ? <IconArrowBadgeUp size="1.125rem" /> : <IconArrowBadgeDown size="1.125rem" />}
      </Button>
      <Collapse in={opened}>{children}</Collapse>
    </Box>
  );
};
