console.log("[server]: Wait a moment!");

import express from "express";
import dotenv from "dotenv";
import routers from "./routers/router.js";
import swagger from "./swagger/config.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.use("/", routers);
app.use("/", swagger);

app.get("/", (_, res) => {
  res.send("Welcome!!");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});