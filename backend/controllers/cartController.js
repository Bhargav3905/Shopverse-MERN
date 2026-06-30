import AddToCart from "../models/addToCart.js";
import Category from "../models/category.js";
import Product from "../models/product.js";

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const user = req.user._id
        let cart = await AddToCart.findOne({ userId: user })

        if (!cart) {
            cart = await AddToCart.create({
                userId: user,
                items: [
                    {
                        product: productId,
                        quantity
                    }
                ]
            })
        } else {
            const itemIndex = cart.items.findIndex((item) => item.product && item.product.toString() === productId)

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity
            } else {
                cart.items.push({
                    product: productId,
                    quantity
                })
            }
        }

        await cart.save();
        res.status(200).json({ message: "Product is added to cart successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

export const getCart = async (req, res) => {
    try {
        const user = req.user._id;
        
        let cart = await AddToCart.findOne({ userId: user })
            .populate({
                path: "items.product",
                populate: {
                    path: "category",
                    model: "Category"
                }
            });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Remove deleted products automatically
        cart.items = cart.items.filter(item => item.product);
        await cart.save();

        res.status(200).json({ cartItems: cart.items })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

export const updateQuantity = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const user = req.user._id;

        let cart = await AddToCart.findOne({ userId: user })
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" })
        }

        const itemIndex = cart.items.findIndex((item) => item.product && item.product.toString() === productId)
        if (itemIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }
        // If quantity becomes 0 or less, remove item
        if (quantity <= 0) {
            cart.items.splice(itemIndex, 1);
        }
        else {
            cart.items[itemIndex].quantity = quantity;
        }

        await cart.save();
        res.status(200).json({ message: "Product quantity updated successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

export const removeItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const user = req.user._id;

        let cart = await AddToCart.findOne({ userId: user })
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" })
        }

        const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId)
        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1)
            await cart.save()
        }

        res.status(200).json({ message: "Product deleted from cart successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

export const clearCart = async (req, res) => {
    try {
        const user = req.user._id;
        const cart = await AddToCart.findOne({ userId: user });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = [];
        await cart.save();

        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}