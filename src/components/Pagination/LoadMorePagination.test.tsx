import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadMorePagination from "./LoadMorePagination";

describe("LoadMorePagination", () => {
  it("does not render if hasMore is false", () => {
    const { container } = render(
      <LoadMorePagination hasMore={false} onLoadMore={() => {}} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders button if hasMore is true", () => {
    render(<LoadMorePagination hasMore={true} onLoadMore={() => {}} />);
    expect(
      screen.getByRole("button", { name: /load more items/i })
    ).toBeInTheDocument();
  });

  it("calls onLoadMore when button is clicked", () => {
    const mockFn = jest.fn();
    render(<LoadMorePagination hasMore={true} onLoadMore={mockFn} />);
    fireEvent.click(screen.getByRole("button", { name: /load more items/i }));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
