// external libraries
import fastLuhn from "fast-luhn";

type CreditCard = {
  number: string;
  firstName: string;
  lastName: string;
  limit: number;
};

export const createCreditCard = (creditCard: CreditCard) => {
  // validate credit card number
  if (!fastLuhn(creditCard.number)) {
    throw new Error("Invalid credit card number");
  }
  // validate limit
  if (creditCard.limit < 0) {
    throw new Error("Invalid credit card limit");
  }
  // validate name
  if (creditCard.firstName.length === 0 || creditCard.lastName.length === 0) {
    throw new Error("Invalid credit card name");
  }

  return creditCard;
};
