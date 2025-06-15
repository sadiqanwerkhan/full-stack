import React, { memo, PropsWithChildren } from "react";
import styles from "./TransactionList.module.scss";

const TransactionList = memo(function TransactionList({
  children,
}: PropsWithChildren) {
  return <ul className={styles.transactionList}>{children}</ul>;
});

TransactionList.displayName = "TransactionList";

export { TransactionList };
