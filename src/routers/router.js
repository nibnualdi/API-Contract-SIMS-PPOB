import express from "express";
import authRouter from "./auth.js";
import profileRouter from "./profile.js";

const router = express.Router();

router.use("/", authRouter);
router.use("/", profileRouter);

export default router;