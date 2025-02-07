console.log("[server]: Wait a moment!");

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routers from "./routers/router.js";
import swagger from "./swagger/config.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors());

const port = process.env.PORT || 3000;

app.use("/", routers);
app.use("/", swagger);

app.get("/", (_, res) => {
  res.send("Welcome!!");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});