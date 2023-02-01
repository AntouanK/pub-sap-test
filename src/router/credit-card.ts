// external libraries
import express from "express";
import bodyParser from "body-parser";

const router = express.Router();

/**
 * @openapi
 * /credit-card/add:
 *   post:
 *     description: creates a new credit card for a given name, card number, and limit
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post("/add", bodyParser.json(), (req, res) => {
  res.send("Add a credit card");
});

/**
 * @openapi
 * /credit-card/get-all:
 *  get:
 *   description: gets all credit cards
 *   responses:
 *     200:
 *       description: Returns a mysterious string.
 */
router.get("/get-all", (req, res) => {
  res.send("get all credit cards");
});

export default router;
