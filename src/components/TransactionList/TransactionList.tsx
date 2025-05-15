import React, { FC, PropsWithChildren } from "react";

import styles from "./TransactionList.module.scss";

const TransactionList: FC<PropsWithChildren> = ({ children }) => {
  return <ul className={styles.transactionList}>{children}</ul>;
};

export { TransactionList };
