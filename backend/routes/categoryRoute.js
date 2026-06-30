import { Router } from "express";
import upload from "../middleware/upload.js";
import { isAdmin, protect } from "../middleware/authMiddleware.js";
import {
    addCategory, deleteCategory, editCategory,
    getCategories, getCategory
} from "../controllers/categoryController.js";

const router = Router();

router.post('/add-category', protect, isAdmin, upload.single('image'), addCategory)

router.get('/list-category', getCategories)

router.put('/edit-category/:id', protect, isAdmin, upload.single('image'), editCategory)

router.delete('/delete-category/:id', protect, isAdmin, deleteCategory)

router.get('/category/:id', getCategory)

export default router;