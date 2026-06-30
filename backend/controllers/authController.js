import User from "../models/user.js";
import bcrypt from "bcrypt";
import PasswordReset from "../models/passwordReset.js";
import sendEmail from "../utils/sendEmail.js";

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await PasswordReset.deleteMany({ email });
        await PasswordReset.create({ email, otp, expiresAt: new Date(Date.now() + 5 * 60 * 1000) });

        sendEmail(email, "ShopVerse Password Reset OTP", `Your OTP is ${otp}. It expires in 5 minutes.`);
        res.status(200).json({ message: "OTP sent successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body;

        const reset = await PasswordReset.findOne({ email, otp });
        if (!reset) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        if (reset.expiresAt < new Date()) {
            return res.status(400).json({ message: "OTP expired" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate({ email }, { password: hashedPassword });

        await PasswordReset.deleteMany({ email });
        res.status(200).json({ message: "Password updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const changePassword = async (req, res) => {
    try {
        const user = req.user;
        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};