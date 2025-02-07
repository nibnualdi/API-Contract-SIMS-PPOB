import { Router } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const router = Router();

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "API Contract SIMS PPOB",
      version: "0.1.0",
      description:
        "API Test",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Ibnu Aldi Nugroho",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/`,
        // url: `https://api-contract-sims-ppob-production.up.railway.app/`,
      },
    ],
  },
  apis: ["src/swagger/*.yml"],
};

const specs = swaggerJsdoc(options);

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

export default router;