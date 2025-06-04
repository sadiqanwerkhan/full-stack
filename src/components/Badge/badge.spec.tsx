import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";
import { Badge } from "./Badge";
import { PaymentStatus } from "@/constants/TransactionConstants";

describe("Badge", () => {
  it.each([
    [PaymentStatus.Successful, "badge-success"],
    [PaymentStatus.Failed, "badge-failed"],
    [PaymentStatus.Refunded, "badge-refunded"],
  ])(
    "renders a badge for payment status: %s with the right class",
    (status, expectedClass) => {
      const { getByText } = render(<Badge status={status}>message</Badge>);

      expect(getByText("message")).toHaveClass(expectedClass);
    }
  );
});
