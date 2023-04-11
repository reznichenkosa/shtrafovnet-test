import { CustomerCreateDto, CustomerFormData } from "@/entities/customer";
import { BankAccountsForm } from "@/features/bank-accounts-form";
import { CustomerDetailsForm } from "@/features/customer-details-form";
import { EmailsForBankAccountForm } from "@/features/emails-for-bank-account-form";
import { MetaForm } from "@/features/meta-form";
import { OrganizationDetailsForm } from "@/features/organization-details-form";
import { Collapsible } from "@/shared/ui/collapsible";
import { Button, Flex, Modal } from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { FC } from "react";

const initialBankAccountValue = [
  {
    account_number: "",
    bik: "",
    corr_account_number: "",
    is_default: true,
    name: "",
    key: randomId(),
  },
];

const initialOrgValue = {
  addr: "",
  inn: "",
  kpp: "",
  name: "",
  ogrn: "",
  bank_accounts: initialBankAccountValue,
};

const initialFormValues: CustomerFormData = {
  name: "",
  credit_limit: 0,
  deferral_days: 0,
  email: "",
  invoice_emails: [{ key: randomId(), value: "" }],
  metadata: [],
  invoice_prefix: "",
  org: initialOrgValue,
};

const validateRules = {
  name: isNotEmpty("Введите Имя"),
  email: isEmail("Введите Email"),
  deferral_days: isNotEmpty("Дней отсрочки должно быть больше или равно нулю"),
  credit_limit: isNotEmpty("Кредитный лимит должен быть больше или равен нулю"),
  org: {
    name: isNotEmpty("Введите название организации"),
    inn: isNotEmpty("Введите ИНН организации"),
    kpp: isNotEmpty("Введите КПП организации"),
    ogrn: isNotEmpty("Введите ОГРН организации"),
    addr: isNotEmpty("Введите юридический адрес"),
    bank_accounts: {
      name: isNotEmpty("Введите название счета"),
      account_number: isNotEmpty("Введите номер счета"),
      bik: isNotEmpty("Введите БИК счета"),
      corr_account_number: isNotEmpty("Введите корр. номер счета"),
    },
  },
  invoice_emails: {
    value: isEmail("Введите Email"),
  },
  metadata: {
    value: isNotEmpty("Введите значение"),
    keyValue: isNotEmpty("Введите ключ"),
  },
};

interface CreateCustomerModalProps {
  opened: boolean;
  addCustomer: (newCustomer: CustomerCreateDto) => void;
  close: () => void;
}

export const CreateCustomerModal: FC<CreateCustomerModalProps> = ({
  opened,
  close,
  addCustomer,
}) => {
  const form = useForm<CustomerFormData>({
    initialValues: initialFormValues,
    validate: validateRules,
  });

  const submitFormHandler = (values: CustomerFormData) => {
    const metadataValue: Record<string, string> = {};
    values.metadata.forEach((item) => {
      metadataValue[item.keyValue] = item.value;
    });

    const invoiceEmailsValue = values.invoice_emails.map((item) => item.value);

    const dto: CustomerCreateDto = {
      ...values,
      invoice_emails: invoiceEmailsValue,
      metadata: metadataValue,
      org: { ...values.org },
    };

    addCustomer(dto);
    close();
    form.reset();
  };
  return (
    <Modal opened={opened} onClose={close} title="Создание клиента" centered>
      <form onSubmit={form.onSubmit(submitFormHandler)}>
        <Flex direction="column" gap="xs">
          <Collapsible initOpened title="Детали клиента">
            <CustomerDetailsForm form={form} />
          </Collapsible>
          <Collapsible initOpened title="Детали организации">
            <OrganizationDetailsForm form={form} />
          </Collapsible>
          <Collapsible initOpened title="Банковские счета ">
            <BankAccountsForm form={form} />
          </Collapsible>
          <Collapsible initOpened title="Emails для счетов">
            <EmailsForBankAccountForm form={form} />
          </Collapsible>
          <Collapsible initOpened title="Meta">
            <MetaForm form={form} />
          </Collapsible>
          <Button type="submit">Создать</Button>
        </Flex>
      </form>
    </Modal>
  );
};
