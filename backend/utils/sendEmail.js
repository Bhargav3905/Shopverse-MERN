import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.ADMIN_EMAIL_ID,
        pass: process.env.ADMIN_APP_PASS,
    },
});

// Verify SMTP connection once when the server starts
transporter.verify((error) => {
    if (error) {
        console.log("SMTP Error");
    } else {
        console.log("SMTP Ready");
    }
});

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.ADMIN_EMAIL_ID,
        to,
        subject,
        text,
    };

    await transporter.sendMail(mailOptions);
};

export default sendEmail;