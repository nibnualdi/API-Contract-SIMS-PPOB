import express from "express";
import { getAProfile, updateAProfile } from "../controllers/profileController.js";
import { accessTokenOnly } from "../middleware/authorization.js";

const router = express.Router();

router.get("/profile", [accessTokenOnly], getAProfile);
router.put("/profile/update", [accessTokenOnly], updateAProfile);

export default router;