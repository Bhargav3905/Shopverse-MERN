import { useState, useRef, useEffect } from 'react'
import axiosInstance from '../services/axiosInstance';
import { IMAGE_URL } from "../utils/helper";

const ManageProducts = () => {

    const fileInputRef = useRef(null);

    const [products, setProducts] = useState([])
    const [editId, setEditId] = useState()
    const [categories, setCategories] = useState([])

    const [formData, setFormData] = useState({
        productName: "",
        category: "",
        image: null,
        description: "",
        price: 0
    })

    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get("/api/products/list-product")
            setProducts(response.data.products)
        } catch (error) {
            alert.log("Error fetching products: ", error);
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();

        form.append("productName", formData.productName)
        form.append("image", formData.image)
        form.append("description", formData.description)
        form.append("price", formData.price)
        form.append("category", formData.category)

        try {

            if (editId) {
                const response = await axiosInstance.put(`/api/products/edit-product/${editId}`, form)
                alert(response.data.message)
            } else {
                const response = await axiosInstance.post('/api/products/add-product', form)
                alert(response.data.message)
            }
            setEditId(null);

            setFormData({
                productName: "",
                category: "",
                image: null,
                description: "",
                price: ""
            })
            
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
            
            fetchProducts()
        } catch (error) {
            alert.log("Error", error);
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axiosInstance.delete(`/api/products/delete-product/${id}`)
            alert(response.data.message)
            fetchProducts()
        } catch (error) {
            alert("Error", error);
        }
    }

    const handleEdit = (product) => {
        setEditId(product._id)

        setFormData({
            productName: product.productName,
            image: null,
            description: product.description,
            price: product.price,
            category: product.category?._id
        })
    }

    const fetchCategory = async () => {
        try {
            const response = await axiosInstance.get("/api/category/list-category")
            setCategories(response.data.category);
        } catch (error) {
            alert("Error fetching iecategors: ", error);
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    return (
        <>

            <div className="container py-4">

                <div className="mb-5">

                    <h1 className="section-title fw-bold">
                        Manage Products
                    </h1>

                    <p className="text-muted">
                        Add, update and manage products available in ShopVerse.
                    </p>

                </div>

                <div className="card border-0 shadow-sm mb-5">

                    <div className="card-body p-4">

                        <h4 className="fw-bold mb-4">
                            {editId ? "Update Product" : "Add New Product"}
                        </h4>


                        <form onSubmit={handleSubmit}>
                            <label>Product Name:</label>
                            <input value={formData.productName} className='form-control' type="text" name="productName" required
                                onChange={(e) => setFormData({ ...formData, productName: e.target.value })} />
                            <br />

                            <label><b>Select Category</b></label>
                            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className='form-control'>
                                <option value="">Select Category</option>
                                {
                                    categories?.map((item) => (
                                        <option value={item._id} key={item._id}>{item.categoryName}</option>
                                    ))
                                }
                            </select>

                            <label>Image:</label>
                            <input ref={fileInputRef} className='form-control' type="file" name="image"
                                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
                            <br />

                            <label>Description:</label>
                            <textarea value={formData.description} className='form-control' name="description" required
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                            <br />

                            <label>Price:</label>
                            <input value={formData.price} className='form-control' type="number" name="price" required
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                            <br />

                            <button className="btn btn-custom-primary rounded-pill px-4" type="submit">{editId ? "Update Product" : "Add Product"}</button>
                        </form>
                    </div>

                </div>

                <div className="card border-0 shadow-sm">

                    <div className="card-body">

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <h4 className="fw-bold mb-0">
                                Product List
                            </h4>

                            <span className="badge bg-success">
                                {products.length} Products
                            </span>

                        </div>

                        <div className="table-responsive"></div>
                        <table className="table table-striped table-hover align-middle mb-0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Image</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map((item, index) => (
                                    <tr key={item._id}>
                                        <th>{index + 1}</th>
                                        <td>{item.productName}</td>
                                        <td>
                                            <img
                                                src={`${IMAGE_URL}/${item.image}`}
                                                alt={item.productName} width="70" height="90"
                                                style={{
                                                    width: "70px",
                                                    height: "70px",
                                                    objectFit: "cover",
                                                    borderRadius: "12px"
                                                }}
                                            />
                                        </td>
                                        <td>{item.category?.categoryName}</td>
                                        <td>{item.description}</td>
                                        <td><span className="fw-bold text-success">
                                            ₹{item.price}
                                        </span></td>
                                        <td>
                                            <div className="d-flex gap-2 flex-nowrap">

                                                <button
                                                    type="button"
                                                    className="btn btn-warning btn-sm rounded-pill px-3"
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger btn-sm rounded-pill px-3"
                                                    onClick={() => handleDelete(item._id)}
                                                >
                                                    Delete
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </>
    )
}

export default ManageProducts
