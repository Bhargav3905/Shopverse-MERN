import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { isAdmin } from '../utils/auth'
import axiosInstance from '../services/axiosInstance';

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

    return (
        <>
            <div className="container">
                <br />
                <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
                    ← Back
                </button>

                <br />
                <h1>Product Detail Page</h1>

                <div className="d-flex col-12 container flex-wrap">
                    <img className='col-6' src={`http://localhost:3000/uploads/${product?.image}`} alt={product?.productName} />

                    <div className='col-6 d-flex flex-column justify-content-center align-items-start p-5'>
                        <h2>Product Name: {product?.productName}</h2>
                        <br />
                        <h3>Product Description: {product?.description}</h3>
                        <br />
                        <h3>Product Price: ₹{product?.price}</h3>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ProductDetail
