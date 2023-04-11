import { Balance, Org } from "@/shared/types/api-data-model";

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
