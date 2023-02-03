// external libraries
import express from "express";

// internal modules
import routerCreditCard from "./router/credit-card";
import { addDocsRoute } from "./swagger";

const app = express();

app.use("/credit-card", routerCreditCard);

addDocsRoute(app);

app.listen(3333, () => {
  console.log("[start] app listening on port 3333!");
  console.log("[start] Swagger docs available at http://localhost:3333/docs");
});
