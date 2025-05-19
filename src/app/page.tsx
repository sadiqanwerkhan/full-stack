"use client";

import React, { useState, useEffect } from "react";

import styles from "./Page.module.scss";
import PaymentFilter from "@/components/PaymentFilter/PaymentFilter";
import { Headline, TransactionItem, TransactionList } from "@/components";
import { Transaction } from "@/components/TransactionItem";
import { TransactionData, PaymentType } from "@/types/transaction";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentType | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();

        const parsedTransactions: Transaction[] = data.transactions.map(
          (tx: any) => ({
            ...tx,
            date: new Date(tx.date),
          })
        );
        console.log("Fetched transactions:", data.transactions);

        setTransactions(parsedTransactions);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchData();
  }, []);

  const filteredTransactions = selectedPayment
    ? transactions.filter((tx) => tx.paymentMethod === selectedPayment)
    : transactions;

  console.log("Filtered:", filteredTransactions);

  return (
    <div className={styles.container}>
      <Headline>Transactions</Headline>
      <PaymentFilter
        selectedType={selectedPayment}
        onChange={setSelectedPayment}
      />
      <TransactionList>
        {filteredTransactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </TransactionList>
    </div>
  );
}
