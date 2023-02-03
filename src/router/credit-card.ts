// external libraries
import express from "express";
import bodyParser from "body-parser";

// internal modules
import { createCreditCard } from "../types";
import { getAllCreditCards, saveCreditCard } from "../db";

const router = express.Router();

/**
 * @openapi
 * /credit-card/add:
 *   post:
 *     description: "creates a new credit card for a given name, card number, and limit."
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              card:
 *                type: object
 *                properties:
 *                  number:
 *                    type: string
 *                    description: "the credit card number"
 *                    example: "5555555555554444"
 *                  firstName:
 *                    type: string
 *                    description: "the first name of the card holder"
 *                    example: "John"
 *                  lastName:
 *                    type: string
 *                    description: "the last name of the card holder"
 *                    example: "Doe"
 *                  limit:
 *                    type: number
 *                    description: "the credit limit of the card"
 *                    example: 1000
 *
 *     responses:
 *       200:
 *         description: Returns a message, a success flag and the new card.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *                 card:
 *                   type: object
 *                   properties:
 *                     number:
 *                       type: string
 *                       description: "the credit card number"
 *                       example: "5555555555554444"
 *                     firstName:
 *                       type: string
 *                       description: "the first name of the card holder"
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       description: "the last name of the card holder"
 *                       example: "Doe"
 *                     limit:
 *                       type: number
 *                       description: "the credit limit of the card"
 *                       example: 1000
 */
router.post("/add", bodyParser.json(), async (req, res) => {
  // expect the request body to be a JSON object with the following fields:
  // { card : CreditCard }
  const body = req.body;

  // check if card is present
  if (!body.card) {
    res.status(400).send("Missing credit card");
    return;
  }

  let newCard;
  // check if card is valid
  try {
    newCard = createCreditCard(body.card);
  } catch (error: any) {
    res.status(400).send(error.message);
    return;
  }

  // try to save the credit card
  try {
    await saveCreditCard(newCard);
  } catch (error: any) {
    const statusCode =
      error.message === "Credit card already exists" ? 400 : 500;
    if (statusCode === 500) {
      // log for dev / debug purposes
      console.log("[ERROR]", error.message);
    }
    res.status(statusCode).send(error.message);
    return;
  }

  const responseBody = {
    message: "Credit card created",
    success: true,
    card: newCard,
  };

  res.json(responseBody);
});

/**
 * @openapi
 * /credit-card/get-all:
 *  get:
 *    description: Returns all saved credit cards.
 *    responses:
 *      200:
 *       description: Returns a message, a success flag and all cards.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               success:
 *                 type: boolean
 *               creditCards:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     number:
 *                       type: string
 *                       description: "the credit card number"
 *                       example: "5555555555554444"
 *                     firstName:
 *                       type: string
 *                       description: "the first name of the card holder"
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       description: "the last name of the card holder"
 *                       example: "Doe"
 *                     limit:
 *                       type: number
 *                       description: "the credit limit of the card"
 *                       example: 1000
 *
 */
router.get("/get-all", async (_req, res) => {
  let creditCards;
  try {
    creditCards = await getAllCreditCards();
  } catch (error: any) {
    // log for dev / debug purposes
    console.log("[ERROR]", error.message);

    // return a 500 error to the client
    res.status(500).send("Something went wrong while retrieving credit cards");
    return;
  }

  const responseBody = {
    message: "Credit cards retrieved",
    success: true,
    creditCards,
  };
  res.json(responseBody);
});

export default router;
