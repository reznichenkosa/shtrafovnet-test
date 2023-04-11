import { Customer } from "@/entities/customer";
import { CopyToClipboard } from "@/features/copy-to-clipboard";
import { getLocaleDate } from "@/shared/lib/getLocaleDate";
import { Table } from "@mantine/core";
import { FC } from "react";

interface CustomersTableProps {
  customers: Customer[];
}

export const CustomersTable: FC<CustomersTableProps> = ({ customers }) => {
  const rows = customers.map((customer) => (
    <tr key={customer.id}>
      <td>{customer.name}</td>
      <td>
        <CopyToClipboard text={customer.id} />
      </td>
      <td>{customer.email}</td>
      <td>{`${customer.deferral_days} дней`}</td>
      <td>{getLocaleDate(new Date(customer.created_at))}</td>
      <td>{getLocaleDate(new Date(customer.updated_at))}</td>
    </tr>
  ));
  return (
    <Table highlightOnHover>
      <thead>
        <tr>
          <th>Имя</th>
          <th>ID</th>
          <th>Email</th>
          <th>Отсрочка оплаты</th>
          <th>Создан</th>
          <th>Изменен</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};
