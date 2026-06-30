import React, { useEffect, useState } from 'react'
import axiosInstance from '../services/axiosInstance.js'
import { useNavigate, Navigate } from 'react-router-dom';
import { isAdmin } from "../utils/auth";
import PaymentButton from '../components/PaymentButton.jsx';

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
            <div className="container mt-5">
                <div className="col-12 d-flex gap-3">

                    <div className="col-8"
                        style={{ border: "2px solid black", padding: "25px", borderRadius: "40px" }}>

                        <div className="d-flex justify-content-between align-items-center">
                            <h1>Add To Cart</h1>
                            {cartItem.length > 0 && <button className='btn btn-danger' onClick={() => handleClearCart()}>Remove All</button>}
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
                                            <div key={item._id} className='mt-5 d-flex gap-3 align-items-center'>
                                                <div>
                                                    <img style={{ border: "1px solid black" }} src={`http://localhost:3000/uploads/${item.product.image}`} alt="" width={300} height={300} />
                                                </div>
                                                <div>
                                                    <p>Category: {item.product.category.categoryName}</p>
                                                    <p>Product Name: {item.product.productName}</p>
                                                    <p>Product Description: {item.product.description}</p>
                                                    <p>Product Price: ₹{item.product.price}</p>
                                                    <div className='d-flex gap-3 align-items-baseline'>
                                                        Quantity :
                                                        <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>-</button>
                                                        <p>{item.quantity}</p>
                                                        <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>+</button>
                                                    </div>
                                                    <button onClick={() => removeItem(item._id)}><img src="/delete.svg" alt="delete" /></button>
                                                </div>
                                            </div>
                                        )
                                    })
                        }
                    </div>

                    {cartItem.length > 0 &&
                        <div className="col-4" style={{ border: "2px solid black", padding: "25px", borderRadius: "40px" }}>
                            <h1>Summary</h1>
                            <h4>Items : {cartItem.length}</h4>
                            <h3>Total : ₹{cartItem.reduce((acc, item) => acc + Number(item.product.price) * item.quantity, 0)}</h3>
                            
                            <PaymentButton amount={totalAmount} fetchAddToCart={fetchAddToCart} />
                        </div>
                    }

                </div>
            </div>
        </>
    )
}

export default AddToCart
