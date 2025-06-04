import React from "react";

import { render } from "@testing-library/react";

import { TransactionList } from "./TransactionList";

describe("TransactionList", () => {
  it("should render matching default styles", () => {
    const { asFragment } = render(
      <TransactionList>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </TransactionList>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
