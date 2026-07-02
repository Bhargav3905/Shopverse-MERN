import React, { useEffect, useState } from 'react'
import axiosInstance from '../services/axiosInstance.js'
import { useNavigate, Navigate } from 'react-router-dom';
import { isAdmin } from "../utils/auth";
import PaymentButton from '../components/PaymentButton.jsx';
import { IMAGE_URL } from "../utils/helper";

const AddToCart = () => {

    const admin = isAdmin();
    if (admin) {
        return <Navigate to="/" />;
    }

    const navigate = useNavigate();
    const [cartItem, setCartItem] = useState([])

    const fetchAddToCart = async () => {
        try {
            const response = await axiosInstance.get('/api/get-cart')
            setCartItem(response.data.cartItems)
        } catch (error) {
            if (error.response?.status === 404) {
                setCartItem([]);
            } else {
                alert(error);
            }
        }
    }

    useEffect(() => {
        fetchAddToCart()
    }, [])

    const updateQuantity = async (productId, quantity) => {
        try {
            const response = await axiosInstance.put('/api/update-quantity', { productId, quantity })
            alert(response.data.message)
            fetchAddToCart()
        } catch (error) {
            alert(error)
        }
    }

    const removeItem = async (itemId) => {
        try {
            const response = await axiosInstance.delete(`/api/remove-item/${itemId}`)
            alert(response.data.message)
            fetchAddToCart()
        } catch (error) {
            alert(error)
        }
    }

    const handleClearCart = async () => {
        try {
            const response = await axiosInstance.delete(`/api/clear-cart`)
            alert(response.data.message)
            fetchAddToCart()
        } catch (error) {
            alert(error)
        }
    }

    const totalAmount = cartItem.reduce((acc, item) => acc + Number(item.product.price) * item.quantity, 0);

    return (
        <>
            <div className="container py-5">
                <div className="row g-4">

                    <div className="col-lg-8">
                        <div className="card shadow-sm border-0 p-4 h-100">

                            <div className="d-flex justify-content-between align-items-center">

                                <h2 className="fw-bold mb-0"> Shopping Cart </h2>

                                {cartItem.length > 0 && <button className="btn btn-outline-danger rounded-pill px-4" onClick={() => handleClearCart()}>Remove All</button>}

                            </div>

                            {
                                cartItem.length === 0 ?
                                    <div className="text-center mt-5">
                                        <h2>Your Cart is Empty</h2>
                                    </div>
                                    :
                                    cartItem
                                        .filter(item => item.product)
                                        .map((item) => {
                                            return (
                                                <div key={item._id} className="row g-4 align-items-center border-bottom pb-4 mb-4">

                                                    <div className="col-md-4 text-center">
                                                        <img src={`${IMAGE_URL}/${item.product.image}`}
                                                            alt={item.product.productName}
                                                            className="img-fluid rounded-4 border"
                                                            style={{ maxHeight: "250px", objectFit: "cover" }} />
                                                    </div>

                                                    <div className="col-md-8">
                                                        <h4 className="fw-bold mb-3">{item.product.productName}</h4>

                                                        <p className="text-muted mb-2">{item.product.description}</p>

                                                        <p className="mb-2"><strong>Category:</strong> {item.product.category.categoryName}</p>

                                                        <h5 className="fw-bold text-success">₹{item.product.price}</h5>

                                                        <div className="d-flex align-items-center gap-3 mt-4">
                                                            Quantity :
                                                            <button className="btn btn-outline-secondary btn-sm rounded-circle" onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>-</button>
                                                            <p className="fw-bold mb-0 px-2">{item.quantity}</p>
                                                            <button className="btn btn-outline-secondary btn-sm rounded-circle" onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>+</button>
                                                        </div>

                                                        <button className="btn btn-outline-danger btn-sm mt-3 d-flex align-items-center gap-2" onClick={() => removeItem(item._id)}>
                                                            <img src="/delete.svg" alt="delete" width="18" height="18" />
                                                            Remove
                                                        </button>
                                                    </div>

                                                </div>
                                            )
                                        })
                            }
                        </div>
                    </div>


                    {cartItem.length > 0 &&
                        <div className="col-lg-4">
                            <div className="card shadow-sm border-0 p-4 sticky-top" style={{ top: "120px" }}>
                                <h2 className="fw-bold mb-4">Order Summary</h2>

                                <div className="d-flex justify-content-between mb-3">
                                    <span>Items</span>
                                    <strong>{cartItem.length}</strong>
                                </div>

                                <div className="d-flex justify-content-between mb-4">
                                    <span>Total</span>
                                    <strong className="fs-4 text-success">
                                        ₹{totalAmount}
                                    </strong>
                                </div>

                                <PaymentButton amount={totalAmount} fetchAddToCart={fetchAddToCart} />
                            </div>
                        </div>
                    }

                </div>
            </div>
        </>
    )
}

export default AddToCart
