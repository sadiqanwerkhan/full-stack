"use client";

import React, { memo, useCallback } from "react";
import styles from "./PaymentFilter.module.scss";
import { PaymentType } from "@/types/transaction";

interface Props {
  selectedType: PaymentType | null;
  onChange: (type: PaymentType | null) => void;
}

const PaymentFilter = ({ selectedType, onChange }: Props) => {
  const handleSelect = useCallback(
    (type: PaymentType | null) => {
      onChange(type);
    },
    [onChange]
  );

  const options: { label: string; value: PaymentType | null; icon: string }[] =
    [
      { label: "Card", value: "card", icon: "💳" },
      { label: "Cash", value: "cash", icon: "💵" },
      { label: "Reset", value: null, icon: "" },
    ];

  return (
    <div className={styles.wrapper}>
      {options.map(({ label, value, icon }) => {
        const isActive = value !== null && selectedType === value;
        const isReset = value === null;

        return (
          <button
            key={label}
            onClick={() => handleSelect(value)}
            className={`${styles.button} ${isActive ? styles.active : ""} ${
              isReset ? styles.reset : ""
            }`}
          >
            {icon} {label}
          </button>
        );
      })}
    </div>
  );
};

export default memo(PaymentFilter);
