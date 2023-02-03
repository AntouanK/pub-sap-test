// external libraries
import express from "express";
import request from "supertest";
import assert from "assert";

// internal modules
import router from "./credit-card";

const app = express();

app.use(router);

const card = {
  number: "5555555555554444",
  firstName: "John",
  lastName: "Doe",
  limit: 1000,
};

// test the POST /add route
describe("POST /add", () => {
  it("should return 200 OK", () => {
    return request(app)
      .post("/add")
      .send({ card })
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("should return an error of 400 if limit is missing", () => {
    return request(app)
      .post("/add")
      .send({ card: Object.assign({}, card, { limit: undefined }) })
      .expect(400)
      .then((response) =>
        assert(response.text === "Credit card already exists")
      );
  });

  it("should return an error of 400 if card number is invalid", () => {
    return request(app)
      .post("/add")
      .send({ card: Object.assign({}, card, { number: "123" }) })
      .expect(400)
      .then((response) =>
        assert(response.text === "Invalid credit card number")
      );
  });

  it("should return an error of 400 if first name is missing", () => {
    return request(app)
      .post("/add")
      .send({ card: Object.assign({}, card, { firstName: undefined }) })
      .expect(400)
      .then((response) => {
        assert(response.text === "Invalid credit card name");
      });
  });

  it("should return an error of 400 if last name is missing", () => {
    return request(app)
      .post("/add")
      .send({ card: Object.assign({}, card, { lastName: undefined }) })
      .expect(400)
      .then((response) => assert(response.text === "Invalid credit card name"));
  });

  it("should return an error of 400 if both first and last name are missing", () => {
    return request(app)
      .post("/add")
      .send({
        card: Object.assign({}, card, {
          firstName: undefined,
          lastName: undefined,
        }),
      })
      .expect(400)
      .then((response) => assert(response.text === "Invalid credit card name"));
  });

  it("should return an error of 400 if card already exists", async () => {
    await request(app).post("/add").send({ card });

    return request(app)
      .post("/add")
      .send({ card })
      .expect(400)
      .then((response) =>
        assert(response.text === "Credit card already exists")
      );
  });
});

// test the /get-all route
describe("GET /get-all", () => {
  it("should return 200 OK", async () => {
    await request(app).post("/add").send({ card });

    const card2 = {
      number: "4242424242424242",
      firstName: "Jane",
      lastName: "Doe",
      limit: 6000,
    };
    await request(app).post("/add").send({ card: card2 });

    const card3 = {
      number: "6011111111111117",
      firstName: "Bob",
      lastName: "Doe",
      limit: 3000,
    };
    await request(app).post("/add").send({ card: card3 });

    return request(app)
      .get("/get-all")
      .expect(200)
      .then((response) => {
        const { creditCards } = response.body;
        assert(creditCards.length === 3);
        assert(creditCards[0].number === card.number);
        assert(creditCards[1].number === card2.number);
        assert(creditCards[2].number === card3.number);
      });
  });
});
