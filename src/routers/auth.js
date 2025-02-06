import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/registration", signup);
router.post("/login", login);

export default router;