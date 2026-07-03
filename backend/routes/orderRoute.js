import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getOrders } from "../controllers/orderController.js";

const router = Router();

router.get("/orders", protect, getOrders);

router.get("/test-mail", async (req, res) => {
    try {
        await sendEmail(
            process.env.ADMIN_EMAIL_ID,
            "SMTP TEST",
            "Hello from Render"
        );

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

export default router;