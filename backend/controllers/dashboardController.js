import Product from "../models/product.js";
import Category from "../models/category.js";
import User from "../models/user.js";
import Order from "../models/order.js";

export const getDashboardData = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalCategories = await Category.countDocuments();
        const totalUsers = await User.countDocuments({ role: "user" });
        const totalOrders = await Order.countDocuments();

        const orders = await Order.find();
        const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

        res.status(200).json({
            totalProducts,
            totalCategories,
            totalUsers,
            totalOrders,
            totalRevenue
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}