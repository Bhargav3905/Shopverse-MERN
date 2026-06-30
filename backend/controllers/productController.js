import Product from "../models/product.js";
import mongoose from "mongoose";

export const addProduct = async (req, res) => {
    try {
        const { productName, category, description, price } = req.body;
        const image = req.file.filename;
        const product = await Product.create({ productName, category, description, price, image });

        res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("category");

        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("category");
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ productList: product });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, category, description, price } = req.body;

        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updatedData = {
            productName, category, description, price,
            image: req.file ? req.file.filename : existingProduct.image
        };

        await Product.findByIdAndUpdate(id, updatedData);
        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: "Invalid category id" });
        }

        const products = await Product.find({ category: categoryId })
            .populate("category");

        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const searchProducts = async (req, res) => {
    try {
        const { query } = req.query;
        const products = await Product.find({ productName: { $regex: query, $options: "i" } })
            .populate("category");

        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};