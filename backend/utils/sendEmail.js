import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.ADMIN_EMAIL_ID,
        pass: process.env.ADMIN_APP_PASS,
    },
    requireTLS: true,
    tls: {
        rejectUnauthorized: false,
        family: 4,
    },
});

// Verify SMTP connection once when the server starts
transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP VERIFY ERROR:");
        console.error(error);
    } else {
        console.log("SMTP Ready");
        console.log(success);
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
        console.error("EMAIL SEND ERROR");
        console.error(error);
    }
};

export default sendEmail;