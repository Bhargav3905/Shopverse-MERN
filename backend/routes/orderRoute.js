import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getOrders } from "../controllers/orderController.js";

const router = Router();

router.get("/orders", protect, getOrders);

router.get("/test-mail", async (req, res) => {
    try {
        console.log("TEST MAIL START");

        await sendEmail(
            process.env.ADMIN_EMAIL_ID,
            "Render SMTP Test",
            "Hello from Render"
        );

        console.log("MAIL SENT");

        res.json({
            success: true
        });

    } catch (err) {
        console.error("TEST ROUTE ERROR");
        console.error(err);

        res.status(500).json(err);
    }
});

export default router;