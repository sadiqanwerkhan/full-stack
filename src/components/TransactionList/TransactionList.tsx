import React, { FC, PropsWithChildren, memo } from "react";
import styles from "./TransactionList.module.scss";

const TransactionList: FC<PropsWithChildren> = ({ children }) => {
  return <ul className={styles.transactionList}>{children}</ul>;
};

TransactionList.displayName = "TransactionList";

export const MemoizedTransactionList = memo(TransactionList);
export { TransactionList };
