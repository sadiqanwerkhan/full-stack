"use client";

import React, { memo } from "react";
import styles from "./LoadMorePagination.module.scss";

interface Props {
  hasMore: boolean;
  onLoadMore: () => void;
}

const LoadMorePagination = memo(function LoadMorePagination({
  hasMore,
  onLoadMore,
}: Props) {
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
});

LoadMorePagination.displayName = "LoadMorePagination";

export default LoadMorePagination;
