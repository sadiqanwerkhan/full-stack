import React, { memo } from "react";
import Image from "next/image";

import styles from "./Header.module.scss";

const Header = memo(() => (
  <header className={styles.header}>
    <Image src="/logo.svg" width={125} height={37} alt="SumUp Logo" />
  </header>
));

export { Header };
