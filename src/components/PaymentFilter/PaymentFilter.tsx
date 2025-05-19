"use client";

import styles from "./PaymentFilter.module.scss";
import { PaymentType } from "@/types/transaction";

interface Props {
  selectedType: PaymentType | null;
  onChange: (type: PaymentType | null) => void;
}

const PaymentFilter = ({ selectedType, onChange }: Props) => {
  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.button} ${
          selectedType === "card" ? styles.active : ""
        }`}
        onClick={() => onChange("card")}
      >
        💳 Card
      </button>
      <button
        className={`${styles.button} ${
          selectedType === "cash" ? styles.active : ""
        }`}
        onClick={() => onChange("cash")}
      >
        💵 Cash
      </button>
      <button
        className={styles.button}
        onClick={() => onChange(null)}
        style={{ color: "gray", fontStyle: "italic" }}
      >
        Reset
      </button>
    </div>
  );
};

export default PaymentFilter;
