import Head from "next/head";

import { createMockServer } from "@/shared/config/mock-server";
import { useCustomers } from "@/entities/customer";
import { useState } from "react";
import { CreateCustomerModal } from "@/widgets/create-customer-modal";
import { CustomersTable } from "@/widgets/customers-table";
import { Button, Container, Flex, Skeleton } from "@mantine/core";

createMockServer();

export default function Home() {
  const { isLoading, error, customers, addCustomer } = useCustomers();
  const [isOpenCreateCustomerModal, setIsOpenCreateCustomerModal] = useState<boolean>(false);

  const showCreateCustomerModal = () => {
    setIsOpenCreateCustomerModal(true);
  };

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
            <Button onClick={showCreateCustomerModal}>Добавить клиента</Button>
            <CreateCustomerModal isOpen={isOpenCreateCustomerModal} addCustomer={addCustomer} />
            {customerTable}
            {tableSkeleton}
          </Flex>
        </Container>
      </main>
    </>
  );
}
