import React from "react";
import Image from "next/image";

import styles from "./Header.module.scss";

const Header = () => (
  <header className={styles.header}>
    <Image src='/logo.svg' width={125} height={37} alt='SumUp Logo' />
  </header>
);

export { Header };
