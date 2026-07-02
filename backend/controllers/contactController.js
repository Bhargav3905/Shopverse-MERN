import sendEmail from "../utils/sendEmail.js";

export const sendContactMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        await sendEmail(
            process.env.ADMIN_EMAIL_ID,
            `Contact Form: ${subject}`,
            `Name: ${name} \nEmail: ${email} \nMessage: ${message}`
        );

        res.status(200).json({ message: "Message recieved successfully" })
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Unable to send email"
        });
    }
}