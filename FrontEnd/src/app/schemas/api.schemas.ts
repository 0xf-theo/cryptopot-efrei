export interface Pot {
  id: number;
  id_asso: number;
  name: string;
  amount_paid: number;
  target_amount: number;
  description: string;
  image: string;
  status: string;
  contract_address?: string;
}

export interface Association {
  id: number;
  name: string;
  mail: string;
  phone_number: string;
  adress: string;
  activity: string;
  rna: string;
  image?: string;
  description?: string;
  website_link?: string;
}

export interface Donation {
  id: number;
  id_pot: number;
  deposit_date: string;
  crypto_type: string;
  amount: string;
  code?: string;
  public_address?: string;
  transaction_id?: string;
  message?: string;
}

export interface User {
  id: number;
  name: string;
  first_name: string;
  mail: string;
  roles: string[];
  association?: string;
}
