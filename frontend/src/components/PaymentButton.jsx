import axiosInstance from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";

const PaymentButton = ({ amount, fetchAddToCart }) => {

    const navigate = useNavigate();

    const handlePayment = async () => {
        try {
            const response = await axiosInstance.post("/api/payment/create-order");
            const order = response.data.order;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "ShopVerse",
                description: "Order Payment",
                order_id: order.id,

                handler: async function (response) {
                    try {
                        const verify = await axiosInstance.post("/api/payment/verify-payment", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });
                        alert(verify.data.message);

                        await fetchAddToCart();
                        navigate("/orders", {
                            replace: true,
                            state: {
                                paymentSuccess: true
                            }
                        });
                    }
                    catch (error) {
                        alert("Payment Verification Failed");
                    }
                },
                theme: { color: "#0d6efd" }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        }
        catch (error) {
            alert(error);
        }
    };

    return (
        <button className="btn btn-success w-100 mt-4" onClick={handlePayment}>
            Pay Now
        </button>
    );
};

export default PaymentButton;