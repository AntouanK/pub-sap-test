import { describe, expect, test } from "@jest/globals";
import { validateCreditCardNumber } from "./luhn";

// create a test for the validateCreditCardNumber function
// it should return true for valid credit card numbers
// and false for invalid credit card numbers
describe("validateCreditCardNumber", () => {
  test("should return true for valid credit card numbers", () => {
    expect(validateCreditCardNumber("4111111111111111")).toBe(true);
    expect(validateCreditCardNumber("5500000000000004")).toBe(true);
    expect(validateCreditCardNumber("378282246310005")).toBe(true);
    expect(validateCreditCardNumber("6011111111111117")).toBe(true);
    expect(validateCreditCardNumber("6011000400000000")).toBe(true);
    expect(validateCreditCardNumber("4917610000000000003")).toBe(true);
    expect(validateCreditCardNumber("4917300800000000")).toBe(true);
  });

  test("should return false for invalid credit card numbers", () => {
    expect(validateCreditCardNumber("4111111111111112")).toBe(false);
    expect(validateCreditCardNumber("5500000000000005")).toBe(false);
    expect(validateCreditCardNumber("378282246310006")).toBe(false);
    expect(validateCreditCardNumber("6011111111111118")).toBe(false);
    expect(validateCreditCardNumber("adasd")).toBe(false);
    expect(validateCreditCardNumber("111")).toBe(false);
    expect(validateCreditCardNumber("1111111111111111")).toBe(false);
  });
});
