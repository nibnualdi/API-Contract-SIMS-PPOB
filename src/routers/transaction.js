import express from "express";
import { transaction, getTransactionHistoryByEmail } from "../controllers/transactionController.js";
import { accessTokenOnly } from "../middleware/authorization.js";

const router = express.Router();

router.post("/transaction", [accessTokenOnly], transaction);
router.get("/transaction/history", [accessTokenOnly], getTransactionHistoryByEmail);

export default router;