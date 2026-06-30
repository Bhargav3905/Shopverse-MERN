import crypto from "crypto";
import AddToCart from "../models/addToCart.js";
import Order from "../models/order.js";
import razorpayInstance from "./razorpay.js";

export const createOrder = async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await AddToCart.findOne({ userId })
            .populate("items.product");
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        let totalAmount = 0;

        cart.items.forEach(item => {
            totalAmount += item.product.price * item.quantity;
        });

        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const razorpayOrder = await razorpayInstance.orders.create(options);

        return res.status(200).json({
            success: true,
            order: razorpayOrder,
            amount: totalAmount
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id,  razorpay_payment_id, razorpay_signature } = req.body;

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid Signature"
            });
        }

        const userId = req.user._id;

        const cart = await AddToCart.findOne({ userId })
            .populate("items.product");

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        let total = 0;

        const products = cart.items.map(item => {
            total += item.product.price * item.quantity;
            return {
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            };
        });

        await Order.create({
            userId,
            products,
            totalAmount: total,
            paymentStatus: "Paid",
            paymentMethod: "Razorpay"
        });

        cart.items = [];
        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Payment Successful"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};