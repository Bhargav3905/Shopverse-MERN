import Category from "../models/category.js";

export const addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const image = req.file.filename;

        const category = await new Category(
            { categoryName, image }
        )
        await category.save();
        res.status(200).json({ message: "category added successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

export const getCategories = async (req, res) => {
    try {
        const categoryList = await Category.find();
        res.status(200).json({ category: categoryList })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

export const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryName } = req.body;
        const image = req.file ? req.file.filename : null;

        const existingCategory = await Category.findById(id);
        if (!existingCategory) {
            return res.status(404).json({ message: "category not found" })
        }

        const updatedData = {
            categoryName: categoryName,
            image: image || existingCategory.image
        }

        const updateCategory = await Category.findByIdAndUpdate(id, updatedData);
        if (!updateCategory) {
            return res.status(404).json({ message: "category not found" })
        }

        res.status(200).json({ message: "category updated successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);
        res.status(200).json({ message: "category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

export const getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        res.status(200).json({ categoryList: category })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}