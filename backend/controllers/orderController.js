import Order from "../models/order.js";

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id })
            .populate("products.product")
            .sort({ createdAt: -1 });

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};