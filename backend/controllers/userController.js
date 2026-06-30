import User from '../models/user.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    try {
        const { email, password, fullName, phone } = req.body;

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(402).json({ 
                message: "User already exists",
                redirectToLogin: true
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({ email, password: hashedPassword, fullName, phone, role: "user" })

        return res.status(201).json({ message: "Registration successful" })
    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(403).json({
                message: "Account not found",
                redirectToRegister: true
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid Email or Password" })
        }

        const token = jwt.sign(
            {
                userId: existingUser._id,
                role: existingUser.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        return res.status(200).json({
            message: "Login Successful",
            token,
            userEmail: existingUser.email,
            userRole: existingUser.role,
            userFullName: existingUser.fullName
        })
    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
}