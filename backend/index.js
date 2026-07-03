import express from 'express'
const app = express()
const port = process.env.PORT || 3000;

import mongoose from 'mongoose';
import cors from 'cors';
import "./config/env.js";
import connectDB from "./config/db.js";
import productRoute from './routes/productRoute.js'
import contactRoute from './routes/contactRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import cartRoute from './routes/cartRoute.js';
import authRoute from "./routes/authRoute.js";
import orderRoute from "./routes/orderRoute.js";
import dashboardRoute from "./routes/dashboardRoute.js";
import userRoute from "./routes/userRoute.js";
import paymentRoute from "./routes/paymentRoute.js"

connectDB();

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "ShopVerse API is running successfully 🚀",
    });
});

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://shopverse-mern.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())

app.use('/uploads', express.static('uploads'))


app.use('/api/user', userRoute)

app.use('/api/products', productRoute);

app.use('/api/contacts', contactRoute);

app.use('/api/category', categoryRoute);

app.use('/api', cartRoute)

app.use('/api/auth', authRoute);

app.use('/api', orderRoute);

app.use("/api/dashboard", dashboardRoute);

app.use('/api/payment', paymentRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});