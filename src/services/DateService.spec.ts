import { formatDate } from "./DateService";

describe("DateService", () => {
  it("should return a valid formatted date", () => {
    const date = new Date("2020-01-11T18:32:32.605Z");
    expect(formatDate(date)).toBe("11/01/2020");
  });
});
