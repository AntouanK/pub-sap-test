// external libraries
import express from "express";

// internal modules
import routerCreditCard from "./router/credit-card";
import { addDocsRoute } from "./swagger";

const app = express();

app.use("/credit-card", routerCreditCard);

addDocsRoute(app);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
