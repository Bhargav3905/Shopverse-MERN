import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import axiosInstance from '../services/axiosInstance.js'

const Shop = () => {

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

            <div className="container mb-4">
                <input type="text" className="form-control" placeholder="🔍 Search products..." value={search} onChange={(e) => searchProducts(e.target.value)} />
            </div>

            {/* Category Filter */}
            <div className="container mt-4">

                <h2 className="mb-3">Shop by Category</h2>

                <div className="d-flex flex-wrap gap-3">
                    <button className={`btn ${selectedCategory === "all" ? "btn-dark" : "btn-outline-dark"}`}
                        onClick={() => {
                            setSelectedCategory("all");
                            if (search.trim()) {
                                searchProducts(search);
                            } else {
                                fetchProducts()
                            }
                        }} >
                        All Products
                    </button>
                    {
                        categories.map((category) => (
                            <button key={category._id} className={`btn ${selectedCategory === category._id ? "btn-success" : "btn-outline-success"}`}
                                onClick={() => {
                                    setSelectedCategory(category._id);
                                    fetchProducts(category._id);
                                }}>
                                {category.categoryName}
                            </button>
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
                        <h2>No Products Found</h2>
                    </div>

                    :
                    <div className="d-flex container flex-wrap justify-content-between">
                        {
                            products.filter((product) => {
                                if (selectedCategory === "all") return true;
                                return product.category?._id === selectedCategory;
                            }).map((item) => (
                                <div key={item._id}>
                                    <Card item={item} handleAddToCart={handleAddToCart} />
                                </div>
                            ))
                        }
                    </div>
            }
        </>
    )
}

export default Shop
