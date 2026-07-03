import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getOrders } from "../controllers/orderController.js";

const router = Router();

router.get("/orders", protect, getOrders);

export default router;