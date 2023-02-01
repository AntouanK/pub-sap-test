// external libraries
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import express from "express";

// swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Credit card processing",
      version: "1.0.0",
    },
  },
  apis: ["./src/**/*.ts"], // files containing annotations as above
};
const openapiSpecification = swaggerJsdoc(swaggerOptions);

export const addDocsRoute = (app: express.Application) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
};
