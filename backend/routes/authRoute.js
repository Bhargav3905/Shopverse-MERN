import { Router } from "express";
import { forgotPassword, changePassword, resetPassword } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.put("/change-password", protect, changePassword);

export default router;