import React from "react";

import styles from "./Page.module.scss";
import { Headline, TransactionItem, TransactionList } from "@/components";
import { Transaction } from "@/components/TransactionItem";

export default async function Transactions() {
  const transactions = await fetch("http://localhost:3000/api/transactions");
  const data = (await transactions.json()) as {
    transactions: Transaction[];
    total: number;
  };

  return (
    <div className={styles.container}>
      <Headline>Transactions</Headline>
      <TransactionList>
        {data.transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </TransactionList>
    </div>
  );
}
