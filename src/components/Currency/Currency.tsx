import React, { FC } from "react";

import { PaymentStatus } from "../../constants/TransactionConstants";

interface CurrencyProps {
  paymentStatus: PaymentStatus;
  currencyCode: string;
  amount: number;
}

const Currency: FC<CurrencyProps> = ({
  paymentStatus,
  currencyCode,
  amount,
}) => {
  const formatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: currencyCode,
  });
  const formattedAmount = formatter.format(amount);

  const isPaymentRefunded = paymentStatus === PaymentStatus.Refunded;

  return (
    <span>
      {isPaymentRefunded ? `-${formattedAmount}` : `${formattedAmount}`}
    </span>
  );
};

export { Currency };
