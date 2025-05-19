"use client";

import React from "react";
import styles from "./LoadMorePagination.module.scss";

interface Props {
  hasMore: boolean;
  onLoadMore: () => void;
}

const LoadMorePagination: React.FC<Props> = ({ hasMore, onLoadMore }) => {
  if (!hasMore) return null;

  return (
    <div className={styles.wrapper}>
      <button
        onClick={onLoadMore}
        className={styles.button}
        aria-label="Load more items"
      >
        Load more
      </button>
    </div>
  );
};

export default LoadMorePagination;
