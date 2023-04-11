import Head from "next/head";

import { createMockServer } from "@/shared/config/mock-server";
import { useCustomers } from "@/entities/customer";
import { CreateCustomerModal } from "@/widgets/create-customer-modal";
import { CustomersTable } from "@/widgets/customers-table";
import { Button, Container, Flex, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

createMockServer();

export default function Home() {
  const { isLoading, error, customers, addCustomer } = useCustomers();
  const [opened, { open, close }] = useDisclosure(true);

  const customerTable = !isLoading && !error && <CustomersTable customers={customers} />;
  const tableSkeleton = isLoading && (
    <>
      <Skeleton height={50} animate />
      <Skeleton height={50} animate />
      <Skeleton height={50} animate />
      <Skeleton height={50} animate />
    </>
  );

  return (
    <>
      <Head>
        <title>Клиенты</title>
        <meta name="description" content="Test task for shtrafovnet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container p="lg" size="lg">
          <Flex align="flex-end" direction="column" gap="lg">
            <Button onClick={open}>Добавить клиента</Button>
            <CreateCustomerModal opened={opened} close={close} addCustomer={addCustomer} />
            {customerTable}
            {tableSkeleton}
          </Flex>
        </Container>
      </main>
    </>
  );
}
