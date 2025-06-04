import "@testing-library/jest-dom";

import React from "react";

import { Headline } from "./Headline";
import { render } from "@testing-library/react";

describe("Headline", () => {
  it("should render and match styles", () => {
    const { asFragment } = render(<Headline>Headline</Headline>);
    expect(asFragment()).toMatchSnapshot();
  });
});
