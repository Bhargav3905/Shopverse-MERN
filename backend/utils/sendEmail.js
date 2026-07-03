import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("ADMIN_EMAIL_ID:", process.env.ADMIN_EMAIL_ID);

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP Error:", error);
    } else {
        console.log("SMTP Ready");
    }
});

const sendEmail = async (to, subject, text) => {
    await transporter.sendMail({
        from: `"ShopVerse" <${process.env.ADMIN_EMAIL_ID}>`,
        to,
        subject,
        text,
    });

    console.log("Email sent");
};

export default sendEmail;