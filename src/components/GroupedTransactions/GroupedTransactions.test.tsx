import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GroupedTransactions from "./GroupedTransactions";
import { Transaction } from "@/components/TransactionItem";
import {
  PaymentStatus,
  PaymentMethods,
} from "../../constants/TransactionConstants";

const mockTransactions: Transaction[] = [
  {
    id: 1,
    amount: 100,
    currency: "EUR",
    date: new Date("2025-05-15"),
    paymentMethod: "card" as PaymentMethods,
    status: "successful" as PaymentStatus,
    paymentType: "card",
  },
  {
    id: 2,
    amount: 50,
    currency: "EUR",
    date: new Date("2025-05-15"),
    paymentMethod: "cash" as PaymentMethods,
    status: "refunded" as PaymentStatus,
    paymentType: "card",
  },
  {
    id: 3,
    amount: 200,
    currency: "EUR",
    date: new Date("2025-05-16"),
    paymentMethod: "card" as PaymentMethods,
    status: "successful" as PaymentStatus,
    paymentType: "card",
  },
  {
    id: 4,
    amount: 999,
    currency: "EUR",
    date: new Date("2025-05-16"),
    paymentMethod: "card" as PaymentMethods,
    status: "failed" as PaymentStatus,
    paymentType: "card",
  },
];

describe("GroupedTransactions", () => {
  it("renders the correct daily profit", () => {
    render(<GroupedTransactions transactions={mockTransactions} />);
    expect(screen.getByText("2025-05-15")).toBeInTheDocument();
    expect(screen.getByText("Daily Profit: €50.00")).toBeInTheDocument();
  });
});
