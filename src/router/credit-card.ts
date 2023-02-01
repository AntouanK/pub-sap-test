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
 *     description: "creates a new credit card for a given name, card number, and limit. ( test card number: 5555555555554444 )"
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
 *                  firstName:
 *                    type: string
 *                  lastName:
 *                    type: string
 *                  limit:
 *                    type: number
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
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     limit:
 *                       type: number
 *
 *
 */
router.post("/add", bodyParser.json(), (req, res) => {
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
    saveCreditCard(newCard);
  } catch (error: any) {
    res.status(400).send(error.message);
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
 *               cards:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     number:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     limit:
 *                       type: number
 *
 */
router.get("/get-all", (_req, res) => {
  const responseBody = {
    message: "Credit cards retrieved",
    success: true,
    cards: getAllCreditCards(),
  };
  res.json(responseBody);
});

export default router;
