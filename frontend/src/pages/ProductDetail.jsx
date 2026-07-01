import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { isAdmin } from '../utils/auth'
import axiosInstance from '../services/axiosInstance';
import { IMAGE_URL } from "../utils/helper";

const ProductDetail = () => {

    const admin = isAdmin();
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null)

    const fetchProductDetail = async () => {
        try {
            const response = await axiosInstance.get(`/api/products/product/${id}`)
            setProduct(response.data.productList)
        } catch (error) {
            alert(error.response);
        }
    }

    useEffect(() => {
        fetchProductDetail()
    }, [])

    const handleAddToCart = async () => {
        try {
            const response = await axiosInstance.post("/api/add-to-cart",
                {
                    productId: product._id,
                    quantity: 1
                }
            );
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="container py-4">

            <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)} >
                ← Back
            </button>

            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

                <div className="row g-0">

                    <div className="col-lg-6">
                        <img
                            src={`${IMAGE_URL}${product?.image}`} alt={product?.productName}
                            className="img-fluid w-100 h-100" style={{ objectFit: "cover", minHeight: "500px" }} />
                    </div>

                    <div className="col-lg-6">

                        <div className="p-5 h-100 d-flex flex-column">

                            <span className="badge bg-success mb-3 align-self-start">
                                Available
                            </span>

                            <h1 className="fw-bold mb-3">
                                {product?.productName}
                            </h1>

                            <h2 className="text-success fw-bold mb-4">
                                ₹{product?.price}
                            </h2>

                            <p className="text-muted fs-5" style={{ lineHeight: "1.8" }} >
                                {product?.description}
                            </p>

                            <div className="mt-auto">
                                {!admin && (
                                    <button onClick={handleAddToCart} className="btn btn-custom-primary btn-lg px-5" >
                                        Add to Cart
                                    </button>
                                )}
                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default ProductDetail
