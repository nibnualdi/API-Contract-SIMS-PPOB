import express from "express";
import { getABalanceByEmail } from "../controllers/balanceController.js";
import { accessTokenOnly } from "../middleware/authorization.js";

const router = express.Router();

router.get("/balance", [accessTokenOnly], getABalanceByEmail);

export default router;