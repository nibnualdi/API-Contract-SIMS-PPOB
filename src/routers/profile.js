import express from "express";
import { getAProfile, updateAProfile, updateProfileImage } from "../controllers/profileController.js";
import { accessTokenOnly } from "../middleware/authorization.js";

const router = express.Router();

router.get("/profile", [accessTokenOnly], getAProfile);
router.put("/profile/update", [accessTokenOnly], updateAProfile);
router.put("/profile/image", [accessTokenOnly], updateProfileImage);

export default router;