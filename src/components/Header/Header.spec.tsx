import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";

import { Header } from "./Header";

describe("Header", () => {
  it("should render matching default styles", () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
