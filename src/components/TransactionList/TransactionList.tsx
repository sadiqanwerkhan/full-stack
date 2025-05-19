import React, { FC, PropsWithChildren, memo } from "react";

import styles from "./TransactionList.module.scss";

const TransactionList = memo(({ children }: PropsWithChildren) => {
  return <ul className={styles.transactionList}>{children}</ul>;
});

export { TransactionList };
