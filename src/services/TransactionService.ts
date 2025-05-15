/**
 * Transactions are generated randomly. In a real-world application, they would
 * be fetched from a backend API or a database.
 */

import {
  PaymentMethods,
  PaymentStatus,
} from "../constants/TransactionConstants";

// Card transactions should be twice as likely as cash ones.
const WEIGHTED_PAYMENT_METHODS = [
  PaymentMethods.CARD,
  PaymentMethods.CARD,
  PaymentMethods.CASH,
];

// Successful transactions should be 3 times as likely as refunded or failed ones.
const WEIGHTED_PAYMENT_STATUSES = [
  PaymentStatus.Successful,
  PaymentStatus.Successful,
  PaymentStatus.Successful,
  PaymentStatus.Refunded,
  PaymentStatus.Failed,
];

function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function getRandomIndexFromArray(array: unknown[]) {
  const index = generateRandomNumber(0, array.length - 1);
  return array[index];
}

function generateRandomAmount(min: number, max: number, decimals = 2) {
  const factor = 10 ** decimals;
  return generateRandomNumber(min * factor, max * factor) / factor;
}

function generateRandomDate(minTimestamp: number, maxTimestamp: number) {
  const timestamp = generateRandomNumber(minTimestamp, maxTimestamp);
  return new Date(timestamp).toISOString();
}

export function generateTransactions(length: number) {
  const today = new Date().getTime();
  const oneMonthAgo = today - 30 * 24 * 60 * 60 * 1000;
  return Array.from({ length })
    .map(() => ({
      date: generateRandomDate(oneMonthAgo, today),
      amount: generateRandomAmount(0, 500),
      currency: "EUR",
      paymentMethod: getRandomIndexFromArray(WEIGHTED_PAYMENT_METHODS),
      status: getRandomIndexFromArray(WEIGHTED_PAYMENT_STATUSES),
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((transaction, index) => ({ id: length - index, ...transaction }));
}
