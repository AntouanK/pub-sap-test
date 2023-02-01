// internal modules
import { CreditCard } from "./types";

// a mock in-memory key-value database for testing purposes only
const DATABASE = new Map();

const creditCardPrefix = "credit-card-";

// creates a string key for the credit card, based on its number
const createCreditCardKey = (creditCard: CreditCard) => {
  return `${creditCardPrefix}${creditCard.number}`;
};

// creates a key for the credit card and saves it to the database
// if the credit card already exists, throws an error
export const saveCreditCard = async (creditCard: CreditCard) => {
  const creditCardKey = createCreditCardKey(creditCard);

  // if that credit card already exists, throw an error
  if (DATABASE.has(creditCardKey)) {
    throw new Error("Credit card already exists");
  }

  DATABASE.set(creditCardKey, creditCard);
};

// returns all credit cards in the database
export const getAllCreditCards = async () => {
  const creditCards = [...DATABASE.keys()]
    .filter((key) => key.startsWith(creditCardPrefix))
    .map((key) => DATABASE.get(key));

  return creditCards;
};
