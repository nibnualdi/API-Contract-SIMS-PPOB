import express from "express";
import { transaction } from "../controllers/transactionController.js";
import { accessTokenOnly } from "../middleware/authorization.js";

const router = express.Router();

router.post("/transaction", [accessTokenOnly], transaction);

export default router;