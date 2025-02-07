import express from "express";
import authRouter from "./auth.js";
import profileRouter from "./profile.js";
import bannerRouter from "./banner.js";
import serviceRouter from "./service.js";

const router = express.Router();

router.use("/", authRouter);
router.use("/", profileRouter);
router.use("/", bannerRouter);
router.use("/", serviceRouter);

export default router;