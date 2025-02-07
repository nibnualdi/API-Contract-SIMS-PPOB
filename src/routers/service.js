import express from "express";
import { getServices } from "../controllers/serviceController.js";
import { accessTokenOnly } from "../middleware/authorization.js";

const router = express.Router();

router.get("/services", [accessTokenOnly], getServices);

export default router;