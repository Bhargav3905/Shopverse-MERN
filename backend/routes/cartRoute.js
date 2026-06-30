import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    addToCart, clearCart, getCart,
    removeItem, updateQuantity,
} from "../controllers/cartController.js";

const router = Router();

router.post('/add-to-cart', protect, addToCart);

router.get('/get-cart', protect, getCart);

router.put('/update-quantity', protect, updateQuantity);

router.delete('/remove-item/:itemId', protect, removeItem);

router.delete('/clear-cart', protect, clearCart);

export default router;