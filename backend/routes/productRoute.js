import { Router } from "express";
import upload from "../middleware/upload.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

import {
    addProduct, getProducts, getProduct, searchProducts,
    editProduct, deleteProduct, getProductsByCategory
} from "../controllers/productController.js";

const router = Router();

router.post("/add-product", protect, isAdmin, upload.single("image"), addProduct);

router.get("/list-product", getProducts);

router.get("/search", searchProducts);

router.get("/category/:categoryId", getProductsByCategory);

router.get("/product/:id", getProduct);

router.put("/edit-product/:id", protect, isAdmin, upload.single("image"), editProduct);

router.delete("/delete-product/:id", protect, isAdmin, deleteProduct);

export default router;