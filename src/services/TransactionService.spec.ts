import { generateTransactions } from "./TransactionService";

describe("TransactionService", () => {
  describe("generateTransactions", () => {
    it("should generate random transactions", () => {
      const transactions = generateTransactions(10);

      expect(transactions).toHaveLength(10);

      transactions.forEach((transaction) => {
        expect(transaction).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            amount: expect.any(Number),
            date: expect.any(String),
            currency: expect.any(String),
            paymentMethod: expect.any(String),
            status: expect.any(String),
          })
        );
      });
    });
  });
});
