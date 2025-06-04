import "@testing-library/jest-dom";

import React from "react";
import { render, screen } from "@testing-library/react";

import { PaymentStatus } from "../../constants/TransactionConstants";

import { Currency } from "./Currency";

describe("Currency", () => {
  test.each`
    status                      | amount    | expected
    ${PaymentStatus.Successful} | ${10}     | ${"10,00 €"}
    ${PaymentStatus.Failed}     | ${20.5}   | ${"20,50 €"}
    ${PaymentStatus.Refunded}   | ${456.87} | ${"-456,87 €"}
  `(
    "should format the amount $amount with status $status",
    ({ status, amount, expected }) => {
      render(
        <Currency paymentStatus={status} amount={amount} currencyCode={"EUR"} />
      );
      expect(screen.getByText(expected)).toBeVisible();
    }
  );
});
