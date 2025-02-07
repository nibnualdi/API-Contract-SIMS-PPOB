import express from "express";
import { getBanners } from "../controllers/bannerController.js";
import { accessTokenOnly } from "../middleware/authorization.js";

const router = express.Router();

router.get("/banner", [accessTokenOnly], getBanners);

export default router;