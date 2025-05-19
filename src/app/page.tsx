"use client";

import React, { useEffect, useState } from "react";

import styles from "./Page.module.scss";
import PaymentFilter from "@/components/PaymentFilter/PaymentFilter";
import LoadMorePagination from "@/components/Pagination/LoadMorePagination";
import { Headline, TransactionItem, TransactionList } from "@/components";
import { Transaction } from "@/components/TransactionItem";
import { PaymentType } from "@/types/transaction";

export default function TransactionsPage() {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [selectedPayment, setSelectedPayment] = useState<PaymentType | null>(
    null
  );

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();
        const parsed: Transaction[] = data.transactions.map((tx: any) => ({
          ...tx,
          date: new Date(tx.date),
        }));
        setAllTransactions(parsed);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    setVisibleCount(20);
  }, [selectedPayment]);

  const filtered = selectedPayment
    ? allTransactions.filter((tx) => tx.paymentMethod === selectedPayment)
    : allTransactions;

  const visibleTransactions = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleLoadMore = () => setVisibleCount((prev) => prev + 20);

  return (
    <div className={styles.container}>
      <Headline>Transactions</Headline>
      <PaymentFilter
        selectedType={selectedPayment}
        onChange={setSelectedPayment}
      />
      <TransactionList>
        {visibleTransactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </TransactionList>
      <LoadMorePagination hasMore={hasMore} onLoadMore={handleLoadMore} />
    </div>
  );
}
