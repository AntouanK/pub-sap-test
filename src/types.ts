import { validateCreditCardNumber } from "./luhn";

export type CreditCard = {
  number: string;
  firstName: string;
  lastName: string;
  limit: number;
};

export const createCreditCard = (creditCard: CreditCard) => {
  // validate credit card number
  // it must be all digits, 13 to 19 digits long, and pass the Luhn algorithm
  if (!/^\d{13,19}$/.test(creditCard.number)) {
    throw new Error("Invalid credit card number");
  }
  // validate number
  if (!validateCreditCardNumber(creditCard.number)) {
    throw new Error("Invalid credit card number");
  }
  // validate limit
  if (creditCard.limit < 0) {
    throw new Error("Invalid credit card limit");
  }
  // validate name
  if (
    typeof creditCard.firstName !== "string" ||
    creditCard.firstName.length === 0 ||
    typeof creditCard.lastName !== "string" ||
    creditCard.lastName.length === 0
  ) {
    throw new Error("Invalid credit card name");
  }

  return creditCard;
};
