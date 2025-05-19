"use client";

import React, { useEffect, useState, useMemo } from "react";

import styles from "./Page.module.scss";
import PaymentFilter from "@/components/PaymentFilter/PaymentFilter";
import LoadMorePagination from "@/components/Pagination/LoadMorePagination";
import GroupedTransactions from "@/components/GroupedTransactions/GroupedTransactions";
import { Headline } from "@/components";
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

  const visibleTransactions = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );
  const hasMore = visibleCount < filtered.length;

  const handleLoadMore = () => setVisibleCount((prev) => prev + 20);

  return (
    <div className={styles.container}>
      <Headline>Transactions</Headline>
      <div className={styles.filterWrapper}>
        <div className={styles.filterLabel}>Payment type</div>
        <PaymentFilter
          selectedType={selectedPayment}
          onChange={setSelectedPayment}
        />
      </div>
      <GroupedTransactions transactions={visibleTransactions} />
      <LoadMorePagination hasMore={hasMore} onLoadMore={handleLoadMore} />
    </div>
  );
}
