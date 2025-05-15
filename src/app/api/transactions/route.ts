import { generateTransactions } from "../../../services/TransactionService";

const transactions = generateTransactions(100);

export async function GET() {
  return Response.json({
    total: transactions.length,
    transactions,
  });
}
