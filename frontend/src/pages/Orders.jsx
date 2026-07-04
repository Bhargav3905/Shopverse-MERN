import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const paymentSuccess = location.state?.paymentSuccess;

    const fetchOrders = async () => {
        try {
            setLoading(true);

            const response = await axiosInstance.get("/api/orders");
            setOrders(response.data.orders);
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mt-5">

            {
                !paymentSuccess && (
                    <button className="btn btn-success mt-2" onClick={() => navigate("/profile")} >
                        Back to Profile
                    </button>
                )
            }

            {
                paymentSuccess && (
                    <div className="alert alert-success rounded-4 p-4 mb-4">
                        <h2 className="fw-bold">
                            🎉 Order Placed Successfully!
                        </h2>

                        <h4 className="mb-1">Thank you for shopping with ShopVerse.</h4>
                        <h4>Your payment has been received successfully.</h4>

                        <button className="btn btn-custom-primary rounded-pill px-4" onClick={() => navigate("/shop")}>
                            Continue Shopping
                        </button>
                    </div>
                )
            }

            <br />
            <br />

            <>
                <h2 className="fw-bold section-title mb-2">
                    My Orders
                </h2>

                <p className="text-muted mb-5">
                    View your purchase history and payment details.
                </p>
            </>

            {
                orders.length === 0
                    ?
                    <div className="text-center py-5">

                        <h2 className="fw-bold">
                            No Orders Yet
                        </h2>

                        <p className="text-muted">
                            Your purchased products will appear here.
                        </p>

                        <button
                            className="btn btn-custom-primary rounded-pill px-4"
                            onClick={() => navigate("/shop")}
                        >
                            Start Shopping
                        </button>

                    </div>
                    :
                    orders.map((order) => (
                        <div key={`${order._id}-${order.product?._id}`} className="card mb-4 shadow-sm">

                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start flex-wrap">

                                    <div>
                                        <h5 className="fw-bold mb-3">
                                            Order #{order._id.slice(-8).toUpperCase()}
                                        </h5>

                                        <p className="mb-2">
                                            <strong>Date:</strong>{" "}
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>

                                        <p className="mb-2">
                                            <strong>Payment:</strong> {order.paymentMethod}
                                        </p>
                                    </div>

                                    <span className="badge bg-success fs-6 px-3 py-2">
                                        {order.paymentStatus}
                                    </span>

                                </div>

                                <hr />
                                {
                                    order.products.map((item) => (
                                        <div key={item.product._id} className="d-flex justify-content-between align-items-center py-2">
                                            <div>
                                                <h6 className="fw-bold mb-1">
                                                    {item.product?.productName || "Product Removed"}
                                                </h6>
                                                <small className="text-muted">
                                                    Quantity : {item.quantity}
                                                </small>
                                            </div>

                                            <div className="fw-bold text-success">
                                                ₹{item.price}
                                            </div>
                                        </div>
                                    ))
                                }

                                <hr />

                                <div className="d-flex justify-content-between align-items-center">

                                    <h4 className="mb-0 fw-bold">
                                        Total
                                    </h4>
                                    <h3 className="mb-0 text-success fw-bold">
                                        ₹{order.totalAmount}
                                    </h3>

                                </div>
                            </div>

                        </div>
                    ))
            }
        </div>
    );
};

export default Orders;