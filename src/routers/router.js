import express from "express";
import authRouter from "./auth.js";
import profileRouter from "./profile.js";
import bannerRouter from "./banner.js";

const router = express.Router();

router.use("/", authRouter);
router.use("/", profileRouter);
router.use("/", bannerRouter);

export default router;