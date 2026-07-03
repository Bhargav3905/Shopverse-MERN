import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);
console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("ADMIN_EMAIL_ID:", process.env.ADMIN_EMAIL_ID);

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    family: 4,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

transporter.verify((error, success) => {
    console.log("===== SMTP VERIFY =====");

    if (error) {
        console.error(error);
    } else {
        console.log("SMTP READY");
        console.log(success);
    }

    console.log("=======================");
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