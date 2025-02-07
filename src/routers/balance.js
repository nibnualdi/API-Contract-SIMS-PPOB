import express from "express";
import { getABalanceByEmail, topup } from "../controllers/balanceController.js";
import { accessTokenOnly } from "../middleware/authorization.js";

const router = express.Router();

router.get("/balance", [accessTokenOnly], getABalanceByEmail);
router.post("/topup", [accessTokenOnly], topup);

export default router;