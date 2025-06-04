import React, { FC } from "react";

import { Currency } from "../Currency";
import { Badge } from "../Badge";
import { formatDate } from "../../services/DateService";
import {
  PaymentMethods,
  PaymentStatus,
} from "../../constants/TransactionConstants";

import styles from "./TransactionItem.module.scss";

const PAYMENT_METHOD_ICONS = {
  [PaymentMethods.CASH]: "💵",
  [PaymentMethods.CARD]: "💳",
};

export type Transaction = {
  id: number;
  date: Date;
  amount: number;
  status: PaymentStatus;
  currency: string;
  paymentMethod: PaymentMethods;
  paymentType: "card" | "cash";
};

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: FC<TransactionItemProps> = ({ transaction }) => {
  return (
    <li className={styles["grid-li"]}>
      <div>#{transaction.id}</div>
      <div>{formatDate(transaction.date)}</div>
      <Badge status={transaction.status}>{transaction.status}</Badge>
      <Currency
        paymentStatus={transaction.status}
        currencyCode={transaction.currency}
        amount={transaction.amount}
      />
      <span aria-label={`Paid by ${transaction.paymentMethod}`}>
        {PAYMENT_METHOD_ICONS[transaction.paymentMethod]}
      </span>
    </li>
  );
};

export { TransactionItem };
