export interface Org {
  id: string;
  name: string;
  inn: string;
  kpp: string;
  ogrn: string;
  addr: string;
  bank_accounts: BankAccounts[];
  created_at: string;
  updated_at: string;
}

export interface BankAccounts {
  id: string;
  name: string;
  bik: string;
  account_number: string;
  corr_account_number: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface Balance {
  currency: string;
  current_amount: number;
  credit_limit: number;
  available_amount: number;
}
