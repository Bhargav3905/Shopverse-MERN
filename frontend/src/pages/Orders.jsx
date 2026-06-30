import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const paymentSuccess = location.state?.paymentSuccess;

    const fetchOrders = async () => {
        try {
            const response = await axiosInstance.get("/api/orders");
            setOrders(response.data.orders);
        }
        catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

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
                        <h3>🎉 Order Placed Successfully!</h3>
                        <br />
                        <h4 className="mb-1">Thank you for shopping with ShopVerse.</h4>
                        <h4>Your payment has been received successfully.</h4>
                        <br />
                        <button className="btn btn-success mt-2" onClick={() => navigate("/shop")}>
                            Continue Shopping
                        </button>
                    </div>
                )
            }

            <br />
            <br />
            <br />

            <h2 className="mb-4">My Orders</h2>
            {
                orders.length === 0
                    ?
                    <div className="text-center">
                        <h3>No Orders Yet</h3>
                    </div>
                    :
                    orders.map((order) => (
                        <div key={order._id} className="card mb-4 shadow-sm">

                            <div className="card-body">
                                <h5>Order ID : {" "} {order._id}</h5>
                                <p>Order Date : {" "} {new Date(order.createdAt).toLocaleDateString()}</p>
                                <p>Payment : {" "} {order.paymentMethod}</p>
                                <p>Status : {" "} {order.paymentStatus}</p>

                                <hr />
                                {
                                    order.products.map((item) => (
                                        <div key={item._id} className="d-flex justify-content-between mb-2">
                                            <div>
                                                <strong>{item.product.productName}</strong>
                                                <br />
                                                Qty : {" "} {item.quantity}
                                            </div>

                                            <div>₹{item.price}</div>
                                        </div>
                                    ))
                                }

                                <hr />
                                <h4>Total : {" "} ₹{order.totalAmount}</h4>
                            </div>

                        </div>
                    ))
            }
        </div>
    );
};

export default Orders;