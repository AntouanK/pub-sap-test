// a function to validate a credit card number using the luhn 10 algorithm
// https://en.wikipedia.org/wiki/Luhn_algorithm
export const validateCreditCardNumber = (creditCardNumber: string) => {
  // convert to array of digits
  const digits = creditCardNumber.split("").map((digit) => parseInt(digit, 10));
  // reverse the digits
  digits.reverse();
  // double every other digit
  const doubledDigits = digits.map((digit, index) => {
    if (index % 2 === 1) {
      return digit * 2;
    }
    return digit;
  });
  // subtract 9 from any number that is now greater than 9
  const subtractedDigits = doubledDigits.map((digit) => {
    if (digit > 9) {
      return digit - 9;
    }
    return digit;
  });
  // sum all the digits
  const sum = subtractedDigits.reduce((sum, digit) => sum + digit, 0);
  // if the sum is a multiple of 10, the number is valid
  return sum % 10 === 0;
};
