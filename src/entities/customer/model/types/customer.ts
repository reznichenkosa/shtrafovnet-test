import { Balance, Org, BankAccounts } from "@/shared/types/api-data-model";

export interface Customer {
  id: string;
  name: string;
  email: string;
  deferral_days: number;
  org: Org;
  balance: Balance;
  metadata: Record<string, string>;
  created_at: string;
  updated_at: string;
  status: string;
  invoice_prefix: string;
  invoice_emails: string[];
}

type OrgCreateDto = Omit<Org, "id" | "created_at" | "updated_at" | "bank_accounts"> & {
  bank_accounts: (Omit<BankAccounts, "id" | "created_at" | "updated_at"> & { key: string })[];
};
export interface CustomerCreateDto {
  name: string;
  email: string;
  deferral_days: number;
  credit_limit: number;
  org: OrgCreateDto;
  metadata: { keyValue: string; value: string; key: string }[];
  invoice_prefix: string;
  invoice_emails: { key: string; value: string }[];
}
