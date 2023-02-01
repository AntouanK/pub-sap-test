import express from "express";
import routerCreditCard from "./router/credit-card";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/credit-card", routerCreditCard);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
