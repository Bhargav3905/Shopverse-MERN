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
        console.log(error);
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

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent");
    } catch (error) {
        console.log(error);
    }
};

export default sendEmail;