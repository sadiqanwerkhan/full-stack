import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";

import { TransactionItem, Transaction } from "./TransactionItem";
import {
  PaymentMethods,
  PaymentStatus,
} from "@/constants/TransactionConstants";

const transaction: Transaction = {
  id: 1,
  date: new Date("2020-01-11T18:32:32.605Z"),
  amount: 14425.17,
  status: PaymentStatus.Refunded,
  currency: "EUR",
  paymentMethod: PaymentMethods.CARD,
};

describe("Transaction Items", () => {
  describe("with card payment", () => {
    it("should match styles", () => {
      const { asFragment } = render(
        <TransactionItem transaction={transaction} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("with cash payment", () => {
    it("should match styles", () => {
      const { asFragment } = render(
        <TransactionItem
          transaction={{ ...transaction, paymentMethod: PaymentMethods.CASH }}
        />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
