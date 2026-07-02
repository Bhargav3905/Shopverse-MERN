import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import axiosInstance from '../services/axiosInstance.js'
import { IMAGE_URL } from "../utils/helper";

const Shop = () => {

    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");

    const fetchProducts = async (categoryId = "") => {
        try {
            const url = categoryId ? `/api/products/category/${categoryId}` : "/api/products/list-product";
            const response = await axiosInstance.get(url);
            setProducts(response.data.products);
        } catch (error) {
            alert("Error fetching products: ", error);
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('api/category/list-category');
            setCategories(response.data.category);
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [])

    const handleAddToCart = async (productId) => {
        try {
            const response = await axiosInstance.post('/api/add-to-cart', { productId, quantity: 1 })
            alert(response.data.message)
        } catch (error) {
            alert(error)
        }
    }

    const searchProducts = async (value) => {

        setSearch(value);
        if (value.trim() === "") {
            if (selectedCategory === "all") {
                fetchProducts();
            } else {
                fetchProducts(selectedCategory);
            }
            return;
        }

        try {
            const response = await axiosInstance.get(`/api/products/search?query=${value}`);

            let result = response.data.products;
            if (selectedCategory !== "all") {
                result = result.filter((item) => item.category._id === selectedCategory);
            }

            setProducts(result);
        }
        catch (error) {
            alert(error);
        }
    };

    return (
        <>
            <br />

            <div className="container mb-5">
                <input type="text" value={search}
                    style={{ maxWidth: "550px", margin: "0 auto", borderRadius: "14px" }} className="form-control shadow-sm"
                    placeholder="🔍 Search products..." onChange={(e) => searchProducts(e.target.value)} />
            </div>

            {/* Category Filter */}

            <div className="container mt-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2 className="section-title mb-0">
                        Shop by Category
                    </h2>

                    <button
                        className={`btn ${selectedCategory === "all"
                            ? "btn-custom-primary"
                            : "btn-custom-outline"}`}
                        onClick={() => {
                            setSelectedCategory("all");

                            if (search.trim()) {
                                searchProducts(search);
                            } else {
                                fetchProducts();
                            }
                        }}
                    >
                        All Products
                    </button>

                </div>

                <div className="row g-4">

                    {
                        categories.map((category) => (

                            <div
                                key={category._id}
                                className="col-xl-2 col-lg-3 col-md-4 col-6"
                            >

                                <div
                                    className={`card shadow-sm h-100 ${selectedCategory === category._id
                                        ? "border border-4 border-success"
                                        : "border border-2"
                                        }`}

                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "18px",
                                        overflow: "hidden",
                                        transition: "all 0.25s ease",
                                        transform:
                                            selectedCategory === category._id || hoveredCategory === category._id
                                                ? "scale(1.03)"
                                                : "scale(1)",
                                        borderColor:
                                            selectedCategory === category._id || hoveredCategory === category._id
                                                ? "#198754"
                                                : "#dee2e6",
                                        borderWidth:
                                            selectedCategory === category._id || hoveredCategory === category._id
                                                ? "3px"
                                                : "1px",
                                        borderStyle: "solid",
                                        boxShadow:
                                            selectedCategory === category._id
                                                ? "0 0 0 4px rgba(25,135,84,0.18)"
                                                : hoveredCategory === category._id
                                                    ? "0 8px 20px rgba(0,0,0,0.15)"
                                                    : "0 4px 12px rgba(0,0,0,0.08)"
                                    }}

                                    onClick={() => {
                                        setSelectedCategory(category._id);
                                        fetchProducts(category._id);
                                    }}

                                    onMouseEnter={() => setHoveredCategory(category._id)}
                                    onMouseLeave={() => setHoveredCategory(null)}
                                >

                                    <img
                                        src={`${IMAGE_URL}/${category.image}`}
                                        alt={category.categoryName}
                                        className="card-img-top"
                                        style={{
                                            height: "140px",
                                            objectFit: "cover"
                                        }}
                                    />

                                    <div className="card-body text-center">
                                        <h6 className="fw-bold mb-0">
                                            {category.categoryName}
                                        </h6>
                                    </div>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>

            <br />
            <br />

            {/* Products */}
            {
                products.length === 0 ?
                    <div className="text-center mt-5">
                        <h2 className="fw-bold">
                            No Products Found
                        </h2>

                        <p className="text-muted">
                            Try another search or category.
                        </p>
                    </div>

                    :
                    <div className="container">

                        <div className="row g-4">
                            {
                                products
                                    .filter((product) => {
                                        if (selectedCategory === "all") return true;
                                        return product.category?._id === selectedCategory;
                                    })
                                    .map((item) => (
                                        <div key={item._id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12" >
                                            <Card item={item} handleAddToCart={handleAddToCart} />
                                        </div>
                                    ))
                            }
                        </div>

                    </div>
            }
        </>
    )
}

export default Shop
