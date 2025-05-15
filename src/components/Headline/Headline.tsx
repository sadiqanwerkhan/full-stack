import { FC, PropsWithChildren } from "react";

import styles from "./Headline.module.scss";

const Headline: FC<PropsWithChildren> = ({ children }) => {
  return <h1 className={`${styles.headline} headlineOne`}>{children}</h1>;
};

export { Headline };
