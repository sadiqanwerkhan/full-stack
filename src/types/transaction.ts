export enum PaymentStatus {
  SUCCESSFUL = "successful",
  REFUNDED = "refunded",
  FAILED = "failed",
}

export enum PaymentMethods {
  CARD = "card",
  CASH = "cash",
}

export type PaymentType = "card" | "cash";

export type TransactionStatus = "successful" | "refunded" | "failed";

export interface TransactionData {
  id: number;
  date: Date | string;
  status: PaymentStatus;
  amount: number;
  paymentType: PaymentType;
  currency: string;
  paymentMethod: PaymentMethods;
}
