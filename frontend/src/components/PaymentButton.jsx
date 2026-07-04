import axiosInstance from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

const PaymentButton = ({ amount, fetchAddToCart }) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);

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
                        toast.success(verify.data.message);

                        await fetchAddToCart();
                        navigate("/orders", {
                            replace: true,
                            state: {
                                paymentSuccess: true
                            }
                        });
                    }
                    catch (error) {
                        toast.error("Payment Verification Failed");
                        setLoading(false);
                    }
                },
                theme: { color: "#0d6efd" }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Payment failed");
        }
    };

    return (
        <button
            className="btn btn-success w-100 mt-4"
            onClick={handlePayment}
            disabled={loading}
        >
            {loading ? (
                <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Opening Payment...
                </>
            ) : (
                "Pay Now"
            )}
        </button>
    );

};

export default PaymentButton;