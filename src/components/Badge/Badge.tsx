import { FC } from "react";

import { PaymentStatus } from "../../constants/TransactionConstants";
import styles from "./Badge.module.scss";

const COLOR_MAP = {
  [PaymentStatus.Successful]: styles["badge-success"],
  [PaymentStatus.Failed]: styles["badge-failed"],
  [PaymentStatus.Refunded]: styles["badge-refunded"],
};

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: PaymentStatus;
}

const Badge: FC<BadgeProps> = (props) => {
  const badgeClass = COLOR_MAP[props.status];

  return (
    <div className={`${styles.badge} ${badgeClass}`}>{props.children}</div>
  );
};

export { Badge };
