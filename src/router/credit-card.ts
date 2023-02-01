import express from "express";

const router = express.Router();

/**
 * "Add" will create a new credit card for a given name, card number, and limit
    - Card numbers should be validated using Luhn 10
    - New cards start with a £0 balance
    - for cards not compatible with Luhn 10, return an error
 */
router.get("/add", (req, res) => {
  res.send("Add a credit card");
});

/**
 * "Get all" returns all cards in the system
 */
router.get("/get-all", (req, res) => {
  res.send("get all credit cards");
});

export default router;
