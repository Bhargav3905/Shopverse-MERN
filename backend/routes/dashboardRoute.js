import { Router } from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { getDashboardData } from "../controllers/dashboardController.js";

const router = Router();

router.get("/", protect, isAdmin, getDashboardData);

export default router;