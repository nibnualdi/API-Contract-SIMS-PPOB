import express from "express";
import { getAProfile } from "../controllers/profileController.js";
import { accessTokenOnly } from "../middleware/authorization.js";

const router = express.Router();

router.get("/profile", [accessTokenOnly], getAProfile);

export default router;