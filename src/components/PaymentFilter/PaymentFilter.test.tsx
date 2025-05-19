import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import PaymentFilter from "./PaymentFilter";
import { PaymentType } from "@/types/transaction";

describe("PaymentFilter", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders all buttons", () => {
    render(<PaymentFilter selectedType={null} onChange={mockOnChange} />);
    expect(
      screen.getByText((content) => content.includes("Card"))
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("Cash"))
    ).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it('calls onChange with "card" when Card button is clicked', () => {
    render(<PaymentFilter selectedType={null} onChange={mockOnChange} />);
    fireEvent.click(screen.getByText((c) => c.includes("Card")));
    expect(mockOnChange).toHaveBeenCalledWith("card");
  });

  it('calls onChange with "cash" when Cash button is clicked', () => {
    render(<PaymentFilter selectedType={null} onChange={mockOnChange} />);
    fireEvent.click(screen.getByText((c) => c.includes("Cash")));
    expect(mockOnChange).toHaveBeenCalledWith("cash");
  });

  it("calls onChange with null when Reset button is clicked", () => {
    render(<PaymentFilter selectedType="card" onChange={mockOnChange} />);
    fireEvent.click(screen.getByText("Reset"));
    expect(mockOnChange).toHaveBeenCalledWith(null);
  });
});
