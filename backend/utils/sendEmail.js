import dotenv from "dotenv";
dotenv.config();

import axios from "axios";

const sendEmail = async (to, subject, text) => {
    await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
            sender: {
                name: "ShopVerse",
                email: process.env.ADMIN_EMAIL_ID,
            },
            to: [
                {
                    email: to,
                },
            ],
            subject,
            textContent: text,
        },
        {
            headers: {
                "api-key": process.env.BREVO_API_KEY,
                "Content-Type": "application/json",
            },
        }
    );
};

export default sendEmail;