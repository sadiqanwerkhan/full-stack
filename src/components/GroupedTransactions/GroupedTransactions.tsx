import React, { useMemo } from "react";
import styles from "./GroupedTransactions.module.scss";
import { Transaction } from "@/components/TransactionItem";
import { TransactionItem } from "@/components/TransactionItem";

interface GroupedTransactionsProps {
  transactions: Transaction[];
}

const groupByDate = (transactions: Transaction[]) => {
  const grouped: Record<string, Transaction[]> = {};

  transactions.forEach((tx) => {
    const date = tx.date.toISOString().split("T")[0];
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(tx);
  });

  return grouped;
};

const calculateProfit = (transactions: Transaction[]) => {
  return transactions.reduce((total, tx) => {
    if (tx.status === "successful") return total + Math.abs(tx.amount);
    if (tx.status === "refunded") return total - Math.abs(tx.amount);
    return total;
  }, 0);
};

const GroupedTransactions: React.FC<GroupedTransactionsProps> = ({
  transactions,
}) => {
  const grouped = useMemo(() => groupByDate(transactions), [transactions]);

  return (
    <>
      {Object.entries(grouped).map(([date, txs]) => (
        <div key={date} className={styles.group}>
          <div className={styles.header}>
            <span className={styles.date}>{date}</span>
            <span className={styles.profit}>
              {calculateProfit(txs).toFixed(2)} €
            </span>
          </div>
          <div className={styles.items}>
            {txs.map((tx) => (
              <TransactionItem key={tx.id} transaction={tx} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default React.memo(GroupedTransactions);
