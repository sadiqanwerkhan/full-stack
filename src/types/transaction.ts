export type PaymentType = "card" | "cash";

export type TransactionStatus = "successful" | "refunded" | "failed";

export interface TransactionData {
  id: number;
  date: string;
  status: TransactionStatus;
  amount: number;
  paymentType: PaymentType;
  currency: string;
  paymentMethod: string;
}
