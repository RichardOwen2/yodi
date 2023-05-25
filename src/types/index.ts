import { User } from "@prisma/client";

export enum UserRole {
  USER = 0,
  SELLER = 1,
  ADMIN = 2,
}

export interface PaginationParams {
  page: number;
  itemCount: number;
}

export interface MidtransTransactionPayload {
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  item_details: {
      id: string;
      price: number;
      quantity: number;
      name: string;
      merchant_name: string;
  }[];
  customer_details: {
    first_name: string;
    email: string;
    phone: string;
    billing_address: {
      first_name: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      postal_code: string;
      country_code: string;
    },
    shipping_address: {
      first_name: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      postal_code: string;
      country_code: string;
    }
  },
  enabled_payments: string[];
  callbacks: {
    finish: string;
  };
  expiry: {
    start_time: Date;
    unit: string;
    duration: number;
  };
}


export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
};